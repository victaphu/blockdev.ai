// Chatbot.js

import React, { useState } from 'react';
import ChatHistory, { ChatHistoryType } from './ChatHistory';
import "./chat.css";
import { Animated } from '@arwes/react';
import { ThemeProvider, createTheme } from '@mui/material';
import ChatComponent from './ChatComponent';
const Chatbot = () => {
  // State for user input and chat history
  const [chatHistory, setChatHistory] = useState<ChatHistoryType[]>([]);

  return (
    <Animated className="chatbot">
      <ThemeProvider theme={createTheme()}>
        <div className="chat-history">
          <ChatHistory chatHistory={chatHistory} />
        </div>
      </ThemeProvider>
      <ChatComponent setChatHistory={setChatHistory} chatHistory={chatHistory}/>
    </Animated>
  );
};

export default Chatbot;
