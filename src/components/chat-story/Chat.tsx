import { FC, useRef, useState, useEffect, useCallback, RefObject } from 'react';
import chatBg from './assets/chat-background.png';
import { ReflectionSteps } from './constants/reflection';
import type { ChatHistoryMessage } from './types/types';
import { useReflection } from './context/ReflectionContext';
import { ChatInput } from './ChatInput';
import { ChatVoiceScreen } from './ChatVoiceScreen';
import { MessageList } from './MessageList';

interface ChatProps {
  messages: ChatHistoryMessage[];
  isPending: boolean;
  onSendMessage: (message: string, image?: File, submissionId?: string) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  pushMessage: (message: ChatHistoryMessage) => void;
  isHistoryCompleted?: boolean;
  reflectionStepFromHistory?: ReflectionSteps | null;
}

export const Chat: FC<ChatProps> = ({ messages, isPending, onSendMessage, messagesEndRef, pushMessage, isHistoryCompleted = false, reflectionStepFromHistory = null }) => {
  const { setIsReflectionFinished } = useReflection();
  const [message, setMessage] = useState('');
  const [shouldFocus, setShouldFocus] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pendingSpeech, setPendingSpeech] = useState<string | null>(null);
  const [avatarRef, setAvatarRef] = useState<{ interrupt: () => void } | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const bgStyle = {
    backgroundImage: `url("${chatBg}")`,
    backgroundRepeat: 'repeat',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceTranscription = (_userMessage: string, botAnswer: string, isFinished?: boolean) => {
    // Store the bot answer to be spoken by the avatar
    setPendingSpeech(botAnswer);

    if (isFinished) {
      setTimeout(() => {
        setIsReflectionFinished(true);
        setIsVoiceMode(false);
      }, 9000);
    }
  };

  const handleAvatarReady = useCallback((ref: { interrupt: () => void }) => {
    setAvatarRef(ref);
  }, []);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className='h-full w-full overflow-hidden'>
      <div className='h-[calc(100vh-5rem)] flex flex-col' style={isVoiceMode ? { backgroundColor: 'transparent' } : bgStyle}>
        <div className={`${isVoiceMode ? 'hidden' : 'block'} ${isHistoryCompleted ? '' : 'mb-38.5'} overflow-y-auto overflow-x-hidden w-full pl-6 pt-3 pr-0 pb-0 max-w-6xl mx-auto`}>
          <MessageList messages={messages} isPending={isPending} onMessageUpdate={scrollToBottom} />
          <div ref={messagesEndRef} />
        </div>
        {isVoiceMode && (
          <ChatVoiceScreen messages={messages} onModeChange={setIsVoiceMode} pendingSpeech={pendingSpeech} onSpeechComplete={() => setPendingSpeech(null)} onAvatarReady={handleAvatarReady} />
        )}
        <div>
          {!isHistoryCompleted && (
            <ChatInput
              message={message}
              inputRef={inputRef}
              isPending={isPending}
              onMessageChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onSendMessage={handleSendMessage}
              isVoiceMode={isVoiceMode}
              onModeChange={setIsVoiceMode}
              isMomentCapture={reflectionStepFromHistory === ReflectionSteps.MOMENTS}
              onUploadMedia={handleImageUpload}
              selectedImage={selectedImage}
              pushMessage={pushMessage}
              onVoiceTranscription={handleVoiceTranscription}
              avatarRef={avatarRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};
