import type { Story } from '@ladle/react';
import ChatSkeleton from './ChatSkeleton';
import TypingMessage from '@/components/message/TypingMessage';
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

// Default skeleton with 5 messages and input
export const Default: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatSkeleton messageCount={5} showInput={true} />
    </div>
  );
};

Default.storyName = 'Default (5 Messages)';

// Few messages - demonstrate ONLY messageCount variation
export const FewMessages: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatSkeleton messageCount={3} />
    </div>
  );
};

FewMessages.storyName = 'Few Messages (3)';

// Many messages - demonstrate ONLY messageCount variation
export const ManyMessages: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatSkeleton messageCount={10} />
    </div>
  );
};

ManyMessages.storyName = 'Many Messages (10)';

// With input - demonstrate ONLY showInput option
export const WithInput: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatSkeleton messageCount={5} showInput={true} />
    </div>
  );
};

WithInput.storyName = 'With Input';

// Without input - demonstrate ONLY showInput option
export const WithoutInput: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatSkeleton messageCount={5} showInput={false} />
    </div>
  );
};

WithoutInput.storyName = 'Without Input';

// Mixed types - demonstrate ONLY mixedTypes option
export const MixedTypes: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <ChatSkeleton messageCount={8} mixedTypes={true} />
    </div>
  );
};

MixedTypes.storyName = 'Mixed Bubble and Plain Types';

// ===== REALISTIC USE CASE (can have multiple components) =====

// With typing indicator - realistic example showing skeleton + typing
export const WithTypingIndicatorExample: Story = () => {
  return (
    <div style={bgStyle} className='h-screen w-full'>
      <div className='p-4 w-full max-w-250 mx-auto'>
        <ChatSkeleton messageCount={3} showInput={false} />
        {/* Add a typing indicator skeleton */}
        <TypingMessage text='Typing...' sender='other' groupPosition='standalone' isLoading={true} />
      </div>
    </div>
  );
};

WithTypingIndicatorExample.storyName = 'Example - With Typing Indicator';

// ===== DARK THEME STORIES =====

export const DefaultDark: Story = () => {
  return (
    <div style={bgStyleDark} className='h-screen w-full bg-gray-900'>
      <ChatSkeleton messageCount={5} showInput={true} theme='dark' />
    </div>
  );
};

DefaultDark.storyName = 'Default (5 Messages) - Dark';

export const FewMessagesDark: Story = () => {
  return (
    <div style={bgStyleDark} className='h-screen w-full bg-gray-900'>
      <ChatSkeleton messageCount={3} theme='dark' />
    </div>
  );
};

FewMessagesDark.storyName = 'Few Messages (3) - Dark';

export const ManyMessagesDark: Story = () => {
  return (
    <div style={bgStyleDark} className='h-screen w-full bg-gray-900'>
      <ChatSkeleton messageCount={10} theme='dark' />
    </div>
  );
};

ManyMessagesDark.storyName = 'Many Messages (10) - Dark';

export const WithInputDark: Story = () => {
  return (
    <div style={bgStyleDark} className='h-screen w-full bg-gray-900'>
      <ChatSkeleton messageCount={5} showInput={true} theme='dark' />
    </div>
  );
};

WithInputDark.storyName = 'With Input - Dark';

export const WithoutInputDark: Story = () => {
  return (
    <div style={bgStyleDark} className='h-screen w-full bg-gray-900'>
      <ChatSkeleton messageCount={5} showInput={false} theme='dark' />
    </div>
  );
};

WithoutInputDark.storyName = 'Without Input - Dark';

export const MixedTypesDark: Story = () => {
  return (
    <div style={bgStyleDark} className='h-screen w-full bg-gray-900'>
      <ChatSkeleton messageCount={8} mixedTypes={true} theme='dark' />
    </div>
  );
};

MixedTypesDark.storyName = 'Mixed Bubble and Plain Types - Dark';
