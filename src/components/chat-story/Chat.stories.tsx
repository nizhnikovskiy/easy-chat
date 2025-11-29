import '../../styles/index.css';
import type { Story } from '@ladle/react';
import { Chat } from './Chat';
import { ReflectionProvider } from './context/ReflectionContext';
import { AvatarImageProvider } from './context/AvatarImageContext';
import { MessageRole } from './types/types';
import { useRef } from 'react';

export const ChatStory: Story = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockMessages = [
    {
      content: "Hello! I'm Lumen. How are you feeling today?",
      role: MessageRole.ASSISTANT,
      isLoading: false,
      isTypingComplete: true,
    },
    {
      content: "I'm feeling a bit stressed about my upcoming exams.",
      role: MessageRole.USER,
      isLoading: false,
      isTypingComplete: true,
    },
    {
      content: 'I understand. Exams can be very stressful. What specifically is worrying you?',
      role: MessageRole.ASSISTANT,
      isLoading: false,
      isTypingComplete: true,
    },
  ];

  return (
    <ReflectionProvider>
      <AvatarImageProvider>
        <div className='h-screen w-full'>
          <Chat
            messages={mockMessages}
            isPending={false}
            onSendMessage={(msg) => console.log('Send message:', msg)}
            messagesEndRef={messagesEndRef}
            pushMessage={(msg) => console.log('Push message:', msg)}
          />
        </div>
      </AvatarImageProvider>
    </ReflectionProvider>
  );
};
