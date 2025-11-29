import { Avatar } from './components/avatar/Avatar';
import { MessageList } from './MessageList';
import { ChatHistoryMessage, MessageRole } from './types/types';

interface ChatVoiceScreenProps {
  messages?: ChatHistoryMessage[];
  onModeChange: (isVoiceMode: boolean) => void;
  pendingSpeech?: string | null;
  onSpeechComplete?: () => void;
  onAvatarReady?: (avatarRef: { interrupt: () => void }) => void;
}

export const ChatVoiceScreen = ({ messages = [], onModeChange, pendingSpeech, onSpeechComplete, onAvatarReady }: ChatVoiceScreenProps) => {
  const lastUserMessageIndex = [...messages].reverse().findIndex((msg) => msg.role === MessageRole.USER);

  const filteredMessages =
    lastUserMessageIndex === -1
      ? messages
      : messages.slice(messages.length - lastUserMessageIndex - 1).map((msg) => ({
          ...msg,
          isTypingComplete: msg.role === MessageRole.USER,
        }));

  return (
    <div className='flex-1 flex flex-col overflow-x-hidden'>
      <div className='flex-1 relative overflow-hidden'>
        <div className='z-2 absolute left-1/2 -translate-x-1/2 bottom-23 min-h-26 px-6 pb-23 w-full max-w-6xl'>
          <MessageList messages={filteredMessages} isPending={false} voiceChatMode={true} onMessageUpdate={() => {}} />
        </div>
        <Avatar messages={messages} onModeChange={onModeChange} pendingSpeech={pendingSpeech} onSpeechComplete={onSpeechComplete} onAvatarReady={onAvatarReady} />
      </div>
    </div>
  );
};
