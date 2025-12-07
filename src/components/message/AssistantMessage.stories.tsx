import type { Story } from '@ladle/react';
import AssistantMessage from './AssistantMessage';
import { MdRefresh, MdThumbUp, MdThumbDown, MdContentCopy, MdShare, MdEdit, MdVolumeUp } from 'react-icons/md';
import { AssistantMessageActionItem } from '@/types/message';
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

// Helper function to create standard ChatGPT-like actions
const createStandardActions = (): AssistantMessageActionItem[] => [
  {
    id: 'regenerate',
    label: 'Regenerate',
    icon: <MdRefresh size={14} />,
    onClick: (id) => {
      console.log(`Regenerate clicked for message: ${id}`);
      alert(`Regenerating message ${id}`);
    },
  },
  {
    id: 'like',
    label: '',
    icon: <MdThumbUp size={14} />,
    onClick: (id) => {
      console.log(`Like clicked for message: ${id}`);
      alert(`Liked message ${id}`);
    },
  },
  {
    id: 'dislike',
    label: '',
    icon: <MdThumbDown size={14} />,
    onClick: (id) => {
      console.log(`Dislike clicked for message: ${id}`);
      alert(`Disliked message ${id}`);
    },
  },
  {
    id: 'copy',
    label: '',
    icon: <MdContentCopy size={14} />,
    onClick: (id) => {
      console.log(`Copy clicked for message: ${id}`);
      alert(`Copied message ${id}`);
    },
  },
];

// Basic message - demonstrate basic assistant message WITHOUT actions
export const Basic: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='Hello! This is a ChatGPT-style message without a bubble. The text is displayed in plain format with a clean, minimal look.' sender='other' />
  </div>
);

Basic.storyName = 'Basic (No Actions)';

export const BasicDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='Hello! This is a ChatGPT-style message without a bubble. The text is displayed in plain format with a clean, minimal look.' sender='other' theme='dark' />
  </div>
);

BasicDark.storyName = 'Basic (No Actions) - Dark';

// With actions - demonstrate ONLY standard actions
export const WithStandardActions: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage
      content='This is a message with standard ChatGPT-style actions below. You can regenerate the response, like it, dislike it, or copy it.'
      sender='other'
      messageId='msg-001'
      actions={createStandardActions()}
    />
  </div>
);

WithStandardActions.storyName = 'With Standard Actions';

export const WithStandardActionsDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage
      content='This is a message with standard ChatGPT-style actions below. You can regenerate the response, like it, dislike it, or copy it.'
      sender='other'
      messageId='msg-001'
      actions={createStandardActions()}
      theme='dark'
    />
  </div>
);

WithStandardActionsDark.storyName = 'With Standard Actions - Dark';

// With timestamp - demonstrate ONLY timestamp
export const WithTimestamp: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This message includes a timestamp displayed inline after the text content.' sender='other' showTimestamp={true} timestamp='10:30 AM' />
  </div>
);

WithTimestamp.storyName = 'With Timestamp';

export const WithTimestampDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This message includes a timestamp displayed inline after the text content.' sender='other' showTimestamp={true} timestamp='10:30 AM' theme='dark' />
  </div>
);

WithTimestampDark.storyName = 'With Timestamp - Dark';

// Long message - demonstrate text wrapping
export const LongMessage: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage
      content='This is a much longer message to demonstrate how the component handles text wrapping and layout. The plain text format works well for longer responses, making them easier to read without the visual constraint of a bubble. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      sender='other'
    />
  </div>
);

LongMessage.storyName = 'Long Message';

export const LongMessageDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage
      content='This is a much longer message to demonstrate how the component handles text wrapping and layout. The plain text format works well for longer responses, making them easier to read without the visual constraint of a bubble. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      sender='other'
      theme='dark'
    />
  </div>
);

LongMessageDark.storyName = 'Long Message - Dark';

// Custom actions - demonstrate ONLY custom actions
export const CustomActions: Story = () => {
  const customActions: AssistantMessageActionItem[] = [
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: <MdRefresh size={14} />,
      onClick: () => alert('Regenerating...'),
    },
    {
      id: 'read-aloud',
      label: 'Read Aloud',
      icon: <MdVolumeUp size={14} />,
      onClick: () => alert('Reading aloud...'),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <MdEdit size={14} />,
      onClick: () => alert('Edit mode...'),
    },
    {
      id: 'share',
      label: 'Share',
      icon: <MdShare size={14} />,
      onClick: () => alert('Sharing...'),
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={14} />,
      onClick: () => alert('Copied!'),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
      <AssistantMessage
        content='This message demonstrates custom actions. You can add any actions you want with custom icons and labels!'
        sender='other'
        messageId='msg-custom'
        actions={customActions}
      />
    </div>
  );
};

CustomActions.storyName = 'Custom Actions';

