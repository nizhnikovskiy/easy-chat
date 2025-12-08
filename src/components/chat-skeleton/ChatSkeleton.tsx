import { FC } from 'react';
import Message from '@/components/message/Message';
import AssistantMessage from '@/components/message/AssistantMessage';

const ChatInputSkeleton: FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  return (
    <div className='w-full px-4 pb-4'>
      <div className='max-w-4xl mx-auto'>
        <div className={`relative ${theme === 'dark' ? 'bg-skeleton-bg-dark' : 'bg-skeleton-bg'} opacity-70 rounded-3xl px-4 py-3 animate-pulse`}>
          <div className='flex items-center gap-2'>
            {/* Attach button skeleton */}
            <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-skeleton-shimmer-dark' : 'bg-skeleton-shimmer'} opacity-50 rounded-full`} />

            {/* Input field skeleton */}
            <div className={`flex-1 h-6 ${theme === 'dark' ? 'bg-skeleton-shimmer-dark' : 'bg-skeleton-shimmer'} opacity-50 rounded`} />

            {/* Send button skeleton */}
            <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-skeleton-shimmer-dark' : 'bg-skeleton-shimmer'} opacity-50 rounded-full`} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatSkeletonProps {
  messageCount?: number;
  showInput?: boolean;
  mixedTypes?: boolean; // Mix bubble (Message) and plain (AssistantMessage) types
  theme?: 'light' | 'dark';
}

const ChatSkeleton: FC<ChatSkeletonProps> = ({ messageCount = 5, showInput = true, mixedTypes = false, theme = 'light' }) => {
  const skeletonMessages = Array.from({ length: messageCount }, (_, i) => ({
    id: `skeleton-${i}`,
    sender: i % 3 === 0 ? 'user' : 'other',
    usePlainType: mixedTypes && i % 4 === 1, // Every 4th message as plain (AssistantMessage)
  }));

  return (
    <>
      <div className='p-4 w-full max-w-250 mx-auto'>
        {skeletonMessages.map((msg) =>
          msg.usePlainType ? (
            <AssistantMessage
              key={msg.id}
              content=''
              messageId={msg.id}
              sender='other'
              groupPosition='standalone'
              isLoading={true}
              actions={[]} // Show action button skeletons for plain messages
              theme={theme}
            />
          ) : (
            <Message key={msg.id} content='' sender={msg.sender as 'user' | 'other'} messageId={msg.id} groupPosition='standalone' isLoading={true} theme={theme} />
          )
        )}
      </div>
      {showInput && <ChatInputSkeleton theme={theme} />}
    </>
  );
};

export default ChatSkeleton;
