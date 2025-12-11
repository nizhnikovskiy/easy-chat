import { FC, useState, useEffect, ReactElement } from 'react';
import type { ChatHistoryItem, ChatHistoryMessage } from '../../types/chat';
import type { ContextMenuConfig, ContextMenuItem } from '../../types/context-menu';
import ChatInput from '../chat-input';
import { Message, TypingMessage } from '../message';
import DateSeparator from '../date-separator';
import '../../styles/Chat.animations.css';

// Mock useReflection hook for standalone usage
const useReflection = () => {
  const [isReflectionFinished] = useState(false);
  return { isReflectionFinished };
};

/**
 * Chat - Main chat interface
 *
 * @component
 *
 * ## Key Behaviors
 * - Last received message shows typing animation (controlled by `initialMessageCount`)
 * - New messages after mount get slide-in animations
 * - Auto-scrolls to bottom on new messages
 * - Context menu items default to copy/edit/delete for user messages, copy-only for others
 *
 * ## Theming Variables
 * - `--chat-message-user-bg` / `--chat-message-user-bg-dark`
 * - `--chat-message-user-text` / `--chat-message-user-text-dark`
 * - `--chat-message-other-bg` / `--chat-message-other-bg-dark`
 * - `--chat-message-other-text` / `--chat-message-other-text-dark`
 * - See THEMING.md for complete list
 *
 * @example
 * ```tsx
 * <Chat
 *   messages={messages}
 *   isPending={isLoading}
 *   onSendMessage={(msg, img) => handleSend(msg, img)}
 *   messagesEndRef={messagesEndRef}
 *   theme="light"
 *   // Optional
 *   contextMenuConfig={{ enabled: true }}
 *   onEditMessage={handleEdit}
 *   onDeleteMessage={handleDelete}
 *   backgroundImage="/bg.png"
 * />
 * ```
 */
