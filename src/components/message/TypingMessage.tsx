import { FC, useState, useEffect, useRef, useMemo } from 'react';
import Message from './Message';
import { TypingMessageProps } from '../../types/message';
import { getFormattedTextAtPosition, getPlainTextLength, getWordBoundaries, wrapWordsWithAnimation } from '../../utils/formatText';

/**
 * TypingMessage - Message with word-by-word animation
 */
const TypingMessage: FC<TypingMessageProps> = ({ text, typingSpeed = 30, onComplete, isLoading = false, ...messageProps }) => {
  const [prevText, setPrevText] = useState(text);
  const wordBoundaries = useMemo(() => getWordBoundaries(text), [text]);
  const [visibleWordIdx, setVisibleWordIdx] = useState(() => (isLoading ? -1 : -1));
  const onCompleteRef = useRef(onComplete);
  const totalLength = getPlainTextLength(text);

  const visibleLength = visibleWordIdx === -1 ? 0 : wordBoundaries[visibleWordIdx] || 0;
  const isTypingComplete = !isLoading && visibleLength >= totalLength;

  // Reset state when text changes
  if (text !== prevText) {
    setPrevText(text);
    setVisibleWordIdx(-1);
  }

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isLoading || !text || wordBoundaries.length === 0) {
      return;
    }
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
  }, [text, typingSpeed, wordBoundaries, isLoading]);

  const rawFormattedContent = getFormattedTextAtPosition(text, visibleLength);
  const animatedFormattedContent = wrapWordsWithAnimation(rawFormattedContent);

  return (
    <Message
      content={
        <>
          {animatedFormattedContent}
          {!isTypingComplete && !isLoading && <span className='inline-block w-1 h-4 ml-0.5 bg-current animate-pulse align-middle' aria-hidden='true' />}
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
