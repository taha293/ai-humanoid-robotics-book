# Research: Floating AI Chatbot for Docusaurus Frontend

## Decision: Docusaurus Global Component Implementation
**Rationale**: Based on Docusaurus documentation, the best approach for a floating chatbot that appears on all pages is to use a global client module or theme component injection. This allows the chatbot to be rendered consistently across all pages without modifying individual page components.

**Implementation Options Considered**:
1. Global client module using `clientModules` in docusaurus.config.js
2. Theme component injection via component shadowing
3. Layout wrapper approach

**Chosen Approach**: Global client module approach as it's the simplest and most reliable method to ensure the chatbot appears on all pages.

## Decision: Floating UI Component Architecture
**Rationale**: Based on React best practices and Docusaurus integration patterns, the floating chatbot UI should be implemented as a React component with fixed positioning. The component will include:

1. A fixed-position chat icon/button in the bottom-right corner
2. State management for open/closed status
3. CSS styling for proper positioning and animations
4. Event handlers for user interactions

**Implementation Pattern**:
- Use React's `useState` hook for managing open/closed state
- Apply CSS with `position: fixed` and coordinates for bottom-right placement
- Use CSS transitions for smooth open/close animations
- Implement proper accessibility attributes (ARIA labels, keyboard navigation)

**Example Structure**:
```jsx
import React, { useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          💬
        </button>
      )}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '450px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Chat window content */}
          <div style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
            <h3>AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
          {/* Additional chat content */}
        </div>
      )}
    </div>
  );
}

export default Chatbot;
```

## Decision: Chatbot UI Architecture
**Rationale**: The chatbot needs to be a floating UI element that appears as a fixed icon in the bottom-right corner. When clicked, it should expand into a chat window. This requires:
- A fixed-position icon component
- A toggleable chat window component
- State management for open/closed state

## Decision: Global Component Integration
**Rationale**: Based on Docusaurus documentation, the global client module approach using `clientModules` in `docusaurus.config.js` is the most effective way to ensure the chatbot appears on all pages. The implementation involves:

1. Creating a client module that renders the chatbot component
2. Adding it to the `clientModules` array in the configuration
3. Using `ExecutionEnvironment` to ensure it only renders in the browser

**Configuration Example**:
```javascript
// docusaurus.config.js
module.exports = {
  // ... other config
  clientModules: [
    require.resolve('./src/components/Chatbot/Chatbot.js'),
  ],
  // ... rest of config
};
```

**Component Module Example**:
```javascript
// src/components/Chatbot/Chatbot.js
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React from 'react';
import ChatbotComponent from './ChatbotComponent';

if (ExecutionEnvironment.canUseDOM) {
  // Render the chatbot component when DOM is available
  const root = document.createElement('div');
  document.body.appendChild(root);

  // You would use ReactDOM.client.createRoot for React 18+
  import('react-dom/client').then(ReactDOMClient => {
    const chatbotRoot = ReactDOMClient.createRoot(root);
    chatbotRoot.render(<ChatbotComponent />);
  });
}
```

## Decision: API Communication Layer
**Rationale**: Based on analysis of `backend/fastapiAi.py`, the API endpoint is `/ask` which accepts a POST request with a JSON body containing a `query` field. The response follows the `AnswerResponse` model with `answer`, `sources`, and `question` fields.

**Request Format**:
```json
{
  "query": "user's question",
  "context": "optional context"
}
```

**Response Format**:
```json
{
  "answer": "AI response",
  "sources": [{"section": "...", "content": "...", "relevance_score": 0.8}, ...],
  "question": "original question"
}
```

## Decision: CORS Configuration
**Rationale**: The backend file does not currently have CORS middleware configured. For the frontend to communicate with the backend API from a different origin (Docusaurus site to FastAPI server), CORS must be enabled.

**Required Change**: Add `from fastapi.middleware.cors import CORSMiddleware` and configure it in the FastAPI app.

## Decision: Error Handling Strategy
**Rationale**: Based on Docusaurus error handling patterns and general frontend best practices, the chatbot should handle multiple error scenarios gracefully:
- Network errors (API unavailable)
- API errors (HTTP status codes like 400, 500)
- Empty or invalid responses
- Timeout scenarios

**Implementation**: Use try/catch blocks around API calls with appropriate user-facing error messages.

## Decision: State Management
**Rationale**: The chatbot needs to maintain its open/closed state. This can be done with React's useState hook for local component state, which is sufficient for this use case.

## Decision: Styling Approach
**Rationale**: To maintain consistency with Docusaurus themes, the chatbot should use CSS modules or styled components that can be customized to match the site's color scheme. The floating UI should be responsive and work well on both desktop and mobile.

## Decision: Environment Configuration
**Rationale**: The API URL should be configurable via environment variables as specified in the requirements. The frontend should read `NEXT_PUBLIC_API_URL` from the environment and construct the API endpoint URL accordingly.

## Decision: Accessibility Considerations
**Rationale**: Following Docusaurus accessibility guidelines, the chatbot should be keyboard accessible, have proper ARIA attributes, and follow color contrast requirements for accessibility compliance.