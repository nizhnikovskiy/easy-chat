import { ReactNode } from 'react';

/**
 * Configuration for a single context menu item
 */
export interface ContextMenuItem {
  /** Unique identifier for this menu item */
  id: string;
  /** Display label for the menu item */
  label: string;
  /** Optional icon to display before the label */
  icon?: ReactNode;
  /** Callback when menu item is clicked, receives messageId if applicable */
  onClick: (messageId?: string) => void;
  /** Whether this menu item is disabled */
  disabled?: boolean;
  /** Additional CSS classes for customization */
  className?: string;
  /** Whether to show a divider line after this item */
  divider?: boolean;
}

/**
 * Props for the MessageContextMenu component
 */
export interface MessageContextMenuProps {
  /** Whether the menu is currently open */
  isOpen: boolean;
  /** Position where the menu should appear (relative to viewport) */
  position: { x: number; y: number };
  /** Array of menu items to display */
  items: ContextMenuItem[];
  /** Callback when menu should close */
  onClose: () => void;
  /** Optional message ID to pass to menu item callbacks */
  messageId?: string;
  /** Optional bounding rect of the message bubble for smart positioning */
  bubbleRect?: DOMRect | null;
  /** Sender of the message ('user' or 'other') for alignment */
  sender?: 'user' | 'other';
  /** Theme variant for the menu */
  theme?: 'light' | 'dark';
}

/**
 * Configuration for context menu in Chat component
 */
export interface ContextMenuConfig {
  /** Whether context menu is enabled globally */
  enabled?: boolean;
  /** Complete override of menu items (replaces defaults) */
  items?: ContextMenuItem[];
  /** Additional items to append to default menu items */
  customItems?: ContextMenuItem[];
}
