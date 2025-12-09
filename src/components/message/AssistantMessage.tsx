import { FC, useState, cloneElement } from 'react';
import { AssistantMessageProps } from '@/types/message';
import MessageContextMenu from '@/components/message-context-menu';

/**
 * AssistantMessage - ChatGPT-style plain text message (no bubble)
 *
 * @component
 *
 * ## Key Differences from Message
 * - No bubble background (plain text only)
 * - Always left-aligned
 * - Action buttons below message instead of context menu
 * - Timestamp/status inline at end of text (not in bubble corner)
 *
 * ## Theming Variables
 * - `--chat-message-other-text` / `--chat-message-other-text-dark`
 * - `--chat-message-other-timestamp` / `--chat-message-other-timestamp-dark`
 * - `--chat-username-text` / `--chat-avatar-text`
 * - `--chat-menu-hover-bg` / `--chat-menu-hover-bg-dark` (for action buttons)
 * - `--chat-skeleton-bg` / `--chat-skeleton-shimmer` (loading state)
 *
 * @example
 * ```tsx
 * <AssistantMessage
 *   content="I can help with that!"
 *   showAvatar={true}
 *   username="AI"
 *   actions={[
 *     { id: 'copy', label: 'Copy', icon: <Copy />, onClick: () => {} },
 *     { id: 'regen', label: 'Regenerate', icon: <RefreshCw />, onClick: () => {} }
 *   ]}
 * />
 * ```
 */
