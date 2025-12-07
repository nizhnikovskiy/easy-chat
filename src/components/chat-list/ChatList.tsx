import { FC } from 'react';
import ChatListItem from './ChatListItem';
import type { ChatListProps } from '@/types/chat-list';

const ChatList: FC<ChatListProps> = ({
  items,
  position = 'left',
  onChatSelect,
  activeChatId,
  width = '350px',
  height = '100vh',
  backgroundColor = '#ffffff',
  activeBackgroundColor = '#f0f0f0',
  textColor = '#000000',
  timestampColor = '#8e8e93',
  unreadBadgeColor = '#34c759',
  className = '',
  theme = 'light',
}) => {
  const handleChatClick = (chatId: string) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    }
  };

  return (
    <div
      className={`flex flex-col overflow-hidden ${className}`}
      style={{
        width,
        height,
        backgroundColor: theme === 'dark' ? '#1f2937' : backgroundColor,
        borderRight: position === 'left' ? `1px solid ${theme === 'dark' ? '#374151' : '#e5e5ea'}` : 'none',
        borderLeft: position === 'right' ? `1px solid ${theme === 'dark' ? '#374151' : '#e5e5ea'}` : 'none',
      }}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b' style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e5ea' }}>
        <h2 className='text-xl font-bold' style={{ color: theme === 'dark' ? '#f3f4f6' : textColor }}>
          Chats
        </h2>
        <button
          className='w-8 h-8 rounded-full flex items-center justify-center transition-colors'
          style={{
            backgroundColor: 'transparent',
            color: theme === 'dark' ? '#f3f4f6' : textColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M10 5v10M5 10h10' strokeLinecap='round' />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className='p-3 border-b' style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e5ea' }}>
        <input
          type='text'
          placeholder='Search'
          className='w-full px-3 py-2 rounded-lg border-none outline-none'
          style={{
            backgroundColor: theme === 'dark' ? '#374151' : '#f0f0f0',
            color: theme === 'dark' ? '#f3f4f6' : textColor,
          }}
        />
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-y-auto'>
        {items.map((item) => (
          <ChatListItem
            key={item.id}
            {...item}
            isActive={item.id === activeChatId}
            onClick={handleChatClick}
            backgroundColor={theme === 'dark' ? '#1f2937' : backgroundColor}
            activeBackgroundColor={theme === 'dark' ? '#374151' : activeBackgroundColor}
            textColor={theme === 'dark' ? '#f3f4f6' : textColor}
            timestampColor={theme === 'dark' ? '#9ca3af' : timestampColor}
            unreadBadgeColor={unreadBadgeColor}
            theme={theme}
          />
        ))}
        {items.length === 0 && (
          <div className='flex items-center justify-center h-full'>
            <p style={{ color: theme === 'dark' ? '#9ca3af' : timestampColor }}>No chats yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