interface ChatProps {
  messages: ChatHistoryItem[];
  isPending: boolean;
  onSendMessage: (message: string, image?: File, submissionId?: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isHistoryCompleted?: boolean;
  backgroundImage?: string;
  backgroundImageDark?: string;
  contextMenuConfig?: ContextMenuConfig;
  onEditMessage?: (messageId: string, newContent: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  containerClassName?: string;
  theme?: 'light' | 'dark';
  // Icon props for ChatInput
  sendIcon?: ReactElement;
  attachmentIcon?: ReactElement;
  microphoneIcon?: ReactElement;
  closeIcon?: ReactElement;
  // Icon props for context menu
  copyIcon?: ReactElement;
  editIcon?: ReactElement;
  deleteIcon?: ReactElement;
  // Icon props for Message read status
  sentIcon?: ReactElement;
  readIcon?: ReactElement;
}

const Chat: FC<ChatProps> = ({
  messages,
  isPending,
  onSendMessage,
  messagesEndRef,
  isHistoryCompleted = false,
  backgroundImage,
  backgroundImageDark,
  contextMenuConfig,
  onEditMessage,
  onDeleteMessage,
  containerClassName = '',
  theme = 'light',
  sendIcon,
  attachmentIcon,
  microphoneIcon,
  closeIcon,
  copyIcon,
  editIcon,
  deleteIcon,
  sentIcon,
  readIcon,
}) => {
  useReflection();
  const [message, setMessage] = useState('');
  const [shouldFocus, setShouldFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [initialMessageCount, setInitialMessageCount] = useState(0);

  // Create default context menu items
  const createDefaultContextMenuItems = (isUserMessage: boolean): ContextMenuItem[] => {
    const defaultItems: ContextMenuItem[] = [
      {
        id: 'copy',
        label: 'Copy',
        icon: copyIcon,
        onClick: (id?: string) => {
          const idx = parseInt(id?.replace('msg-', '') || '0');
          const msg = messages[idx];
          if (msg && 'content' in msg) {
            navigator.clipboard.writeText(msg.content);
          }
        },
      },
    ];

    // Add edit and delete for user messages only
    if (isUserMessage) {
      defaultItems.push({
        id: 'edit',
        label: 'Edit',
        icon: editIcon,
        onClick: (id?: string) => {
          if (onEditMessage && id) {
            const idx = parseInt(id.replace('msg-', ''));
            const msg = messages[idx];
            if (msg && 'content' in msg) {
              const newContent = prompt('Edit message:', msg.content);
              if (newContent !== null) {
                onEditMessage(id, newContent);
              }
            }
          }
        },
        disabled: !onEditMessage,
      });

      defaultItems.push({
        id: 'delete',
        label: 'Delete',
        icon: deleteIcon,
        onClick: (id?: string) => {
          if (onDeleteMessage && id) {
            if (confirm('Are you sure you want to delete this message?')) {
              onDeleteMessage(id);
            }
          }
        },
        disabled: !onDeleteMessage,
        divider: true,
      });
    }

    return defaultItems;
  };

  useEffect(() => {
    // Store initial message count on mount
    setInitialMessageCount(messages.length);
  }, []);

  // Determine if a message is the last received message (not from user) and was added after mount
  const isLastReceivedMessage = (index: number) => {
    if (index !== messages.length - 1) return false;
    if (index < initialMessageCount) return false; // Don't animate pre-loaded messages
    const msg = messages[index];
    // Type guard: check if it's a message (not a date separator)
    if ('type' in msg && msg.type === 'date') return false;
    // Now we know msg is ChatHistoryMessage
    const historyMsg = msg as ChatHistoryMessage;
    return historyMsg.role !== 'user' && !historyMsg.isTypingComplete;
  };

  const bgStyle =
    backgroundImage || backgroundImageDark
      ? {
          backgroundImage: `url("${theme === 'dark' && backgroundImageDark ? backgroundImageDark : backgroundImage}")`,
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
        }
      : {};

  const handleImageUpload = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleSendMessage = (messageText?: string, imageFile?: File, submissionId?: string) => {
    // Use provided parameters or fall back to component state
    const finalMessage = messageText !== undefined ? messageText : message;
    const finalImage = imageFile !== undefined ? imageFile : selectedImage;

    if (!finalMessage.trim() && !finalImage) return;

    onSendMessage(finalMessage.trim(), finalImage || undefined, submissionId);
    setMessage('');
    setSelectedImage(null);
    setShouldFocus(true);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className='h-full w-full overflow-hidden'>
      <div className='h-[calc(100vh-5rem)] flex flex-col' style={bgStyle}>
        <div className={`flex-1 overflow-y-auto overflow-x-hidden w-full max-w-160 p-4 mx-auto ${containerClassName}`}>
          <div style={{ paddingBottom: '1rem' }}>
            {messages.map((msg, index) => {
              // Check if it's a date separator
              if ('type' in msg && msg.type === 'date') {
                return <DateSeparator key={`date-${index}`} date={msg.date} theme={theme} />;
              }

              // Type guard: now TypeScript knows msg is ChatHistoryMessage
              const historyMsg = msg as ChatHistoryMessage;
              const isUser = historyMsg.role === 'user';
              const sender = isUser ? 'user' : 'other';
              const shouldUseTyping = isLastReceivedMessage(index);

              // Determine if this message is new (added after initial render)
              const isNewMessage = index >= initialMessageCount;
              const animationClass = isNewMessage ? (isUser ? 'animate-slide-in-right' : 'animate-slide-in-left') : '';

              // Generate message ID
              const msgId = `msg-${index}`;

              // Determine context menu items
              let contextMenuItems;
              if (contextMenuConfig?.enabled !== false) {
                if (contextMenuConfig?.items) {
                  // Use custom items if provided
                  contextMenuItems = contextMenuConfig.items;
                } else {
                  // Use default items
                  const defaultItems = createDefaultContextMenuItems(isUser);
                  // Append custom items if provided
                  contextMenuItems = contextMenuConfig?.customItems ? [...defaultItems, ...contextMenuConfig.customItems] : defaultItems;
                }
              }

              // Common props for both Message and TypingMessage
              const commonProps = {
                sender: sender as 'user' | 'other',
                showAvatar: true,
                showUsername: false,
                showTimestamp: false,
                groupPosition: 'standalone' as const,
                className: animationClass,
                messageId: msgId,
                contextMenuItems,
                theme,
                sentIcon,
                readIcon,
              };

              if (historyMsg.image) {
                // Message with image
                return (
                  <Message
                    key={index}
                    {...commonProps}
                    content={
                      <>
                        <img
                          src={historyMsg.image}
                          alt='Uploaded'
                          style={{
                            maxWidth: '100%',
                            borderRadius: '0.5rem',
                            marginBottom: '0.5rem',
                          }}
                        />
                        <div>{historyMsg.content}</div>
                      </>
                    }
                  />
                );
              }

              // Use TypingMessage for last received message
              if (shouldUseTyping) {
                return <TypingMessage key={index} {...commonProps} text={historyMsg.content} typingSpeed={15} onComplete={scrollToBottom} />;
              }

              // Regular message
              return <Message key={index} {...commonProps} content={historyMsg.content} />;
            })}
            {isPending && (
              <Message
                sender='other'
                showAvatar={true}
                showUsername={false}
                showTimestamp={false}
                groupPosition='standalone'
                content={<span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>...</span>}
                theme={theme}
              />
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
        {!isHistoryCompleted && (
          <div className='w-full'>
            <ChatInput
              value={message}
              onChange={(value) => setMessage(value)}
              onSend={(messageText, imageFile) => handleSendMessage(messageText, imageFile)}
              disabled={isPending}
              isLoading={isPending}
              enableMediaUpload={true}
              mediaButton={{
                accept: 'image/*',
                onUpload: handleImageUpload,
                icon: attachmentIcon,
              }}
              sendButton={{
                icon: sendIcon,
              }}
              voiceButton={{
                icon: microphoneIcon,
              }}
              closeIcon={closeIcon}
              placeholder='Enter message...'
              autoFocus={shouldFocus}
              autoGrow={true}
              maxRows={10}
              className='bg-transparent px-40'
              theme={theme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
