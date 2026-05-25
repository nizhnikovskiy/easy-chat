import { FC, useState, useEffect, useRef, useMemo } from 'react';
import Message from './Message';
import TypingCursorIndicator from './TypingCursorIndicator';
import { getFormattedTextAtPosition, getPlainTextLength, getWordBoundaries, wrapWordsWithAnimation } from '../../utils/formatText';
import { TypingMessageProps } from '../../types/message';
import { DEFAULT_TYPING_SPEED } from '../../constants';

/**
 * TypingMessage - Message with word-by-word animation
 */
const TypingMessage: FC<TypingMessageProps> = ({ text, typingSpeed = DEFAULT_TYPING_SPEED, onComplete, isLoading = false, typingCursorColor, ...messageProps }) => {
  const [prevText, setPrevText] = useState(text);
  const wordBoundaries = useMemo(() => getWordBoundaries(text), [text]);
  const [visibleWordIdx, setVisibleWordIdx] = useState(() => (isLoading ? -1 : -1));
  const onCompleteRef = useRef(onComplete);
  const totalLength = getPlainTextLength(text);
  const shouldShowLoading = isLoading && totalLength === 0;

  const visibleLength = visibleWordIdx === -1 ? 0 : wordBoundaries[visibleWordIdx] || 0;
  const isTypingComplete = !shouldShowLoading && visibleLength >= totalLength;

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
    if (shouldShowLoading || !text || wordBoundaries.length === 0) {
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
  }, [text, typingSpeed, wordBoundaries, shouldShowLoading]);

  const rawFormattedContent = getFormattedTextAtPosition(text, visibleLength);
  const animatedFormattedContent = wrapWordsWithAnimation(rawFormattedContent);

  return (
    <Message
      content={
        <>
          {shouldShowLoading && <TypingCursorIndicator color={typingCursorColor} className='chat-assistant-loading-cursor' />}
          {animatedFormattedContent}
          {!isTypingComplete && !shouldShowLoading && <TypingCursorIndicator color={typingCursorColor} />}
        </>
      }
      {...messageProps}
      isLoading={false}
      isTyping={true}
      aria-label={`${messageProps['aria-label'] || 'Message'}, ${isTypingComplete ? 'complete' : 'typing in progress'}`}
    />
  );
};

TypingMessage.displayName = 'TypingMessage';

export default TypingMessage;
