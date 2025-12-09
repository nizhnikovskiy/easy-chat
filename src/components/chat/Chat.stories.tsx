import { useRef, useState, useEffect } from 'react';
import type { Story } from '@ladle/react';
import Chat from './Chat';
import ChatInput from '@/components/chat-input';
import ChatSkeleton from '@/components/chat-skeleton';
import { ChatHistoryMessage } from '@/types/chat';
import { MdBookmark, MdShare, MdContentCopy, MdEdit, MdDelete, MdCheck, MdDoneAll } from 'react-icons/md';
import { IoArrowUp, IoMic, IoAttach, IoClose } from 'react-icons/io5';
import { ContextMenuItem } from '@/types/context-menu';
import chatBgImage from '@/assets/images/chat/chat-bg.webp';
import chatBgAltImage from '@/assets/images/chat/chat-bg-alt.webp';

// Mock ReflectionContext provider for the story
const MockReflectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// Common icon props for Chat component
const chatIconProps = {
  sendIcon: <IoArrowUp />,
  attachmentIcon: <IoAttach />,
  microphoneIcon: <IoMic />,
  closeIcon: <IoClose />,
  copyIcon: <MdContentCopy size={16} />,
  editIcon: <MdEdit size={16} />,
  deleteIcon: <MdDelete size={16} />,
  sentIcon: <MdCheck />,
  readIcon: <MdDoneAll />,
};

// ===== ALL CHAT STORIES ARE EXAMPLES (contain full functionality) =====

export const DefaultExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! Tell me about your capabilities.',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'I can help you with various questions, answer inquiries, and provide information. How can I be useful?',
      role: 'assistant',
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
      role: 'user',
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
        role: 'assistant',
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
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} {...chatIconProps} />
      </div>
    </MockReflectionProvider>
  );
};

DefaultExample.storyName = 'Example - Default Chat';

export const WithPendingMessageExample: Story = () => {
  const [messages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={true} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} {...chatIconProps} />
      </div>
    </MockReflectionProvider>
  );
};

WithPendingMessageExample.storyName = 'Example - With Pending Message';

export const CompletedHistoryExample: Story = () => {
  const [messages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello! How are you doing?',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'All good, thank you!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={true} {...chatIconProps} />
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
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: 'assistant',
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
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} {...chatIconProps} />
      </div>
    </MockReflectionProvider>
  );
};

EmptyChatExample.storyName = 'Example - Empty Chat';

export const WithTypingEffectExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! Show me the typing effect.',
      role: 'user',
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
        role: 'assistant',
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
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} {...chatIconProps} />
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
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello! All good, thank you! How about you?',
      role: 'assistant' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "Great too! What's new?",
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      type: 'date' as const,
      date: 'December 2, 2025',
    },
    {
      content: 'Good morning!',
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Good morning! How did you sleep?',
      role: 'assistant' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Excellent! Thank you for asking.',
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      type: 'date' as const,
      date: 'Today',
    },
    {
      content: 'Hello! Ready for a new day?',
      role: 'assistant' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "Yes, of course! Let's get started.",
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} {...chatIconProps} />
      </div>
    </MockReflectionProvider>
  );
};

WithDateSeparatorsExample.storyName = 'Example - With Date Separators';

export const WithNewMessageAnimationExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: "Hello! Now you'll see the animation of adding new messages.",
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample messages to add with animation
  const messagesToAdd = [
    { content: 'This is cool!', role: 'user' },
    { content: 'Yes, messages smoothly appear with animation!', role: 'assistant' },
    { content: 'I love the effect!', role: 'user' },
    { content: 'Wonderful! Animation makes the interface more alive.', role: 'assistant' },
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < messagesToAdd.length) {
        const newMessage: ChatHistoryMessage = {
          content: messagesToAdd[messageIndex].content,
          role: messagesToAdd[messageIndex].role as 'user' | 'assistant',
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
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} {...chatIconProps} />
      </div>
    </MockReflectionProvider>
  );
};

WithNewMessageAnimationExample.storyName = 'Example - With New Message Animation';

export const WithCustomBackgroundExample: Story = () => {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How do you like this custom background?',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! Looks great!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Glad you like it. Custom background makes the chat unique and pleasant.',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: 'assistant',
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
        <Chat
          messages={messages}
          isPending={isPending}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isHistoryCompleted={false}
          backgroundImage={chatBgAltImage}
          {...chatIconProps}
        />
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
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Wow, this is amazing!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'You can copy, edit, or delete messages using the context menu.',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Let me try this feature!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: 'assistant',
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
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'These menu items are customizable!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: 'assistant',
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
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Nothing happens when I right-click!',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `Response to: "${message}"`,
        role: 'assistant',
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
        <Chat
          messages={messages}
          isPending={isPending}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isHistoryCompleted={false}
          contextMenuConfig={{ enabled: false }}
          {...chatIconProps}
        />
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
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! Tell me about your capabilities.',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'I can help you with various questions, answer inquiries, and provide information. How can I be useful?',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    const userMessage: ChatHistoryMessage = {
      content: message,
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
      image: image ? URL.createObjectURL(image) : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsPending(true);

    setTimeout(() => {
      const botMessage: ChatHistoryMessage = {
        content: `You said: "${message}". This is a test bot response in dark theme.`,
        role: 'assistant',
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
        <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} isHistoryCompleted={false} theme='dark' {...chatIconProps} />
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
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hello! All good, thank you! How about you?',
      role: 'assistant' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      type: 'date' as const,
      date: 'Today',
    },
    {
      content: 'Hello! Ready for a new day?',
      role: 'assistant' as const,
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: "Yes, of course! Let's get started.",
      role: 'user' as const,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <MockReflectionProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef} isHistoryCompleted={false} theme='dark' {...chatIconProps} />
      </div>
    </MockReflectionProvider>
  );
};

DarkThemeWithDateSeparatorsExample.storyName = 'Dark Theme - With Date Separators';

export const ThemeComparisonExample: Story = () => {
  const [messages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: 'assistant',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Hi! This is a comparison of light and dark themes.',
      role: 'user',
      isTypingComplete: true,
      isLoading: false,
    },
    {
      content: 'Great! You can see the difference side by side.',
      role: 'assistant',
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
          <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef1} isHistoryCompleted={false} theme='light' {...chatIconProps} />
        </div>
        <div>
          <div className='text-center font-bold py-2 bg-gray-800 text-white border-b border-gray-700'>Dark Theme</div>
          <Chat messages={messages} isPending={false} onSendMessage={() => {}} messagesEndRef={messagesEndRef2} isHistoryCompleted={false} theme='dark' {...chatIconProps} />
        </div>
      </div>
    </MockReflectionProvider>
  );
};

ThemeComparisonExample.storyName = 'Theme Comparison';
