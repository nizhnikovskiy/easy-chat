export interface MessageProps {
  content: React.ReactNode;
  sender: 'user' | 'other';
  showAvatar?: boolean;
  avatarSrc?: string;
  /**
   * Custom background color for the avatar when no avatarSrc is provided
   * Accepts any valid CSS color value (e.g., '#FF5733', 'rgb(255, 87, 51)', 'bg-red-500')
   * Default: 'bg-gray-400'
   */
  avatarBgColor?: string;
  showUsername?: boolean;
  username?: string;
  showTimestamp?: boolean;
  timestamp?: string;
  className?: string;
  'aria-label'?: string;
  /**
   * Position of the message in a group of consecutive messages from the same sender
   * - 'first': First message in a group (show username, hide avatar, no square corner)
   * - 'middle': Middle message in a group (hide username, hide avatar, no square corner)
   * - 'last': Last message in a group (hide username, show avatar, square corner)
   * - 'standalone' or undefined: Single message not part of a group (show username, show avatar, square corner)
   */
  groupPosition?: 'first' | 'middle' | 'last' | 'standalone';
  /**
   * Whether to show the read status indicator (checkmarks)
   * Typically used for messages sent by the current user
   */
  showReadStatus?: boolean;
  /**
   * Whether the message has been read by the recipient
   * - true: Message has been read (shows double checkmarks)
   * - false: Message has been sent but not read (shows single checkmark)
   */
  isRead?: boolean;
  /**
   * Whether to disable text selection and copying
   * When true, users cannot select or copy the text content of the message
   */
  disableTextCopy?: boolean;
  /**
   * Unique identifier for this message
   * Required for context menu functionality
   */
  messageId?: string;
  /**
   * Context menu items to show when right-clicking the message
   * If provided, enables context menu on this message
   */
  contextMenuItems?: import('@/types/context-menu').ContextMenuItem[];
  /**
   * Whether to render skeleton loading state instead of actual content
   * When true, displays a skeleton placeholder with the same layout and configuration
   */
  isLoading?: boolean;
  /**
   * Whether this is a typing message that should have a fixed width
   * When true, the message bubble will maintain a consistent width during typing animation
   */
  isTyping?: boolean;
  /**
   * Theme variant for the message
   * - 'light': Light theme with standard colors
   * - 'dark': Dark theme with darker colors
   */
  theme?: 'light' | 'dark';
}

export interface StaticMessageProps extends Omit<MessageProps, 'content'> {
  text: string;
}

export interface TypingMessageProps extends Omit<MessageProps, 'content' | 'isLoading'> {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  /**
   * Whether to render skeleton loading state instead of typing animation
   * When true, displays a skeleton placeholder with pulsing dots
   */
  isLoading?: boolean;
}

/**
 * Action item for the AssistantMessage action menu
 */
export interface AssistantMessageActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (messageId?: string) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Props for AssistantMessage component (ChatGPT-style message without bubble)
 */
export interface AssistantMessageProps extends Omit<MessageProps, 'content' | 'isLoading'> {
  content: React.ReactNode;
  /**
   * Custom action items to display below the message
   * Example: regenerate, like, dislike, copy, etc.
   */
  actions?: AssistantMessageActionItem[];
  /**
   * Whether to render skeleton loading state instead of actual content
   * When true, displays a skeleton placeholder with the same layout and configuration
   */
  isLoading?: boolean;
}

/**
 * Props for TypingAssistantMessage component
 */
export interface TypingAssistantMessageProps extends Omit<AssistantMessageProps, 'content' | 'isLoading'> {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  /**
   * Whether to render skeleton loading state instead of typing animation
   * When true, displays a skeleton placeholder with pulsing dots
   */
  isLoading?: boolean;
}
