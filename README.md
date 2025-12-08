# Easy Chat

Lightweight and customizable React chat components library built with TypeScript and Tailwind CSS.

## Features

- 💬 **Multiple Message Components**: Regular messages, typing animations, assistant-style messages
- 🎨 **Fully Customizable**: Theme support, custom colors, and flexible styling
- 📱 **Responsive Design**: Works on desktop and mobile
- ♿ **Accessible**: Built with ARIA labels and semantic HTML
- 🌙 **Dark Mode**: Built-in dark theme support
- 📦 **Lightweight**: Minimal bundle size with tree-shaking support
- 🔧 **TypeScript**: Full TypeScript support with type definitions
- 🎭 **Context Menus**: Right-click and long-press support for message actions

## Installation

```bash
npm install easy-chat
# or
yarn add easy-chat
# or
pnpm add easy-chat
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-dom
```

**Note:** `react-icons` is no longer a peer dependency. You can install it as a regular dependency if you want to use icons in your project:

```bash
npm install react-icons
```

## Setup

Easy Chat uses Tailwind CSS for styling. You need to set up Tailwind in your project:

1. Install Tailwind CSS if you haven't already:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. Configure Tailwind to scan Easy Chat components in your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Add this line to scan Easy Chat components
    './node_modules/easy-chat/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. Import the Easy Chat CSS in your main file:

```tsx
import 'easy-chat/styles';
```

## Quick Start

```tsx
import { Chat, Message, ChatInput } from 'easy-chat';
import 'easy-chat/styles';
import { IoArrowUp, IoAttach, IoClose } from 'react-icons/io5';
import { MdCheck, MdDoneAll } from 'react-icons/md';

function App() {
  const [messages, setMessages] = useState([
    {
      type: 'message',
      content: 'Hello!',
      sender: 'user',
      timestamp: '10:30',
    },
  ]);

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg, idx) => (
          <Message 
            key={idx} 
            content={msg.content} 
            sender={msg.sender} 
            timestamp={msg.timestamp} 
            showTimestamp
            showReadStatus={msg.sender === 'user'}
            sentIcon={<MdCheck />}
            readIcon={<MdDoneAll />}
          />
        ))}
      </div>

      <ChatInput
        onSend={(message) => {
          setMessages([
            ...messages,
            {
              content: message,
              sender: 'user',
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }}
        sendButton={{ icon: <IoArrowUp /> }}
        mediaButton={{ icon: <IoAttach /> }}
        closeIcon={<IoClose />}
        enableMediaUpload
      />
    </div>
  );
}
```

## Components

### Message Components

- **`Message`**: Base message component with bubble styling
- **`StaticMessage`**: Simple message with text content
- **`TypingMessage`**: Animated typing effect message
- **`AssistantMessage`**: ChatGPT-style message without bubble
- **`TypingAssistantMessage`**: Assistant message with typing animation

### Layout Components

- **`Chat`**: Complete chat interface with messages and input
- **`ChatList`**: Sidebar with chat list items
- **`ChatInput`**: Input field with send button and optional media upload
- **`ChatSkeleton`**: Loading skeleton for chat messages
- **`MessageContextMenu`**: Context menu for message actions
- **`DateSeparator`**: Date separator for message groups
- **`Button`**: Customizable button component

## Documentation

For detailed documentation and examples, visit: [https://nizhnikovskiy.github.io/easy-chat/](https://nizhnikovskiy.github.io/easy-chat/)

## Examples

### Typing Animation

```tsx
import { TypingMessage } from 'easy-chat';

<TypingMessage text='This text will appear with a typing animation' sender='other' typingSpeed={50} onComplete={() => console.log('Done typing!')} />;
```

### Dark Theme

```tsx
import { Message } from 'easy-chat';

<Message content='Dark mode message' sender='user' theme='dark' />;
```

### Context Menu

```tsx
import { Message } from 'easy-chat';

const contextMenu = [
  { id: 'copy', label: 'Copy', onClick: () => {} },
  { id: 'delete', label: 'Delete', onClick: () => {} },
];

<Message content='Right-click me!' sender='user' messageId='msg-1' contextMenuItems={contextMenu} />;
```

## Icon Usage

Easy Chat components accept icons as props, giving you full control over which icon library to use. Icons are passed with descriptive prop names:

### ChatInput Icons

```tsx
import { ChatInput } from 'easy-chat';
import { IoArrowUp, IoAttach, IoMic, IoClose } from 'react-icons/io5';

<ChatInput
  sendButton={{ icon: <IoArrowUp /> }}
  mediaButton={{ icon: <IoAttach /> }}
  voiceButton={{ icon: <IoMic /> }}
  closeIcon={<IoClose />}
  enableMediaUpload
  enableVoiceInput
/>
```

### Message Icons (Read Status)

```tsx
import { Message } from 'easy-chat';
import { MdCheck, MdDoneAll } from 'react-icons/md';

<Message
  content="Hello!"
  sender="user"
  showReadStatus
  isRead={true}
  sentIcon={<MdCheck />}     // Single checkmark (sent)
  readIcon={<MdDoneAll />}    // Double checkmark (read)
/>
```

### Chat Component Icons

The Chat component accepts all icons and passes them to its child components:

```tsx
import { Chat } from 'easy-chat';
import { IoArrowUp, IoAttach, IoMic, IoClose } from 'react-icons/io5';
import { MdContentCopy, MdEdit, MdDelete, MdCheck, MdDoneAll } from 'react-icons/md';

<Chat
  messages={messages}
  isPending={false}
  onSendMessage={handleSend}
  messagesEndRef={messagesEndRef}
  // ChatInput icons
  sendIcon={<IoArrowUp />}
  attachmentIcon={<IoAttach />}
  microphoneIcon={<IoMic />}
  closeIcon={<IoClose />}
  // Context menu icons
  copyIcon={<MdContentCopy size={16} />}
  editIcon={<MdEdit size={16} />}
  deleteIcon={<MdDelete size={16} />}
  // Message read status icons
  sentIcon={<MdCheck />}
  readIcon={<MdDoneAll />}
/>
```

### Why Icons as Props?

- **Flexibility**: Use any icon library (react-icons, lucide-react, heroicons, etc.)
- **Bundle Size**: Only bundle the icons you actually use
- **Customization**: Full control over icon size, color, and styling
- **No Peer Dependencies**: Icons are not bundled with the library

## TypeScript

All components are fully typed. Import types as needed:

```tsx
import type { MessageProps, ChatInputProps, ChatListItemData } from 'easy-chat';
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/nizhnikovskiy/easy-chat](https://github.com/nizhnikovskiy/easy-chat)
