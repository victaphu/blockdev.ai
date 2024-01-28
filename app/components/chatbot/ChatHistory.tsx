// ChatHistory.js
import React, { useEffect, useRef } from 'react';
import { Card } from '../box';
import { InstructionType } from '@/app/lib/model/Instruction';

export type ChatHistoryType = {
  isBot: boolean;
  message: string;
  instruction?: InstructionType,
  arguments?: { [key: string]: string }
}

type ChatHistoryProps = {
  chatHistory: ChatHistoryType[]
}

function getPfp(isBot: boolean): string {
  if (isBot) {
    return ('/avatar/pfp-miyu.png');
  }
  else {
    const avatar = localStorage.getItem('pfp');

    if (avatar !== null) {
      return avatar;
    }
    const gender = Math.random() > 0 ? 'protagonist' : 'female-protagonist';
    const index = Math.floor(Math.random() * 4) + 1;

    localStorage.setItem('pfp', `/avatar/${gender + index + '.png'}`)

    return (`/avatar/${gender + index + '.png'}`)
  }
}

/*
  className?: string
  animated?: AnimatedProp
  src: string
  srcAlt: string
  title: ReactNode
  children: ReactNode
  isUser?: boolean*/

const ChatHistory = ({ chatHistory }: ChatHistoryProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToElement();
  }, [chatHistory, ref]);

  return (<>
    {chatHistory.map((chat, index) => (
      // <div key={index} className={`chat-message ${chat.isBot ? 'bot' : 'user'}`}>
      //   {chat.message}
      // </div>
      <Card src={getPfp(chat.isBot)} srcAlt='avatar' title={chat.isBot ? 'Miyou' : 'User'} isUser={!chat.isBot} key={index} notice={!chat.isBot} instruction={chat.instruction} chat={chat}>
        {chat.message}
      </Card>
    ))}
    <div ref={ref}></div>
  </>
  );
};

export default ChatHistory;
