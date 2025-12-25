import React, { useState, useEffect } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatbotWindow from './ChatbotWindow';
import styles from './Chatbot.module.css';

/**
 * Main Chatbot component that provides a floating AI chatbot interface
 * Appears as a fixed icon in the bottom-right corner of all pages
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Load chatbot state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('chatbotState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setIsOpen(state.isOpen || false);
        setIsMinimized(state.isMinimized || false);
      } catch (error) {
        console.warn('Failed to parse chatbot state from localStorage:', error);
      }
    }
  }, []);

  // Save chatbot state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      isOpen,
      isMinimized
    };
    try {
      localStorage.setItem('chatbotState', JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save chatbot state to localStorage:', error);
    }
  }, [isOpen, isMinimized]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false); // Always open in full view when opening from icon
    }
  };

  const minimizeChatbot = () => {
    setIsMinimized(true);
  };

  const restoreChatbot = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating chatbot icon - always visible */}
      {!isOpen && <ChatbotIcon onClick={toggleChatbot} />}

      {/* Chatbot window - appears when opened */}
      {isOpen && (
        <ChatbotWindow
          onClose={toggleChatbot}
          isMinimized={isMinimized}
          onMinimize={minimizeChatbot}
          onRestore={restoreChatbot}
        />
      )}
    </>
  );
};

export default Chatbot;