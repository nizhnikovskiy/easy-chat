import { FC, useEffect, useRef, useCallback, useState } from 'react';
import { MessageContextMenuProps } from '../../types/context-menu';

/**
 * MessageContextMenu - ChatGPT-style context menu
 *
 * @component
 *
 * ## Smart Positioning
 * - Aligns to message bubble based on `sender` (user: left, other: right)
 * - Positions below/above bubble with 8px gap
 * - Slides up if in lower half of viewport for better UX
 * - Stays within viewport bounds (adjusts x/y if needed)
 *
 * ## Interactions
 * - Click outside or ESC to close
 * - 10ms delay before click-outside listener (prevents immediate close)
 * - Backdrop with blur effect
 * - Slide-down/up animation with bounce (300ms)
 *
 * ## Theming Variables
 * - `--chat-menu-bg` / `--chat-menu-bg-dark`
 * - `--chat-menu-border` / `--chat-menu-border-dark`
 * - `--chat-menu-text` / `--chat-menu-text-dark`
 * - `--chat-menu-hover-bg` / `--chat-menu-hover-bg-dark`
 * - `--chat-button-disabled-text`
 *
 * @example
 * ```tsx
 * <MessageContextMenu
 *   isOpen={isOpen}
 *   position={{ x: 100, y: 200 }}
 *   items={[
 *     { id: 'copy', label: 'Copy', icon: <Copy />, onClick: () => {} },
 *     { id: 'delete', label: 'Delete', onClick: () => {}, divider: true }
 *   ]}
 *   onClose={() => setIsOpen(false)}
 *   messageId="msg-1"
 *   bubbleRect={bubbleRef.current?.getBoundingClientRect()}
 *   sender="user"
 * />
 * ```
 */
const MessageContextMenu: FC<MessageContextMenuProps> = ({ isOpen, position, items, onClose, messageId, bubbleRect, sender, theme = 'light' }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Determine position and slide direction
  const getAdjustedPosition = useCallback(() => {
    if (!menuRef.current) return { position, slideDirection: 'down' as const };

    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let { x, y } = position;
    let direction: 'down' | 'up' = 'down';
    const verticalGap = 8; // Gap between message and menu

    // Adjust horizontal position based on sender
    if (bubbleRect && sender) {
      if (sender === 'user') {
        // User messages are on the right, align menu to the left edge of the message
        x = bubbleRect.left;
      } else {
        // Other messages are on the left, align menu to the right edge of the message
        x = bubbleRect.right - menuRect.width;
      }
    }

    // Ensure menu stays within viewport horizontally
    if (x + menuRect.width > viewportWidth) {
      x = viewportWidth - menuRect.width - 10;
    }
    if (x < 0) {
      x = 10;
    }

    // Determine vertical direction and adjust position
    const spaceBelow = viewportHeight - y;
    const minSpaceRequired = menuRect.height + 20; // menu height + some padding

    // Check if there's enough space below for the menu
    if (spaceBelow < minSpaceRequired) {
      // Not enough space below - slide up
      direction = 'up';
      // If we have bubbleRect, position menu above the message bubble with gap
      if (bubbleRect) {
        y = Math.max(10, bubbleRect.top - menuRect.height - verticalGap);
      } else {
        y = Math.max(10, y - menuRect.height);
      }
    } else if (spaceBelow < viewportHeight / 2) {
      // In lower half of viewport but has enough space - still slide up for better UX
      direction = 'up';
      // If we have bubbleRect, position menu above the message bubble with gap
      if (bubbleRect) {
        y = Math.max(10, bubbleRect.top - menuRect.height - verticalGap);
      } else {
        y = Math.max(10, y - menuRect.height);
      }
    } else {
      // Enough space below and in upper half - slide down
      direction = 'down';
      // If we have bubbleRect, position menu below the message bubble with gap
      if (bubbleRect) {
        y = bubbleRect.bottom + verticalGap;
      }
    }

    if (y < 0) {
      y = 10;
    }

    return { position: { x, y }, slideDirection: direction };
  }, [position, bubbleRect, sender]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add small delay to prevent immediate close from the same click that opened the menu
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Set mounted state when menu ref is available
  useEffect(() => {
    if (isOpen && menuRef.current) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  // Handle menu item click
  const handleItemClick = (item: (typeof items)[0]) => {
    if (item.disabled) return;
    item.onClick(messageId);
    onClose();
  };

  if (!isOpen) return null;

  const { position: adjustedPosition, slideDirection: currentDirection } = getAdjustedPosition();

  // Animation styles based on slide direction (only apply when mounted)
  const animationStyle = isMounted
    ? currentDirection === 'down'
      ? {
          animation: 'slideDownBounce 300ms ease-out',
        }
      : {
          animation: 'slideUpBounce 300ms ease-out',
        }
    : {
        opacity: 0,
      };

  return (
    <>
      <style>
        {`
          @keyframes slideDownBounce {
            0% {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(4px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes slideUpBounce {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(-4px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes backdropFadeIn {
            from {
              opacity: 0;
              backdrop-filter: blur(0px);
            }
            to {
              opacity: 1;
              backdrop-filter: blur(2px);
            }
          }
        `}
      </style>

      {/* Backdrop */}
      {isMounted && (
        <div
          className='fixed inset-0 z-9998'
          style={{
            animation: 'backdropFadeIn 250ms ease-out forwards',
            backdropFilter: 'blur(2px)',
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
          }}
          onClick={onClose}
          aria-hidden='true'
        />
      )}

      {/* Context Menu */}
      <div
        ref={menuRef}
        role='menu'
        aria-label='Message context menu'
        className={`fixed z-9999 min-w-[180px] rounded-lg shadow-lg border py-1 ${theme === 'dark' ? 'bg-menu-bg-dark border-menu-border-dark' : 'bg-menu-bg border-menu-border'}`}
        style={{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
          ...animationStyle,
        }}
      >
        {items.map((item, index) => (
          <div key={item.id}>
            <button
              role='menuitem'
              disabled={item.disabled}
              onClick={() => handleItemClick(item)}
              className={`
              w-full px-4 py-2 text-left text-sm
              flex items-center gap-3
              transition-colors duration-150
              ${
                item.disabled
                  ? theme === 'dark'
                    ? 'text-button-disabled-text cursor-not-allowed'
                    : 'text-button-disabled-text cursor-not-allowed'
                  : theme === 'dark'
                  ? 'text-menu-text-dark hover:bg-menu-hover-bg-dark active:bg-menu-hover-bg-dark/80 cursor-pointer'
                  : 'text-menu-text hover:bg-menu-hover-bg active:bg-menu-hover-bg/80 cursor-pointer'
              }
              ${item.className || ''}
            `}
              aria-disabled={item.disabled}
            >
              {item.icon && <span className='shrink-0 w-4 h-4 flex items-center justify-center'>{item.icon}</span>}
              <span className='flex-1'>{item.label}</span>
            </button>
            {item.divider && index < items.length - 1 && <div className={`my-1 h-px ${theme === 'dark' ? 'bg-menu-border-dark' : 'bg-menu-border'}`} role='separator' />}
          </div>
        ))}
      </div>
    </>
  );
};

MessageContextMenu.displayName = 'MessageContextMenu';

export default MessageContextMenu;
