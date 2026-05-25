import type { Story } from '@ladle/react';
import { useEffect, useState } from 'react';
import TypingAssistantMessage from './TypingAssistantMessage';
import { TypingAssistantMessageProps } from '@/types/message';
import { MdThumbUp, MdThumbDown, MdRefresh, MdContentCopy } from 'react-icons/md';
import chatBgImage from '@/assets/images/chat/chat-bg.webp';
import chatBgDarkImage from '@/assets/images/chat/chat-bg-dark.webp';

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

// Default - basic typing animation without actions
export const Default: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='Hello! This is a typing animation for assistant messages. It types character by character to simulate a real-time chat experience.' sender='other' />
  </div>
);

Default.storyName = 'Default Typing (Full Width)';

export const Loading: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='' sender='other' isLoading />
  </div>
);

Loading.storyName = 'Loading State';

export const LoadingToTyping: Story<TypingAssistantMessageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div style={bgStyle} className='p-4 min-h-screen'>
      <TypingAssistantMessage
        text={isLoading ? '' : 'Thanks for waiting. The loading state resolves first, then the assistant message starts typing normally.'}
        sender='other'
        isLoading={isLoading}
      />
    </div>
  );
};

LoadingToTyping.storyName = 'Loading To Typing';

export const LoadingToTypingCustomCursor: Story<TypingAssistantMessageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div style={bgStyle} className='p-4 min-h-screen'>
      <TypingAssistantMessage text={isLoading ? '' : 'Custom cursor color is applied for both loading and typing.'} sender='other' isLoading={isLoading} typingCursorColor='#2563eb' />
    </div>
  );
};

LoadingToTypingCustomCursor.storyName = 'Loading To Typing - Custom Cursor';

// Limited width - demonstrate limitWidth prop
export const LimitedWidth: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='This message has limitWidth={true}, so it should be limited to 80%/70% width like the original behavior. This text is long enough to demonstrate the wrapping behavior when width is limited.'
      sender='other'
      limitWidth={true}
    />
  </div>
);

LimitedWidth.storyName = 'Limited Width';

// With actions - demonstrate ONLY actions
export const WithActions: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='This message includes action buttons that appear below the text. You can like, dislike, regenerate, or copy the message!'
      sender='other'
      actions={[
        {
          id: 'like',
          label: 'Like',
          icon: <MdThumbUp />,
          onClick: () => console.log('Liked'),
        },
        {
          id: 'dislike',
          label: 'Dislike',
          icon: <MdThumbDown />,
          onClick: () => console.log('Disliked'),
        },
        {
          id: 'regenerate',
          label: 'Regenerate',
          icon: <MdRefresh />,
          onClick: () => console.log('Regenerating...'),
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: <MdContentCopy />,
          onClick: () => console.log('Copied'),
        },
      ]}
    />
  </div>
);

WithActions.storyName = 'With Actions';

// With formatting - demonstrate ONLY text formatting with typing
export const WithFormatting: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='This message demonstrates **bold text**, *italic text*, and `code snippets` with typing animation. The formatting is preserved during typing!'
      sender='other'
    />
  </div>
);

WithFormatting.storyName = 'With Text Formatting';

// Long message - demonstrate text wrapping with typing
export const LongMessage: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='Here is a longer message to demonstrate the typing effect with more content. The typing animation smoothly reveals the text character by character, creating an engaging user experience that mimics real-time responses from an AI assistant. This is particularly useful for chat applications where you want to show that the assistant is actively generating a response.'
      sender='other'
    />
  </div>
);

LongMessage.storyName = 'Long Message';

// Fast typing - demonstrate ONLY typing speed
export const FastTyping: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='This message types very quickly! The typing speed is set to 10ms per character, making it appear almost instantly while still showing the typing effect.'
      sender='other'
      typingSpeed={10}
    />
  </div>
);

FastTyping.storyName = 'Fast Typing (10ms)';

// Slow typing - demonstrate ONLY typing speed
export const SlowTyping: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='This message types slowly to emphasize the effect. Each character appears with a noticeable delay.' sender='other' typingSpeed={100} />
  </div>
);

SlowTyping.storyName = 'Slow Typing (100ms)';

// No animation - demonstrate animationEnabled={false}
export const NoAnimation: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='This message has animationEnabled={false}, so it appears immediately without typing effect.' sender='other' animationEnabled={false} />
  </div>
);

NoAnimation.storyName = 'No Animation';

// Group position stories - demonstrate ONLY groupPosition (one component each)
export const GroupPositionFirst: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='This is the first message in a group.' sender='other' groupPosition='first' />
  </div>
);

