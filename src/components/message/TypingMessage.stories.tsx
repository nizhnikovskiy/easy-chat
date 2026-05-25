import type { Story } from '@ladle/react';
import TypingMessage from './TypingMessage';
import { useState } from 'react';
import avatar5 from '@/assets/images/avatars/avatar-5.webp';
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

// Default typing animation
export const DefaultTypingAnimation: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='This text will appear with a typing animation effect, character by character.' sender='other' />
  </div>
);

DefaultTypingAnimation.storyName = 'Default Typing Animation';

// Typing speed stories - demonstrate ONLY typing speed variations
export const FastTyping: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='This message types very quickly! Perfect for short responses.' sender='other' typingSpeed={15} />
  </div>
);

FastTyping.storyName = 'Fast Typing (15ms)';

export const SlowTyping: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='This message types slowly for dramatic effect.' sender='other' typingSpeed={80} />
  </div>
);

SlowTyping.storyName = 'Slow Typing (80ms)';

// Long text typing
export const LongTextTyping: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage
      text='This is a longer message to demonstrate the typing animation with more content. The animation will continue character by character until all text is displayed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      sender='other'
    />
  </div>
);

LongTextTyping.storyName = 'Long Text Typing';

// Completion callback - demonstrate ONLY onComplete callback
export const WithCompletionCallback: Story = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
      <TypingMessage text='When this message finishes typing, it will trigger a callback.' sender='other' onComplete={() => setCompleted(true)} />
      {completed && <div className='text-center p-4 bg-green-100 text-green-800 rounded-lg'>✓ Typing completed! Callback was triggered.</div>}
    </div>
  );
};

WithCompletionCallback.storyName = 'With Completion Callback';

// User typing message - demonstrate sender='user'
export const UserTypingMessage: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='Even user messages can have typing animation!' sender='user' />
  </div>
);

UserTypingMessage.storyName = 'User Typing Message';

// Single typing message
export const ConversationWithTyping: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <TypingMessage text='Hello! How can I help you today?' sender='other' />
  </div>
);

ConversationWithTyping.storyName = 'Single Typing Message';

// Multiple typing messages - realistic example showing several typing messages
export const MultipleTypingMessagesExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <TypingMessage text='First message typing...' sender='other' />
    <TypingMessage text='Second message also typing!' sender='other' />
    <TypingMessage text='And a third one for good measure.' sender='other' />
  </div>
);

MultipleTypingMessagesExample.storyName = 'Example - Multiple Typing Messages';

// Minimal typing - demonstrate minimal configuration
export const MinimalTyping: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='Clean typing animation without extras.' sender='other' showAvatar={false} showUsername={false} showTimestamp={false} />
  </div>
);

MinimalTyping.storyName = 'Minimal Typing';

// Custom avatar - demonstrate ONLY custom avatar
export const WithCustomAvatar: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='Typing message with a custom avatar image!' sender='other' showAvatar={true} avatarSrc={avatar5} />
  </div>
);

WithCustomAvatar.storyName = 'With Custom Avatar';

// Copy disabled - demonstrate ONLY copy protection
export const WithCopyDisabled: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='This typing message text cannot be copied or selected - try it!' sender='other' disableTextCopy={true} />
  </div>
);

WithCopyDisabled.storyName = 'With Copy Disabled';

// Text Formatting with Typing Animation Stories - each demonstrates ONE formatting type
export const FormattedTypingBold: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='This message has **bold text** that appears with typing animation!' sender='other' />
  </div>
);

FormattedTypingBold.storyName = 'Formatted Typing - Bold';

export const FormattedTypingItalic: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='This message has *italic text* with typing animation!' sender='other' />
  </div>
);

FormattedTypingItalic.storyName = 'Formatted Typing - Italic';

export const FormattedTypingCode: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='You can use the `useState` hook like this: `const [value, setValue] = useState(0);`' sender='other' />
  </div>
);

FormattedTypingCode.storyName = 'Formatted Typing - Code';

export const FormattedTypingLinks: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='Check out [this documentation](https://example.com) for more information!' sender='other' />
  </div>
);

FormattedTypingLinks.storyName = 'Formatted Typing - Links';

export const FormattedTypingCombined: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage text='**Important:** You should use `formatText()` for *all* messages. See [documentation](https://example.com) and ~~avoid~~ common mistakes!' sender='other' />
  </div>
);

