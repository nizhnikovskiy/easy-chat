export type ChatListPosition = 'left' | 'right';

export interface ChatListItemData {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  timestamp?: Date | string;
  unreadCount?: number;
  isActive?: boolean;
  isOnline?: boolean;
  showAvatar?: boolean; // Controls avatar display (default: true for backward compatibility)
}

export interface ChatListItemProps extends ChatListItemData {
  onClick?: (id: string) => void;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  textColor?: string;
  timestampColor?: string;
  unreadBadgeColor?: string;
  theme?: 'light' | 'dark';
  hideBadges?: boolean;
}

export interface ChatListProps {
  items: ChatListItemData[];
  position?: ChatListPosition;
  onChatSelect?: (chatId: string) => void;
  activeChatId?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  textColor?: string;
  timestampColor?: string;
  unreadBadgeColor?: string;
  className?: string;
  theme?: 'light' | 'dark';
  hideSearch?: boolean;
  hideCreateChat?: boolean;
  hideAvatars?: boolean;
  hideBadges?: boolean;
}
