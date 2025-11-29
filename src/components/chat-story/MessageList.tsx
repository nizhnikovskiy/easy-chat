import { FC, useMemo } from 'react';
import { MessageListProps } from './types/types';
import ChatMessage from './ChatMessage';
import { useMessageState } from './hooks/useMessageState';

interface ExtendedMessageListProps extends MessageListProps {
  voiceChatMode?: boolean;
}

export const MessageList: FC<ExtendedMessageListProps> = ({ messages, isPending, onMessageUpdate, voiceChatMode = false }) => {
  const { visibleMessages, handleTypingComplete, handleTypingUpdate } = useMessageState({
    messages,
    isPending,
    onMessageUpdate,
  });

  const typingCompleteCallbacks = useMemo(() => {
    return visibleMessages.map((_, index) => () => handleTypingComplete(index));
  }, [visibleMessages.length, handleTypingComplete]);

  return (
    <div className='flex flex-col'>
      {visibleMessages.map((message, index) => (
        <ChatMessage
          key={index}
          content={message.content}
          role={message.role}
          isLoading={message.isLoading}
          isSubMessage={message.isSubMessage}
          shouldStartTyping={index === visibleMessages.length - 1 && !message.isTypingComplete}
          onTypingComplete={typingCompleteCallbacks[index]}
          onTypingUpdate={handleTypingUpdate}
          image={message.image}
          voiceChatMode={voiceChatMode}
        />
      ))}
    </div>
  );
};
