import type { Story } from '@ladle/react';
import { Message } from '@/components/message';
import { ContextMenuItem } from '@/types/context-menu';
import { MdContentCopy, MdEdit, MdDelete, MdSelectAll, MdShare, MdBookmark } from 'react-icons/md';
import chatBgImage from '@/assets/images/chat/chat-bg.webp';
import chatBgDarkImage from '@/assets/images/chat/chat-bg-dark.webp';
import avatar1 from '@/assets/images/avatars/avatar-1.webp';
import avatar2 from '@/assets/images/avatars/avatar-2.webp';

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

// Default menu items for stories
const defaultItems: ContextMenuItem[] = [
  {
    id: 'copy',
    label: 'Copy',
    icon: <MdContentCopy size={16} />,
    onClick: (messageId) => console.log('Copy clicked', messageId),
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <MdEdit size={16} />,
    onClick: (messageId) => console.log('Edit clicked', messageId),
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <MdDelete size={16} />,
    onClick: (messageId) => console.log('Delete clicked', messageId),
    divider: true,
  },
  {
    id: 'select',
    label: 'Select text',
    icon: <MdSelectAll size={16} />,
    onClick: (messageId) => console.log('Select clicked', messageId),
  },
];

export const WithUserMessage: Story = () => {
  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Right-click (or long-press on mobile) on any message to see the context menu</p>
        </div>

        <Message
          content='Hey! This is a user message. Right-click on it to see the context menu! 👋'
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showUsername={true}
          username='John Doe'
          showTimestamp={true}
          timestamp='12:34'
          messageId='msg-user-1'
          contextMenuItems={defaultItems}
        />
      </div>
    </div>
  );
};

WithUserMessage.storyName = 'With User Message';

export const WithOtherMessage: Story = () => {
  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Right-click (or long-press on mobile) on the message to open context menu</p>
        </div>

        <Message
          content='This is a message from another user. Try right-clicking on it!'
          sender='other'
          showAvatar={true}
          avatarSrc={avatar2}
          showUsername={true}
          username='Jane Smith'
          showTimestamp={true}
          timestamp='12:35'
          messageId='msg-other-1'
          contextMenuItems={defaultItems}
        />
      </div>
    </div>
  );
};

WithOtherMessage.storyName = 'With Other Message';

export const WithoutIcons: Story = () => {
  const items: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      onClick: (messageId) => console.log('Copy clicked', messageId),
    },
    {
      id: 'edit',
      label: 'Edit',
      onClick: (messageId) => console.log('Edit clicked', messageId),
    },
    {
      id: 'delete',
      label: 'Delete',
      onClick: (messageId) => console.log('Delete clicked', messageId),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Menu items without icons</p>
        </div>

        <Message
          content='This message has a context menu without icons. Right-click to see!'
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showTimestamp={true}
          timestamp='12:36'
          messageId='msg-no-icons'
          contextMenuItems={items}
        />
      </div>
    </div>
  );
};

WithoutIcons.storyName = 'Without Icons';

export const WithDividers: Story = () => {
  const items: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={16} />,
      onClick: (messageId) => console.log('Copy clicked', messageId),
      divider: true,
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <MdEdit size={16} />,
      onClick: (messageId) => console.log('Edit clicked', messageId),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <MdDelete size={16} />,
      onClick: (messageId) => console.log('Delete clicked', messageId),
      divider: true,
    },
    {
      id: 'share',
      label: 'Share',
      icon: <MdShare size={16} />,
      onClick: (messageId) => console.log('Share clicked', messageId),
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      icon: <MdBookmark size={16} />,
      onClick: (messageId) => console.log('Bookmark clicked', messageId),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Menu with dividers to separate action groups</p>
        </div>

        <Message
          content='This message has a context menu with dividers. Right-click to see how actions are grouped!'
          sender='other'
          showAvatar={true}
          avatarSrc={avatar2}
          showUsername={true}
          username='Jane Smith'
          showTimestamp={true}
          timestamp='12:37'
          messageId='msg-dividers'
          contextMenuItems={items}
        />
      </div>
    </div>
  );
};

WithDividers.storyName = 'With Dividers';

export const WithDisabledItems: Story = () => {
  const items: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={16} />,
      onClick: (messageId) => console.log('Copy clicked', messageId),
    },
    {
      id: 'edit',
      label: 'Edit (disabled)',
      icon: <MdEdit size={16} />,
      onClick: (messageId) => console.log('Edit clicked', messageId),
      disabled: true,
    },
    {
      id: 'delete',
      label: 'Delete (disabled)',
      icon: <MdDelete size={16} />,
      onClick: (messageId) => console.log('Delete clicked', messageId),
      disabled: true,
    },
    {
      id: 'select',
      label: 'Select text',
      icon: <MdSelectAll size={16} />,
      onClick: (messageId) => console.log('Select clicked', messageId),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Some menu items are disabled (Edit and Delete)</p>
        </div>

        <Message
          content='This message shows disabled context menu items. Right-click and try to click on Edit or Delete!'
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showTimestamp={true}
          timestamp='12:38'
          messageId='msg-disabled'
          contextMenuItems={items}
        />
      </div>
    </div>
  );
};

WithDisabledItems.storyName = 'With Disabled Items';

