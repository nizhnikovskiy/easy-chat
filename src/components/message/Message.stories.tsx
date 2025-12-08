import type { Story } from '@ladle/react';
import Message from './Message';
import { MdContentCopy, MdEdit, MdDelete, MdSelectAll, MdCheck, MdDoneAll } from 'react-icons/md';
import { ContextMenuItem } from '@/types/context-menu';
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

// Theme comparison - demonstrate light vs dark theme
export const ThemeComparison: Story = () => (
  <div className='grid grid-cols-2 gap-4'>
    <div>
      <h3 className='text-center font-bold mb-2 px-4 py-2 bg-white'>Light Theme</h3>
      <div style={bgStyle} className='p-8 min-h-screen'>
        <div className='space-y-4'>
          <Message content='Hello from light theme!' sender='user' showAvatar={true} theme='light' />
          <Message content='This is a response in light theme' sender='other' showAvatar={true} username='Assistant' showUsername={true} theme='light' />
          <Message content='With timestamps and read status' sender='user' showAvatar={true} showTimestamp={true} timestamp='10:30' showReadStatus={true} isRead={true} theme='light' sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
        </div>
      </div>
    </div>
    <div>
      <h3 className='text-center font-bold mb-2 px-4 py-2 bg-gray-800 text-white'>Dark Theme</h3>
      <div style={bgStyleDark} className='p-8 min-h-screen bg-gray-900'>
        <div className='space-y-4'>
          <Message content='Hello from dark theme!' sender='user' showAvatar={true} theme='dark' />
          <Message content='This is a response in dark theme' sender='other' showAvatar={true} username='Assistant' showUsername={true} theme='dark' />
          <Message content='With timestamps and read status' sender='user' showAvatar={true} showTimestamp={true} timestamp='10:30' showReadStatus={true} isRead={true} theme='dark' sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
        </div>
      </div>
    </div>
  </div>
);

ThemeComparison.storyName = 'Theme Comparison';

// Dark theme examples
export const DarkThemeUser: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='User message in dark theme' sender='user' showAvatar={true} theme='dark' />
  </div>
);

DarkThemeUser.storyName = 'Dark Theme - User Message';

export const DarkThemeOther: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Other message in dark theme' sender='other' showAvatar={true} username='Friend' showUsername={true} theme='dark' />
  </div>
);

DarkThemeOther.storyName = 'Dark Theme - Other Message';

export const DarkThemeConversation: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <div className='space-y-4'>
      <Message content='Hey! How are you?' sender='other' showAvatar={true} username='Friend' showUsername={true} showTimestamp={true} timestamp='14:20' theme='dark' />
      <Message
        content="I'm doing great! Thanks for asking 😊"
        sender='user'
        showAvatar={true}
        username='You'
        showUsername={true}
        showTimestamp={true}
        timestamp='14:21'
        showReadStatus={true}
        isRead={true}
        theme='dark'
        sentIcon={<MdCheck />}
        readIcon={<MdDoneAll />}
      />
      <Message content="That's wonderful to hear!" sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='14:21' theme='dark' />
      <Message content='Want to grab coffee later?' sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='14:22' theme='dark' />
      <Message
        content='Sure! What time works for you?'
        sender='user'
        showAvatar={true}
        username='You'
        showUsername={false}
        showTimestamp={true}
        timestamp='14:23'
        showReadStatus={true}
        isRead={false}
        theme='dark'
      />
    </div>
  </div>
);

DarkThemeConversation.storyName = 'Dark Theme - Conversation';

// Avatar stories - demonstrate ONLY avatar display
export const WithAvatarLeft: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message with avatar on the left' sender='other' showAvatar={true} />
  </div>
);

WithAvatarLeft.storyName = 'With Avatar (Left)';

export const WithAvatarLeftDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message with avatar on the left' sender='other' showAvatar={true} theme='dark' />
  </div>
);

WithAvatarLeftDark.storyName = 'With Avatar (Left) - Dark';

export const WithAvatarRight: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message with avatar on the right' sender='user' showAvatar={true} />
  </div>
);

WithAvatarRight.storyName = 'With Avatar (Right)';

export const WithAvatarRightDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message with avatar on the right' sender='user' showAvatar={true} theme='dark' />
  </div>
);

WithAvatarRightDark.storyName = 'With Avatar (Right) - Dark';

export const WithoutAvatarLeft: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message without avatar' sender='other' showAvatar={false} />
  </div>
);

