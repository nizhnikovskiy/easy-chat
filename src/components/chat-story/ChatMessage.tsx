import assistant from './assets/avatars/assistant.png';
import { CheckIcon } from './components/base/Icons';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { AVATARS } from './constants/avatars';
import { useReflection } from './context/ReflectionContext';
import { MessageRole } from './types/types';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  content: string;
  role: MessageRole;
  isLastMessage?: boolean;
  isLoading?: boolean;
  isSubMessage?: boolean;
  shouldStartTyping?: boolean;
  image?: string;
  onTypingComplete?: () => void;
  onTypingUpdate?: () => void;
  voiceChatMode?: boolean;
}

const MessageContent: FC<{ content: string; image?: string; isLoading?: boolean }> = ({ content, image, isLoading }) => {
  if (isLoading) {
    return <ChatTypingIndicator />;
  }

  return (
    <>
      {image && (
        <div className='mb-2 max-w-[300px]'>
          <img src={image} alt='Message attachment' className='w-full h-auto rounded-lg object-cover' />
        </div>
      )}
      {content && <ReactMarkdown>{content}</ReactMarkdown>}
    </>
  );
};

const getMessageStyles = (isUser: boolean, voiceChatMode: boolean) => {
  if (voiceChatMode) {
    return isUser ? 'bg-bg-blue-200/80 rounded-br-none' : 'bg-white/80 text-text-900 rounded-bl-none';
  }

  return isUser ? 'rounded-br-none bg-bg-blue-200' : 'bg-white text-text-900 rounded-bl-none';
};

const ChatMessage: FC<ChatMessageProps> = ({ content, role, isLoading, isSubMessage, shouldStartTyping, onTypingComplete, onTypingUpdate, image, voiceChatMode = false }) => {
  const isUser = role === MessageRole.USER;
  const isTeacher = role === MessageRole.TEACHER;
  const {
    state: { avatar },
  } = useReflection();
  const assistantAvatar = assistant;

  const onTypingCompleteRef = useRef(onTypingComplete);
  const onTypingUpdateRef = useRef(onTypingUpdate);

  useEffect(() => {
    onTypingCompleteRef.current = onTypingComplete;
  }, [onTypingComplete]);

  useEffect(() => {
    onTypingUpdateRef.current = onTypingUpdate;
  }, [onTypingUpdate]);

  const getAvatarIcon = () => {
    if (avatar?.icon) return avatar.icon;

    const savedAvatarId = localStorage.getItem('selectedAvatar');
    if (savedAvatarId) {
      const savedAvatar = AVATARS.find((av) => av?.id === savedAvatarId);
      if (savedAvatar?.icon) return savedAvatar.icon;
    }

    return AVATARS[1]?.icon;
  };

  const userAvatar = getAvatarIcon();
  const [displayedContent, setDisplayedContent] = useState(isUser ? content : '');

  useEffect(() => {
    if (!isUser && shouldStartTyping && !isLoading) {
      let index = 0;
      const typingInterval = 10;
      const interval = setInterval(() => {
        if (index <= content.length) {
          setDisplayedContent(content.slice(0, index));
          onTypingUpdateRef.current?.();
          index++;
        } else {
          clearInterval(interval);
          onTypingCompleteRef.current?.();
        }
      }, typingInterval);

      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, isUser, shouldStartTyping, isLoading]);

  const messageStyles = getMessageStyles(isUser, voiceChatMode);
  const showAvatar = !isSubMessage;
  const avatarSrc = isUser ? userAvatar : assistantAvatar;
  const avatarAlt = isUser ? 'You' : isTeacher ? 'Teacher' : 'Lumen';

  const getRoleLabel = () => {
    if (isUser) return 'You';
    if (isTeacher) return 'Teacher';
    return !isSubMessage ? 'Lumen' : '';
  };

  if (voiceChatMode) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 mr-6`}>
        <div className={`p-3 rounded-2xl shadow-lg text-lg min-h-13 min-w-13 ${messageStyles}`}>
          <MessageContent content={displayedContent} image={image} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 mr-6`}>
      <div className='flex max-w-[80%] gap-3'>
        {!isUser && showAvatar && (
          <div>
            {isTeacher ? (
              <CheckIcon size={64} data-testid='check-icon' />
            ) : (
              <div className='w-16 h-16 flex items-center justify-center self-end'>
                <img src={avatarSrc} alt={avatarAlt} className='w-16 h-16 rounded-full' />
              </div>
            )}
          </div>
        )}
        <div className={!isUser && isSubMessage ? 'ml-19' : ''}>
          <div className={`text-md leading-6 text-text-500 mx-3 ${isUser ? 'text-right' : 'text-left'}`}>{getRoleLabel()}</div>
          <div className={`p-3 rounded-2xl shadow-lg text-lg min-h-13 min-w-13 ${messageStyles}`}>
            <MessageContent content={displayedContent} image={image} isLoading={isLoading} />
          </div>
        </div>
        {isUser && showAvatar && <img src={avatarSrc} alt={avatarAlt} className='w-16 h-16 rounded-full self-end' />}
      </div>
    </div>
  );
};

export default ChatMessage;
