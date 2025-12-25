# Quickstart Guide: AI-Powered Question Answering System

## Project Structure
```
backend/
├── requirements.txt
├── .env
└── fastapiAi.py
```

## Prerequisites
- Python 3.8+
- Access to existing Qdrant vector database with book embeddings
- Gemini API access

## Setup Instructions

### 1. Create the backend directory and files:
```bash
mkdir backend
cd backend
touch requirements.txt .env fastapiAi.py
```

### 2. Configure requirements.txt:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
qdrant-client==1.8.0
fastembed==0.2.0
openai==1.3.4
python-dotenv==1.0.0
pydantic==2.5.0
```

### 3. Set up .env with placeholders:
```env
QDRANT_URL=your_qdrant_url_here
QDRANT_API_KEY=your_qdrant_api_key_here
GEMINI_BASE_URL=your_gemini_base_url_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Initialize the FastAPI application structure:
The `fastapiAi.py` file should contain:
- FastAPI app instance
- Configuration loading from environment
- Qdrant client initialization
- `/ask` endpoint with request/response validation
- RAG logic implementation
- Error handling

### 5. Run the application:
```bash
uvicorn fastapiAi:app --reload
```

## API Usage Example
```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are the key concepts in this book?"
  }'
```

## Key Implementation Notes
- Use BAAI/bge-small-en-v1.5 model for embeddings via fastembed
- Connect to existing Qdrant collection containing book embeddings
- Format retrieved content as context for Gemini LLM
- Ensure responses are grounded in book content only
- Implement proper error handling for service unavailability