WithoutAvatarLeft.storyName = 'Without Avatar (Left)';

export const WithoutAvatarLeftDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message without avatar' sender='other' showAvatar={false} theme='dark' />
  </div>
);

WithoutAvatarLeftDark.storyName = 'Without Avatar (Left) - Dark';

export const WithoutAvatarRight: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message without avatar' sender='user' showAvatar={false} />
  </div>
);

WithoutAvatarRight.storyName = 'Without Avatar (Right)';

export const WithoutAvatarRightDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message without avatar' sender='user' showAvatar={false} theme='dark' />
  </div>
);

WithoutAvatarRightDark.storyName = 'Without Avatar (Right) - Dark';

// Username stories - demonstrate ONLY username display
export const WithUsername: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message with username' sender='other' username='Alice' showUsername={true} />
  </div>
);

WithUsername.storyName = 'With Username';

export const WithUsernameDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message with username' sender='other' username='Alice' showUsername={true} theme='dark' />
  </div>
);

WithUsernameDark.storyName = 'With Username - Dark';

export const WithoutUsername: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message without username' sender='other' username='Alice' showUsername={false} />
  </div>
);

WithoutUsername.storyName = 'Without Username';

export const WithoutUsernameDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message without username' sender='other' username='Alice' showUsername={false} theme='dark' />
  </div>
);

WithoutUsernameDark.storyName = 'Without Username - Dark';

// Timestamp stories - demonstrate ONLY timestamp display
export const WithTimestamp: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message with timestamp' sender='other' showTimestamp={true} timestamp='10:30' />
  </div>
);

WithTimestamp.storyName = 'With Timestamp';

export const WithTimestampDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message with timestamp' sender='other' showTimestamp={true} timestamp='10:30' theme='dark' />
  </div>
);

WithTimestampDark.storyName = 'With Timestamp - Dark';

export const WithoutTimestamp: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message without timestamp' sender='other' showTimestamp={false} />
  </div>
);

WithoutTimestamp.storyName = 'Without Timestamp';

export const WithoutTimestampDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message without timestamp' sender='other' showTimestamp={false} theme='dark' />
  </div>
);

WithoutTimestampDark.storyName = 'Without Timestamp - Dark';

// Avatar color stories - demonstrate ONLY avatar background color
export const AvatarColorBlue: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Blue avatar' sender='other' showAvatar={true} avatarBgColor='bg-blue-500' />
  </div>
);

AvatarColorBlue.storyName = 'Avatar Color - Blue';

export const AvatarColorBlueDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Blue avatar' sender='other' showAvatar={true} avatarBgColor='bg-blue-500' theme='dark' />
  </div>
);

AvatarColorBlueDark.storyName = 'Avatar Color - Blue - Dark';

export const AvatarColorGreen: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Green avatar' sender='other' showAvatar={true} avatarBgColor='bg-green-500' />
  </div>
);

AvatarColorGreen.storyName = 'Avatar Color - Green';

export const AvatarColorGreenDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Green avatar' sender='other' showAvatar={true} avatarBgColor='bg-green-500' theme='dark' />
  </div>
);

AvatarColorGreenDark.storyName = 'Avatar Color - Green - Dark';

export const AvatarColorPurple: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Purple avatar' sender='user' showAvatar={true} avatarBgColor='bg-purple-500' />
  </div>
);

AvatarColorPurple.storyName = 'Avatar Color - Purple';

export const AvatarColorPurpleDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Purple avatar' sender='user' showAvatar={true} avatarBgColor='bg-purple-500' theme='dark' />
  </div>
);

AvatarColorPurpleDark.storyName = 'Avatar Color - Purple - Dark';

export const AvatarColorRed: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Red avatar' sender='user' showAvatar={true} avatarBgColor='bg-red-500' />
  </div>
);

AvatarColorRed.storyName = 'Avatar Color - Red';

export const AvatarColorRedDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Red avatar' sender='user' showAvatar={true} avatarBgColor='bg-red-500' theme='dark' />
  </div>
);

AvatarColorRedDark.storyName = 'Avatar Color - Red - Dark';

export const AvatarColorOrange: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Orange avatar' sender='other' showAvatar={true} avatarBgColor='bg-orange-500' />
  </div>
);

AvatarColorOrange.storyName = 'Avatar Color - Orange';

export const AvatarColorOrangeDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Orange avatar' sender='other' showAvatar={true} avatarBgColor='bg-orange-500' theme='dark' />
  </div>
);