GroupPositionFirst.storyName = 'Group Position - First';

export const GroupPositionMiddle: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='This is a middle message.' sender='other' groupPosition='middle' />
  </div>
);

GroupPositionMiddle.storyName = 'Group Position - Middle';

export const GroupPositionLast: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='This is the last message in the group.' sender='other' groupPosition='last' />
  </div>
);

GroupPositionLast.storyName = 'Group Position - Last';

// Grouped messages example - realistic use case showing how groups work
export const GroupedMessagesExample: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen flex flex-col gap-0'>
    <TypingAssistantMessage text='This is the first message in a group.' sender='other' groupPosition='first' messageId='msg-1' />
    <TypingAssistantMessage text='This is a middle message.' sender='other' groupPosition='middle' messageId='msg-2' />
    <TypingAssistantMessage text='This is the last message in the group.' sender='other' groupPosition='last' messageId='msg-3' />
  </div>
);

GroupedMessagesExample.storyName = 'Example - Grouped Messages';

// With timestamp and read status - realistic use case
export const WithTimestampAndReadStatus: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='This message shows timestamp and read status indicators along with the typing animation.'
      sender='other'
      showTimestamp
      timestamp='14:23'
      showReadStatus
      isRead
    />
  </div>
);

WithTimestampAndReadStatus.storyName = 'With Timestamp and Read Status';

// No avatar - demonstrate ONLY showAvatar={false}
export const NoAvatar: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage text='This message has no avatar displayed.' sender='other' showAvatar={false} />
  </div>
);

NoAvatar.storyName = 'Without Avatar';

// With context menu - demonstrate ONLY context menu
export const WithContextMenu: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyle} className='p-4 min-h-screen'>
    <TypingAssistantMessage
      text='Right-click (or long press on mobile) this typing message to see the context menu!'
      sender='other'
      messageId='context-msg'
      contextMenuItems={[
        { id: 'copy', label: 'Copy', onClick: () => console.log('Copy clicked') },
        { id: 'delete', label: 'Delete', onClick: () => console.log('Delete clicked') },
        { id: 'forward', label: 'Forward', onClick: () => console.log('Forward clicked') },
      ]}
    />
  </div>
);

WithContextMenu.storyName = 'With Context Menu';

// ===== DARK THEME STORIES =====

export const DefaultDark: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyleDark} className='p-4 min-h-screen bg-gray-900'>
    <TypingAssistantMessage
      text='Hello! This is a typing animation for assistant messages. It types character by character to simulate a real-time chat experience.'
      sender='other'
      theme='dark'
    />
  </div>
);

DefaultDark.storyName = 'Default Typing - Dark';

export const WithActionsDark: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyleDark} className='p-4 min-h-screen bg-gray-900'>
    <TypingAssistantMessage
      text='This message includes action buttons that appear below the text. You can like, dislike, regenerate, or copy the message!'
      sender='other'
      theme='dark'
      actions={[
        {
          id: 'like',
          label: 'Like',
          icon: <MdThumbUp />,
          onClick: () => console.log('Liked'),
        },
        {
          id: 'dislike',
          label: 'Dislike',
          icon: <MdThumbDown />,
          onClick: () => console.log('Disliked'),
        },
        {
          id: 'regenerate',
          label: 'Regenerate',
          icon: <MdRefresh />,
          onClick: () => console.log('Regenerating...'),
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: <MdContentCopy />,
          onClick: () => console.log('Copied'),
        },
      ]}
    />
  </div>
);

WithActionsDark.storyName = 'With Actions - Dark';

export const WithFormattingDark: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyleDark} className='p-4 min-h-screen bg-gray-900'>
    <TypingAssistantMessage
      text='This message demonstrates **bold text**, *italic text*, and `code snippets` with typing animation. The formatting is preserved during typing!'
      sender='other'
      theme='dark'
    />
  </div>
);

WithFormattingDark.storyName = 'With Text Formatting - Dark';

export const LongMessageDark: Story<TypingAssistantMessageProps> = () => (
  <div style={bgStyleDark} className='p-4 min-h-screen bg-gray-900'>
    <TypingAssistantMessage
      text='Here is a longer message to demonstrate the typing effect with more content. The typing animation smoothly reveals the text character by character, creating an engaging user experience that mimics real-time responses from an AI assistant. This is particularly useful for chat applications where you want to show that the assistant is actively generating a response.'
      sender='other'
      theme='dark'
    />
  </div>
);

LongMessageDark.storyName = 'Long Message - Dark';