export const CustomActionsDark: Story = () => {
  const customActions: AssistantMessageActionItem[] = [
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: <MdRefresh size={14} />,
      onClick: () => alert('Regenerating...'),
    },
    {
      id: 'read-aloud',
      label: 'Read Aloud',
      icon: <MdVolumeUp size={14} />,
      onClick: () => alert('Reading aloud...'),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <MdEdit size={14} />,
      onClick: () => alert('Edit mode...'),
    },
    {
      id: 'share',
      label: 'Share',
      icon: <MdShare size={14} />,
      onClick: () => alert('Sharing...'),
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={14} />,
      onClick: () => alert('Copied!'),
    },
  ];

  return (
    <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
      <AssistantMessage
        content='This message demonstrates custom actions. You can add any actions you want with custom icons and labels!'
        sender='other'
        messageId='msg-custom'
        actions={customActions}
        theme='dark'
      />
    </div>
  );
};

CustomActionsDark.storyName = 'Custom Actions - Dark';

// Icon-only actions - demonstrate ONLY icon-only actions
export const IconOnlyActions: Story = () => {
  const iconOnlyActions: AssistantMessageActionItem[] = [
    {
      id: 'regenerate',
      label: '',
      icon: <MdRefresh size={16} />,
      onClick: () => alert('Regenerating...'),
    },
    {
      id: 'like',
      label: '',
      icon: <MdThumbUp size={16} />,
      onClick: () => alert('Liked!'),
    },
    {
      id: 'dislike',
      label: '',
      icon: <MdThumbDown size={16} />,
      onClick: () => alert('Disliked!'),
    },
    {
      id: 'copy',
      label: '',
      icon: <MdContentCopy size={16} />,
      onClick: () => alert('Copied!'),
    },
    {
      id: 'share',
      label: '',
      icon: <MdShare size={16} />,
      onClick: () => alert('Shared!'),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
      <AssistantMessage content='This message uses icon-only actions without labels for a more compact appearance.' sender='other' messageId='msg-icons' actions={iconOnlyActions} />
    </div>
  );
};

IconOnlyActions.storyName = 'Icon-Only Actions';

export const IconOnlyActionsDark: Story = () => {
  const iconOnlyActions: AssistantMessageActionItem[] = [
    {
      id: 'regenerate',
      label: '',
      icon: <MdRefresh size={16} />,
      onClick: () => alert('Regenerating...'),
    },
    {
      id: 'like',
      label: '',
      icon: <MdThumbUp size={16} />,
      onClick: () => alert('Liked!'),
    },
    {
      id: 'dislike',
      label: '',
      icon: <MdThumbDown size={16} />,
      onClick: () => alert('Disliked!'),
    },
    {
      id: 'copy',
      label: '',
      icon: <MdContentCopy size={16} />,
      onClick: () => alert('Copied!'),
    },
    {
      id: 'share',
      label: '',
      icon: <MdShare size={16} />,
      onClick: () => alert('Shared!'),
    },
  ];

  return (
    <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
      <AssistantMessage content='This message uses icon-only actions without labels for a more compact appearance.' sender='other' messageId='msg-icons' actions={iconOnlyActions} theme='dark' />
    </div>
  );
};

IconOnlyActionsDark.storyName = 'Icon-Only Actions - Dark';

// Group position stories - demonstrate ONLY groupPosition (one component each)
export const GroupPositionFirst: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This is the first message in a group.' sender='other' groupPosition='first' />
  </div>
);

GroupPositionFirst.storyName = 'Group Position - First';

export const GroupPositionFirstDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This is the first message in a group.' sender='other' groupPosition='first' theme='dark' />
  </div>
);

GroupPositionFirstDark.storyName = 'Group Position - First - Dark';

export const GroupPositionMiddle: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This is a middle message - notice the reduced spacing.' sender='other' groupPosition='middle' />
  </div>
);

GroupPositionMiddle.storyName = 'Group Position - Middle';

export const GroupPositionMiddleDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This is a middle message - notice the reduced spacing.' sender='other' groupPosition='middle' theme='dark' />
  </div>
);

GroupPositionMiddleDark.storyName = 'Group Position - Middle - Dark';

export const GroupPositionLast: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This is the last message in the group with the avatar showing.' sender='other' groupPosition='last' />
  </div>
);

GroupPositionLast.storyName = 'Group Position - Last';

export const GroupPositionLastDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This is the last message in the group with the avatar showing.' sender='other' groupPosition='last' theme='dark' />
  </div>
);

GroupPositionLastDark.storyName = 'Group Position - Last - Dark';

// Without avatar - demonstrate ONLY showAvatar={false}
export const WithoutAvatar: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This message is displayed without an avatar.' sender='other' showAvatar={false} />
  </div>
);

WithoutAvatar.storyName = 'Without Avatar';

export const WithoutAvatarDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This message is displayed without an avatar.' sender='other' showAvatar={false} theme='dark' />
  </div>
);

WithoutAvatarDark.storyName = 'Without Avatar - Dark';

