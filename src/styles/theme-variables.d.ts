/**
 * Easy Chat Theme CSS Variables
 * 
 * This file provides TypeScript intellisense for CSS variable names.
 * Override these in your CSS to customize the theme.
 */

export interface ChatThemeVariables {
  // Message Bubbles - Light Theme
  '--chat-message-user-bg': string;
  '--chat-message-user-text': string;
  '--chat-message-user-timestamp': string;
  '--chat-message-other-bg': string;
  '--chat-message-other-text': string;
  '--chat-message-other-timestamp': string;

  // Message Bubbles - Dark Theme
  '--chat-message-user-bg-dark': string;
  '--chat-message-user-text-dark': string;
  '--chat-message-user-timestamp-dark': string;
  '--chat-message-other-bg-dark': string;
  '--chat-message-other-text-dark': string;
  '--chat-message-other-timestamp-dark': string;

  // Chat Input
  '--chat-input-bg': string;
  '--chat-input-bg-dark': string;
  '--chat-input-text': string;
  '--chat-input-text-dark': string;
  '--chat-input-placeholder': string;
  '--chat-input-placeholder-dark': string;
  '--chat-input-border': string;
  '--chat-input-border-dark': string;
  '--chat-input-border-focus': string;

  // Buttons
  '--chat-button-primary-bg': string;
  '--chat-button-primary-bg-hover': string;
  '--chat-button-primary-text': string;
  '--chat-button-disabled-bg': string;
  '--chat-button-disabled-text': string;

  // Context Menu
  '--chat-menu-bg': string;
  '--chat-menu-bg-dark': string;
  '--chat-menu-text': string;
  '--chat-menu-text-dark': string;
  '--chat-menu-hover-bg': string;
  '--chat-menu-hover-bg-dark': string;
  '--chat-menu-border': string;
  '--chat-menu-border-dark': string;

  // Date Separator
  '--chat-separator-bg': string;
  '--chat-separator-bg-dark': string;
  '--chat-separator-text': string;
  '--chat-separator-text-dark': string;

  // Chat List
  '--chat-list-item-bg': string;
  '--chat-list-item-bg-dark': string;
  '--chat-list-item-hover-bg': string;
  '--chat-list-item-hover-bg-dark': string;
  '--chat-list-item-active-bg': string;
  '--chat-list-item-active-bg-dark': string;
  '--chat-list-item-text': string;
  '--chat-list-item-text-dark': string;

  // Skeleton Loading
  '--chat-skeleton-bg': string;
  '--chat-skeleton-bg-dark': string;
  '--chat-skeleton-shimmer': string;
  '--chat-skeleton-shimmer-dark': string;

  // Avatar & Username
  '--chat-avatar-bg': string;
  '--chat-avatar-text': string;
  '--chat-username-text': string;
  '--chat-username-text-dark': string;
}

/**
 * Type helper for setting CSS variables in React style prop
 * 
 * @example
 * ```tsx
 * <div style={{
 *   '--chat-message-user-bg': '#8b5cf6',
 *   '--chat-button-primary-bg': '#8b5cf6',
 * } as ChatThemeStyles}>
 *   <Chat {...props} />
 * </div>
 * ```
 */
export type ChatThemeStyles = Partial<ChatThemeVariables> & React.CSSProperties;

