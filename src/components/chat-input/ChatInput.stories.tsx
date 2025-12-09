import { useState } from 'react';
import ChatInput from './ChatInput';
import type { Story } from '@ladle/react';
import chatBgImage from '@/assets/images/chat/chat-bg.webp';
import chatBgDarkImage from '@/assets/images/chat/chat-bg-dark.webp';
import { IoArrowUp, IoMic, IoAttach, IoClose } from 'react-icons/io5';

const bgStyle = {
  backgroundImage: `url("${chatBgImage}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'cover',
};

const bgStyleDark = {
  backgroundImage: `url("${chatBgDarkImage}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'cover',
};

export const Basic: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput value={message} onChange={setMessage} onSend={handleSend} placeholder='Type a message...' sendButton={{ icon: <IoArrowUp /> }} />
    </div>
  );
};

export const BasicDark: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput value={message} onChange={setMessage} onSend={handleSend} placeholder='Type a message...' theme='dark' />
    </div>
  );
};

BasicDark.storyName = 'Basic - Dark';

export const WithMediaUpload: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string, media?: File) => {
    console.log('Message sent:', msg, 'Media:', media);
    alert(`Sent: ${msg}${media ? ` with file: ${media.name}` : ''}`);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableMediaUpload
        mediaButton={{
          label: undefined,
          accept: 'image/*',
          onUpload: (file) => console.log('Media uploaded:', file),
          icon: <IoAttach />,
        }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

export const WithMediaUploadDark: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string, media?: File) => {
    console.log('Message sent:', msg, 'Media:', media);
    alert(`Sent: ${msg}${media ? ` with file: ${media.name}` : ''}`);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableMediaUpload
        mediaButton={{
          label: undefined,
          accept: 'image/*',
          onUpload: (file) => console.log('Media uploaded:', file),
          icon: <IoAttach />,
        }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
        theme='dark'
      />
    </div>
  );
};

WithMediaUploadDark.storyName = 'With Media Upload - Dark';

export const WithVoiceInput: Story = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  const handleStartRecording = () => {
    console.log('Recording started');
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    console.log('Recording stopped');
    setIsRecording(false);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableVoiceInput
        voiceButton={{
          isRecording,
          onStartRecording: handleStartRecording,
          onStopRecording: handleStopRecording,
          idleLabel: undefined,
          recordingLabel: undefined,
          icon: <IoMic />,
        }}
        sendButton={{ icon: <IoArrowUp /> }}
      />
    </div>
  );
};

export const WithVoiceInputDark: Story = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  const handleStartRecording = () => {
    console.log('Recording started');
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    console.log('Recording stopped');
    setIsRecording(false);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableVoiceInput
        voiceButton={{
          isRecording,
          onStartRecording: handleStartRecording,
          onStopRecording: handleStopRecording,
          idleLabel: undefined,
          recordingLabel: undefined,
          icon: <IoMic />,
        }}
        sendButton={{ icon: <IoArrowUp /> }}
        theme='dark'
      />
    </div>
  );
};

WithVoiceInputDark.storyName = 'With Voice Input - Dark';

export const CompleteWithAllFeatures: Story = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (msg: string, media?: File) => {
    console.log('Message sent:', msg, 'Media:', media);
    alert(`Sent: ${msg}${media ? ` with file: ${media.name}` : ''}`);
  };

  const handleStartRecording = () => {
    console.log('Recording started');
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    console.log('Recording stopped');
    setIsRecording(false);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableMediaUpload
        enableVoiceInput
        mediaButton={{
          onUpload: (file) => console.log('Media uploaded:', file),
          icon: <IoAttach />,
        }}
        voiceButton={{
          isRecording,
          onStartRecording: handleStartRecording,
          onStopRecording: handleStopRecording,
          icon: <IoMic />,
        }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

export const CompleteWithAllFeaturesDark: Story = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (msg: string, media?: File) => {
    console.log('Message sent:', msg, 'Media:', media);
    alert(`Sent: ${msg}${media ? ` with file: ${media.name}` : ''}`);
  };

  const handleStartRecording = () => {
    console.log('Recording started');
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    console.log('Recording stopped');
    setIsRecording(false);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableMediaUpload
        enableVoiceInput
        mediaButton={{
          onUpload: (file) => console.log('Media uploaded:', file),
        }}
        voiceButton={{
          isRecording,
          onStartRecording: handleStartRecording,
          onStopRecording: handleStopRecording,
        }}
        theme='dark'
      />
    </div>
  );
};

CompleteWithAllFeaturesDark.storyName = 'Complete With All Features - Dark';

export const WithCustomSendButton: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        sendButton={{
          label: 'Send',
          variant: 'ghost',
          className: 'bg-white ring-2 ring-blue-500 text-blue-600 hover:ring-blue-600 hover:bg-blue-50',
          icon: <IoArrowUp />,
        }}
      />
    </div>
  );
};

export const WithCustomSendButtonDark: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        sendButton={{
          label: 'Send',
          variant: 'ghost',
          className: 'bg-gray-800 ring-2 ring-blue-500 text-blue-400 hover:ring-blue-400 hover:bg-gray-700',
          icon: <IoArrowUp />,
        }}
        theme='dark'
      />
    </div>
  );
};

WithCustomSendButtonDark.storyName = 'With Custom Send Button - Dark';

