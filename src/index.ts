// Main components
export { default as Chat } from './components/chat';
export { default as ChatInput } from './components/chat-input';
export { ChatList } from './components/chat-list';
export { default as ChatSkeleton } from './components/chat-skeleton';
export { default as DateSeparator } from './components/date-separator';
export { default as MessageContextMenu } from './components/message-context-menu';

// Message components
export { Message, StaticMessage, TypingMessage, AssistantMessage, TypingAssistantMessage } from './components/message';

// Types - Message
export type { MessageProps, StaticMessageProps, TypingMessageProps, AssistantMessageProps, TypingAssistantMessageProps, AssistantMessageActionItem } from './types/message';

// Types - Chat
export type {
  ChatProps,
  MessageRole,
  BaseMessage,
  UserMessage,
  AssistantMessage as AssistantMessageType,
  TeacherMessage,
  DateSeparator as DateSeparatorType,
  ChatHistoryMessage,
  ChatHistoryItem,
} from './types/chat';

// Types - Chat List
export type { ChatListProps, ChatListItemProps, ChatListItemData, ChatListPosition } from './types/chat-list';

// Types - Chat Input
export type { ChatInputProps, SendButtonProps, MediaButtonProps, VoiceButtonProps } from './types/chat-input';

// Types - Context Menu
export type { ContextMenuItem, MessageContextMenuProps } from './types/context-menu';

// Types - Theme
export type { ChatThemeVariables, ChatThemeStyles } from './styles/theme-variables';