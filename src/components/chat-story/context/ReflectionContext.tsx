import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Avatar } from '../constants/avatars';
import { ReflectionTypes, ReflectionSteps } from '../constants/reflection';

interface ReflectionStateItem {
  id: string;
  reflectionType: number;
  reflectionStep: number;
  attentionNeeded: string;
  createdAt: string;
  isCompleted: boolean;
  studentId: string;
  summary: string;
  feedback: {
    isSubmitted: boolean;
  };
}

interface ReflectionState {
  avatar: Avatar | null;
  reflectionTopic: keyof typeof ReflectionTypes | null;
  activity: ReflectionSteps | null;
  currentStep: number;
  reflectionId: string | null;
  reflectionStates: ReflectionStateItem[];
}

interface ReflectionContextType {
  state: ReflectionState;
  setAvatar: (avatar: Avatar | null) => void;
  setReflectionTopic: (topic: keyof typeof ReflectionTypes | null) => void;
  setActivity: (activity: ReflectionSteps | null) => void;
  setCurrentStep: (step: number) => void;
  setReflectionId: (id: string | null) => void;
  setReflectionStates: (states: ReflectionStateItem[]) => void;
  resetReflection: () => void;
  isReflectionFinished: boolean;
  setIsReflectionFinished: (finished: boolean) => void;
}

const initialState: ReflectionState = {
  avatar: null,
  reflectionTopic: null,
  activity: null,
  currentStep: 1,
  reflectionId: null,
  reflectionStates: [],
};

const ReflectionContext = createContext<ReflectionContextType | undefined>(undefined);

export function ReflectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReflectionState>(initialState);
  const [isReflectionFinished, setIsReflectionFinished] = useState(false);

  const setReflectionStates = useCallback((reflectionStates: ReflectionStateItem[]) => {
    setState((prev) => ({ ...prev, reflectionStates }));
  }, []);

  const setAvatar = useCallback((avatar: Avatar | null) => {
    setState((prev) => ({ ...prev, avatar }));
  }, []);

  const setReflectionTopic = useCallback((reflectionTopic: keyof typeof ReflectionTypes | null) => {
    setState((prev) => ({ ...prev, reflectionTopic }));
  }, []);

  const setActivity = useCallback((activity: ReflectionSteps | null) => {
    setState((prev) => ({ ...prev, activity }));
  }, []);

  const setCurrentStep = useCallback((currentStep: number) => {
    setState((prev) => ({ ...prev, currentStep }));
  }, []);

  const setReflectionId = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, reflectionId: id }));
  }, []);

  const resetReflection = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <ReflectionContext.Provider
      value={{
        state,
        setAvatar,
        setReflectionTopic,
        setActivity,
        setCurrentStep,
        setReflectionId,
        setReflectionStates,
        resetReflection,
        isReflectionFinished,
        setIsReflectionFinished,
      }}
    >
      {children}
    </ReflectionContext.Provider>
  );
}

export function useReflection() {
  const context = useContext(ReflectionContext);
  if (context === undefined) {
    throw new Error('useReflection must be used within a ReflectionProvider');
  }
  return context;
}
