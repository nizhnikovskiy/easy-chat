import { useState } from 'react';
import type { Story } from '@ladle/react';
import ChatInput from './ChatInput';
import { IoArrowUp, IoAttach } from 'react-icons/io5';

const appChromeStyle = {
  minHeight: '100vh',
  background: '#f8fafc',
  color: '#0f172a',
};

const AppChrome = ({ children }: { children: React.ReactNode }) => (
  <div className='flex min-h-screen flex-col' style={appChromeStyle}>
    <header className='flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
      <strong>Consumer App</strong>
      <nav className='flex gap-4 text-sm'>
        <a href='#privacy'>Privacy</a>
        <a href='#terms'>Terms</a>
      </nav>
    </header>
    <main className='flex flex-1 flex-col justify-end'>{children}</main>
  </div>
);

const HostileGlobalButtonStyles = () => (
  <style>{`
    button {
      background: #111827;
      border-color: #111827;
      color: #f9fafb;
      border-radius: 0;
    }

    button:hover {
      background: #f97316;
      border-color: #f97316;
      color: #111827;
    }

    header,
    nav a {
      background: #ffffff;
      color: #0f172a;
    }
  `}</style>
);

const TokenTheme = () => (
  <style>{`
    .easy-chat {
      --ec-button-primary-bg: #2563eb;
      --ec-button-primary-bg-hover: #1d4ed8;
      --ec-button-primary-fg: #ffffff;
      --ec-surface-bg: #ffffff;
      --ec-border-color: #cbd5e1;
    }
  `}</style>
);

const IsolationFixture = () => {
  const [message, setMessage] = useState('Ready to send');

  return (
    <ChatInput
      value={message}
      onChange={setMessage}
      onSend={() => {}}
      placeholder='Type a message...'
      enableMediaUpload
      mediaButton={{ icon: <IoAttach /> }}
      sendButton={{ icon: <IoArrowUp /> }}
    />
  );
};

export const EasyChatCssBeforeAppCss: Story = () => (
  <AppChrome>
    <TokenTheme />
    <IsolationFixture />
    <HostileGlobalButtonStyles />
  </AppChrome>
);

EasyChatCssBeforeAppCss.storyName = 'CSS Isolation - EasyChat CSS Before App CSS';

export const EasyChatCssAfterAppCss: Story = () => (
  <AppChrome>
    <HostileGlobalButtonStyles />
    <TokenTheme />
    <IsolationFixture />
  </AppChrome>
);

EasyChatCssAfterAppCss.storyName = 'CSS Isolation - EasyChat CSS After App CSS';

