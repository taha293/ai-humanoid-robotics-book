# Quickstart: Floating AI Chatbot for Docusaurus Frontend

## Overview
This guide will help you quickly set up and run the floating AI chatbot on your Docusaurus website.

## Prerequisites
- Node.js 16+ installed
- Docusaurus 3+ project set up
- Backend API server running with `/ask` endpoint
- Access to environment variables for API configuration

## Installation Steps

### 1. Clone or update your repository
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in your Docusaurus root directory with the following:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Add the chatbot component
The chatbot component needs to be added globally to appear on all pages using Docusaurus client modules:

**Add to `docusaurus.config.js`**
```javascript
module.exports = {
  // ... other config
  clientModules: [
    require.resolve('./src/components/Chatbot/Chatbot.js'),
  ],
  // ... rest of config
};
```

### 5. Create the chatbot component structure
Create the following directory and files:

```text
src/
└── components/
    └── Chatbot/
        ├── Chatbot.jsx
        ├── Chatbot.module.css
        ├── ChatbotIcon.jsx
        └── ChatbotWindow.jsx
```

### 6. Start the development server
```bash
npm run start
```

## Component Structure
The chatbot consists of several React components:
- `Chatbot.jsx`: Main component with fixed positioning
- `ChatbotIcon.jsx`: Floating icon in bottom-right corner
- `ChatbotWindow.jsx`: Expandable chat interface
- `Chatbot.module.css`: Styling with CSS modules

## Backend Configuration
If CORS is not configured on your backend, you'll need to add it to your FastAPI application:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for your deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## API Communication
The chatbot communicates with the backend using the following:
- **Endpoint**: `POST /ask`
- **Request Format**:
```json
{
  "query": "user's question",
  "context": "optional context"
}
```
- **Response Format**:
```json
{
  "answer": "AI response",
  "sources": [...],
  "question": "original question"
}
```

## Troubleshooting
- If the chatbot doesn't appear, check that it's properly added to the client modules or layout
- If API calls fail, verify the `NEXT_PUBLIC_API_URL` is correctly set
- For CORS errors, ensure the backend has proper CORS configuration
- Check browser console for JavaScript errors

## Next Steps
1. Customize the chatbot styling to match your site theme
2. Implement error handling for various failure scenarios
3. Test on different devices and screen sizes
4. Deploy to production with proper API URL configuration