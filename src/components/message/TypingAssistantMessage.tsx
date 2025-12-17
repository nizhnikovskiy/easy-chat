import { FC, useState, useEffect, useRef } from 'react';
import AssistantMessage from './AssistantMessage';
import { TypingAssistantMessageProps } from '../../types/message';
import { getFormattedTextAtPosition, getPlainTextLength } from '../../utils/formatText';

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
const TypingAssistantMessage: FC<TypingAssistantMessageProps> = ({ text, typingSpeed = 30, onComplete, isLoading = false, limitWidth, animationEnabled = true, ...messageProps }) => {
  const totalLength = getPlainTextLength(text);
  const [prevText, setPrevText] = useState(text);
  const [visibleLength, setVisibleLength] = useState(() => {
    if (isLoading) return 0;
    return animationEnabled ? 0 : totalLength;
  });
  const onCompleteRef = useRef(onComplete);
  const isTypingComplete = !isLoading && visibleLength >= totalLength;

  // Reset state when text changes (Pattern: Adjusting state when a prop changes)
  if (text !== prevText) {
    setPrevText(text);
    setVisibleLength(animationEnabled ? 0 : totalLength);
  }

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // If animation is disabled, ensure text is fully visible immediately
    if (!animationEnabled) {
      if (visibleLength < totalLength && !isLoading) {
        setVisibleLength(totalLength);
        onCompleteRef.current?.();
      }
      return;
    }

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
  }, [text, typingSpeed, totalLength, isLoading, animationEnabled]);

  const formattedContent = getFormattedTextAtPosition(text, visibleLength);

  return (
    <div className={`relative ${messageProps.className || ''}`}>
      {/* Hidden 'ghost' element to reserve full space (dimensions + margins) */}
      <AssistantMessage content={text} {...messageProps} className='invisible' fullWidth={!limitWidth} isLoading={isLoading} aria-hidden='true' />

      {/* Visible element with typing animation positioned over the ghost */}
      <AssistantMessage
        content={
          <>
            {formattedContent}
            {!isTypingComplete && !isLoading && <span className='inline-block w-1 h-4 ml-0.5 bg-current animate-pulse' aria-hidden='true' />}
          </>
        }
        {...messageProps}
        // Force absolute positioning to overlay the ghost exactly
        className='absolute top-0 left-0 w-full h-full'
        fullWidth={!limitWidth}
        isLoading={isLoading}
        aria-label={`${messageProps['aria-label'] || 'Assistant message'}, ${isTypingComplete ? 'complete' : 'typing in progress'}`}
      />
    </div>
  );
};

TypingAssistantMessage.displayName = 'TypingAssistantMessage';

export default TypingAssistantMessage;