FormattedTypingCombined.storyName = 'Formatted Typing - Combined';

export const FormattedTypingLong: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <TypingMessage
      text='Here is a **comprehensive guide**: First, `import` the required components. Then, follow [our documentation](https://example.com) to understand how `props` work. The **most important** thing is *never modify props* directly!'
      sender='other'
    />
  </div>
);

FormattedTypingLong.storyName = 'Formatted Typing - Long Message';

// ===== DARK THEME STORIES =====

export const DefaultTypingAnimationDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='This text will appear with a typing animation effect, character by character.' sender='other' theme='dark' />
  </div>
);

DefaultTypingAnimationDark.storyName = 'Default Typing Animation - Dark';

export const FastTypingDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='This message types very quickly! Perfect for short responses.' sender='other' typingSpeed={15} theme='dark' />
  </div>
);

FastTypingDark.storyName = 'Fast Typing (15ms) - Dark';

export const SlowTypingDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='This message types slowly for dramatic effect.' sender='other' typingSpeed={80} theme='dark' />
  </div>
);

SlowTypingDark.storyName = 'Slow Typing (80ms) - Dark';

export const LongTextTypingDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage
      text='This is a longer message to demonstrate the typing animation with more content. The animation will continue character by character until all text is displayed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      sender='other'
      theme='dark'
    />
  </div>
);

LongTextTypingDark.storyName = 'Long Text Typing - Dark';

export const WithCompletionCallbackDark: Story = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen bg-gray-900'>
      <TypingMessage text='When this message finishes typing, it will trigger a callback.' sender='other' onComplete={() => setCompleted(true)} theme='dark' />
      {completed && <div className='text-center p-4 bg-green-900 text-green-200 rounded-lg'>✓ Typing completed! Callback was triggered.</div>}
    </div>
  );
};

WithCompletionCallbackDark.storyName = 'With Completion Callback - Dark';

export const UserTypingMessageDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='Even user messages can have typing animation!' sender='user' theme='dark' />
  </div>
);

UserTypingMessageDark.storyName = 'User Typing Message - Dark';

export const WithCustomAvatarDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='Typing message with a custom avatar image!' sender='other' showAvatar={true} avatarSrc={avatar5} theme='dark' />
  </div>
);

WithCustomAvatarDark.storyName = 'With Custom Avatar - Dark';

export const WithCopyDisabledDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='This typing message text cannot be copied or selected - try it!' sender='other' disableTextCopy={true} theme='dark' />
  </div>
);

WithCopyDisabledDark.storyName = 'With Copy Disabled - Dark';

export const FormattedTypingBoldDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='This message has **bold text** that appears with typing animation!' sender='other' theme='dark' />
  </div>
);

FormattedTypingBoldDark.storyName = 'Formatted Typing - Bold - Dark';

export const FormattedTypingItalicDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='This message has *italic text* with typing animation!' sender='other' theme='dark' />
  </div>
);

FormattedTypingItalicDark.storyName = 'Formatted Typing - Italic - Dark';

export const FormattedTypingCodeDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='You can use the `useState` hook like this: `const [value, setValue] = useState(0);`' sender='other' theme='dark' />
  </div>
);

FormattedTypingCodeDark.storyName = 'Formatted Typing - Code - Dark';

export const FormattedTypingLinksDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage text='Check out [this documentation](https://example.com) for more information!' sender='other' theme='dark' />
  </div>
);

FormattedTypingLinksDark.storyName = 'Formatted Typing - Links - Dark';

export const FormattedTypingCombinedDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage
      text='**Important:** You should use `formatText()` for *all* messages. See [documentation](https://example.com) and ~~avoid~~ common mistakes!'
      sender='other'
      theme='dark'
    />
  </div>
);

FormattedTypingCombinedDark.storyName = 'Formatted Typing - Combined - Dark';

export const FormattedTypingLongDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <TypingMessage
      text='Here is a **comprehensive guide**: First, `import` the required components. Then, follow [our documentation](https://example.com) to understand how `props` work. The **most important** thing is *never modify props* directly!'
      sender='other'
      theme='dark'
    />
  </div>
);

FormattedTypingLongDark.storyName = 'Formatted Typing - Long Message - Dark';
