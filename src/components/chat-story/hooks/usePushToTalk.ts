import { useCallback, useRef, useState } from 'react';
import { transcribeAudio } from '../mocks';

export interface PushToTalkConfig {
  reflectionId?: string;
  onTranscriptionComplete?: (userMessage: string, botAnswer: string, isFinished?: boolean) => void;
  onProcessingStart?: () => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  onError?: (error: string) => void;
}

class PushToTalkRecorder {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private readonly isSafari: boolean;

  constructor() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  async startRecording(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupMediaRecorder();
      this.mediaRecorder?.start();
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw new Error('Failed to access microphone');
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        reject(new Error('No active recording'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.chunks, {
          type: this.mediaRecorder?.mimeType || 'audio/wav',
        });
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  private setupMediaRecorder(): void {
    if (!this.mediaStream) {
      throw new Error('No media stream available');
    }

    const mimeTypes = this.isSafari ? ['audio/wav', 'audio/mp4', 'audio/aac'] : ['audio/webm', 'audio/wav'];

    let selectedMimeType = '';
    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        selectedMimeType = mimeType;
        break;
      }
    }

    try {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: selectedMimeType || undefined,
        audioBitsPerSecond: 128000,
      });
    } catch (error) {
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
    }

    this.chunks = [];
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };
  }

  private cleanup(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.mediaRecorder = null;
    this.chunks = [];
  }

  abort(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.cleanup();
  }
}

export function usePushToTalk(config: PushToTalkConfig) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recorderRef = useRef<PushToTalkRecorder | null>(null);

  const startRecording = useCallback(async () => {
    console.log('[usePushToTalk] startRecording called:', { isRecording, isProcessing });

    if (isRecording || isProcessing) {
      console.log('[usePushToTalk] Cannot start - already recording or processing');
      return;
    }

    try {
      console.log('[usePushToTalk] Creating new recorder...');
      recorderRef.current = new PushToTalkRecorder();
      await recorderRef.current.startRecording();
      setIsRecording(true);
      console.log('[usePushToTalk] Recording started successfully');
      config.onRecordingStart?.();
    } catch (error) {
      console.error('[usePushToTalk] Failed to start recording:', error);
      setIsRecording(false);
      recorderRef.current = null;
      config.onError?.(error instanceof Error ? error.message : 'Failed to start recording');
    }
  }, [isRecording, isProcessing, config]);

  const stopRecording = useCallback(async () => {
    console.log('[usePushToTalk] stopRecording called:', {
      isRecording,
      isProcessing,
      hasRecorder: !!recorderRef.current,
    });

    if (!isRecording || !recorderRef.current) {
      console.log('[usePushToTalk] Cannot stop - not recording or no recorder');
      return;
    }

    try {
      console.log('[usePushToTalk] Stopping recording...');
      setIsRecording(false);
      config.onRecordingStop?.();

      const audioBlob = await recorderRef.current.stopRecording();
      console.log('[PushToTalk] Audio blob created:', {
        size: audioBlob.size,
        type: audioBlob.type,
        blobDetails: audioBlob,
      });

      if (!config.reflectionId) {
        console.error('[PushToTalk] No reflection ID available');
        config.onError?.('No reflection ID available');
        return;
      }

      if (audioBlob.size === 0) {
        console.error('[PushToTalk] Audio blob is empty');
        config.onError?.('No audio data recorded');
        return;
      }

      console.log('[usePushToTalk] Starting processing...');
      setIsProcessing(true);
      config.onProcessingStart?.();

      const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
      console.log('[PushToTalk] Created audio file:', {
        reflectionId: config.reflectionId,
        fileSize: audioFile.size,
        fileName: audioFile.name,
        fileType: audioFile.type,
        lastModified: audioFile.lastModified,
      });

      console.log('[PushToTalk] About to call transcribeAudio API...');
      console.log('[PushToTalk] Network request starting - check Network tab for /avatar/transcribe/' + config.reflectionId);

      const startTime = Date.now();
      const data = await transcribeAudio(config.reflectionId, audioFile);
      const endTime = Date.now();

      console.log('[PushToTalk] Transcription response received in', endTime - startTime, 'ms:', {
        userText: data.userText,
        userTextLength: data.userText?.length || 0,
        botAnswer: data.botAnswer,
        botAnswerLength: data.botAnswer?.length || 0,
        isFinished: data.finish,
        fullResponse: data,
      });

      if (!data.userText) {
        console.warn('[PushToTalk] No user text in response');
      }

      if (!data.botAnswer) {
        console.warn('[PushToTalk] No bot answer in response');
      }

      config.onTranscriptionComplete?.(data.userText || '', data.botAnswer || '', data.finish);
    } catch (error) {
      console.error('[PushToTalk] Error during processing:', error);
      console.error('[PushToTalk] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        name: error instanceof Error ? error.name : 'Unknown error type',
      });
      config.onError?.(error instanceof Error ? error.message : 'Failed to process recording');
    } finally {
      console.log('[usePushToTalk] Processing complete, resetting states...');
      setIsProcessing(false);
      recorderRef.current = null;
    }
  }, [isRecording, isProcessing, config]);

  const abort = useCallback(() => {
    console.log('[usePushToTalk] abort called');
    if (recorderRef.current) {
      recorderRef.current.abort();
      recorderRef.current = null;
    }
    setIsRecording(false);
    setIsProcessing(false);
  }, []);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    abort,
  };
}
