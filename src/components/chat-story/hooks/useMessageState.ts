import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatHistoryMessage, MessageRole, ProcessedMessage, AssistantMessage } from '../types/types';

interface UseMessageStateProps {
  messages: ChatHistoryMessage[];
  isPending: boolean;
  onMessageUpdate?: () => void;
}

export const useMessageState = ({ messages, isPending, onMessageUpdate }: UseMessageStateProps) => {
  const [visibleMessages, setVisibleMessages] = useState<ProcessedMessage[]>([]);
  const visibleMessagesRef = useRef<ProcessedMessage[]>([]);

  // Keep ref updated
  useEffect(() => {
    visibleMessagesRef.current = visibleMessages;
  }, [visibleMessages]);

  useEffect(() => {
    const flattenedMessages = messages.map((msg): ProcessedMessage => {
      if (msg.role === MessageRole.USER) {
        return {
          ...msg,
          isTypingComplete: true,
          isLoading: false,
        };
      }

      return {
        ...msg,
        isTypingComplete: msg.isTypingComplete ?? false,
        isLoading: msg.isLoading ?? false,
      };
    });

    if (JSON.stringify(flattenedMessages) !== JSON.stringify(visibleMessages)) {
      setVisibleMessages(flattenedMessages);
    }
  }, [messages]);

  useEffect(() => {
    if (isPending) {
      setVisibleMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === MessageRole.USER) {
          const newMessage: AssistantMessage = {
            content: '',
            role: MessageRole.ASSISTANT,
            isTypingComplete: false,
            isLoading: true,
            isSubMessage: false,
          };
          return [...prev, newMessage];
        }
        return prev;
      });
    }
  }, [isPending]);

  const handleTypingComplete = useCallback(
    (index: number) => {
      const currentMessage = visibleMessagesRef.current[index];

      setVisibleMessages((prev) => prev.map((msg, idx) => (idx === index ? { ...msg, isTypingComplete: true } : msg)));

      if ('remainingContent' in currentMessage && Array.isArray(currentMessage.remainingContent) && currentMessage.remainingContent.length > 0) {
        const [nextContent, ...remainingContent] = currentMessage.remainingContent;

        setTimeout(() => {
          const newMessage: AssistantMessage = {
            content: nextContent,
            role: MessageRole.ASSISTANT,
            isSubMessage: true,
            isTypingComplete: false,
            isLoading: false,
            remainingContent,
          };
          setVisibleMessages((prev) => [...prev, newMessage]);
          onMessageUpdate?.();
        }, 0);
      }
    },
    [onMessageUpdate]
  );

  const handleTypingUpdate = useCallback(() => {
    onMessageUpdate?.();
  }, [onMessageUpdate]);

  return {
    visibleMessages,
    handleTypingComplete,
    handleTypingUpdate,
  };
};
