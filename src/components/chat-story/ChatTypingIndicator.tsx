import { FC } from 'react';

export const ChatTypingIndicator: FC = () => (
  <div data-testid="chat-typing-indicator" className="stage w-13 h-7 flex items-center justify-center">
    <div data-testid="dot-flashing" className="dot-flashing"></div>
  </div>
);
