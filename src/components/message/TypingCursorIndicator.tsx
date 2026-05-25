import { CSSProperties, FC } from 'react';

interface TypingCursorIndicatorProps {
  color?: string;
  className?: string;
}

const TypingCursorIndicator: FC<TypingCursorIndicatorProps> = ({ color, className = '' }) => {
  const style = color ? ({ '--chat-typing-cursor-color': color } as CSSProperties) : undefined;

  return <span className={`chat-typing-cursor ${className}`.trim()} style={style} aria-hidden='true' />;
};

TypingCursorIndicator.displayName = 'TypingCursorIndicator';

export default TypingCursorIndicator;
