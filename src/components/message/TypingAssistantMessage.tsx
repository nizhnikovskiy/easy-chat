import { FC, useState, useEffect, useRef } from 'react';
import AssistantMessage from './AssistantMessage';
import { TypingAssistantMessageProps } from '@/types/message';
import { getFormattedTextAtPosition, getPlainTextLength } from '@/utils/formatText';

/**
 * TypingAssistantMessage - AssistantMessage with typing animation
 * 
 * Combines plain-text ChatGPT style with character-by-character animation.
 * Same animation logic as TypingMessage but renders via AssistantMessage.
 * 
 * @example
 * ```tsx
 * <TypingAssistantMessage
 *   text="AI response with typing effect"
 *   typingSpeed={30}
 *   onComplete={() => scrollToBottom()}
 *   actions={[
 *     { id: 'copy', label: 'Copy', icon: <Copy />, onClick: () => {} }
 *   ]}
 * />
 * ```
 */
const TypingAssistantMessage: FC<TypingAssistantMessageProps> = ({ text, typingSpeed = 30, onComplete, isLoading = false, ...messageProps }) => {
  const [visibleLength, setVisibleLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const totalLength = getPlainTextLength(text);

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Skip typing animation if loading skeleton
    if (isLoading) return;

    if (!text) {
      setVisibleLength(0);
      setIsTypingComplete(true);
      return;
    }

    setVisibleLength(0);
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      setVisibleLength((prev) => {
        if (prev < totalLength) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
          onCompleteRef.current?.();
          return prev;
        }
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, totalLength, isLoading]);

  const formattedContent = getFormattedTextAtPosition(text, visibleLength);

  return (
    <AssistantMessage
      content={
        <>
          {formattedContent}
          {!isTypingComplete && !isLoading && <span className='inline-block w-1 h-4 ml-0.5 bg-current animate-pulse' aria-hidden='true' />}
        </>
      }
      {...messageProps}
      isLoading={isLoading}
      aria-label={`${messageProps['aria-label'] || 'Assistant message'}, ${isTypingComplete ? 'complete' : 'typing in progress'}`}
    />
  );
};

TypingAssistantMessage.displayName = 'TypingAssistantMessage';

export default TypingAssistantMessage;
