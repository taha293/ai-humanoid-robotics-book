// Constants for API configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Will be overridden in apiService with env var
  ENDPOINTS: {
    ASK: '/ask',
  },
  TIMEOUT: 30000, // 30 seconds
};

// Chatbot configuration
export const CHATBOT_CONFIG = {
  POSITION: {
    BOTTOM: '20px',
    RIGHT: '20px',
  },
  MAX_MESSAGE_LENGTH: 1000,
  MAX_HISTORY_MESSAGES: 50,
};