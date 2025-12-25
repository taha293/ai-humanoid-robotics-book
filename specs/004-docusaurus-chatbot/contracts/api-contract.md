# API Contract: Chatbot to Backend Communication

## Overview
This document specifies the API contract between the frontend chatbot component and the backend AI service.

## Base URL
The base URL is configured via the environment variable `NEXT_PUBLIC_API_URL`.

## Endpoints

### POST /ask
Submit a user query to the AI backend service.

#### Request
**Content-Type**: `application/json`

**Body**:
```json
{
  "query": "string (required, 1-1000 characters)",
  "context": "string (optional)"
}
```

**Validation**:
- `query` must be present and non-empty
- `query` must be between 1 and 1000 characters
- `context` is optional and can be omitted

#### Success Response (200 OK)
**Content-Type**: `application/json`

**Body**:
```json
{
  "answer": "string (required)",
  "sources": [
    {
      "section": "string (optional)",
      "content": "string (required)",
      "relevance_score": "number (required, 0.0-1.0)"
    }
  ],
  "question": "string (optional)"
}
```

#### Error Responses

**400 Bad Request**:
- When query is empty or invalid
```json
{
  "detail": "string (error message)"
}
```

**500 Internal Server Error**:
- When there's a server-side error processing the request
```json
{
  "detail": "string (error message)"
}
```

## Client Implementation Requirements

### Request Headers
- `Content-Type`: `application/json`
- `Accept`: `application/json` (implicit)

### Timeout Configuration
- Recommended timeout: 30 seconds
- Should be configurable via environment or constants

### Error Handling
The frontend must handle:
- Network errors (connection failures, timeouts)
- HTTP error responses (4xx, 5xx)
- Invalid JSON responses
- Empty or malformed responses
- API unavailability

## Security Considerations
- Requests must be made over HTTPS in production
- Input should be sanitized before sending to prevent injection attacks
- API keys are handled server-side, not exposed to frontend

## CORS Configuration
The backend must be configured to allow requests from the frontend origin:
- `Access-Control-Allow-Origin`: Frontend domain
- `Access-Control-Allow-Methods`: POST, OPTIONS
- `Access-Control-Allow-Headers`: Content-Type, Accept

## Frontend State Management
The frontend should maintain appropriate state for:
- Chat session open/closed status
- Current conversation history
- Loading states during API requests
- Error states for different failure scenarios