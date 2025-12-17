import type { StoryDefault } from '@ladle/react';
import { useState, useRef, CSSProperties } from 'react';
import Chat from './Chat';
import type { ChatHistoryItem } from '@/types/chat';

export default {
  title: 'Components / Theme Test',
} satisfies StoryDefault;

const mockMessages: ChatHistoryItem[] = [
  {
    role: 'user',
    content: 'Hello! Testing user message colors.',
    isTypingComplete: true,
    isLoading: false,
  },
  {
    role: 'assistant',
    content: 'Hi! Testing assistant message colors.',
    isTypingComplete: true,
    isLoading: false,
  },
  {
    role: 'user',
    content: 'This message should have custom colors if CSS variables are working.',
    isTypingComplete: true,
    isLoading: false,
  },
  {
    role: 'assistant',
    content: 'Yes, and this one too! The theme system uses CSS variables for complete customization.',
    isTypingComplete: true,
    isLoading: false,
  },
];

export const DefaultTheme = () => {
  const [messages] = useState<ChatHistoryItem[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ height: '600px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>Default Theme (Blue)</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='light' />
    </div>
  );
};

export const PurpleTheme = () => {
  const [messages] = useState<ChatHistoryItem[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={
        {
          height: '600px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          // Override CSS variables for purple theme
          '--chat-message-user-bg': '#8b5cf6',
          '--chat-message-user-bg-dark': '#7c3aed',
          '--chat-button-primary-bg': '#8b5cf6',
          '--chat-button-primary-bg-hover': '#7c3aed',
        } as CSSProperties
      }
    >
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>Purple Theme (CSS Variables Override)</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='light' />
    </div>
  );
};

export const GreenTheme = () => {
  const [messages] = useState<ChatHistoryItem[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={
        {
          height: '600px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          // Override CSS variables for green theme (WhatsApp-like)
          '--chat-message-user-bg': '#25d366',
          '--chat-message-user-bg-dark': '#128c7e',
          '--chat-button-primary-bg': '#25d366',
          '--chat-button-primary-bg-hover': '#20bd5c',
        } as CSSProperties
      }
    >
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>Green Theme - WhatsApp Style</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='light' />
    </div>
  );
};

export const DarkTheme = () => {
  const [messages] = useState<ChatHistoryItem[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        height: '600px',
        border: '1px solid #374151',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#1f2937',
      }}
    >
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #374151', background: '#111827', color: '#fff' }}>Dark Theme (Default Colors)</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='dark' />
    </div>
  );
};

export const DarkThemePurple = () => {
  const [messages] = useState<ChatHistoryItem[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={
        {
          height: '600px',
          border: '1px solid #374151',
          borderRadius: '8px',
          overflow: 'hidden',
          background: '#1f2937',
          // Override CSS variables for purple dark theme
          '--chat-message-user-bg-dark': '#7c3aed',
          '--chat-message-other-bg-dark': '#4c1d95',
          '--chat-button-primary-bg': '#7c3aed',
          '--chat-button-primary-bg-hover': '#6d28d9',
        } as CSSProperties
      }
    >
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #374151', background: '#111827', color: '#fff' }}>Dark Theme - Purple Custom</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='dark' />
    </div>
  );
};

export const MonochromeTheme = () => {
  const [messages] = useState<ChatHistoryItem[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={
        {
          height: '600px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          // Override CSS variables for monochrome theme
          '--chat-message-user-bg': '#000000',
          '--chat-message-user-text': '#ffffff',
          '--chat-message-other-bg': '#f5f5f5',
          '--chat-message-other-text': '#000000',
          '--chat-button-primary-bg': '#000000',
          '--chat-button-primary-bg-hover': '#333333',
        } as CSSProperties
      }
    >
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>Monochrome Theme</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='light' />
    </div>
  );
};