AvatarColorOrangeDark.storyName = 'Avatar Color - Orange - Dark';

// Long text story - demonstrate text wrapping
export const LongTextMessage: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message
      content='This is a much longer message to demonstrate how the component handles text wrapping. The bubble should expand to accommodate the content while maintaining a maximum width for readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      sender='other'
    />
  </div>
);

LongTextMessage.storyName = 'Long Text Message';

export const LongTextMessageDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message
      content='This is a much longer message to demonstrate how the component handles text wrapping. The bubble should expand to accommodate the content while maintaining a maximum width for readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      sender='other'
      theme='dark'
    />
  </div>
);

LongTextMessageDark.storyName = 'Long Text Message - Dark';

// Message grouping stories - demonstrate GROUP POSITIONS (need multiple to show grouping)
export const GroupPositionFirst: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='First message in group' sender='other' groupPosition='first' />
  </div>
);

GroupPositionFirst.storyName = 'Group Position - First';

export const GroupPositionFirstDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='First message in group' sender='other' groupPosition='first' theme='dark' />
  </div>
);

GroupPositionFirstDark.storyName = 'Group Position - First - Dark';

export const GroupPositionMiddle: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Middle message in group' sender='other' groupPosition='middle' />
  </div>
);

GroupPositionMiddle.storyName = 'Group Position - Middle';

export const GroupPositionMiddleDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Middle message in group' sender='other' groupPosition='middle' theme='dark' />
  </div>
);

GroupPositionMiddleDark.storyName = 'Group Position - Middle - Dark';

export const GroupPositionLast: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Last message in group' sender='other' groupPosition='last' />
  </div>
);

GroupPositionLast.storyName = 'Group Position - Last';

export const GroupPositionLastDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Last message in group' sender='other' groupPosition='last' theme='dark' />
  </div>
);

GroupPositionLastDark.storyName = 'Group Position - Last - Dark';

export const GroupPositionStandalone: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Standalone message (default)' sender='other' />
  </div>
);

GroupPositionStandalone.storyName = 'Group Position - Standalone';

export const GroupPositionStandaloneDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Standalone message (default)' sender='other' theme='dark' />
  </div>
);

GroupPositionStandaloneDark.storyName = 'Group Position - Standalone - Dark';

// Read status stories - demonstrate ONLY read status feature
export const WithReadStatusRead: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message that has been read' sender='user' showReadStatus={true} isRead={true} sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

WithReadStatusRead.storyName = 'Read Status - Read';

export const WithReadStatusReadDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message that has been read' sender='user' showReadStatus={true} isRead={true} theme='dark' sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

WithReadStatusReadDark.storyName = 'Read Status - Read - Dark';

export const WithReadStatusSent: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Message that has been sent but not read' sender='user' showReadStatus={true} isRead={false} sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

WithReadStatusSent.storyName = 'Read Status - Sent';

export const WithReadStatusSentDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Message that has been sent but not read' sender='user' showReadStatus={true} isRead={false} theme='dark' sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

WithReadStatusSentDark.storyName = 'Read Status - Sent - Dark';

export const WithReadStatusNoTimestamp: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Read status without timestamp' sender='user' showTimestamp={false} showReadStatus={true} isRead={true} sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

WithReadStatusNoTimestamp.storyName = 'Read Status - Without Timestamp';

export const WithReadStatusNoTimestampDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Read status without timestamp' sender='user' showTimestamp={false} showReadStatus={true} isRead={true} theme='dark' sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

WithReadStatusNoTimestampDark.storyName = 'Read Status - Without Timestamp - Dark';

// Copy protection stories - demonstrate ONLY disableTextCopy feature
export const WithCopyDisabled: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='This message text cannot be copied or selected' sender='user' disableTextCopy={true} />
  </div>
);

WithCopyDisabled.storyName = 'Text Copy Disabled';

export const WithCopyDisabledDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='This message text cannot be copied or selected' sender='user' disableTextCopy={true} theme='dark' />
  </div>
);

WithCopyDisabledDark.storyName = 'Text Copy Disabled - Dark';

export const WithCopyEnabled: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='This text can be copied normally - try selecting it!' sender='other' disableTextCopy={false} />
  </div>
);

WithCopyEnabled.storyName = 'Text Copy Enabled';

export const WithCopyEnabledDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='This text can be copied normally - try selecting it!' sender='other' disableTextCopy={false} theme='dark' />
  </div>
);

