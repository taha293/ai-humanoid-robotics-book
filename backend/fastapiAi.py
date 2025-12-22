"""
FastAPI application for AI-powered question answering system using RAG with Qdrant and Gemini.
This implementation uses OpenAI Agents SDK with a search tool for Qdrant integration.
"""
import os
import time
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models
from fastembed import TextEmbedding
from openai import AsyncOpenAI
from agents import Agent, Runner, set_default_openai_client, OpenAIChatCompletionsModel, function_tool

# Load environment variables
load_dotenv()

# Initialize the application
app = FastAPI(
    title="AI-Powered Question Answering System",
    description="A RAG-based system that answers questions about Physical AI and Humanoid Robotics book content using Qdrant and Gemini",
    version="1.0.0"
)

# Request/Response models based on data model
class QuestionRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000, description="The user's question about the book content")
    context: Optional[str] = Field(None, description="Additional context for the question")

class Source(BaseModel):
    section: Optional[str] = None
    content: str
    relevance_score: float = Field(ge=0.0, le=1.0)

class AnswerResponse(BaseModel):
    answer: str
    sources: Optional[List[Source]] = []
    question: Optional[str] = None

class Settings(BaseSettings):
    qdrant_url: str
    qdrant_api_key: Optional[str] = None
    gemini_base_url: str
    gemini_api_key: str

    class Config:
        env_file = ".env"

try:
    settings = Settings()
except Exception as e:
    raise ValueError(f"Missing required configuration: {str(e)}")

# Configure OpenAI client for Gemini
gemini_client = AsyncOpenAI(
    api_key=settings.gemini_api_key,
    base_url=settings.gemini_base_url
)

# Set this as the default client for the Agents SDK
set_default_openai_client(gemini_client)

# Initialize Qdrant client
try:
    if settings.qdrant_api_key:
        qdrant_client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )
    else:
        qdrant_client = QdrantClient(
            url=settings.qdrant_url,
        )
except Exception as e:
    raise ConnectionError(f"Failed to connect to Qdrant: {str(e)}")

# Test connection to Qdrant
try:
    qdrant_client.get_collections()
except Exception as e:
    raise ConnectionError(f"Failed to connect to Qdrant collections: {str(e)}")

# Initialize fastembed model
try:
    embedding_model = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
except Exception as e:
    raise RuntimeError(f"Failed to initialize embedding model: {str(e)}")

# Function to generate embeddings
def generate_embeddings(texts: List[str]):
    """
    Generate embeddings for a list of texts using fastembed.

    Args:
        texts: List of texts to generate embeddings for

    Returns:
        List of embedding vectors
    """
    try:
        embeddings_generator = embedding_model.embed(texts)
        embeddings_list = list(embeddings_generator)

        # Convert to regular Python lists for JSON serialization
        result = []
        for embedding in embeddings_list:
            result.append(embedding.tolist() if hasattr(embedding, 'tolist') else list(embedding))

        return result
    except Exception as e:
        raise RuntimeError(f"Error generating embeddings: {str(e)}")

# Define a search tool that can be used by the agent
@function_tool
def search_book_content(query: str, limit: int = 5) -> List[Dict[str, Any]]:
    """
    Search the Physical AI and Humanoid Robotics book content in Qdrant.

    Args:
        query: The search query to find relevant book content
        limit: Number of results to return (default 5)

    Returns:
        List of search results with content and metadata
    """
    try:
        # Generate embedding for the query
        query_embeddings = generate_embeddings([query])
        query_vector = query_embeddings[0]  # Get the first (and only) embedding

        # Search in Qdrant for relevant content
        search_results = qdrant_client.query_points(
            collection_name="documentation_chunks",
            query=query_vector,
            limit=limit
        ).points

        return search_results
    except Exception as e:
        print(f"[debug] Error searching book content: {str(e)}")
        return []

# Create the main agent with proper instructions and tools
def create_book_assistant_agent():
    """
    Create an agent specialized for the Physical AI and Humanoid Robotics book.
    The agent will use the search tool when it determines a query is book-related.
    """
    agent = Agent(
        name="PhysicalAIHumanoidRoboticsAssistant",
        instructions="""
        You are an AI assistant specialized for the Physical AI and Humanoid Robotics book.
        Your main function is to answer questions about Physical AI and Humanoid Robotics based on the book content.

        For general questions (like 'hi', 'hello', 'how are you'), respond normally based on your general knowledge.

        For book-related questions, use the search_book_content tool to find relevant information from the book.
        Only provide information that comes from the search results. Do not hallucinate or make up information.

        If the search doesn't return relevant information for a book-related query, clearly state that you don't have that specific information in the book.

        Always be helpful and provide accurate information based on what you find.
        """,
        model=OpenAIChatCompletionsModel(
            model="gemini-2.5-flash-lite",  # Using Gemini Flash model directly
            openai_client=AsyncOpenAI(
                api_key=settings.gemini_api_key,
                base_url=settings.gemini_base_url
            )
        ),
        tools=[search_book_content]  # Include the search tool
    )
    return agent

@app.get("/")
async def root():
    return {"message": "AI-Powered Question Answering System for Physical AI and Humanoid Robotics is running"}

@app.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    """
    Main endpoint to ask questions about the Physical AI and Humanoid Robotics book content.
    Uses OpenAI Agents SDK with a search tool for Qdrant integration.
    """
    try:
        # Validate the request
        if not request.query or not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        # Create the agent
        agent = create_book_assistant_agent()

        # Run the agent with the user's query
        result = await Runner.run(
            agent,
            request.query
        )

        # Format the response
        answer = result.final_output

        # Extract sources if any were used (from tool calls)
        sources = []  # In this implementation, sources are embedded in the response
                     # For more detailed source tracking, we'd need to parse tool results

        return AnswerResponse(
            answer=answer,
            sources=sources,
            question=request.query
        )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        # Log the error for debugging
        import traceback
        print(f"Error processing question: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint to verify the system is running"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "components": {
            "qdrant": "connected",
            "embedding_model": "loaded",
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)