export const WithCharacterCounter: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput value={message} onChange={setMessage} onSend={handleSend} placeholder='Type a message (max 280 chars)...' maxLength={280} showCharacterCount sendButton={{ icon: <IoArrowUp /> }} />
    </div>
  );
};

export const WithCharacterCounterDark: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message (max 280 chars)...'
        maxLength={280}
        showCharacterCount
        theme='dark'
        sendButton={{ icon: <IoArrowUp /> }}
      />
    </div>
  );
};

WithCharacterCounterDark.storyName = 'With Character Counter - Dark';

export const LoadingState: Story = () => {
  const [message, setMessage] = useState('');

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => {}}
        placeholder='Loading...'
        isLoading
        enableMediaUpload
        mediaButton={{ icon: <IoAttach /> }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

export const LoadingStateDark: Story = () => {
  const [message, setMessage] = useState('');

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => {}}
        placeholder='Loading...'
        isLoading
        enableMediaUpload
        theme='dark'
        mediaButton={{ icon: <IoAttach /> }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

LoadingStateDark.storyName = 'Loading State - Dark';

export const DisabledState: Story = () => {
  const [message, setMessage] = useState('');

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => {}}
        placeholder='Disabled input...'
        disabled
        enableMediaUpload
        mediaButton={{ icon: <IoAttach /> }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

export const DisabledStateDark: Story = () => {
  const [message, setMessage] = useState('');

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => {}}
        placeholder='Disabled input...'
        disabled
        enableMediaUpload
        theme='dark'
        mediaButton={{ icon: <IoAttach /> }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

DisabledStateDark.storyName = 'Disabled State - Dark';

export const CustomStyling: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Custom styled input...'
        enableMediaUpload
        className='bg-gradient-to-r from-purple-50 to-pink-50 border-t-2 border-purple-300'
        inputClassName='border-purple-400 focus:ring-purple-600'
        sendButton={{
          variant: 'primary',
          className: 'bg-purple-600 hover:bg-purple-700',
          icon: <IoArrowUp />,
        }}
        mediaButton={{
          variant: 'outline',
          className: 'border-purple-400 text-purple-600 hover:bg-purple-50',
          icon: <IoAttach />,
        }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

export const AutoGrowTextarea: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyle} className='h-screen flex flex-col justify-end'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type multiple lines...'
        autoGrow
        maxRows={8}
        enableMediaUpload
        mediaButton={{ icon: <IoAttach /> }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

export const AutoGrowTextareaDark: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type multiple lines...'
        autoGrow
        maxRows={8}
        enableMediaUpload
        theme='dark'
        mediaButton={{ icon: <IoAttach /> }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
      />
    </div>
  );
};

AutoGrowTextareaDark.storyName = 'Auto Grow Textarea - Dark';

// ===== DARK THEME STORIES =====

export const DarkThemeBasic: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput value={message} onChange={setMessage} onSend={handleSend} placeholder='Type a message...' theme='dark' sendButton={{ icon: <IoArrowUp /> }} />
    </div>
  );
};

DarkThemeBasic.storyName = 'Dark Theme - Basic';

export const DarkThemeWithAllFeatures: Story = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (msg: string, media?: File) => {
    console.log('Message sent:', msg, 'Media:', media);
    alert(`Sent: ${msg}${media ? ` with file: ${media.name}` : ''}`);
  };

  const handleStartRecording = () => {
    console.log('Recording started');
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    console.log('Recording stopped');
    setIsRecording(false);
  };

  return (
    <div style={bgStyleDark} className='h-screen flex flex-col justify-end bg-gray-900'>
      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={handleSend}
        placeholder='Type a message...'
        enableMediaUpload
        enableVoiceInput
        mediaButton={{
          onUpload: (file) => console.log('Media uploaded:', file),
          icon: <IoAttach />,
        }}
        voiceButton={{
          isRecording,
          onStartRecording: handleStartRecording,
          onStopRecording: handleStopRecording,
          icon: <IoMic />,
        }}
        sendButton={{ icon: <IoArrowUp /> }}
        closeIcon={<IoClose />}
        theme='dark'
      />
    </div>
  );
};

DarkThemeWithAllFeatures.storyName = 'Dark Theme - With All Features';

export const ThemeComparison: Story = () => {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Message sent:', msg);
    alert(`Sent: ${msg}`);
  };

  return (
    <div className='grid grid-cols-2 h-screen'>
      <div>
        <div className='text-center font-bold py-2 bg-white border-b'>Light Theme</div>
        <div style={bgStyle} className='h-[calc(100vh-40px)] flex flex-col justify-end'>
          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            placeholder='Type a message...'
            enableMediaUpload
            theme='light'
            mediaButton={{ icon: <IoAttach /> }}
            sendButton={{ icon: <IoArrowUp /> }}
            closeIcon={<IoClose />}
          />
        </div>
      </div>
      <div>
        <div className='text-center font-bold py-2 bg-gray-800 text-white border-b border-gray-700'>Dark Theme</div>
        <div style={bgStyleDark} className='h-[calc(100vh-40px)] flex flex-col justify-end bg-gray-900'>
          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            placeholder='Type a message...'
            enableMediaUpload
            theme='dark'
            mediaButton={{ icon: <IoAttach /> }}
            sendButton={{ icon: <IoArrowUp /> }}
            closeIcon={<IoClose />}
          />
        </div>
      </div>
    </div>
  );
};

ThemeComparison.storyName = 'Theme Comparison';
