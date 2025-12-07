import { FC } from 'react';
import Message from './Message';
import { StaticMessageProps } from '@/types/message';

/**
 * StaticMessage component - displays a message with static text content
 *
 * This component extends the base Message component and renders
 * text that is already complete (no animation).
 */
const StaticMessage: FC<StaticMessageProps> = ({ text, ...messageProps }) => {
  return <Message content={text} {...messageProps} />;
};

StaticMessage.displayName = 'StaticMessage';

export default StaticMessage;
