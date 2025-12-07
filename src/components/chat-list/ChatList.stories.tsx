import { useState, useRef } from 'react';
import type { Story } from '@ladle/react';
import { ChatList } from './index';
import Chat from '@/components/chat/Chat';
import type { ChatListItemData } from '@/types/chat-list';
import type { ChatHistoryMessage } from '@/types/chat';
import { MessageRole } from '@/types/chat';
import avatar1 from '@/assets/images/avatars/avatar-1.webp';
import avatar2 from '@/assets/images/avatars/avatar-2.webp';
import avatar3 from '@/assets/images/avatars/avatar-3.webp';
import chatBgImage from '@/assets/images/chat/chat-bg.webp';

const bgStyle = {
  backgroundImage: `url("${chatBgImage}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'cover',
};

// Sample chat data
const sampleChats: ChatListItemData[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: avatar1,
    lastMessage: 'See you tomorrow!',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: avatar2,
    lastMessage: 'Thanks for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Carol White',
    avatar: avatar3,
    lastMessage: 'Can we schedule a meeting?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
    unreadCount: 1,
    isOnline: true,
  },
];

// Sample messages for chat window (for Examples)
const sampleMessages: Record<string, ChatHistoryMessage[]> = {
  '1': [
    {
      content: 'Hi Alice! How are you?',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "I'm great! Thanks for asking. How about you?",
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Doing well! Are we still on for tomorrow?',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'See you tomorrow!',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ],
  '2': [
    {
      content: 'Hey Bob, I sent you the documentation.',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Thanks for your help!',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ],
  '3': [
    {
      content: 'Hi Carol!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Can we schedule a meeting?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ],
};

// Default - basic chat list
export const Default: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList items={sampleChats} />
    </div>
  );
};

Default.storyName = 'Default';

export const DefaultDark: Story = () => {
  return (
    <div className='h-screen w-full bg-gray-900'>
      <ChatList items={sampleChats} theme='dark' />
    </div>
  );
};

DefaultDark.storyName = 'Default - Dark';

// With unread messages - demonstrate ONLY unread counts
export const WithUnreadMessages: Story = () => {
  const chatsWithUnread: ChatListItemData[] = [
    { ...sampleChats[0], unreadCount: 5 },
    { ...sampleChats[1], unreadCount: 12 },
    { ...sampleChats[2], unreadCount: 100 },
  ];

  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList items={chatsWithUnread} />
    </div>
  );
};

WithUnreadMessages.storyName = 'With Unread Messages';

export const WithUnreadMessagesDark: Story = () => {
  const chatsWithUnread: ChatListItemData[] = [
    { ...sampleChats[0], unreadCount: 5 },
    { ...sampleChats[1], unreadCount: 12 },
    { ...sampleChats[2], unreadCount: 100 },
  ];

  return (
    <div className='h-screen w-full bg-gray-900'>
      <ChatList items={chatsWithUnread} theme='dark' />
    </div>
  );
};

WithUnreadMessagesDark.storyName = 'With Unread Messages - Dark';

// With active chat - demonstrate ONLY activeChatId
export const WithActiveChat: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('2');

  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList items={sampleChats} activeChatId={activeChatId} onChatSelect={setActiveChatId} />
    </div>
  );
};

WithActiveChat.storyName = 'With Active Chat';

export const WithActiveChatDark: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('2');

  return (
    <div className='h-screen w-full bg-gray-900'>
      <ChatList items={sampleChats} activeChatId={activeChatId} onChatSelect={setActiveChatId} theme='dark' />
    </div>
  );
};

WithActiveChatDark.storyName = 'With Active Chat - Dark';

// Position left - demonstrate ONLY position='left'
export const LeftPosition: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList items={sampleChats} position='left' />
    </div>
  );
};

LeftPosition.storyName = 'Position - Left';

export const LeftPositionDark: Story = () => {
  return (
    <div className='h-screen w-full bg-gray-900'>
      <ChatList items={sampleChats} position='left' theme='dark' />
    </div>
  );
};

LeftPositionDark.storyName = 'Position - Left - Dark';

// Position right - demonstrate ONLY position='right'
export const RightPosition: Story = () => {
  return (
    <div style={{ ...bgStyle, display: 'flex', justifyContent: 'flex-end' }} className='h-screen w-full'>
      <ChatList items={sampleChats} position='right' />
    </div>
  );
};

RightPosition.storyName = 'Position - Right';

export const RightPositionDark: Story = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }} className='h-screen w-full bg-gray-900'>
      <ChatList items={sampleChats} position='right' theme='dark' />
    </div>
  );
};

RightPositionDark.storyName = 'Position - Right - Dark';

// Empty chat list - demonstrate ONLY empty state
export const EmptyChatList: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList items={[]} />
    </div>
  );
};

EmptyChatList.storyName = 'Empty Chat List';

export const EmptyChatListDark: Story = () => {
  return (
    <div className='h-screen w-full bg-gray-900'>
      <ChatList items={[]} theme='dark' />
    </div>
  );
};

EmptyChatListDark.storyName = 'Empty Chat List - Dark';

// LLM-style chats - demonstrate ONLY showAvatar=false
export const LLMStyleChats: Story = () => {
  const llmChats: ChatListItemData[] = [
    {
      id: 'llm-1',
      name: 'ChatGPT 4',
      lastMessage: 'How can I assist you with your project today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 0,
      showAvatar: false,
    },
    {
      id: 'llm-2',
      name: 'Claude 3 Opus',
      lastMessage: 'I analyzed the code you shared...',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      showAvatar: false,
    },
    {
      id: 'llm-3',
      name: 'Gemini Pro',
      lastMessage: 'Let me help you with that algorithm.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      showAvatar: false,
    },
  ];

  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList items={llmChats} />
    </div>
  );
};

LLMStyleChats.storyName = 'LLM-Style Chats (No Avatars)';

export const LLMStyleChatsDark: Story = () => {
  const llmChats: ChatListItemData[] = [
    {
      id: 'llm-1',
      name: 'ChatGPT 4',
      lastMessage: 'How can I assist you with your project today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 0,
      showAvatar: false,
    },
    {
      id: 'llm-2',
      name: 'Claude 3 Opus',
      lastMessage: 'I analyzed the code you shared...',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      showAvatar: false,
    },
    {
      id: 'llm-3',
      name: 'Gemini Pro',
      lastMessage: 'Let me help you with that algorithm.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      showAvatar: false,
    },
  ];

  return (
    <div className='h-screen w-full bg-gray-900'>
      <ChatList items={llmChats} theme='dark' />
    </div>
  );
};

LLMStyleChatsDark.storyName = 'LLM-Style Chats (No Avatars) - Dark';

// ===== REALISTIC USE CASES (can have multiple components and options) =====

// Combined with chat (left position) - realistic example
export const CombinedWithChatLeftExample: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [messages, setMessages] = useState<ChatHistoryMessage[]>(sampleMessages[activeChatId] || []);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setMessages(sampleMessages[chatId] || []);
  };

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: MessageRole.ASSISTANT,
        isTypingComplete: true,
        isLoading: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsPending(false);
    }, 1000);
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      {/* Chat List on Left */}
      <div className='pl-40'>
        <ChatList items={sampleChats} position='left' activeChatId={activeChatId} onChatSelect={handleChatSelect} />
      </div>

      {/* Chat Window on Right */}
      <div style={{ flex: 1 }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} containerClassName='px-40' />
      </div>
    </div>
  );
};

CombinedWithChatLeftExample.storyName = 'Example - Combined with Chat (Left)';

// Combined with chat (right position) - realistic example
export const CombinedWithChatRightExample: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [messages, setMessages] = useState<ChatHistoryMessage[]>(sampleMessages[activeChatId] || []);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setMessages(sampleMessages[chatId] || []);
  };

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: MessageRole.ASSISTANT,
        isTypingComplete: true,
        isLoading: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsPending(false);
    }, 1000);
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      {/* Chat Window on Left */}
      <div style={{ flex: 1 }} className='px-4'>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} containerClassName='px-40' />
      </div>

      {/* Chat List on Right */}
      <div className='pr-40'>
        <ChatList items={sampleChats} position='right' activeChatId={activeChatId} onChatSelect={handleChatSelect} />
      </div>
    </div>
  );
};

CombinedWithChatRightExample.storyName = 'Example - Combined with Chat (Right)';

// Custom styling - realistic example with all styling options
export const CustomStylingExample: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('2');

  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatList
        items={sampleChats}
        activeChatId={activeChatId}
        onChatSelect={setActiveChatId}
        width='400px'
        backgroundColor='#2c2c2c'
        activeBackgroundColor='#3a3a3a'
        textColor='#ffffff'
        timestampColor='#9ca3af'
        unreadBadgeColor='#ef4444'
      />
    </div>
  );
};

CustomStylingExample.storyName = 'Example - Custom Styling';

// ===== DARK THEME STORIES =====

export const DarkThemeDefault: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full bg-gray-900'>
      <ChatList items={sampleChats} theme='dark' />
    </div>
  );
};

DarkThemeDefault.storyName = 'Dark Theme - Default';

export const DarkThemeCombinedWithChat: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [messages, setMessages] = useState<ChatHistoryMessage[]>(sampleMessages[activeChatId] || []);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setMessages(sampleMessages[chatId] || []);
  };

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: MessageRole.ASSISTANT,
        isTypingComplete: true,
        isLoading: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsPending(false);
    }, 1000);
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      {/* Chat List on Left */}
      <div className='pl-40'>
        <ChatList items={sampleChats} position='left' activeChatId={activeChatId} onChatSelect={handleChatSelect} theme='dark' />
      </div>

      {/* Chat Window on Right */}
      <div style={{ flex: 1 }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} containerClassName='px-40' theme='dark' />
      </div>
    </div>
  );
};

DarkThemeCombinedWithChat.storyName = 'Dark Theme - Combined with Chat';

export const ThemeComparison: Story = () => {
  const [activeChatId, setActiveChatId] = useState<string>('1');

  return (
    <div className='grid grid-cols-2 h-screen'>
      <div>
        <div className='text-center font-bold py-2 bg-white border-b'>Light Theme</div>
        <div className='h-[calc(100vh-40px)]'>
          <ChatList items={sampleChats} activeChatId={activeChatId} onChatSelect={setActiveChatId} theme='light' height='100%' />
        </div>
      </div>
      <div>
        <div className='text-center font-bold py-2 bg-gray-800 text-white border-b border-gray-700'>Dark Theme</div>
        <div className='h-[calc(100vh-40px)] bg-gray-900'>
          <ChatList items={sampleChats} activeChatId={activeChatId} onChatSelect={setActiveChatId} theme='dark' height='100%' />
        </div>
      </div>
    </div>
  );
};

ThemeComparison.storyName = 'Theme Comparison';
