import { FC, useState, useEffect, useRef } from 'react';
import Message from './Message';
import { TypingMessageProps } from '@/types/message';
import { getFormattedTextAtPosition, getPlainTextLength } from '@/utils/formatText';

/**
 * TypingMessage component - displays a message with typing animation
 *
 * Features:
 * - Character-by-character reveal animation
 * - Full text formatting support (bold, italic, code, etc.)
 * - Configurable typing speed
 * - Callback when typing completes
 * - Extends all base Message features
 */
const TypingMessage: FC<TypingMessageProps> = ({ text, typingSpeed = 30, onComplete, isLoading = false, ...messageProps }) => {
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
    <Message
      content={
        <>
          {formattedContent}
          {!isTypingComplete && !isLoading && <span className='inline-block w-1 h-4 ml-0.5 bg-current animate-pulse' aria-hidden='true' />}
        </>
      }
      {...messageProps}
      isLoading={isLoading}
      isTyping={true}
      aria-label={`${messageProps['aria-label'] || 'Message'}, ${isTypingComplete ? 'complete' : 'typing in progress'}`}
    />
  );
};

TypingMessage.displayName = 'TypingMessage';

export default TypingMessage;