WithCopyEnabledDark.storyName = 'Text Copy Enabled - Dark';

// Context Menu Stories
const createContextMenuItems = (): ContextMenuItem[] => [
  {
    id: 'copy',
    label: 'Copy',
    icon: <MdContentCopy size={16} />,
    onClick: (id) => {
      console.log(`Copy clicked for message: ${id}`);
      alert(`Copied message ${id}`);
    },
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <MdEdit size={16} />,
    onClick: (id) => {
      console.log(`Edit clicked for message: ${id}`);
      alert(`Edit message ${id}`);
    },
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <MdDelete size={16} />,
    onClick: (id) => {
      console.log(`Delete clicked for message: ${id}`);
      alert(`Delete message ${id}`);
    },
    divider: true,
  },
  {
    id: 'select',
    label: 'Select text',
    icon: <MdSelectAll size={16} />,
    onClick: (id) => {
      console.log(`Select clicked for message: ${id}`);
      alert(`Select text in message ${id}`);
    },
  },
];

// Context menu - demonstrate ONLY context menu feature
export const WithContextMenu: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Right-click on this message to see the context menu!' sender='user' messageId='msg-001' contextMenuItems={createContextMenuItems()} />
  </div>
);

WithContextMenu.storyName = 'With Context Menu';

export const WithContextMenuDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Right-click on this message to see the context menu!' sender='user' messageId='msg-001' contextMenuItems={createContextMenuItems()} theme='dark' />
  </div>
);

WithContextMenuDark.storyName = 'With Context Menu - Dark';

export const WithCustomContextMenu: Story = () => {
  const customItems: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={16} />,
      onClick: (id) => alert(`Copied message ${id}`),
    },
    {
      id: 'translate',
      label: 'Translate',
      onClick: (id) => alert(`Translate message ${id}`),
      divider: true,
    },
    {
      id: 'pin',
      label: 'Pin message',
      onClick: (id) => alert(`Pinned message ${id}`),
    },
    {
      id: 'forward',
      label: 'Forward',
      onClick: (id) => alert(`Forward message ${id}`),
    },
    {
      id: 'report',
      label: 'Report',
      onClick: (id) => alert(`Report message ${id}`),
      className: 'text-red-600',
    },
  ];

  return (
    <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
      <Message content='This message has custom context menu actions!' sender='other' messageId='msg-custom' contextMenuItems={customItems} />
    </div>
  );
};

WithCustomContextMenu.storyName = 'Custom Context Menu Actions';

export const WithCustomContextMenuDark: Story = () => {
  const customItems: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={16} />,
      onClick: (id) => alert(`Copied message ${id}`),
    },
    {
      id: 'translate',
      label: 'Translate',
      onClick: (id) => alert(`Translate message ${id}`),
      divider: true,
    },
    {
      id: 'pin',
      label: 'Pin message',
      onClick: (id) => alert(`Pinned message ${id}`),
    },
    {
      id: 'forward',
      label: 'Forward',
      onClick: (id) => alert(`Forward message ${id}`),
    },
    {
      id: 'report',
      label: 'Report',
      onClick: (id) => alert(`Report message ${id}`),
      className: 'text-red-600',
    },
  ];

  return (
    <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
      <Message content='This message has custom context menu actions!' sender='other' messageId='msg-custom' contextMenuItems={customItems} theme='dark' />
    </div>
  );
};

WithCustomContextMenuDark.storyName = 'Custom Context Menu Actions - Dark';

// Text Formatting Stories - ONE component per story!
export const TextFormattingBold: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='This is **bold text** in a message' sender='other' />
  </div>
);

TextFormattingBold.storyName = 'Text Formatting - Bold';

export const TextFormattingBoldDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='This is **bold text** in a message' sender='other' theme='dark' />
  </div>
);

TextFormattingBoldDark.storyName = 'Text Formatting - Bold - Dark';

export const TextFormattingItalic: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='This is *italic text* in a message' sender='other' />
  </div>
);

TextFormattingItalic.storyName = 'Text Formatting - Italic';

export const TextFormattingItalicDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='This is *italic text* in a message' sender='other' theme='dark' />
  </div>
);

TextFormattingItalicDark.storyName = 'Text Formatting - Italic - Dark';

export const TextFormattingCode: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='This is `code text` in a message' sender='other' />
  </div>
);

TextFormattingCode.storyName = 'Text Formatting - Code';

