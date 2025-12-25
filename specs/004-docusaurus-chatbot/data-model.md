# Data Model: Floating AI Chatbot for Docusaurus Frontend

## Entity: User Query
- **Description**: The text input from the website visitor that gets sent to the AI backend for processing
- **Fields**:
  - `text`: string (required) - The actual query text from the user
  - `timestamp`: datetime (required) - When the query was submitted
  - `context`: string (optional) - Additional context provided with the query
- **Validation**:
  - Text must be 1-1000 characters
  - Text cannot be empty or whitespace only
- **Relationships**: Links to AI Response (one-to-one, when response is received)

## Entity: AI Response
- **Description**: The processed response from the backend AI service that gets displayed to the user in the chat interface
- **Fields**:
  - `answer`: string (required) - The main answer text from the AI
  - `sources`: array of Source objects (optional) - References to source materials used in the response
  - `question`: string (optional) - The original question that generated this response
  - `timestamp`: datetime (required) - When the response was received
- **Validation**:
  - Answer cannot be empty
  - Sources array items must follow Source model structure
- **Relationships**: Linked to User Query that generated it

## Entity: Source
- **Description**: Information about sources used in the AI response
- **Fields**:
  - `section`: string (optional) - The section name where the source content comes from
  - `content`: string (required) - The actual content of the source
  - `relevance_score`: float (required) - A score between 0.0 and 1.0 indicating relevance
- **Validation**:
  - Relevance score must be between 0.0 and 1.0
  - Content cannot be empty
- **Relationships**: Belongs to AI Response

## Entity: Chat Session
- **Description**: The state of the current interaction between the user and the chatbot (open/closed, history of messages)
- **Fields**:
  - `isOpen`: boolean (required) - Whether the chat window is currently open
  - `messages`: array of message objects (optional) - History of query-response pairs in the session
  - `lastActive`: datetime (required) - When the chat was last interacted with
- **Validation**:
  - Messages array items must follow either User Query or AI Response structure
- **State Transitions**:
  - `closed` → `open` (when user clicks chat icon)
  - `open` → `closed` (when user closes chat window)

## Entity: Chat UI State
- **Description**: The visual and interaction state of the chatbot UI component
- **Fields**:
  - `isVisible`: boolean (required) - Whether the chatbot UI is visible on the page
  - `position`: object (required) - The x,y coordinates of the chatbot on the screen
  - `isMinimized`: boolean (required) - Whether the chat window is minimized
  - `hasUnreadMessages`: boolean (required) - Whether there are unread messages
- **Validation**:
  - Position must have valid x,y coordinates
- **State Transitions**:
  - `hidden` → `visible` (when chatbot is initialized)
  - `visible` → `hidden` (when user dismisses permanently)
  - `open` ↔ `minimized` (when user toggles window state)

## Entity: API Configuration
- **Description**: Configuration parameters for API communication
- **Fields**:
  - `apiUrl`: string (required) - The base URL for the backend API
  - `endpoint`: string (required) - The specific endpoint path (default: "/ask")
  - `timeout`: number (optional) - Request timeout in milliseconds
- **Validation**:
  - API URL must be a valid URL format
  - Endpoint must start with "/"