import { FC } from 'react';
import Message from './Message';
import { StaticMessageProps } from '../../types/message';

/**
 * StaticMessage - Message wrapper without typing animation
 *
 * Simple wrapper around Message for displaying text instantly.
 * Use for chat history or when animation isn't needed.
 *
 * @example
 * ```tsx
 * <StaticMessage text="Hello!" sender="user" showTimestamp={true} timestamp="10:00" />
 * ```
 */
const StaticMessage: FC<StaticMessageProps> = ({ text, ...messageProps }) => {
  return <Message content={text} {...messageProps} />;
};

StaticMessage.displayName = 'StaticMessage';

export default StaticMessage;