export const TextFormattingCodeDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='This is `code text` in a message' sender='other' theme='dark' />
  </div>
);

TextFormattingCodeDark.storyName = 'Text Formatting - Code - Dark';

export const TextFormattingStrikethrough: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='This is ~~strikethrough text~~ in a message' sender='other' />
  </div>
);

TextFormattingStrikethrough.storyName = 'Text Formatting - Strikethrough';

export const TextFormattingStrikethroughDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='This is ~~strikethrough text~~ in a message' sender='other' theme='dark' />
  </div>
);

TextFormattingStrikethroughDark.storyName = 'Text Formatting - Strikethrough - Dark';

export const TextFormattingCombined: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='You can have **bold**, *italic*, `code`, and ~~strikethrough~~ in the same message!' sender='other' />
  </div>
);

TextFormattingCombined.storyName = 'Text Formatting - Combined';

export const TextFormattingCombinedDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='You can have **bold**, *italic*, `code`, and ~~strikethrough~~ in the same message!' sender='other' theme='dark' />
  </div>
);

TextFormattingCombinedDark.storyName = 'Text Formatting - Combined - Dark';

export const TextFormattingLinks: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <Message content='Check out [this documentation](https://example.com) for more info!' sender='other' />
  </div>
);

TextFormattingLinks.storyName = 'Text Formatting - Links';

export const TextFormattingLinksDark: Story = () => (
  <div style={bgStyleDark} className='p-8 max-w-2xl mx-auto min-h-screen bg-gray-900'>
    <Message content='Check out [this documentation](https://example.com) for more info!' sender='other' theme='dark' />
  </div>
);

TextFormattingLinksDark.storyName = 'Text Formatting - Links - Dark';

// ===== REALISTIC USE CASES (can have multiple components) =====

// Conversation example - realistic use case with multiple features
export const ConversationExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <Message content='Hey! How are you?' sender='other' showAvatar={true} username='Friend' showUsername={true} showTimestamp={true} timestamp='14:20' />
    <Message content="I'm doing great! Thanks for asking 😊" sender='user' showAvatar={true} username='You' showUsername={true} showTimestamp={true} timestamp='14:21' />
    <Message content="That's wonderful to hear!" sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='14:21' />
    <Message content='Want to grab coffee later?' sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='14:22' />
    <Message content='Sure! What time works for you?' sender='user' showAvatar={true} username='You' showUsername={false} showTimestamp={true} timestamp='14:23' />
  </div>
);

ConversationExample.storyName = 'Example - Conversation';

// Message grouping example - realistic use case showing how groups work
export const MessageGroupingExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    {/* Left group - 3 messages */}
    <Message content='Hey! How are you doing?' sender='other' showAvatar={true} username='Alice' showUsername={true} showTimestamp={true} timestamp='10:00' groupPosition='first' />
    <Message content="I haven't heard from you in a while!" sender='other' showAvatar={true} showTimestamp={true} timestamp='10:00' groupPosition='middle' />
    <Message content='Hope everything is okay!' sender='other' showAvatar={true} showTimestamp={true} timestamp='10:01' groupPosition='last' />

    {/* Right group - 2 messages */}
    <Message content="Hi Alice! I'm doing great, thanks!" sender='user' showAvatar={true} username='You' showUsername={true} showTimestamp={true} timestamp='10:05' groupPosition='first' />
    <Message content='Just been really busy with work 😊' sender='user' showAvatar={true} showTimestamp={true} timestamp='10:05' groupPosition='last' />

    {/* Left standalone */}
    <Message content='Totally understand! Want to catch up this weekend?' sender='other' showAvatar={true} username='Alice' showUsername={true} showTimestamp={true} timestamp='10:07' />

    {/* Right group - 3 messages */}
    <Message content='Absolutely!' sender='user' showAvatar={true} username='You' showUsername={true} showTimestamp={true} timestamp='10:08' groupPosition='first' />
    <Message content='Saturday works for me.' sender='user' showAvatar={true} showTimestamp={true} timestamp='10:08' groupPosition='middle' />
    <Message content='Coffee at 2pm?' sender='user' showAvatar={true} showTimestamp={true} timestamp='10:09' groupPosition='last' />
  </div>
);

MessageGroupingExample.storyName = 'Example - Message Grouping';

