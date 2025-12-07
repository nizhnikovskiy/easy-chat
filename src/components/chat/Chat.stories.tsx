import { useRef, useState, useEffect } from 'react';
import type { Story } from '@ladle/react';
import Chat from './Chat';
import ChatInput from '@/components/chat-input';
import ChatSkeleton from '@/components/chat-skeleton';
import { ChatHistoryMessage, MessageRole } from '@/types/chat';
import { MdBookmark, MdShare } from 'react-icons/md';
import { ContextMenuItem } from '@/types/context-menu';
import chatBgImage from '@/assets/images/chat/chat-bg.webp';
import chatBgAltImage from '@/assets/images/chat/chat-bg-alt.webp';

// Mock ReflectionContext provider for the story
const MockReflectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// ===== ALL CHAT STORIES ARE EXAMPLES (contain full functionality) =====

export const DefaultExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! Tell me about your capabilities.',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'I can help you with various questions, answer inquiries, and provide information. How can I be useful?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    // Add user message
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    // Simulate bot response without typing effect
    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `You said: "${message}". This is a test bot response.`,
        role: MessageRole.ASSISTANT,
        isTypingComplete: true, // No typing effect in default story
        isLoading: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsPending(false);
    }, 1000);
  };

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} />
      </div>
    </MockReflectionProvider>
  );
};

DefaultExample.storyName = 'Example - Default Chat';

export const WithPendingMessageExample: Story = () => {
  const [messages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={true} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} />
      </div>
    </MockReflectionProvider>
  );
};

WithPendingMessageExample.storyName = 'Example - With Pending Message';

export const CompletedHistoryExample: Story = () => {
  const [messages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello! How are you doing?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'All good, thank you!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={true} />
      </div>
    </MockReflectionProvider>
  );
};

CompletedHistoryExample.storyName = 'Example - Completed History';

export const EmptyChatExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} />
      </div>
    </MockReflectionProvider>
  );
};

EmptyChatExample.storyName = 'Example - Empty Chat';

export const WithTypingEffectExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! Show me the typing effect.',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add typing message after component mounts to trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const typingMessage: ChatHistoryMessage = {
        content:
          'Hello! Nice to see you! This is a demonstration of the message typing effect. Notice how the text appears character by character, creating a live conversation effect. This makes the interface more dynamic and pleasant for the user.',
        role: MessageRole.ASSISTANT,
        isTypingComplete: false, // This triggers the typing animation
        isLoading: false,
      };
      setMessages((prev) => [...prev, typingMessage]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} />
      </div>
    </MockReflectionProvider>
  );
};

WithTypingEffectExample.storyName = 'Example - With Typing Effect';

export const WithDateSeparatorsExample: Story = () => {
  const [messages] = useState([
    {
      type: 'date' as const,
      date: 'December 1, 2025',
    },
    {
      content: 'Hi! How are things?',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello! All good, thank you! How about you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "Great too! What's new?",
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      type: 'date' as const,
      date: 'December 2, 2025',
    },
    {
      content: 'Good morning!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Good morning! How did you sleep?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Excellent! Thank you for asking.',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      type: 'date' as const,
      date: 'Today',
    },
    {
      content: 'Hello! Ready for a new day?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "Yes, of course! Let's get started.",
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} />
      </div>
    </MockReflectionProvider>
  );
};

WithDateSeparatorsExample.storyName = 'Example - With Date Separators';

export const WithNewMessageAnimationExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: "Hello! Now you'll see the animation of adding new messages.",
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample messages to add with animation
  const messagesToAdd = [
    { content: 'This is cool!', role: MessageRole.USER },
    { content: 'Yes, messages smoothly appear with animation!', role: MessageRole.ASSISTANT },
    { content: 'I love the effect!', role: MessageRole.USER },
    { content: 'Wonderful! Animation makes the interface more alive.', role: MessageRole.ASSISTANT },
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < messagesToAdd.length) {
        const newMessage: ChatHistoryMessage = {
          content: messagesToAdd[messageIndex].content,
          role: messagesToAdd[messageIndex].role as MessageRole,
          isTypingComplete: true,
          isLoading: false,
        };
        setMessages((prev) => [...prev, newMessage]);
        messageIndex++;

        // Auto-scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} />
      </div>
    </MockReflectionProvider>
  );
};

WithNewMessageAnimationExample.storyName = 'Example - With New Message Animation';

export const WithCustomBackgroundExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How do you like this custom background?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! Looks great!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Glad you like it. Custom background makes the chat unique and pleasant.',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} backgroundImage={chatBgAltImage} />
      </div>
    </MockReflectionProvider>
  );
};

WithCustomBackgroundExample.storyName = 'Example - With Custom Background';