export const LongMenu: Story = () => {
  const items: ContextMenuItem[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy size={16} />,
      onClick: (messageId) => console.log('Copy clicked', messageId),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <MdEdit size={16} />,
      onClick: (messageId) => console.log('Edit clicked', messageId),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <MdDelete size={16} />,
      onClick: (messageId) => console.log('Delete clicked', messageId),
      divider: true,
    },
    {
      id: 'select',
      label: 'Select text',
      icon: <MdSelectAll size={16} />,
      onClick: (messageId) => console.log('Select clicked', messageId),
    },
    {
      id: 'share',
      label: 'Share',
      icon: <MdShare size={16} />,
      onClick: (messageId) => console.log('Share clicked', messageId),
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      icon: <MdBookmark size={16} />,
      onClick: (messageId) => console.log('Bookmark clicked', messageId),
      divider: true,
    },
    {
      id: 'action1',
      label: 'Custom Action 1',
      onClick: (messageId) => console.log('Action 1 clicked', messageId),
    },
    {
      id: 'action2',
      label: 'Custom Action 2',
      onClick: (messageId) => console.log('Action 2 clicked', messageId),
    },
    {
      id: 'action3',
      label: 'Custom Action 3',
      onClick: (messageId) => console.log('Action 3 clicked', messageId),
    },
  ];

  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Long menu with many items</p>
        </div>

        <Message
          content='This message has a long context menu with many actions. Right-click to see all options!'
          sender='other'
          showAvatar={true}
          avatarSrc={avatar2}
          showUsername={true}
          username='Jane Smith'
          showTimestamp={true}
          timestamp='12:39'
          messageId='msg-long'
          contextMenuItems={items}
        />
      </div>
    </div>
  );
};

LongMenu.storyName = 'Long Menu';

export const ConversationExample: Story = () => {
  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Right-click on any message in this conversation</p>
        </div>

        <Message
          content='Hey Jane! How are you doing today?'
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showUsername={true}
          username='John Doe'
          showTimestamp={true}
          timestamp='12:30'
          messageId='msg-conv-1'
          contextMenuItems={defaultItems}
          groupPosition='first'
        />

        <Message
          content="I've been working on this new project and wanted to get your thoughts!"
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showTimestamp={true}
          timestamp='12:30'
          messageId='msg-conv-2'
          contextMenuItems={defaultItems}
          groupPosition='last'
        />

        <Message
          content="Oh that sounds interesting! I'd love to hear more about it."
          sender='other'
          showAvatar={true}
          avatarSrc={avatar2}
          showUsername={true}
          username='Jane Smith'
          showTimestamp={true}
          timestamp='12:31'
          messageId='msg-conv-3'
          contextMenuItems={defaultItems}
          groupPosition='first'
        />

        <Message
          content='What are you working on?'
          sender='other'
          showAvatar={true}
          avatarSrc={avatar2}
          showTimestamp={true}
          timestamp='12:31'
          messageId='msg-conv-4'
          contextMenuItems={defaultItems}
          groupPosition='last'
        />

        <Message
          content="It's a new chat component library! Really excited about it! 🚀"
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showTimestamp={true}
          timestamp='12:32'
          showReadStatus={true}
          isRead={true}
          messageId='msg-conv-5'
          contextMenuItems={defaultItems}
        />
      </div>
    </div>
  );
};

ConversationExample.storyName = 'Example: Full Conversation';

export const EdgePositioning: Story = () => {
  return (
    <div style={bgStyle} className='p-8 min-h-screen'>
      <div className='max-w-[95%] mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Click on messages at different positions to test menu positioning logic</p>
        </div>

        {/* Top */}
        <Message content='Message at the top - menu should slide down' sender='user' showAvatar={true} avatarSrc={avatar1} messageId='msg-top' contextMenuItems={defaultItems} />

        <div className='h-32' />

        {/* Middle */}
        <Message content='Message in the middle' sender='other' showAvatar={true} avatarSrc={avatar2} messageId='msg-middle' contextMenuItems={defaultItems} />

        <div className='h-32' />

        {/* Bottom */}
        <Message content='Message at the bottom - menu should slide up' sender='user' showAvatar={true} avatarSrc={avatar1} messageId='msg-bottom' contextMenuItems={defaultItems} />
      </div>
    </div>
  );
};

EdgePositioning.storyName = 'Edge Positioning Test';

// ===== DARK THEME STORIES =====

export const WithUserMessageDark: Story = () => {
  return (
    <div style={bgStyleDark} className='p-8 min-h-screen bg-gray-900'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Right-click (or long-press on mobile) on any message to see the context menu</p>
        </div>

        <Message
          content='Hey! This is a user message. Right-click on it to see the context menu! 👋'
          sender='user'
          showAvatar={true}
          avatarSrc={avatar1}
          showUsername={true}
          username='John Doe'
          showTimestamp={true}
          timestamp='12:34'
          messageId='msg-user-1'
          contextMenuItems={defaultItems}
          theme='dark'
        />
      </div>
    </div>
  );
};

WithUserMessageDark.storyName = 'With User Message - Dark';

export const WithOtherMessageDark: Story = () => {
  return (
    <div style={bgStyleDark} className='p-8 min-h-screen bg-gray-900'>
      <div className='max-w-2xl mx-auto space-y-4'>
        <div className='text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-6'>
          <p className='text-sm'>💡 Right-click (or long-press on mobile) on the message to open context menu</p>
        </div>

        <Message
          content='This is a message from another user. Try right-clicking on it!'
          sender='other'
          showAvatar={true}
          avatarSrc={avatar2}
          showUsername={true}
          username='Jane Smith'
          showTimestamp={true}
          timestamp='12:35'
          messageId='msg-other-1'
          contextMenuItems={defaultItems}
          theme='dark'
        />
      </div>
    </div>
  );
};

WithOtherMessageDark.storyName = 'With Other Message - Dark';