// Read status conversation - realistic use case
export const ReadStatusConversationExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <Message content='Hey! How are you?' sender='other' showAvatar={true} username='Friend' showUsername={true} showTimestamp={true} timestamp='14:20' />
    <Message
      content="I'm doing great! Thanks for asking 😊"
      sender='user'
      showAvatar={true}
      username='You'
      showUsername={true}
      showTimestamp={true}
      timestamp='14:21'
      showReadStatus={true}
      isRead={true}
      sentIcon={<MdCheck />}
      readIcon={<MdDoneAll />}
    />
    <Message content="That's wonderful to hear!" sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='14:21' />
    <Message content='Want to grab coffee later?' sender='other' showAvatar={true} showUsername={false} showTimestamp={true} timestamp='14:22' />
    <Message content='Sure! What time works for you?' sender='user' showAvatar={true} username='You' showUsername={false} showTimestamp={true} timestamp='14:23' showReadStatus={true} isRead={false} sentIcon={<MdCheck />} readIcon={<MdDoneAll />} />
  </div>
);

ReadStatusConversationExample.storyName = 'Example - Read Status in Conversation';

// Copy protection conversation - realistic use case
export const CopyProtectionConversationExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <Message content='Hey! Check out this confidential information:' sender='other' showAvatar={true} username='Manager' showUsername={true} showTimestamp={true} timestamp='14:20' />
    <Message content='Project Code: ABC-123-XYZ (This text cannot be copied)' sender='other' showAvatar={false} showUsername={false} showTimestamp={true} timestamp='14:20' disableTextCopy={true} />
    <Message content='Got it, thanks!' sender='user' showAvatar={true} username='You' showUsername={true} showTimestamp={true} timestamp='14:21' />
  </div>
);

CopyProtectionConversationExample.storyName = 'Example - Copy Protection in Conversation';

// Context menu conversation - realistic use case
export const ContextMenuConversationExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto min-h-screen'>
    <h2 className='text-xl font-semibold mb-4'>Conversation with Context Menus</h2>
    <p className='text-gray-600 mb-6'>Right-click on any message to see its context menu</p>

    <div className='space-y-4'>
      <Message
        content='Hey! How are you doing?'
        sender='other'
        showAvatar={true}
        username='Alice'
        showUsername={true}
        showTimestamp={true}
        timestamp='10:00'
        messageId='msg-002'
        contextMenuItems={createContextMenuItems()}
      />
      <Message
        content="I'm great! Working on this new context menu feature"
        sender='user'
        showAvatar={true}
        username='You'
        showUsername={true}
        showTimestamp={true}
        timestamp='10:01'
        messageId='msg-003'
        contextMenuItems={createContextMenuItems()}
      />
      <Message
        content='That sounds interesting! Can I try it?'
        sender='other'
        showAvatar={true}
        username='Alice'
        showUsername={true}
        showTimestamp={true}
        timestamp='10:02'
        messageId='msg-004'
        contextMenuItems={createContextMenuItems()}
      />
      <Message
        content='Of course! Just right-click on any message 😊'
        sender='user'
        showAvatar={true}
        username='You'
        showUsername={true}
        showTimestamp={true}
        timestamp='10:03'
        messageId='msg-005'
        contextMenuItems={createContextMenuItems()}
      />
    </div>
  </div>
);

ContextMenuConversationExample.storyName = 'Example - Context Menu in Conversation';

// Text formatting conversation - realistic use case
export const TextFormattingConversationExample: Story = () => (
  <div style={bgStyle} className='p-8 max-w-2xl mx-auto space-y-4 min-h-screen'>
    <Message content='Hey! Can you help me with **React components**?' sender='user' showAvatar={true} username='You' showUsername={true} showTimestamp={true} timestamp='14:20' />
    <Message content='Of course! What do you need help with?' sender='other' showAvatar={true} username='Assistant' showUsername={true} showTimestamp={true} timestamp='14:21' />
    <Message content='I need to use the `useState` hook but *not sure* how it works.' sender='user' showAvatar={true} showTimestamp={true} timestamp='14:22' />
    <Message
      content='The `useState` hook is **very simple**! Here is how you use it: `const [value, setValue] = useState(0);`'
      sender='other'
      showAvatar={true}
      showTimestamp={true}
      timestamp='14:23'
    />
    <Message content='Got it! Thanks for the help 😊' sender='user' showAvatar={true} showTimestamp={true} timestamp='14:24' />
  </div>
);

TextFormattingConversationExample.storyName = 'Example - Text Formatting in Conversation';
