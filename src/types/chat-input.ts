import type { ReactNode, ReactElement } from 'react';

/**
 * Props for customizing the send button
 */
export interface SendButtonProps {
  /** Custom send button component */
  component?: ReactNode;
  /** Icon for the send button */
  icon?: ReactElement;
  /** Button label text */
  label?: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Click handler */
  onClick?: () => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Props for customizing the media upload button
 */
export interface MediaButtonProps {
  /** Custom media button component */
  component?: ReactNode;
  /** Icon for the media/attachment button */
  icon?: ReactElement;
  /** Button label text */
  label?: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Accepted file types */
  accept?: string;
  /** Upload handler */
  onUpload?: (file: File) => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Props for customizing the voice input button
 */
export interface VoiceButtonProps {
  /** Custom voice button component */
  component?: ReactNode;
  /** Icon for the voice/microphone button */
  icon?: ReactElement;
  /** Button label when idle */
  idleLabel?: string;
  /** Button label when recording */
  recordingLabel?: string;
  /** Start recording handler */
  onStartRecording?: () => void;
  /** Stop recording handler */
  onStopRecording?: () => void;
  /** Audio stream for live visualization */
  audioStream?: MediaStream | null;
  /** Cancel recording handler */
  onCancelRecording?: () => void;
  /** Whether currently recording */
  isRecording?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
}

/**
 * Props for generic action buttons (Search, Study, etc.)
 */
export interface ActionButtonProps {
  /** Custom button component */
  component?: ReactNode;
  /** Icon for the button */
  icon?: ReactElement;
  /** Button label text */
  label?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** ARIA label */
  ariaLabel?: string;
}

/**
 * Main ChatInput component props
 */
export interface ChatInputProps {
  /** Current message value */
  value?: string;
  /** Change handler for message input */
  onChange?: (value: string) => void;
  /** Send message handler */
  onSend?: (message: string, media?: File) => void;
  /** Placeholder text for input */
  placeholder?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether component is in loading state */
  isLoading?: boolean;
  /** Maximum input length */
  maxLength?: number;
  /** Show character counter */
  showCharacterCount?: boolean;

  /** Enable media upload functionality */
  enableMediaUpload?: boolean;
  /** Media upload button customization */
  mediaButton?: MediaButtonProps;

  /** Enable voice input functionality */
  enableVoiceInput?: boolean;
  /** Voice input button customization */
  voiceButton?: VoiceButtonProps;

  /** Send button customization */
  sendButton?: SendButtonProps;

  /** Enable voice/text mode toggle */
  enableModeToggle?: boolean;
  /** Whether voice mode is active */
  isVoiceMode?: boolean;

  /** Custom container className */
  className?: string;
  /** Custom input className */
  inputClassName?: string;

  /** Auto-focus input on mount */
  autoFocus?: boolean;
  /** Auto-grow textarea */
  autoGrow?: boolean;
  /** Maximum number of rows for auto-grow */
  maxRows?: number;

  /** Error state */
  error?: boolean;
  /** Error message for screen readers */
  errorMessage?: string;

  /** ARIA label for the input */
  ariaLabel?: string;
  /** ARIA label for send button */
  sendAriaLabel?: string;
  /** ARIA label for media button */
  mediaAriaLabel?: string;
  /** ARIA label for voice button */
  voiceAriaLabel?: string;
  /** Theme variant for the input */
  theme?: 'light' | 'dark';
  /** Icon for closing/removing media attachments */
  closeIcon?: ReactElement;

  /** Input variant */
  variant?: 'default' | 'extended';

  /** Search button customization */
  searchButton?: ActionButtonProps;
  /** Study button customization */
  studyButton?: ActionButtonProps;
  /** Image generation button customization */
  imageGenerationButton?: ActionButtonProps;
}
