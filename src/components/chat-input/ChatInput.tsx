import { FC, useState, useRef, useEffect, KeyboardEvent, ChangeEvent, MouseEvent, cloneElement } from 'react';
import type { ChatInputProps } from '../../types/chat-input';
import '../../styles/Chat.animations.css';

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

/**
 * ChatInput - Auto-growing textarea with media upload and voice support
 *
 * @component
 *
 * ## Key Behaviors
 * - Enter: send message (desktop), new line (mobile)
 * - Shift+Enter: new line (desktop)
 * - Auto-grows up to `maxRows` (default: 10)
 * - Send button replaces voice button when text/media present
 * - Ripple effect on send button click
 * - Multi-line detection at ~52px height threshold
 *
 * ## Theming Variables
 * - `--chat-input-bg` / `--chat-input-bg-dark`
 * - `--chat-input-text` / `--chat-input-text-dark`
 * - `--chat-input-border` / `--chat-input-border-dark`
 * - `--chat-input-border-focus`
 * - `--chat-button-primary-bg` / `--chat-button-primary-bg-hover`
 * - See THEMING.md for complete list
 *
 * @example
 * ```tsx
 * <ChatInput
 *   value={message}
 *   onChange={setMessage}
 *   onSend={(text, image) => handleSend(text, image)}
 *   enableMediaUpload={true}
 *   mediaButton={{ icon: <Paperclip />, accept: 'image/*' }}
 *   sendButton={{ icon: <Send /> }}
 *   closeIcon={<X />}
 *   theme="light"
 * />
 * ```
 */
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
  searchButton,
  studyButton,
  imageGenerationButton,
  variant = 'default',
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
    const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (e.key === 'Enter') {
      // Mobile: Default behavior (new line)
      if (isMobile) {
        return;
      }

      // Desktop: Shift+Enter -> New line
      if (e.shiftKey) {
        return;
      }

      // Desktop: Enter -> Send
      e.preventDefault();
      handleSend();
    }
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
    <div className={`flex flex-col gap-2 w-full max-w-160 mx-auto p-4 ${theme === 'dark' ? 'bg-input-bg-dark' : 'bg-input-bg'} ${className}`} role='form' aria-label='Message input form'>
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
          <img
            src={mediaPreview}
            alt='Selected media preview'
            className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border ${theme === 'dark' ? 'border-input-border-dark' : 'border-input-border'}`}
          />
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
        className={`relative flex ${variant === 'extended' ? 'flex-col' : 'items-end'} ${
          theme === 'dark'
            ? 'bg-input-bg-dark border-input-border-dark/50 hover:border-input-border-dark/70 focus-within:border-input-border-focus'
            : 'bg-input-bg border-input-border/50 hover:border-input-border/70 focus-within:border-input-border-focus'
        } rounded-3xl border transition-all ${variant !== 'extended' && isMultiLine ? 'pb-13' : ''}`}
      >
        {/* Voice Recording Overlay */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-between px-2 rounded-3xl transition-all duration-200 ${theme === 'dark' ? 'bg-input-bg-dark' : 'bg-input-bg'} ${
            voiceButton?.isRecording ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          {/* Cancel Button */}
          <button
            onClick={voiceButton?.onCancelRecording}
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors`}
            aria-label='Cancel recording'
            type='button'
          >
            {closeIcon ? (
              cloneElement(closeIcon, { size: 20 } as any)
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            )}
          </button>

          {/* Dynamic Waveform */}
          <div className='flex-1 flex items-center justify-center gap-[3px] h-8 mx-4 overflow-hidden'>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'} animate-waveform`}
                style={{
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.8 + Math.random() * 0.5}s`,
                  height: '4px', // Fallback/Initial
                }}
              />
            ))}
          </div>

          {/* Send / Confirm Button */}
          <button
            onClick={voiceButton?.onStopRecording}
            className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-blue-500 dark:text-blue-400 transition-colors`}
            aria-label='Send voice message'
            type='button'
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          </button>
        </div>

        {/* Text Input Content (Always rendered, hidden via opacity when recording) */}
        <div
          className={`w-full relative flex ${variant === 'extended' ? 'flex-col' : 'items-end'} transition-opacity duration-200 ${
            voiceButton?.isRecording ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Media upload button - Default Variant (Internal) */}
          {variant !== 'extended' && enableMediaUpload && (
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
                    theme === 'dark'
                      ? 'text-input-placeholder-dark border-input-border-dark hover:text-input-text-dark hover:bg-menu-hover-bg-dark'
                      : 'text-input-placeholder border-input-border hover:text-input-text hover:bg-menu-hover-bg'
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
              theme === 'dark'
                ? 'text-input-text-dark placeholder:text-input-placeholder-dark disabled:text-input-placeholder-dark/60'
                : 'text-input-text placeholder:text-input-placeholder disabled:text-input-placeholder/60'
            } text-base min-h-11 ${variant !== 'extended' && enableMediaUpload ? 'pl-14' : ''} ${
              variant !== 'extended' && (!enableVoiceInput || internalValue.trim() || selectedMedia) ? 'pr-14' : 'pr-4'
            } ${inputClassName}`}
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
            <span
              className={`absolute right-14 bottom-3 text-xs ${theme === 'dark' ? 'text-input-placeholder-dark' : 'text-input-placeholder'} pointer-events-none`}
              aria-live='polite'
              aria-atomic='true'
            >
              {internalValue.length}/{maxLength}
            </span>
          )}

          {/* Default Variant Buttons (Internal) */}
          {variant !== 'extended' && (
            <>
              {/* Voice input button */}
              {enableVoiceInput && !internalValue.trim() && !selectedMedia && (
                <>
                  {voiceButton?.component || (
                    <button
                      onClick={voiceButton?.onStartRecording}
                      disabled={disabled || isLoading || voiceButton?.disabled}
                      className={`absolute right-2 bottom-1/2 translate-y-1/2 p-2 ${
                        theme === 'dark'
                          ? 'text-input-placeholder-dark hover:text-input-text-dark hover:bg-menu-hover-bg-dark border-input-border-dark'
                          : 'text-input-placeholder hover:text-input-text hover:bg-menu-hover-bg border-input-border'
                      } rounded-full select-none transition-all border disabled:cursor-not-allowed ${voiceButton?.className || ''}`}
                      type='button'
                      aria-label={voiceButton?.isRecording ? 'Recording voice message' : voiceAriaLabel}
                    >
                      {voiceButton?.icon ? cloneElement(voiceButton.icon, { size: 20 } as any) : null}
                    </button>
                  )}
                </>
              )}

              {/* Send button */}
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
                            ? 'bg-transparent text-button-disabled-text border-input-border-dark'
                            : 'bg-transparent text-button-disabled-text border-input-border'
                          : theme === 'dark'
                          ? 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:scale-95 border-transparent'
                          : 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:scale-95 border-transparent'
                      } ${sendButton?.className || ''}`}
                      type='button'
                      aria-label={sendAriaLabel}
                      aria-disabled={sendButton?.disabled !== undefined ? sendButton.disabled : isSendDisabled}
                    >
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
            </>
          )}

          {/* Extended Variant Toolbar */}
          {variant === 'extended' && (
            <div className={`flex items-center justify-between px-3 pb-2 pt-1 gap-2 ${/* Optional separator border if needed */ ''}`}>
              <div className='flex items-center gap-2 overflow-x-auto no-scrollbar flex-1'>
                {/* Hidden Input for Extended Mode */}
                {enableMediaUpload && (
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept={mediaButton?.accept || 'image/*'}
                    onChange={handleMediaSelect}
                    className='hidden'
                    disabled={disabled || isLoading || mediaButton?.disabled}
                    aria-label={mediaAriaLabel}
                  />
                )}
                {/* Attach Pill */}
                {enableMediaUpload && (
                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || isLoading || mediaButton?.disabled}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap border ${
                      theme === 'dark'
                        ? 'bg-input-bg-dark border-input-border-dark hover:bg-menu-hover-bg-dark text-input-text-dark'
                        : 'bg-input-bg border-input-border hover:bg-menu-hover-bg text-input-text'
                    } ${mediaButton?.className || ''}`}
                  >
                    {mediaButton?.icon ? cloneElement(mediaButton.icon, { size: 16 } as any) : null}
                    <span>{mediaButton?.label || 'Attach'}</span>
                  </button>
                )}

                {/* Search Pill */}
                {searchButton && (
                  <button
                    type='button'
                    onClick={searchButton.onClick}
                    disabled={disabled || isLoading || searchButton.disabled}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap border ${
                      theme === 'dark'
                        ? 'bg-input-bg-dark border-input-border-dark hover:bg-menu-hover-bg-dark text-input-text-dark'
                        : 'bg-input-bg border-input-border hover:bg-menu-hover-bg text-input-text'
                    } ${searchButton.className || ''}`}
                  >
                    {searchButton.icon ? cloneElement(searchButton.icon, { size: 16 } as any) : null}
                    <span>{searchButton.label || 'Search'}</span>
                  </button>
                )}

                {/* Study Pill */}
                {studyButton && (
                  <button
                    type='button'
                    onClick={studyButton.onClick}
                    disabled={disabled || isLoading || studyButton.disabled}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap border ${
                      theme === 'dark'
                        ? 'bg-input-bg-dark border-input-border-dark hover:bg-menu-hover-bg-dark text-input-text-dark'
                        : 'bg-input-bg border-input-border hover:bg-menu-hover-bg text-input-text'
                    } ${studyButton.className || ''}`}
                  >
                    {studyButton.icon ? cloneElement(studyButton.icon, { size: 16 } as any) : null}
                    <span>{studyButton.label || 'Study'}</span>
                  </button>
                )}

                {/* Image Gen Pill */}
                {imageGenerationButton && (
                  <button
                    type='button'
                    onClick={imageGenerationButton.onClick}
                    disabled={disabled || isLoading || imageGenerationButton.disabled}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap border ${
                      theme === 'dark'
                        ? 'bg-input-bg-dark border-input-border-dark hover:bg-menu-hover-bg-dark text-input-text-dark'
                        : 'bg-input-bg border-input-border hover:bg-menu-hover-bg text-input-text'
                    } ${imageGenerationButton.className || ''}`}
                  >
                    {imageGenerationButton.icon ? cloneElement(imageGenerationButton.icon, { size: 16 } as any) : null}
                    <span>{imageGenerationButton.label || 'Create image'}</span>
                  </button>
                )}
              </div>

              {/* Voice / Send Action - Extended Position */}
              <div className='flex items-center gap-2 shrink-0 ml-1'>
                {/* Voice Button */}
                {enableVoiceInput && !internalValue.trim() && !selectedMedia ? (
                  <>
                    {voiceButton?.component || (
                      <button
                        onMouseDown={voiceButton?.onStartRecording}
                        onMouseUp={voiceButton?.onStopRecording}
                        onMouseLeave={voiceButton?.onStopRecording}
                        onTouchStart={voiceButton?.onStartRecording}
                        onTouchEnd={voiceButton?.onStopRecording}
                        disabled={disabled || isLoading || voiceButton?.disabled}
                        className={`p-2 ${
                          theme === 'dark'
                            ? 'text-input-placeholder-dark hover:text-input-text-dark hover:bg-menu-hover-bg-dark'
                            : 'text-input-placeholder hover:text-input-text hover:bg-menu-hover-bg'
                        } rounded-full select-none transition-all ${voiceButton?.className || ''}`}
                        type='button'
                        aria-label={voiceButton?.isRecording ? 'Recording voice message, release to stop' : voiceAriaLabel}
                      >
                        {voiceButton?.icon ? cloneElement(voiceButton.icon, { size: 20 } as any) : null}
                      </button>
                    )}
                  </>
                ) : (
                  /* Send Button */
                  <>
                    {sendButton?.component || (
                      <button
                        ref={sendButtonRef}
                        onClick={(e) => {
                          createRipple(e);
                          (sendButton?.onClick || handleSend)();
                        }}
                        disabled={sendButton?.disabled !== undefined ? sendButton.disabled : isSendDisabled}
                        className={`p-2 rounded-full transition-all disabled:cursor-not-allowed overflow-hidden ${
                          isSendDisabled
                            ? theme === 'dark'
                              ? 'bg-transparent text-button-disabled-text'
                              : 'bg-transparent text-button-disabled-text'
                            : theme === 'dark'
                            ? 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:scale-95'
                            : 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:scale-95'
                        } ${sendButton?.className || ''}`}
                        type='button'
                        aria-label={sendAriaLabel}
                      >
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
