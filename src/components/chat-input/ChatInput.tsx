import { FC, useState, useRef, useEffect, KeyboardEvent, ChangeEvent, MouseEvent, cloneElement } from 'react';
import type { ChatInputProps } from '@/types/chat-input';

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const ChatInput: FC<ChatInputProps> = ({
  value = '',
  onChange,
  onSend,
  placeholder = 'Type a message...',
  disabled = false,
  isLoading = false,
  maxLength,
  showCharacterCount = false,

  enableMediaUpload = false,
  mediaButton,

  enableVoiceInput = false,
  voiceButton,

  sendButton,

  className = '',
  inputClassName = '',

  autoFocus = false,
  autoGrow = true,
  maxRows = 10,

  error = false,
  errorMessage,

  ariaLabel = 'Message input',
  sendAriaLabel = 'Send message',
  mediaAriaLabel = 'Attach media',
  voiceAriaLabel = 'Record voice message',
  theme = 'light',
  closeIcon,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMultiLine, setIsMultiLine] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const errorMessageId = useRef(`chat-input-error-${Math.random().toString(36).substr(2, 9)}`);

  // Sync external value with internal state
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      if (autoGrow) {
        textareaRef.current.style.height = 'auto';
      }

      const scrollHeight = textareaRef.current.scrollHeight;

      // Check if content exceeds single line height (approx 44px min-height + margin)
      // Using 52px as a safe threshold for > 1 line
      const isMulti = scrollHeight > 52;
      if (isMulti !== isMultiLine) {
        setIsMultiLine(isMulti);
      }

      if (autoGrow) {
        const lineHeight = 24; // approximate line height
        const maxHeight = lineHeight * maxRows;
        const newHeight = `${Math.min(scrollHeight, maxHeight)}px`;
        textareaRef.current.style.height = newHeight;
      }
    }
  }, [internalValue, autoGrow, maxRows, isMultiLine]);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  // Handle send message
  const handleSend = () => {
    if (disabled || isLoading) return;

    const messageToSend = internalValue.trim();
    if (!messageToSend && !selectedMedia) return;

    onSend?.(messageToSend, selectedMedia || undefined);

    // Announce to screen readers
    setAnnouncement('Message sent');
    setTimeout(() => setAnnouncement(''), 1000);

    // Clear input and media after sending
    setInternalValue('');
    setSelectedMedia(null);
    setMediaPreview(null);
    onChange?.('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Return focus to input
    textareaRef.current?.focus();
  };

  // Handle Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Only send on Ctrl+Enter or Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
    // Regular Enter key creates a new line (default textarea behavior)
  };

  // Handle media upload
  const handleMediaSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedMedia(file);
    mediaButton?.onUpload?.(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setMediaPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle remove media
  const handleRemoveMedia = () => {
    setSelectedMedia(null);
    setMediaPreview(null);
  };

  // Handle ripple effect on send button click
  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (!sendButtonRef.current) return;

    const button = sendButtonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  // Clean up ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;

    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);

    return () => clearTimeout(timer);
  }, [ripples]);

  // Determine if send button should be disabled
  const isSendDisabled = disabled || isLoading || (!internalValue.trim() && !selectedMedia);

  return (
    <div className={`flex flex-col gap-2 w-full max-w-250 mx-auto p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} ${className}`} role='form' aria-label='Message input form'>
      {/* Screen reader announcements */}
      <div role='status' aria-live='polite' aria-atomic='true' className='sr-only'>
        {announcement}
      </div>

      {/* Error message for screen readers */}
      {error && errorMessage && (
        <div id={errorMessageId.current} role='alert' aria-live='assertive' className='text-xs text-red-600 px-2 mb-1'>
          {errorMessage}
        </div>
      )}

      {/* Media preview */}
      {selectedMedia && mediaPreview && (
        <div className='relative inline-block mb-2'>
          <img src={mediaPreview} alt='Selected media preview' className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200' />
          <button
            onClick={handleRemoveMedia}
            className='absolute -top-2 -right-2 min-w-[28px] min-h-[28px] w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors'
            type='button'
            aria-label='Remove media attachment'
          >
            {closeIcon ? cloneElement(closeIcon, { size: 14 } as any) : null}
          </button>
        </div>
      )}

      {/* Input area with integrated buttons */}
      <div
        className={`relative flex items-end ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700/50 hover:border-gray-600/70 focus-within:border-gray-500'
            : 'bg-white border-gray-200/50 hover:border-gray-300/70 focus-within:border-gray-400'
        } rounded-3xl border transition-all ${isMultiLine ? 'pb-13' : ''}`}
      >
        {/* Media upload button - positioned inside on the left */}
        {enableMediaUpload && (
          <>
            <input
              ref={fileInputRef}
              type='file'
              accept={mediaButton?.accept || 'image/*'}
              onChange={handleMediaSelect}
              className='hidden'
              disabled={disabled || isLoading || mediaButton?.disabled}
              aria-label={mediaAriaLabel}
              id='media-upload-input'
            />
            {mediaButton?.component || (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isLoading || mediaButton?.disabled}
                className={`absolute left-2 bottom-1.5 p-2 ${
                  theme === 'dark' ? 'text-gray-400 border-gray-700 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 border-gray-200 hover:text-gray-700 hover:bg-gray-100'
                } rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed border hover:border-transparent ${mediaButton?.className || ''}`}
                type='button'
                aria-label={mediaAriaLabel}
                aria-describedby={error && errorMessage ? errorMessageId.current : undefined}
              >
                {mediaButton?.icon ? cloneElement(mediaButton.icon, { size: 20 } as any) : null}
              </button>
            )}
          </>
        )}

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          autoFocus={autoFocus}
          rows={1}
          className={`block w-full px-4 py-3 bg-transparent border-0 resize-none focus:outline-none ${
            theme === 'dark' ? 'text-gray-100 placeholder:text-gray-500 disabled:text-gray-600' : 'text-gray-900 placeholder:text-gray-400 disabled:text-gray-500'
          } text-base min-h-11 ${enableMediaUpload ? 'pl-14' : ''} ${!enableVoiceInput || internalValue.trim() || selectedMedia ? 'pr-14' : 'pr-4'} ${inputClassName}`}
          style={{
            maxHeight: `${24 * maxRows}px`,
          }}
          aria-label={ariaLabel}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? errorMessageId.current : undefined}
          aria-multiline='true'
        />

        {/* Character counter */}
        {showCharacterCount && maxLength && (
          <span className='absolute right-14 bottom-3 text-xs text-gray-400 pointer-events-none' aria-live='polite' aria-atomic='true'>
            {internalValue.length}/{maxLength}
          </span>
        )}

        {/* Voice input button - shows when voice is enabled and no text/media, positioned inside on the right */}
        {enableVoiceInput && !internalValue.trim() && !selectedMedia && (
          <>
            {voiceButton?.component || (
              <button
                onMouseDown={voiceButton?.onStartRecording}
                onMouseUp={voiceButton?.onStopRecording}
                onMouseLeave={voiceButton?.onStopRecording}
                onTouchStart={voiceButton?.onStartRecording}
                onTouchEnd={voiceButton?.onStopRecording}
                disabled={disabled || isLoading || voiceButton?.disabled}
                className={`absolute right-2 bottom-1/2 translate-y-1/2 p-2 ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700 border-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-gray-200'
                } rounded-full select-none transition-all border disabled:cursor-not-allowed ${voiceButton?.className || ''}`}
                type='button'
                aria-label={voiceButton?.isRecording ? 'Recording voice message, release to stop' : voiceAriaLabel}
                aria-pressed={voiceButton?.isRecording}
              >
                {voiceButton?.icon ? cloneElement(voiceButton.icon, { size: 20 } as any) : null}
              </button>
            )}
          </>
        )}

        {/* Send button - shows when there is text/media OR voice is disabled, positioned inside on the right */}
        {(!enableVoiceInput || internalValue.trim() || selectedMedia) && (
          <>
            {sendButton?.component || (
              <button
                ref={sendButtonRef}
                onClick={(e) => {
                  createRipple(e);
                  (sendButton?.onClick || handleSend)();
                }}
                disabled={sendButton?.disabled !== undefined ? sendButton.disabled : isSendDisabled}
                className={`absolute right-2 bottom-1.5 p-2 rounded-full transition-all disabled:cursor-not-allowed overflow-hidden border ${
                  isSendDisabled
                    ? theme === 'dark'
                      ? 'bg-transparent text-gray-600 border-gray-700'
                      : 'bg-transparent text-gray-400 border-gray-200'
                    : theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 border-transparent'
                    : 'bg-black text-white hover:bg-gray-800 active:scale-95 border-transparent'
                } ${sendButton?.className || ''}`}
                type='button'
                aria-label={sendAriaLabel}
                aria-disabled={sendButton?.disabled !== undefined ? sendButton.disabled : isSendDisabled}
              >
                {/* Ripple effects */}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className='absolute rounded-full bg-white opacity-30 animate-ripple pointer-events-none'
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: ripple.size,
                      height: ripple.size,
                      animation: 'ripple 600ms ease-out',
                    }}
                  />
                ))}
                {sendButton?.icon ? cloneElement(sendButton.icon, { size: 20 } as any) : null}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