export const LoadingSkeletonExample: Story = () => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bgStyle = {
    backgroundImage: `url("${chatBgImage}")`,
    backgroundRepeat: 'repeat',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  };

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <div className='h-full w-full overflow-hidden'>
          <div className='h-[calc(100vh-5rem)] flex flex-col' style={bgStyle}>
            {/* Messages area with skeleton */}
            <div className='flex-1 overflow-y-auto overflow-x-hidden w-full max-w-250 p-4 mx-auto'>
              <div style={{ paddingBottom: '1rem' }}>
                <ChatSkeleton messageCount={6} showInput={false} />
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Real ChatInput */}
            <div className='w-full'>
              <ChatInput
                value={message}
                onChange={(value) => setMessage(value)}
                onSend={() => {}}
                disabled={false}
                isLoading={false}
                enableMediaUpload={true}
                mediaButton={{
                  accept: 'image/*',
                  onUpload: () => {},
                }}
                placeholder='Enter message...'
                autoGrow={true}
                maxRows={10}
                className='bg-transparent'
              />
            </div>
          </div>
        </div>
      </div>
    </MockReflectionProvider>
  );
};

LoadingSkeletonExample.storyName = 'Example - Loading Skeleton';

// Context Menu Examples

export const WithContextMenuEnabledExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! Try right-clicking on messages to see the context menu.',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Wow, this is amazing!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'You can copy, edit, or delete messages using the context menu.',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Let me try this feature!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleEditMessage = (messageId: string, newContent: string) => {
    console.log('Edit message', messageId, newContent);
    alert(`Message ${messageId} edited to: "${newContent}"`);
  };

  const handleDeleteMessage = (messageId: string) => {
    console.log('Delete message', messageId);
    alert(`Message ${messageId} deleted`);
  };

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat
          messages={messages}
          isPending={isPending}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isHistoryCompleted={false}
          contextMenuConfig={{ enabled: true }}
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
    </MockReflectionProvider>
  );
};

WithContextMenuEnabledExample.storyName = 'Example - With Context Menu';

export const WithCustomContextMenuItemsExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! Right-click to see custom context menu items.',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'These menu items are customizable!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Custom context menu items appended to default ones
  const customContextMenuItems: ContextMenuItem[] = [
    {
      id: 'bookmark',
      label: 'Bookmark',
      icon: <MdBookmark size={16} />,
      onClick: (messageId) => {
        alert(`Bookmarked message ${messageId}`);
      },
    },
    {
      id: 'share',
      label: 'Share',
      icon: <MdShare size={16} />,
      onClick: (messageId) => {
        alert(`Share message ${messageId}`);
      },
    },
  ];

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat
          messages={messages}
          isPending={isPending}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isHistoryCompleted={false}
          contextMenuConfig={{
            enabled: true,
            customItems: customContextMenuItems,
          }}
          onEditMessage={(id, content) => alert(`Edit ${id}: ${content}`)}
          onDeleteMessage={(id) => alert(`Delete ${id}`)}
        />
      </div>
    </MockReflectionProvider>
  );
};

WithCustomContextMenuItemsExample.storyName = 'Example - With Custom Context Menu Items';

export const WithContextMenuDisabledExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Context menu is disabled in this story. Try right-clicking on messages.',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Nothing happens when I right-click!',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} contextMenuConfig={{ enabled: false }} />
      </div>
    </MockReflectionProvider>
  );
};

WithContextMenuDisabledExample.storyName = 'Example - With Context Menu Disabled';

// ===== DARK THEME EXAMPLES =====

export const DarkThemeDefaultExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! Tell me about your capabilities.',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'I can help you with various questions, answer inquiries, and provide information. How can I be useful?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        content: `You said: "${message}". This is a test bot response in dark theme.`,
        role: MessageRole.ASSISTANT,
        isTypingComplete: true,
        isLoading: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsPending(false);
    }, 1000);
  };

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} theme='dark' />
      </div>
    </MockReflectionProvider>
  );
};

DarkThemeDefaultExample.storyName = 'Dark Theme - Default Chat';

export const DarkThemeWithDateSeparatorsExample: Story = () => {
  const [messages] = useState([
    {
      type: 'date' as const,
      date: 'December 1, 2025',
    },
    {
      content: 'Hi! How are things?',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello! All good, thank you! How about you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      type: 'date' as const,
      date: 'Today',
    },
    {
      content: 'Hello! Ready for a new day?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "Yes, of course! Let's get started.",
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} theme='dark' />
      </div>
    </MockReflectionProvider>
  );
};

DarkThemeWithDateSeparatorsExample.storyName = 'Dark Theme - With Date Separators';

export const ThemeComparisonExample: Story = () => {
  const [messages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! This is a comparison of light and dark themes.',
      role: MessageRole.USER,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Great! You can see the difference side by side.',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef1 = useRef<HTMLDivElement>(null);
  const messagesEndRef2 = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div className='grid grid-cols-2 h-screen'>
        <div>
          <div className='text-center font-bold py-2 bg-white border-b'>Light Theme</div>
          <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef1} isHistoryCompleted={false} theme='light' />
        </div>
        <div>
          <div className='text-center font-bold py-2 bg-gray-800 text-white border-b border-gray-700'>Dark Theme</div>
          <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef2} isHistoryCompleted={false} theme='dark' />
        </div>
      </div>
    </MockReflectionProvider>
  );
};

ThemeComparisonExample.storyName = 'Theme Comparison';
