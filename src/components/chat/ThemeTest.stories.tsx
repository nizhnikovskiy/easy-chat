import type { StoryDefault } from '@ladle/react';
import { useState, useRef } from 'react';
import Chat from './Chat';
import { MessageRole, type ChatHistoryItem } from '@/types/chat';

export default {
  title: 'Components / Theme Test',
} satisfies StoryDefault;

const mockMessages: ChatHistoryItem[] = [
  {
    role: MessageRole.USER,
    content: 'Hello! Testing user message colors.',
    isTypingComplete: true,
    isLoading: false,
  },
  {
    role: MessageRole.ASSISTANT,
    content: 'Hi! Testing assistant message colors.',
    isTypingComplete: true,
    isLoading: false,
  },
  {
    role: MessageRole.USER,
    content: 'This message should have custom colors if CSS variables are working.',
    isTypingComplete: true,
    isLoading: false,
  },
  {
    role: MessageRole.ASSISTANT,
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
      style={{
        height: '600px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        // Override CSS variables for purple theme
        ['--chat-message-user-bg' as any]: '#8b5cf6',
        ['--chat-message-user-bg-dark' as any]: '#7c3aed',
        ['--chat-button-primary-bg' as any]: '#8b5cf6',
        ['--chat-button-primary-bg-hover' as any]: '#7c3aed',
      }}
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
      style={{
        height: '600px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        // Override CSS variables for green theme (WhatsApp-like)
        ['--chat-message-user-bg' as any]: '#25d366',
        ['--chat-message-user-bg-dark' as any]: '#128c7e',
        ['--chat-button-primary-bg' as any]: '#25d366',
        ['--chat-button-primary-bg-hover' as any]: '#20bd5c',
      }}
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
      style={{
        height: '600px',
        border: '1px solid #374151',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#1f2937',
        // Override CSS variables for purple dark theme
        ['--chat-message-user-bg-dark' as any]: '#7c3aed',
        ['--chat-message-other-bg-dark' as any]: '#4c1d95',
        ['--chat-button-primary-bg' as any]: '#7c3aed',
        ['--chat-button-primary-bg-hover' as any]: '#6d28d9',
      }}
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
      style={{
        height: '600px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        // Override CSS variables for monochrome theme
        ['--chat-message-user-bg' as any]: '#000000',
        ['--chat-message-user-text' as any]: '#ffffff',
        ['--chat-message-other-bg' as any]: '#f5f5f5',
        ['--chat-message-other-text' as any]: '#000000',
        ['--chat-button-primary-bg' as any]: '#000000',
        ['--chat-button-primary-bg-hover' as any]: '#333333',
      }}
    >
      <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>Monochrome Theme</h3>
      <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} theme='light' />
    </div>
  );
};
