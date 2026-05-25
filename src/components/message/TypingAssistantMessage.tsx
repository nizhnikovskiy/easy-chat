import { FC, useState, useEffect, useRef } from 'react';
import AssistantMessage from './AssistantMessage';
import TypingCursorIndicator from './TypingCursorIndicator';
import { TypingAssistantMessageProps } from '../../types/message';
import { getFormattedTextAtPosition, getPlainTextLength } from '../../utils/formatText';
import { DEFAULT_TYPING_SPEED } from '../../constants';

/**
 * TypingAssistantMessage - AssistantMessage with typing animation
 *
 * Combines plain-text ChatGPT style with a steady character-by-character animation.
 *
 * @example
 * ```tsx
 * <TypingAssistantMessage
 *   text="AI response with typing effect"
 *   typingSpeed={8}
 *   onComplete={() => scrollToBottom()}
 *   actions={[
 *     { id: 'copy', label: 'Copy', icon: <Copy />, onClick: () => {} }
 *   ]}
 * />
 * ```
 */
const TypingAssistantMessage: FC<TypingAssistantMessageProps> = ({
  text,
  typingSpeed = DEFAULT_TYPING_SPEED,
  onComplete,
  isLoading = false,
  typingCursorColor,
  limitWidth,
  animationEnabled = true,
  ...messageProps
}) => {
  const totalLength = getPlainTextLength(text);
  const shouldShowLoading = isLoading && totalLength === 0;
  const animationKey = `${text}-${typingSpeed}`;
  const shouldAnimate = !shouldShowLoading && animationEnabled && totalLength > 0;
  const [typingState, setTypingState] = useState({ animationKey: '', visibleLength: 0 });
  const onCompleteRef = useRef(onComplete);
  const visibleLength = shouldAnimate ? (typingState.animationKey === animationKey ? typingState.visibleLength : 0) : shouldShowLoading ? 0 : totalLength;

  const isTypingComplete = !shouldShowLoading && visibleLength >= totalLength;

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!shouldAnimate) {
      if (!shouldShowLoading) {
        onCompleteRef.current?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setTypingState((prev) => {
        const previousLength = prev.animationKey === animationKey ? prev.visibleLength : 0;
        const next = Math.min(previousLength + 1, totalLength);

        if (next >= totalLength) {
          clearInterval(interval);
          onCompleteRef.current?.();
        }

        return { animationKey, visibleLength: next };
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [animationKey, typingSpeed, totalLength, shouldShowLoading, shouldAnimate]);

  const rawFormattedContent = getFormattedTextAtPosition(text, visibleLength);

  if (shouldShowLoading) {
    return (
      <AssistantMessage
        content={
          <span className='chat-assistant-loading' role='status' aria-label='Waiting for response'>
            <span className='sr-only'>Waiting for response</span>
            <TypingCursorIndicator color={typingCursorColor} className='chat-assistant-loading-cursor' />
          </span>
        }
        {...messageProps}
        className={`chat-assistant-loading-message ${messageProps.className || ''}`}
        fullWidth={!limitWidth}
        isLoading={false}
        aria-label={`${messageProps['aria-label'] || 'Assistant message'}, waiting for response`}
      />
    );
  }

  return (
    <div className={`relative ${messageProps.className || ''}`}>
      {/* Hidden 'ghost' element to reserve full space */}
      <AssistantMessage content={text} {...messageProps} className='invisible' fullWidth={!limitWidth} isLoading={false} aria-hidden='true' />

      {/* Visible element with typing animation */}
      <AssistantMessage
        content={
          <>
            {rawFormattedContent}
            {!isTypingComplete && !shouldShowLoading && <TypingCursorIndicator color={typingCursorColor} />}
          </>
        }
        {...messageProps}
        className='absolute top-0 left-0 w-full h-full'
        fullWidth={!limitWidth}
        isLoading={false}
        aria-label={`${messageProps['aria-label'] || 'Assistant message'}, ${isTypingComplete ? 'complete' : 'typing in progress'}`}
      />
    </div>
  );
};

TypingAssistantMessage.displayName = 'TypingAssistantMessage';

export default TypingAssistantMessage;
