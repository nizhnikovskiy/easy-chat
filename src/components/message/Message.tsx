import { FC, useState, useRef, cloneElement } from 'react';
import { MessageProps } from '@/types/message';
import MessageContextMenu from '@/components/message-context-menu';
import { formatText } from '@/utils/formatText';

/**
 * Base Message component with customizable appearance and behavior
 *
 * Features:
 * - Left/right alignment based on sender
 * - Optional avatar display
 * - Optional username display
 * - Optional timestamp (Telegram-style in bubble corner)
 * - Accessible with ARIA labels
 * - Responsive design for desktop and mobile
 */
const Message: FC<MessageProps> = ({
  content,
  sender,
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
  isLoading = false,
  isTyping = false,
  theme = 'light',
  sentIcon,
  readIcon,
}) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);

  const isUser = sender === 'user';

  // Determine if this message should show avatar/username/tail based on grouping
  const isStandaloneOrLast = !groupPosition || groupPosition === 'standalone' || groupPosition === 'last';
  const isStandaloneOrFirst = !groupPosition || groupPosition === 'standalone' || groupPosition === 'first';

  const shouldShowAvatar = showAvatar && isStandaloneOrLast;
  const shouldShowUsername = showUsername && isStandaloneOrFirst;
  const shouldShowTail = isStandaloneOrLast;

  // Bubble styling based on sender and theme
  const bubbleColorClass = isUser ? (theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white') : theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900';

  const tailPosition = shouldShowTail ? (isUser ? 'rounded-br-none' : 'rounded-bl-none') : '';

  // Layout alignment
  const containerAlign = isUser ? 'justify-end' : 'justify-start';
  const flexDirection = isUser ? 'flex-row-reverse' : 'flex-row';

  // Adjust spacing for grouped messages
  const marginBottom = groupPosition === 'first' || groupPosition === 'middle' ? 'mb-1' : 'mb-4';

  // Random widths for skeleton text lines
  const randomWidths = ['50%', '65%', '80%', '70%', '90%'];
  const randomWidth1 = randomWidths[Math.floor(Math.random() * randomWidths.length)];
  const randomWidth2 = randomWidths[Math.floor(Math.random() * randomWidths.length)];

  // Default avatar if not provided
  const avatarElement = shouldShowAvatar && (
    <div className={`shrink-0 w-10 h-10 rounded-full ${avatarBgColor} flex items-center justify-center text-white font-semibold overflow-hidden`} aria-hidden='true'>
      {avatarSrc ? (
        <img src={avatarSrc} alt={username || (isUser ? 'User' : 'Other')} className='w-full h-full object-cover' />
      ) : (
        <span>{(username || (isUser ? 'You' : 'Other')).charAt(0).toUpperCase()}</span>
      )}
    </div>
  );

  // Render skeleton if loading
  if (isLoading) {
    const skeletonBubbleColor = isUser ? (theme === 'dark' ? 'bg-blue-700' : 'bg-blue-500') : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
    const skeletonAvatarColor = isUser ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400') : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400';

    return (
      <article className={`flex ${containerAlign} ${marginBottom} ${className} animate-pulse`} aria-label={ariaLabel || `Loading message from ${isUser ? 'you' : username || 'other'}`}>
        <div className={`flex ${flexDirection} items-end gap-2 max-w-[80%] md:max-w-[70%]`}>
          {/* Show avatar or placeholder spacing */}
          {shouldShowAvatar ? <div className={`shrink-0 w-10 h-10 rounded-full ${skeletonAvatarColor}`} /> : showAvatar && <div className='shrink-0 w-10' aria-hidden='true' />}

          <div className='flex flex-col gap-1 min-w-0'>
            {shouldShowUsername && <div className={`h-3 w-16 ${skeletonAvatarColor} rounded ${isUser ? 'ml-auto' : ''}`} />}

            {/* Skeleton bubble */}
            <div className={`w-64 px-4 py-2 rounded-2xl ${skeletonBubbleColor} ${tailPosition}`}>
              <div className='space-y-2'>
                <div
                  className={`h-4 ${isUser ? (theme === 'dark' ? 'bg-blue-600/50' : 'bg-blue-400/50') : theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-400/50'} rounded`}
                  style={{ width: randomWidth1 }}
                />
                <div
                  className={`h-4 ${isUser ? (theme === 'dark' ? 'bg-blue-600/50' : 'bg-blue-400/50') : theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-400/50'} rounded`}
                  style={{ width: randomWidth2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Handle right-click on message
  const handleContextMenu = (event: React.MouseEvent) => {
    if (contextMenuItems && contextMenuItems.length > 0 && bubbleRef.current) {
      event.preventDefault();
      const rect = bubbleRef.current.getBoundingClientRect();
      // Position menu at the bottom center of the bubble
      setContextMenuPosition({ x: rect.left + rect.width / 2, y: rect.bottom });
      setIsContextMenuOpen(true);
    }
  };

  // Handle touch start (for long press on mobile)
  const handleTouchStart = (event: React.TouchEvent) => {
    if (!contextMenuItems || contextMenuItems.length === 0 || !bubbleRef.current) return;

    const touch = event.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });

    // Start long press timer (500ms)
    const timer = setTimeout(() => {
      if (bubbleRef.current) {
        const rect = bubbleRef.current.getBoundingClientRect();
        // Position menu at the bottom center of the bubble
        setContextMenuPosition({ x: rect.left + rect.width / 2, y: rect.bottom });
        setIsContextMenuOpen(true);
      }
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
      <article
        className={`flex ${containerAlign} ${marginBottom} ${className} ${isContextMenuOpen ? 'relative z-9999' : ''}`}
        aria-label={ariaLabel || `Message from ${isUser ? 'you' : username || 'other'}`}
      >
        <div className={`flex ${flexDirection} items-end gap-2 max-w-[80%] md:max-w-[70%]`}>
          {/* Show avatar or placeholder spacing */}
          {shouldShowAvatar ? avatarElement : showAvatar && <div className='shrink-0 w-10' aria-hidden='true' />}

          <div className='flex flex-col gap-1'>
            {shouldShowUsername && username && (
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} px-2 ${isUser ? 'text-right' : 'text-left'}`} aria-label='Sender name'>
                {username}
              </div>
            )}

            <div
              ref={bubbleRef}
              onContextMenu={handleContextMenu}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`
                relative px-4 py-2 rounded-2xl shadow-sm
                ${bubbleColorClass} 
                ${tailPosition}
                ${showTimestamp || showReadStatus ? 'pb-5' : ''}
                ${contextMenuItems && contextMenuItems.length > 0 ? 'select-none' : disableTextCopy ? 'select-none' : ''}
                ${isTyping ? 'w-64' : ''}
              `}
              style={contextMenuItems && contextMenuItems.length > 0 ? { WebkitUserSelect: 'none', touchAction: 'manipulation' } : undefined}
            >
              <div className='text-sm md:text-base leading-relaxed break-words'>{typeof content === 'string' ? formatText(content) : content}</div>

              {(showTimestamp || showReadStatus) && (
                <div
                  className={`
                    absolute bottom-1 right-2 flex items-center gap-1
                  `}
                >
                  {showTimestamp && timestamp && (
                    <time
                      className={`text-xs ${isUser ? (theme === 'dark' ? 'text-blue-200' : 'text-blue-100') : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                      dateTime={timestamp}
                      aria-label={`Sent at ${timestamp}`}
                    >
                      {timestamp}
                    </time>
                  )}
                  {showReadStatus && (
                    <div className='flex items-center' aria-label={isRead ? 'Read' : 'Sent'} title={isRead ? 'Read' : 'Sent'}>
                      {isRead && readIcon ? (
                        cloneElement(readIcon, { 
                          className: isUser ? (theme === 'dark' ? 'text-blue-200' : 'text-blue-100') : theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
                          size: 16 
                        })
                      ) : !isRead && sentIcon ? (
                        cloneElement(sentIcon, { 
                          className: isUser ? (theme === 'dark' ? 'text-blue-200' : 'text-blue-100') : theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
                          size: 16 
                        })
                      ) : null}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Context Menu */}
      {contextMenuItems && contextMenuItems.length > 0 && (
        <MessageContextMenu
          isOpen={isContextMenuOpen}
          position={contextMenuPosition}
          items={contextMenuItems}
          onClose={() => setIsContextMenuOpen(false)}
          messageId={messageId}
          bubbleRect={bubbleRef.current?.getBoundingClientRect() || null}
          sender={sender}
          theme={theme}
        />
      )}
    </>
  );
};

Message.displayName = 'Message';

export default Message;
