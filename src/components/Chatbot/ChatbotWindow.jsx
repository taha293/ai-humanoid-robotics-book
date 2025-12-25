import React, { useState, useRef, useEffect } from 'react';
import apiService from '../../services/apiService';
import { CHATBOT_CONFIG } from '../../utils/constants';
import styles from './Chatbot.module.css';

/**
 * ChatbotWindow component - displays the chat interface
 */
const ChatbotWindow = ({ onClose, isMinimized, onMinimize, onRestore }) => {
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        return parsedMessages;
      } catch (error) {
        console.warn('Failed to parse chatbot messages from localStorage:', error);
      }
    }
    // Return default welcome message if no saved messages
    return [
      { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics book. How can I help you today?", sender: 'bot' }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    try {
      // Limit the number of messages stored to prevent localStorage overflow
      const messagesToSave = messages.slice(-CHATBOT_CONFIG.MAX_HISTORY_MESSAGES);
      localStorage.setItem('chatbotMessages', JSON.stringify(messagesToSave));
    } catch (error) {
      console.warn('Failed to save chatbot messages to localStorage:', error);
    }
  }, [messages]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    // Prevent duplicate requests by checking loading state first
    if (!inputValue.trim() || isLoading) return;

    // Validate message length
    if (inputValue.length > CHATBOT_CONFIG.MAX_MESSAGE_LENGTH) {
      setError(`Message too long. Maximum ${CHATBOT_CONFIG.MAX_MESSAGE_LENGTH} characters allowed.`);
      return;
    }

    // Additional input validation
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length === 0) {
      setError('Please enter a message before sending.');
      return;
    }

    // Set loading state to prevent duplicate requests
    setIsLoading(true);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: trimmedInput,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setError(null);

    try {
      // Call the backend API to get response
      const response = await apiService.askQuestion(trimmedInput);

      // Validate response
      if (!response || (!response.answer && !response.message)) {
        const botMessage = {
          id: Date.now() + 1,
          text: 'Sorry, I received your question but couldn\'t generate a proper response. Please try rephrasing your question.',
          sender: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Add bot response to chat
        const botMessage = {
          id: Date.now() + 1,
          text: response.answer || response.message || 'I received your question but there was an issue with the response.',
          sender: 'bot'
        };

        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: err.message || 'Sorry, I encountered an error processing your request.',
        sender: 'bot'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Only send if not already loading to prevent duplicate requests
      if (!isLoading) {
        handleSendMessage();
      }
    }
  };

  const handleMinimizeRestore = () => {
    if (isMinimized) {
      onRestore();
    } else {
      onMinimize();
    }
  };

  // Clear chat history function
  const clearChatHistory = () => {
    const welcomeMessage = {
      id: 1,
      text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics book. How can I help you today?",
      sender: 'bot'
    };
    setMessages([welcomeMessage]);
    try {
      localStorage.setItem('chatbotMessages', JSON.stringify([welcomeMessage]));
    } catch (error) {
      console.warn('Failed to clear chat history in localStorage:', error);
    }
  };

  if (isMinimized) {
    return (
      <div className={`${styles.chatbotWindow} ${styles.minimized}`}>
        <div className={styles.chatbotHeader}>
          <button
            className={styles.minimizeRestoreButton}
            onClick={handleMinimizeRestore}
            aria-label={isMinimized ? "Restore chat" : "Minimize chat"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H5V19H19V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5H19V11H5V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatbotWindow}>
      <div className={styles.chatbotHeader}>
        <div className={styles.chatbotTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.chatbotIcon}>
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.02 16.32L2 22L7.68 20.98C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C8.69 20 6 17.31 6 14C6 10.69 8.69 8 12 8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20ZM13 9L10 12L13 15V9Z"
              fill="currentColor"
            />
          </svg>
          <span>AI Assistant</span>
        </div>
        <div className={styles.chatbotControls}>
          <button
            className={styles.minimizeRestoreButton}
            onClick={handleMinimizeRestore}
            aria-label={isMinimized ? "Restore chat" : "Minimize chat"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 15H19V17H5V15ZM5 11H19V13H5V11ZM5 7H19V9H5V7Z" fill="currentColor"/>
            </svg>
          </button>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
      </div>

      <div className={styles.chatbotMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.sender]}`}
            role="listitem"
          >
            <div className={styles.messageContent}>
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.bot}`}>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      <div className={styles.chatbotInput}>
        <textarea
          value={inputValue}
          onChange={(e) => {
            // Auto-resize textarea based on content
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
            setInputValue(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Ask about Physical AI & Humanoid Robotics..."
          className={styles.inputField}
          rows="1"
          aria-label="Type your message"
          disabled={isLoading}
        />
        <button
          onClick={() => {
            // Only send if not already loading to prevent duplicate requests
            if (!isLoading) {
              handleSendMessage();
            }
          }}
          disabled={!inputValue.trim() || isLoading}
          className={`${styles.sendButton} ${!inputValue.trim() || isLoading ? styles.disabled : ''}`}
          aria-label="Send message"
        >
          {isLoading ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M16.25 7.75L19.0784 4.92157M4.92157 19.0784L7.75 16.25M7.75 7.75L4.92157 4.92157" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatbotWindow;