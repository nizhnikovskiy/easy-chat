import React, { createContext, useContext, useRef, ReactNode } from 'react';

interface AvatarImageContextType {
  triggerAvatarSpeech: (responseText: string) => void;
  registerSpeechHandler: (handler: (responseText: string) => void) => void;
}

const AvatarImageContext = createContext<AvatarImageContextType | undefined>(undefined);

interface AvatarImageProviderProps {
  children: ReactNode;
}

export const AvatarImageProvider: React.FC<AvatarImageProviderProps> = ({ children }) => {
  const speechHandlerRef = useRef<((responseText: string) => void) | null>(null);

  const registerSpeechHandler = (handler: (responseText: string) => void) => {
    speechHandlerRef.current = handler;
  };

  const triggerAvatarSpeech = (responseText: string) => {
    if (speechHandlerRef.current) {
      speechHandlerRef.current(responseText);
    } else {
      console.warn('[AvatarImageContext] No speech handler registered - avatar will not speak');
    }
  };

  const contextValue: AvatarImageContextType = {
    triggerAvatarSpeech,
    registerSpeechHandler,
  };

  return (
    <AvatarImageContext.Provider value={contextValue}>
      {children}
    </AvatarImageContext.Provider>
  );
};

export const useAvatarImage = (): AvatarImageContextType => {
  const context = useContext(AvatarImageContext);
  if (context === undefined) {
    throw new Error('useAvatarImage must be used within an AvatarImageProvider');
  }
  return context;
}; 