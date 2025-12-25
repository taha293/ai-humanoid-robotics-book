import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Chatbot from '../components/Chatbot/Chatbot';

// Root component that wraps the entire Docusaurus application
// This is the proper way to add global UI elements like the chatbot
export default function Root({ children }) {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => <Chatbot />}
      </BrowserOnly>
    </>
  );
}