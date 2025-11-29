export interface TranscriptionResponse {
  botAnswer: string;
  userText: string;
  finish?: boolean;
}

export const transcribeAudio = async (_reflectionId: string, _audioFile: File): Promise<TranscriptionResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    userText: "Hello, I'm feeling a bit anxious about the upcoming presentation.",
    botAnswer: "I hear you. It's completely normal to feel anxious before a big presentation. What specifically is worrying you about it?",
    finish: false,
  };
};

export async function fetchAccessToken(): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return 'mock-access-token-' + Date.now();
}
