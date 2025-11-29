import { fetchAccessToken } from '../../mocks';
import StreamingAvatarApi, { AvatarQuality, StreamingEvents, TaskType } from '@heygen/streaming-avatar';
import { MessageRole } from '../../types/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAvatarImage } from '../../context/AvatarImageContext';
import loaderGif from '../../assets/loader.gif';

interface AvatarProps {
  messages?: Array<{
    content: string;
    role: MessageRole;
  }>;
  onModeChange?: (isVoiceMode: boolean) => void;
  pendingSpeech?: string | null;
  onSpeechComplete?: () => void;
  onAvatarReady?: (avatarRef: { interrupt: () => void }) => void;
}

export const Avatar = ({ messages, onModeChange, pendingSpeech, onSpeechComplete, onAvatarReady }: AvatarProps) => {
  const [stream, setStream] = useState<MediaStream | null>();
  const [avatarId] = useState<string>('85982826c0624ca1a59fba30d5804323');
  const [voiceId] = useState<string>('');
  const [isStreamReady, setIsStreamReady] = useState(false);
  const avatar = useRef<StreamingAvatarApi | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const avatarStopTalkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reflectionFinishedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const INACTIVITY_TIMEOUT = 120000;

  const { registerSpeechHandler } = useAvatarImage();

  const aliveRef = useRef(true);

  useEffect(() => {
    return () => {
      aliveRef.current = false;
      avatar.current?.stopAvatar();

      // Clear all timers to prevent memory leaks
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (avatarStopTalkingTimerRef.current) {
        clearTimeout(avatarStopTalkingTimerRef.current);
      }
      if (reflectionFinishedTimerRef.current) {
        clearTimeout(reflectionFinishedTimerRef.current);
      }
    };
  }, []);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (onModeChange) {
        avatar.current?.stopAvatar();
        onModeChange(false);
      }
    }, INACTIVITY_TIMEOUT);
  };

  async function grab() {
    await updateToken();

    if (!avatar.current) {
      return;
    }

    try {
      await avatar.current.createStartAvatar({
        avatarName: avatarId,
        quality: AvatarQuality.High,
        voice: { voiceId: voiceId },
      });
      setStream(avatar.current.mediaStream);
      resetInactivityTimer();
    } catch (error) {
      console.error('Error starting avatar session:', error);
    }
  }

  async function updateToken() {
    const newToken = await fetchAccessToken();
    avatar.current = new StreamingAvatarApi({ token: newToken });
    avatar.current?.on(StreamingEvents.STREAM_READY, () => {
      setIsStreamReady(true);
      resetInactivityTimer();
    });
    avatar.current?.on(StreamingEvents.AVATAR_START_TALKING, () => {
      console.log('Avatar started talking');
      resetInactivityTimer();
    });
    avatar.current?.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
      console.log('Avatar stopped talking');
      resetInactivityTimer();
    });
  }

  async function handleSpeak(textToSpeak: string) {
    await avatar.current?.speak({ text: textToSpeak, taskType: TaskType.REPEAT }).catch((e: any) => {
      console.log(e);
    });
  }

  useEffect(() => {
    async function init() {
      await updateToken();
      await grab();

      if (messages && messages.length > 0) {
        let assistantMessages: string[] = [];
        for (let i = messages.length - 1; i >= 0; i--) {
          const message = messages[i];
          if (message.role === MessageRole.ASSISTANT) {
            assistantMessages.unshift(message.content);
          } else {
            break;
          }
        }
        if (assistantMessages.length > 0) {
          await handleSpeak(assistantMessages.join(' '));
        }
      }
    }

    init();

    return () => {
      if (avatar.current) {
        avatar.current.stopAvatar();
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current!.play();
      };
    }
  }, [stream]);

  // Handle pending speech when it's set
  useEffect(() => {
    if (pendingSpeech && isStreamReady) {
      handleSpeak(pendingSpeech);
      onSpeechComplete?.();
    }
  }, [pendingSpeech, isStreamReady, onSpeechComplete]);

  // Expose interrupt method to parent
  const interruptAvatar = useCallback(() => {
    if (avatar.current) {
      console.log('Interrupting avatar speech using HeyGen SDK interrupt method');
      // Use the proper HeyGen SDK interrupt method
      avatar.current.interrupt().catch((error) => {
        console.error('Error interrupting avatar:', error);
        // Fallback to the previous workaround method if interrupt() fails
        console.log('Falling back to workaround interrupt method');
        avatar.current?.speak({ text: '.', taskType: TaskType.REPEAT }).catch((fallbackError) => {
          console.error('Fallback interrupt method also failed:', fallbackError);
        });
      });
    } else {
      console.warn('Cannot interrupt: avatar not initialized');
    }
  }, []);

  // Notify parent when avatar is ready
  useEffect(() => {
    if (isStreamReady && onAvatarReady) {
      onAvatarReady({ interrupt: interruptAvatar });
    }
  }, [isStreamReady, onAvatarReady, interruptAvatar]);

  // Register avatar speech handler for image responses
  useEffect(() => {
    if (isStreamReady && registerSpeechHandler) {
      const speechHandler = (responseText: string) => {
        if (responseText && isStreamReady && avatar.current) {
          handleSpeak(responseText);
        }
      };

      registerSpeechHandler(speechHandler);
    }
  }, [isStreamReady, registerSpeechHandler]);

  return (
    <div className='HeyGenStreamingAvatar'>
      {!isStreamReady && (
        <div className='absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center bg-opacity-50 z-20'>
          <img src={loaderGif} alt='Loading...' className='w-19 h-7.5' />
        </div>
      )}
      <header className='App-header'>
        <div className='MediaPlayer h-screen relative'>
          <video className='w-full h-full' playsInline autoPlay ref={videoRef} data-testid='avatar-video' onCanPlay={() => {}} />
        </div>
      </header>
    </div>
  );
};

Avatar.displayName = 'Avatar';

export default Avatar;