// Custom avatar color - demonstrate ONLY avatarBgColor
export const WithCustomAvatar: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This message uses a custom avatar color.' sender='other' showAvatar={true} avatarBgColor='bg-purple-500' />
  </div>
);

WithCustomAvatar.storyName = 'With Custom Avatar Color';

export const WithCustomAvatarDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This message uses a custom avatar color.' sender='other' showAvatar={true} avatarBgColor='bg-purple-500' theme='dark' />
  </div>
);

WithCustomAvatarDark.storyName = 'With Custom Avatar Color - Dark';

// Disabled actions - demonstrate ONLY disabled actions
export const DisabledActions: Story = () => {
  const actionsWithDisabled: AssistantMessageActionItem[] = [
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: <MdRefresh size={14} />,
      onClick: () => alert('Regenerating...'),
      disabled: true,
    },
    {
      id: 'like',
      label: '',
      icon: <MdThumbUp size={14} />,
      onClick: () => alert('Liked!'),
    },
    {
      id: 'dislike',
      label: '',
      icon: <MdThumbDown size={14} />,
      onClick: () => alert('Disliked!'),
      disabled: true,
    },
    {
      id: 'copy',
      label: '',
      icon: <MdContentCopy size={14} />,
      onClick: () => alert('Copied!'),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
      <AssistantMessage
        content='This message demonstrates disabled actions. Try interacting with the regenerate and dislike buttons.'
        sender='other'
        messageId='msg-disabled'
        actions={actionsWithDisabled}
      />
    </div>
  );
};

DisabledActions.storyName = 'Disabled Actions';

export const DisabledActionsDark: Story = () => {
  const actionsWithDisabled: AssistantMessageActionItem[] = [
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: <MdRefresh size={14} />,
      onClick: () => alert('Regenerating...'),
      disabled: true,
    },
    {
      id: 'like',
      label: '',
      icon: <MdThumbUp size={14} />,
      onClick: () => alert('Liked!'),
    },
    {
      id: 'dislike',
      label: '',
      icon: <MdThumbDown size={14} />,
      onClick: () => alert('Disliked!'),
      disabled: true,
    },
    {
      id: 'copy',
      label: '',
      icon: <MdContentCopy size={14} />,
      onClick: () => alert('Copied!'),
    },
  ];

  return (
    <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
      <AssistantMessage
        content='This message demonstrates disabled actions. Try interacting with the regenerate and dislike buttons.'
        sender='other'
        messageId='msg-disabled'
        actions={actionsWithDisabled}
        theme='dark'
      />
    </div>
  );
};

DisabledActionsDark.storyName = 'Disabled Actions - Dark';

// Text copy disabled - demonstrate ONLY disableTextCopy
export const TextCopyDisabled: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage content='This message text cannot be selected or copied. Try to select this text!' sender='other' disableTextCopy={true} />
  </div>
);

TextCopyDisabled.storyName = 'Text Copy Disabled';

export const TextCopyDisabledDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage content='This message text cannot be selected or copied. Try to select this text!' sender='other' disableTextCopy={true} theme='dark' />
  </div>
);

TextCopyDisabledDark.storyName = 'Text Copy Disabled - Dark';

// Minimal style - demonstrate minimal configuration
export const MinimalStyle: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <AssistantMessage
      content='This is a minimal message with no avatar, username, or timestamp - just the content and actions.'
      sender='other'
      showAvatar={false}
      showUsername={false}
      showTimestamp={false}
      messageId='msg-minimal'
      actions={createStandardActions()}
    />
  </div>
);

MinimalStyle.storyName = 'Minimal Style';

export const MinimalStyleDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <AssistantMessage
      content='This is a minimal message with no avatar, username, or timestamp - just the content and actions.'
      sender='other'
      showAvatar={false}
      showUsername={false}
      showTimestamp={false}
      messageId='msg-minimal'
      actions={createStandardActions()}
      theme='dark'
    />
  </div>
);

MinimalStyleDark.storyName = 'Minimal Style - Dark';

// ===== REALISTIC USE CASE (can have multiple components) =====

// Conversation - realistic use case with multiple features
export const ConversationExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <AssistantMessage
      content='Hello! How can I help you today?'
      sender='other'
      showAvatar={true}
      username='AI Assistant'
      showUsername={true}
      showTimestamp={true}
      timestamp='10:00 AM'
      messageId='msg-conv-1'
      actions={createStandardActions()}
    />
    <AssistantMessage
      content='I can assist with various tasks including answering questions, writing content, coding, and much more.'
      sender='other'
      showAvatar={false}
      showUsername={false}
      showTimestamp={true}
      timestamp='10:00 AM'
      messageId='msg-conv-2'
      actions={createStandardActions()}
    />
    <AssistantMessage
      content='Feel free to ask me anything!'
      sender='other'
      showAvatar={true}
      showUsername={false}
      showTimestamp={true}
      timestamp='10:01 AM'
      messageId='msg-conv-3'
      actions={createStandardActions()}
    />
  </div>
);

ConversationExample.storyName = 'Example - Conversation';
