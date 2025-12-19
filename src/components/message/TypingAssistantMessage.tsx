import { FC, useState, useEffect, useRef, useMemo } from 'react';
import AssistantMessage from './AssistantMessage';
import { TypingAssistantMessageProps } from '../../types/message';
import { getFormattedTextAtPosition, getPlainTextLength, getWordBoundaries, wrapWordsWithAnimation } from '../../utils/formatText';

/**
 * TypingAssistantMessage - AssistantMessage with typing animation
 *
 * Combines plain-text ChatGPT style with word-by-word animation.
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
  const wordBoundaries = useMemo(() => getWordBoundaries(text), [text]);
  const [prevText, setPrevText] = useState(text);

  // Track which word index we are at
  const [visibleWordIdx, setVisibleWordIdx] = useState(() => {
    if (isLoading) return -1;
    return animationEnabled ? -1 : wordBoundaries.length - 1;
  });

  const onCompleteRef = useRef(onComplete);

  // Calculate visible characters based on current word index
  const visibleLength = visibleWordIdx === -1 ? 0 : wordBoundaries[visibleWordIdx] || 0;
  const isTypingComplete = !isLoading && visibleLength >= totalLength;

  // Reset state when text or animation mode changes
  const [prevAnimationEnabled, setPrevAnimationEnabled] = useState(animationEnabled);
  if (text !== prevText || animationEnabled !== prevAnimationEnabled) {
    setPrevText(text);
    setPrevAnimationEnabled(animationEnabled);
    setVisibleWordIdx(animationEnabled ? -1 : wordBoundaries.length - 1);
  }

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isLoading || !text || wordBoundaries.length === 0 || !animationEnabled) {
      // Non-animated state is already handled by the state-sync block above
      return;
    }

    // Word-by-word happens less frequently than character-by-character
    const adjustedSpeed = typingSpeed * 4;

    const interval = setInterval(() => {
      setVisibleWordIdx((prev) => {
        if (prev < wordBoundaries.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          onCompleteRef.current?.();
          return prev;
        }
      });
    }, adjustedSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed, wordBoundaries, isLoading, animationEnabled]);

  const rawFormattedContent = getFormattedTextAtPosition(text, visibleLength);
  const animatedFormattedContent = wrapWordsWithAnimation(rawFormattedContent);

  return (
    <div className={`relative ${messageProps.className || ''}`}>
      {/* Hidden 'ghost' element to reserve full space */}
      <AssistantMessage content={text} {...messageProps} className='invisible' fullWidth={!limitWidth} isLoading={isLoading} aria-hidden='true' />

      {/* Visible element with typing animation */}
      <AssistantMessage
        content={
          <>
            {animatedFormattedContent}
            {!isTypingComplete && !isLoading && <span className='inline-block w-1 h-4 ml-0.5 bg-current animate-pulse align-middle' aria-hidden='true' />}
          </>
        }
        {...messageProps}
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
