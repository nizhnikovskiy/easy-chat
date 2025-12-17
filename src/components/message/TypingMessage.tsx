import { FC, useState, useEffect, useRef } from 'react';
import Message from './Message';
import { TypingMessageProps } from '../../types/message';
import { getFormattedTextAtPosition, getPlainTextLength } from '../../utils/formatText';

/**
 * TypingMessage - Message with character-by-character animation
 *
 * @component
 *
 * ## How It Works
 * - Calculates plain text length (excludes formatting markup)
 * - Reveals characters via `setInterval` at `typingSpeed` ms/char
 * - Applies formatting to visible portion using `formatText` utility
 * - Shows pulsing cursor during animation
 * - Calls `onComplete` when finished
 * - Re-animates if `text` prop changes
 *
 * @example
 * ```tsx
 * <TypingMessage
 *   text="AI response with **bold** and *italic*"
 *   sender="other"
 *   typingSpeed={30}  // ms per character
 *   onComplete={() => scrollToBottom()}
 * />
 * ```
 */
const TypingMessage: FC<TypingMessageProps> = ({ text, typingSpeed = 30, onComplete, isLoading = false, ...messageProps }) => {
  const [prevText, setPrevText] = useState(text);
  const [visibleLength, setVisibleLength] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const totalLength = getPlainTextLength(text);
  const isTypingComplete = !isLoading && visibleLength >= totalLength;

  // Reset state when text changes (Pattern: Adjusting state when a prop changes)
  if (text !== prevText) {
    setPrevText(text);
    setVisibleLength(0);
  }

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Skip typing animation if loading skeleton or no text
    if (isLoading || !text) {
      return;
    }

    const interval = setInterval(() => {
      setVisibleLength((prev) => {
        if (prev < totalLength) {
          return prev + 1;
        } else {
          clearInterval(interval);
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