const AssistantMessage: FC<AssistantMessageProps> = ({
  content,
  showAvatar = true,
  avatarSrc,
  avatarBgColor = 'bg-gray-400',
  showUsername = false,
  username,
  showTimestamp = false,
  timestamp,
  className = '',
  groupPosition,
  showReadStatus = false,
  isRead = false,
  disableTextCopy = false,
  'aria-label': ariaLabel,
  messageId,
  contextMenuItems,
  actions = [],
  isLoading = false,
  theme = 'light',
  sentIcon,
  readIcon,
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);

  // Determine if this message should show avatar/username based on grouping
  const isStandaloneOrLast = !groupPosition || groupPosition === 'standalone' || groupPosition === 'last';
  const isStandaloneOrFirst = !groupPosition || groupPosition === 'standalone' || groupPosition === 'first';

  const shouldShowAvatar = showAvatar && isStandaloneOrLast;
  const shouldShowUsername = showUsername && isStandaloneOrFirst;

  // Adjust spacing for grouped messages
  const marginBottom = groupPosition === 'first' || groupPosition === 'middle' ? 'mb-1' : 'mb-4';

  // Random widths for skeleton text lines
  const randomWidths = ['50%', '65%', '80%', '70%', '90%'];
  const randomWidth1 = randomWidths[Math.floor(Math.random() * randomWidths.length)];
  const randomWidth2 = randomWidths[Math.floor(Math.random() * randomWidths.length)];

  // Default avatar if not provided
  const avatarElement = shouldShowAvatar && (
    <div className={`shrink-0 w-10 h-10 rounded-full ${avatarBgColor} flex items-center justify-center text-white font-semibold overflow-hidden`} aria-hidden='true'>
      {avatarSrc ? <img src={avatarSrc} alt={username || 'Assistant'} className='w-full h-full object-cover' /> : <span>{(username || 'AI').charAt(0).toUpperCase()}</span>}
    </div>
  );

  // Render skeleton if loading
  if (isLoading) {
    const skeletonColor = theme === 'dark' ? 'bg-skeleton-bg-dark' : 'bg-skeleton-bg';
    const skeletonShimmer = theme === 'dark' ? 'bg-skeleton-shimmer-dark' : 'bg-skeleton-shimmer';
    return (
      <article className={`flex justify-start ${marginBottom} ${className} animate-pulse`} aria-label={ariaLabel || `Loading message from ${username || 'assistant'}`}>
        <div className='flex flex-row items-start gap-2 max-w-[80%] md:max-w-[70%]'>
          {/* Avatar skeleton */}
          {shouldShowAvatar ? <div className={`shrink-0 w-10 h-10 rounded-full ${skeletonColor}`} /> : showAvatar && <div className='shrink-0 w-10' aria-hidden='true' />}

          {/* Plain text skeleton */}
          <div className='flex flex-col gap-1 flex-1'>
            {shouldShowUsername && <div className={`h-3 w-16 ${skeletonColor} rounded`} />}

            <div className='space-y-2'>
              <div className={`h-4 ${skeletonShimmer} opacity-50 rounded`} style={{ width: randomWidth1 }} />
              <div className={`h-4 ${skeletonShimmer} opacity-50 rounded`} style={{ width: randomWidth2 }} />
            </div>

            {/* Actions menu skeleton */}
            {actions && actions.length > 0 && (
              <div className='flex items-center gap-1 mt-1'>
                <div className={`h-6 w-16 ${skeletonShimmer} opacity-50 rounded`} />
                <div className={`h-6 w-16 ${skeletonShimmer} opacity-50 rounded`} />
                <div className={`h-6 w-16 ${skeletonShimmer} opacity-50 rounded`} />
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Handle right-click on message
  const handleContextMenu = (event: React.MouseEvent) => {
    if (contextMenuItems && contextMenuItems.length > 0) {
      event.preventDefault();
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
      setIsContextMenuOpen(true);
    }
  };

  // Handle touch start (for long press on mobile)
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!contextMenuItems || contextMenuItems.length === 0) return;

    const touch = event.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });

    // Start long press timer (500ms)
    const timer = setTimeout(() => {
      setContextMenuPosition({ x: touch.clientX, y: touch.clientY });
      setIsContextMenuOpen(true);
    }, 500);

    setLongPressTimer(timer);
  };

  // Handle touch move (cancel long press if finger moves too much)
  const handleTouchMove = (event: React.TouchEvent) => {
    if (!touchStartPos || !longPressTimer) return;

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);

    // Cancel long press if finger moved more than 10px
    if (deltaX > 10 || deltaY > 10) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
      setTouchStartPos(null);
    }
  };

  // Handle touch end (cancel long press if released early)
  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setTouchStartPos(null);
  };

  return (
    <>
      <article className={`flex justify-start ${marginBottom} ${className}`} aria-label={ariaLabel || `Message from ${username || 'assistant'}`}>
        <div className={`flex flex-row items-start gap-2 max-w-[80%] md:max-w-[70%]`}>
          {/* Show avatar or placeholder spacing */}
          {shouldShowAvatar ? avatarElement : showAvatar && <div className='shrink-0 w-10' aria-hidden='true' />}

          <div className='flex flex-col gap-1 w-full'>
            {shouldShowUsername && username && (
              <div className={`text-xs ${theme === 'dark' ? 'text-username-text-dark' : 'text-username-text'} px-0`} aria-label='Sender name'>
                {username}
              </div>
            )}

            <div onContextMenu={handleContextMenu} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className='relative'>
              <div
                className={[
                  'text-sm md:text-base leading-relaxed break-words',
                  theme === 'dark' ? 'text-message-other-text-dark' : 'text-message-other-text',
                  disableTextCopy ? 'select-none' : '',
                ].join(' ')}
              >
                {content}
              </div>

              {/* Timestamp and read status (inline at the end of text) */}
              {(showTimestamp || showReadStatus) && (
                <div className='flex items-center gap-1 mt-1'>
                  {showTimestamp && timestamp && (
                    <time className={`text-xs ${theme === 'dark' ? 'text-message-other-timestamp-dark' : 'text-message-other-timestamp'}`} dateTime={timestamp} aria-label={`Sent at ${timestamp}`}>
                      {timestamp}
                    </time>
                  )}
                  {showReadStatus && (
                    <div className='flex items-center' aria-label={isRead ? 'Read' : 'Sent'} title={isRead ? 'Read' : 'Sent'}>
                      {isRead && readIcon
                        ? cloneElement(readIcon, {
                            className: theme === 'dark' ? 'text-message-other-timestamp-dark' : 'text-message-other-timestamp',
                            size: 16,
                          } as any)
                        : !isRead && sentIcon
                        ? cloneElement(sentIcon, {
                            className: theme === 'dark' ? 'text-message-other-timestamp-dark' : 'text-message-other-timestamp',
                            size: 16,
                          } as any)
                        : null}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Menu */}
            {actions && actions.length > 0 && (
              <div className='flex items-center gap-1 mt-1 flex-wrap' role='toolbar' aria-label='Message actions'>
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => action.onClick(messageId)}
                    disabled={action.disabled}
                    className={`
                      flex items-center gap-1 px-2 py-1 rounded text-xs
                      ${theme === 'dark' ? 'text-message-other-timestamp-dark hover:bg-menu-hover-bg-dark' : 'text-message-other-timestamp hover:bg-menu-hover-bg'} 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors duration-150
                      ${action.className || ''}
                    `}
                    aria-label={action.label}
                    title={action.label}
                  >
                    {action.icon && <span className='flex items-center'>{action.icon}</span>}
                    {action.label && <span>{action.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Context Menu */}
      {contextMenuItems && contextMenuItems.length > 0 && (
        <MessageContextMenu isOpen={isContextMenuOpen} position={contextMenuPosition} items={contextMenuItems} onClose={() => setIsContextMenuOpen(false)} messageId={messageId} theme={theme} />
      )}
    </>
  );
};

AssistantMessage.displayName = 'AssistantMessage';

export default AssistantMessage;
