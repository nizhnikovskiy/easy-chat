import { ImageIcon, MicrophoneIcon } from './components/base/Icons';
import type { FC } from 'react';
import { Button } from './components/base/Button';
import { Switch } from './components/base/Switch';
import { useState, useEffect, useCallback } from 'react';
import { useReflection } from './context/ReflectionContext';
import { usePushToTalk } from './hooks/usePushToTalk';
import type { ChatHistoryMessage } from './types/types';
import { MessageRole } from './types/types';

interface ChatInputProps {
  message: string;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  isPending: boolean;
  isVoiceMode: boolean;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendMessage: (message?: string, image?: File, submissionId?: string) => void;
  onModeChange: (isVoiceMode: boolean) => void;
  onUploadMedia: (file: File | null) => void;
  isMomentCapture: boolean;
  selectedImage: File | null;
  pushMessage: (message: ChatHistoryMessage) => void;
  onVoiceTranscription?: (userMessage: string, botAnswer: string, isFinished?: boolean) => void;
  avatarRef?: { interrupt: () => void } | null;
}

const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
  return validTypes.includes(file.type);
};

export const ChatInput: FC<ChatInputProps> = ({
  message,
  inputRef,
  isPending,
  isVoiceMode,
  onMessageChange,
  onKeyDown,
  onSendMessage,
  onModeChange,
  onUploadMedia,
  isMomentCapture,
  selectedImage,
  pushMessage,
  onVoiceTranscription,
  avatarRef,
}) => {
  const {
    state: { reflectionId },
  } = useReflection();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [localSelectedImage, setLocalSelectedImage] = useState<File | null>(null);
  const [waitingToSend, setWaitingToSend] = useState(false);

  // Debug reflection ID
  useEffect(() => {
    console.log('[ChatInput] Reflection ID:', reflectionId);
  }, [reflectionId]);

  const handleTranscriptionComplete = useCallback(
    (userMessage: string, botAnswer: string, isFinished?: boolean) => {
      pushMessage({
        content: userMessage,
        role: MessageRole.USER,
        isTypingComplete: true,
        isLoading: false,
      });

      pushMessage({
        content: botAnswer,
        role: MessageRole.ASSISTANT,
        isTypingComplete: true,
        isLoading: false,
      });

      if (onVoiceTranscription) {
        onVoiceTranscription(userMessage, botAnswer, isFinished);
      }

      if (isFinished) {
        // Handle reflection completion if needed
        // This might need to be passed down from parent component
      }
    },
    [pushMessage, onVoiceTranscription]
  );

  const { isRecording, isProcessing, startRecording, stopRecording } = usePushToTalk({
    reflectionId: reflectionId || undefined,
    onTranscriptionComplete: handleTranscriptionComplete,
    onProcessingStart: () => {
      console.log('Processing audio...');
    },
    onRecordingStart: () => {
      console.log('Recording started');
      // Interrupt avatar speech when recording starts
      if (avatarRef?.interrupt) {
        avatarRef.interrupt();
      }
    },
    onRecordingStop: () => {
      console.log('Recording stopped');
    },
    onError: (error) => {
      console.error('Voice recording error:', error);
      setUploadError(error);
    },
  });

  // Debug state changes
  useEffect(() => {
    console.log('[ChatInput] State changed:', {
      isRecording,
      isProcessing,
      isVoiceMode,
    });
    if (isRecording && !isProcessing && !isVoiceMode) {
      stopRecording();
    }
  }, [isRecording, isProcessing, isVoiceMode]);

  // Effect to send message after parent's selectedImage is updated
  useEffect(() => {
    if (waitingToSend && selectedImage && !isVoiceMode) {
      setWaitingToSend(false);
      setLocalSelectedImage(null);
      setIsUploading(false);
      onSendMessage();
    }
  }, [selectedImage, waitingToSend, isVoiceMode, onSendMessage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      try {
        setUploadError(null);

        if (!isValidImageFile(file)) {
          throw new Error('Please select a valid image file (JPEG, PNG, GIF, WEBP, BMP, or TIFF)');
        }

        setLocalSelectedImage(file);
        e.target.value = '';
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Failed to select image');
      }
    }
  };

  const handleSendMessage = async () => {
    if (localSelectedImage) {
      setIsUploading(true);
      try {
        // In voice mode, send directly with submission ID
        if (isVoiceMode) {
          const submissionId = Date.now().toString(); // Simple unique ID
          setLocalSelectedImage(null);
          setIsUploading(false);
          // Call onSendMessage directly with the message, image, and submissionId
          onSendMessage(message, localSelectedImage, submissionId);
          return;
        }

        // For text mode, still use the old flow with state
        onUploadMedia(localSelectedImage);
        setWaitingToSend(true);
        return;
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
        setIsUploading(false);
        return;
      }
    }

    // Send the message (no image case)
    onSendMessage(message);
  };

  const handleRemoveImage = () => {
    setLocalSelectedImage(null);
    onUploadMedia(null);
  };

  const handleMouseDown = () => {
    console.log('[ChatInput] Mouse down event:', {
      isVoiceMode,
      isRecording,
      isProcessing,
      eventType: 'mousedown',
    });

    if (isVoiceMode && !isRecording && !isProcessing) {
      console.log('[ChatInput] Starting recording from mouse down');
      startRecording();
    } else {
      console.log('[ChatInput] Cannot start recording:', {
        isVoiceMode,
        isRecording,
        isProcessing,
      });
    }
  };

  const handleMouseUp = () => {
    console.log('[ChatInput] Mouse up event:', {
      isVoiceMode,
      isRecording,
      isProcessing,
      eventType: 'mouseup',
    });

    if (isVoiceMode && isRecording) {
      console.log('[ChatInput] Stopping recording from mouse up');
      stopRecording();
    } else {
      console.log('[ChatInput] Cannot stop recording:', {
        isVoiceMode,
        isRecording,
        isProcessing,
      });
    }
  };

  const handleMouseLeave = () => {
    console.log('[ChatInput] Mouse leave event:', {
      isVoiceMode,
      isRecording,
      isProcessing,
      eventType: 'mouseleave',
    });

    if (isVoiceMode && isRecording) {
      console.log('[ChatInput] Stopping recording from mouse leave');
      stopRecording();
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('[ChatInput] Touch start event:', {
      isVoiceMode,
      isRecording,
      isProcessing,
      eventType: 'touchstart',
    });

    e.preventDefault(); // Prevent mouse events from firing
    if (isVoiceMode && !isRecording && !isProcessing) {
      console.log('[ChatInput] Starting recording from touch start');
      startRecording();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    console.log('[ChatInput] Touch end event:', {
      isVoiceMode,
      isRecording,
      isProcessing,
      eventType: 'touchend',
    });

    e.preventDefault(); // Prevent mouse events from firing
    if (isVoiceMode && isRecording) {
      console.log('[ChatInput] Stopping recording from touch end');
      stopRecording();
    }
  };

  // Handle touch cancel (when user drags out of button)
  const handleTouchCancel = (e: React.TouchEvent) => {
    console.log('[ChatInput] Touch cancel event:', {
      isVoiceMode,
      isRecording,
      isProcessing,
      eventType: 'touchcancel',
    });

    e.preventDefault();
    if (isVoiceMode && isRecording) {
      console.log('[ChatInput] Stopping recording from touch cancel');
      stopRecording();
    }
  };

  const displayImage = selectedImage || localSelectedImage;

  return (
    <div
      className={`flex flex-col gap-2 p-6 shrink-0 ${
        isVoiceMode ? 'h-23' : 'h-38.5'
      } fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl rounded-t-4xl shadow-[0px_0px_24px_0px_#08281024] bg-white`}
    >
      {!isVoiceMode && (
        <textarea
          autoFocus
          ref={inputRef}
          value={message}
          onChange={onMessageChange}
          onKeyDown={onKeyDown}
          className='!outline-none h-14 text-lg leading-6.5 placeholder:text-text-300 text-text-900'
          placeholder='Type your message...'
          disabled={isProcessing}
        />
      )}
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-2 w-50'>
          {isMomentCapture && (
            <>
              <input
                type='file'
                id='media-upload'
                data-testid='media-upload'
                accept='image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff'
                className='hidden'
                onChange={handleFileChange}
                disabled={isUploading || isRecording || isProcessing}
              />
              <div className='w-60'>
                <Button type='button' variant='outline' onClick={() => document.getElementById('media-upload')?.click()} disabled={isUploading || isRecording || isProcessing} className='h-10'>
                  <div className='flex items-center gap-2'>
                    <ImageIcon /> {isUploading ? 'Uploading...' : 'Upload image'}
                  </div>
                </Button>
              </div>
              {displayImage && (
                <div className='relative h-10 w-10'>
                  <img src={URL.createObjectURL(displayImage)} alt='Selected' className='w-full h-full object-cover rounded-lg' />
                  <button
                    onClick={handleRemoveImage}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm'
                    disabled={isRecording || isProcessing}
                  >
                    ×
                  </button>
                </div>
              )}
              {uploadError && <div className='text-red-500 text-sm'>{uploadError}</div>}
            </>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <Switch checked={isVoiceMode} onChange={onModeChange} leftLabel='Text' rightLabel='Voice' />
        </div>
        <div className='w-40'>
          {isVoiceMode && (!isMomentCapture || !displayImage) ? (
            <Button
              type='button'
              color={isRecording ? 'secondary' : 'primary'}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              disabled={isProcessing}
              className='select-none pointer-events-auto'
              style={{ pointerEvents: isProcessing ? 'none' : 'auto' }}
            >
              <div className='flex items-center gap-2'>
                <MicrophoneIcon size={20} />
                {isRecording ? 'Recording...' : isProcessing ? 'Processing...' : 'Hold to talk'}
              </div>
            </Button>
          ) : (
            <Button type='button' color='primary' onClick={handleSendMessage} disabled={(!message.trim() && !displayImage) || isPending || isUploading || isRecording || isProcessing}>
              Send message
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
