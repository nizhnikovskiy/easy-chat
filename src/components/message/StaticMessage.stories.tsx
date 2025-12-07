import type { Story } from '@ladle/react';
import StaticMessage from './StaticMessage';
import avatar3 from '@/assets/images/avatars/avatar-3.webp';
import avatar4 from '@/assets/images/avatars/avatar-4.webp';
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

// Basic static message
export const DefaultStaticMessage: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='This is a static message with default settings.' sender='other' />
  </div>
);

DefaultStaticMessage.storyName = 'Default Static Message';

export const DefaultStaticMessageDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='This is a static message with default settings.' sender='other' theme='dark' />
  </div>
);

DefaultStaticMessageDark.storyName = 'Default Static Message - Dark';

// Short text - demonstrate ONLY short text
export const ShortText: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Hi!' sender='other' />
  </div>
);

ShortText.storyName = 'Short Text';

export const ShortTextDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Hi!' sender='other' theme='dark' />
  </div>
);

ShortTextDark.storyName = 'Short Text - Dark';

// Long text - demonstrate ONLY long text wrapping
export const LongText: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage
      text='This is a much longer static message that demonstrates how the component handles extensive text content. The message bubble will expand to accommodate all the text while maintaining proper formatting and readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      sender='other'
    />
  </div>
);

LongText.storyName = 'Long Text';

export const LongTextDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage
      text='This is a much longer static message that demonstrates how the component handles extensive text content. The message bubble will expand to accommodate all the text while maintaining proper formatting and readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      sender='other'
      theme='dark'
    />
  </div>
);

LongTextDark.storyName = 'Long Text - Dark';

// Avatar stories - demonstrate ONLY avatar display
export const WithoutAvatarLeft: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Message without avatar from other' sender='other' showAvatar={false} />
  </div>
);

WithoutAvatarLeft.storyName = 'Without Avatar (Left)';

export const WithoutAvatarLeftDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Message without avatar from other' sender='other' showAvatar={false} theme='dark' />
  </div>
);

WithoutAvatarLeftDark.storyName = 'Without Avatar (Left) - Dark';

export const WithoutAvatarRight: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Message without avatar from user' sender='user' showAvatar={false} />
  </div>
);

WithoutAvatarRight.storyName = 'Without Avatar (Right)';

export const WithoutAvatarRightDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Message without avatar from user' sender='user' showAvatar={false} theme='dark' />
  </div>
);

WithoutAvatarRightDark.storyName = 'Without Avatar (Right) - Dark';

// Custom avatar - demonstrate ONLY custom avatar image
export const WithCustomAvatarLeft: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Static message with custom avatar' sender='other' showAvatar={true} avatarSrc={avatar3} />
  </div>
);

WithCustomAvatarLeft.storyName = 'With Custom Avatar (Left)';

export const WithCustomAvatarLeftDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Static message with custom avatar' sender='other' showAvatar={true} avatarSrc={avatar3} theme='dark' />
  </div>
);

WithCustomAvatarLeftDark.storyName = 'With Custom Avatar (Left) - Dark';

export const WithCustomAvatarRight: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='My message with custom avatar' sender='user' showAvatar={true} avatarSrc={avatar4} />
  </div>
);

WithCustomAvatarRight.storyName = 'With Custom Avatar (Right)';

export const WithCustomAvatarRightDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='My message with custom avatar' sender='user' showAvatar={true} avatarSrc={avatar4} theme='dark' />
  </div>
);

WithCustomAvatarRightDark.storyName = 'With Custom Avatar (Right) - Dark';

// Minimal style - demonstrate minimal configuration
export const MinimalStyleLeft: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Minimal message - no extra options' sender='other' showAvatar={false} showUsername={false} showTimestamp={false} />
  </div>
);

MinimalStyleLeft.storyName = 'Minimal Style (Left)';

export const MinimalStyleLeftDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Minimal message - no extra options' sender='other' showAvatar={false} showUsername={false} showTimestamp={false} theme='dark' />
  </div>
);

MinimalStyleLeftDark.storyName = 'Minimal Style (Left) - Dark';

export const MinimalStyleRight: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Clean and simple' sender='user' showAvatar={false} showUsername={false} showTimestamp={false} />
  </div>
);

MinimalStyleRight.storyName = 'Minimal Style (Right)';

export const MinimalStyleRightDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Clean and simple' sender='user' showAvatar={false} showUsername={false} showTimestamp={false} theme='dark' />
  </div>
);

MinimalStyleRightDark.storyName = 'Minimal Style (Right) - Dark';

// Alignment - demonstrate sender alignment
export const AlignmentLeft: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Message aligned to the left (from other)' sender='other' />
  </div>
);

AlignmentLeft.storyName = 'Alignment - Left';

export const AlignmentLeftDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Message aligned to the left (from other)' sender='other' theme='dark' />
  </div>
);

AlignmentLeftDark.storyName = 'Alignment - Left - Dark';

export const AlignmentRight: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='Message aligned to the right (from me)' sender='user' />
  </div>
);

AlignmentRight.storyName = 'Alignment - Right';

export const AlignmentRightDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='Message aligned to the right (from me)' sender='user' theme='dark' />
  </div>
);

AlignmentRightDark.storyName = 'Alignment - Right - Dark';

// Copy protection - demonstrate ONLY copy protection
export const WithCopyProtection: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='This static message text cannot be copied or selected' sender='other' disableTextCopy={true} />
  </div>
);

WithCopyProtection.storyName = 'With Copy Protection';

export const WithCopyProtectionDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='This static message text cannot be copied or selected' sender='other' disableTextCopy={true} theme='dark' />
  </div>
);

WithCopyProtectionDark.storyName = 'With Copy Protection - Dark';

export const WithoutCopyProtection: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <StaticMessage text='This one can be copied normally' sender='user' disableTextCopy={false} />
  </div>
);

WithoutCopyProtection.storyName = 'Without Copy Protection';

export const WithoutCopyProtectionDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <StaticMessage text='This one can be copied normally' sender='user' disableTextCopy={false} theme='dark' />
  </div>
);

WithoutCopyProtectionDark.storyName = 'Without Copy Protection - Dark';

// ===== REALISTIC USE CASE (can have multiple components) =====

// Chat history - realistic use case with multiple features
export const ChatHistoryExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <StaticMessage text="Welcome! I'm here to help you today." sender='other' showAvatar={true} username='Support Agent' showUsername={true} showTimestamp={true} timestamp='09:00' />
    <StaticMessage text='Hi! I have a question about my order.' sender='user' showAvatar={true} username='You' showUsername={true} showTimestamp={true} timestamp='09:01' />
    <StaticMessage text="Of course! I'd be happy to help. What's your order number?" sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='09:02' />
    <StaticMessage text="It's #12345" sender='user' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='09:03' />
    <StaticMessage text='Thank you! Let me check that for you.' sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='09:03' />
  </div>
);

ChatHistoryExample.storyName = 'Example - Chat History';
