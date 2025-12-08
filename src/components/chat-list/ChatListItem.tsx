import { FC } from 'react';
import type { ChatListItemProps } from '@/types/chat-list';

/**
 * ChatListItem - Individual chat preview in ChatList
 * 
 * @component
 * 
 * ## Smart Timestamp Formatting
 * - Today: Time (e.g., "10:30")
 * - Yesterday: "Yesterday"
 * - This week: Day name (e.g., "Mon")
 * - Older: Date (e.g., "Jan 15")
 * 
 * ## Unread Badge
 * Shows count when > 0, displays "99+" when count > 99
 * 
 * ## Avatar
 * Image or fallback circle with initial (first char of name). 48x48px.
 * Online status: small dot on bottom-right when `isOnline={true}`
 * 
 * ## Theming
 * Colors via props (passed from ChatList): backgroundColor, activeBackgroundColor, textColor, timestampColor, unreadBadgeColor
 * 
 * @example
 * ```tsx
 * <ChatListItem
 *   id="1"
 *   name="John"
 *   avatar="/john.jpg"
 *   lastMessage="Hey!"
 *   timestamp={new Date()}
 *   unreadCount={2}
 *   isActive={true}
 *   isOnline={true}
 *   onClick={(id) => loadChat(id)}
 *   backgroundColor="#fff"
 *   activeBackgroundColor="#f0f0f0"
 * />
 * ```
 */
const ChatListItem: FC<ChatListItemProps> = ({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isActive = false,
  isOnline = false,
  showAvatar = true,
  onClick,
  backgroundColor = 'transparent',
  activeBackgroundColor = '#f0f0f0',
  textColor = '#000000',
  timestampColor = '#8e8e93',
  unreadBadgeColor = '#34c759',
}) => {
  const formatTimestamp = (ts?: Date | string) => {
    if (!ts) return '';

    const date = typeof ts === 'string' ? new Date(ts) : ts;
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Today - show time
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (daysDiff === 1) {
      return 'Yesterday';
    } else if (daysDiff < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const bgColor = isActive ? activeBackgroundColor : backgroundColor;

  return (
    <div
      onClick={handleClick}
      className='flex items-center p-3 cursor-pointer transition-all duration-200 hover:bg-opacity-80 border-b border-list-item-bg'
      style={{
        backgroundColor: bgColor,
      }}
    >
      {/* Avatar - only show if showAvatar is true */}
      {showAvatar && (
        <div className='relative shrink-0 mr-3'>
          {avatar ? (
            <img src={avatar} alt={name} className='w-12 h-12 rounded-full object-cover' />
          ) : (
            <div className='w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg' style={{ backgroundColor: '#007aff' }}>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          {isOnline && <div className='absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white' style={{ backgroundColor: unreadBadgeColor }} />}
        </div>
      )}

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between mb-1'>
          <h3 className='font-semibold text-base truncate' style={{ color: textColor }}>
            {name}
          </h3>
          {timestamp && (
            <span className='text-xs ml-2 shrink-0' style={{ color: timestampColor }}>
              {formatTimestamp(timestamp)}
            </span>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-sm truncate' style={{ color: timestampColor }}>
            {lastMessage || 'No messages yet'}
          </p>
          {unreadCount > 0 && (
            <div className='ml-2 px-2 py-0.5 rounded-full text-white text-xs font-semibold shrink-0 min-w-[20px] text-center' style={{ backgroundColor: unreadBadgeColor }}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
