import axios from 'axios';
import { getApiUrl } from '../utils/config';

// API service for chatbot communication with backend AI service
const apiService = {
  // Function to send user query to backend AI service
  async askQuestion(question) {
    try {
      // Get the API URL from Docusaurus config
      const apiUrl = getApiUrl();

      const response = await axios.post(`${apiUrl}/ask`, {
        query: question
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });

      // Validate response structure
      if (!response.data) {
        throw new Error('Invalid response from AI service: No data received');
      }

      return response.data;
    } catch (error) {
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout: The AI service is taking too long to respond. Please try again.');
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.detail || error.response.data?.message || 'Unknown error';

        if (status >= 500) {
          throw new Error(`Server error: The AI service is temporarily unavailable (${status}). Please try again later.`);
        } else if (status >= 400) {
          throw new Error(`Request error: ${status} - ${message}`);
        } else {
          throw new Error(`Service error: ${status} - ${message}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error: Unable to connect to the AI service. Please check your internet connection.');
      } else {
        // Other errors
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  }
};

export default apiService;