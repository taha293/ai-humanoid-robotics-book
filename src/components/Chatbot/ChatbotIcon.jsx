import React from 'react';
import styles from './Chatbot.module.css';

/**
 * ChatbotIcon component - displays the floating chatbot icon
 */
const ChatbotIcon = ({ onClick }) => {
  return (
    <button
      className={styles.chatbotIcon}
      onClick={onClick}
      aria-label="Open AI Chatbot"
      title="AI Assistant"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.chatbotIconSvg}
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.02 16.32L2 22L7.68 20.98C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C8.69 20 6 17.31 6 14C6 10.69 8.69 8 12 8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20ZM13 9L10 12L13 15V9Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default ChatbotIcon;