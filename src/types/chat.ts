export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  TEACHER = 'teacher',
}

export interface BaseMessage {
  content: string;
  role: MessageRole;
  isTypingComplete: boolean;
  isLoading: boolean;
  image?: string;
}

export interface UserMessage extends BaseMessage {
  role: MessageRole.USER;
}

export interface AssistantMessage extends BaseMessage {
  role: MessageRole.ASSISTANT;
  isSubMessage?: boolean;
  remainingContent?: string[];
}

export interface TeacherMessage extends BaseMessage {
  role: MessageRole.TEACHER;
  isSubMessage?: boolean;
}

export interface DateSeparator {
  type: 'date';
  date: string;
}

export type ChatHistoryMessage = UserMessage | AssistantMessage | TeacherMessage;
export type ChatHistoryItem = ChatHistoryMessage | DateSeparator;

export type ProcessedMessage = ChatHistoryMessage & {
  isSubMessage?: boolean;
  isTypingComplete: boolean;
  remainingContent?: string[];
  isLoading: boolean;
};

export interface MessageListProps {
  messages: ChatHistoryMessage[];
  isPending: boolean;
  onMessageUpdate?: () => void;
}

export interface ChatResponse {
  sessionId: string;
}

export interface ChatMessageResponse {
  content: string;
  role: MessageRole;
}

export interface ChatHistoryResponse {
  history: ChatHistoryMessage[];
}

export interface MessageRequest {
  message: string;
  image?: File;
}

export interface MessageResponse {
  content: string;
  finish?: boolean;
}

export interface ChatProps {
  messages: ChatHistoryItem[];
  isPending: boolean;
  onSendMessage: (message: string, image?: File, submissionId?: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isHistoryCompleted?: boolean;
  showDateSeparators?: boolean;
  customBackground?: 'chat-bg' | 'chat-bg-alt';
}
