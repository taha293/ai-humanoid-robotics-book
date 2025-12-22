# Data Model: AI-Powered Question Answering System

## Core Entities

### 1. Question
- **Description**: User input text containing a query about the book content
- **Fields**:
  - `query`: string (required) - The user's question text
  - `context`: string (optional) - Additional context provided by user
  - `user_id`: string (optional) - Identifier for the user (if tracking is needed)
- **Validation**:
  - `query` must not be empty
  - `query` length should be within reasonable limits (e.g., 1000 characters)
- **Source**: User input via POST request to `/ask` endpoint

### 2. Response
- **Description**: AI-generated answer based on retrieved book content, returned in JSON format
- **Fields**:
  - `answer`: string (required) - The AI-generated response
  - `sources`: array of objects (optional) - References to book sections used
    - `section`: string - Name or identifier of the book section
    - `content`: string - Snippet of the content used
    - `relevance_score`: number - Confidence score of relevance (0-1)
  - `question`: string (optional) - Echo of the original question
  - `timestamp`: string (optional) - When the response was generated
- **Validation**:
  - `answer` must not be empty
  - `sources` items must have valid structure
- **Source**: AI/LLM output with book content references

### 3. SearchResult
- **Description**: Retrieved book content relevant to the user's question
- **Fields**:
  - `id`: string (required) - Unique identifier for the content chunk
  - `content`: string (required) - The actual book content text
  - `metadata`: object (optional) - Additional information about the content
    - `section`: string - Book section where content appears
    - `page_number`: number - Page reference if applicable
    - `title`: string - Title of the content section
  - `score`: number (required) - Relevance score (0-1)
- **Validation**:
  - `content` must not be empty
  - `score` must be between 0 and 1
- **Source**: Qdrant vector database search results

### 4. Configuration
- **Description**: API keys and service endpoint URLs required for external integrations
- **Fields**:
  - `qdrant_url`: string (required) - URL for Qdrant vector database
  - `qdrant_api_key`: string (optional) - API key for Qdrant authentication
  - `gemini_base_url`: string (required) - Base URL for Gemini API
  - `gemini_api_key`: string (required) - API key for Gemini access
- **Validation**:
  - URLs must be valid
  - API keys must be provided when required
- **Source**: Environment variables

## Relationships

### Question → Response
- One-to-one relationship
- Each question generates one response
- Response is generated based on the question content

### Question → SearchResult
- One-to-many relationship (0 to N)
- Each question may result in multiple search results
- Search results provide context for generating the response

### SearchResult → Response
- Many-to-one relationship
- Multiple search results may contribute to one response
- Search results provide the grounding content for the response

## State Transitions

### Question Processing Flow
1. **Received**: Question is received via POST request
2. **Embedded**: Question text is converted to vector embedding
3. **Searched**: Embedding is used to search Qdrant for relevant content
4. **Processed**: Search results are formatted for LLM context
5. **Answered**: LLM generates response based on context
6. **Returned**: Response is returned to user

## Constraints

### Data Integrity
- All responses must be grounded in search results from book content
- No hallucinated information should be present in responses
- API keys must be securely handled and not exposed in responses

### Performance
- Response generation should complete within 5 seconds
- Embedding generation and search should be optimized for speed
- Multiple concurrent requests should be handled efficiently