# Chat Component

A complete chat interface component with message history, input field, typing animations, context menus, and customizable backgrounds. Inspired by modern messaging apps like Telegram and ChatGPT.

## Features

- 💬 **Full Chat Interface** - Messages + input + pending states
- 🎨 **Customizable Background** - Support for custom background images
- ⚡ **Message Animations** - Slide-in animations for new messages
- 📅 **Date Separators** - Automatic date grouping
- ⏭️ **Typing Effects** - Character-by-character typing for assistant messages
- 🔄 **Message History** - Display conversation history
- 📝 **ChatInput Integration** - Built-in message input
- ⏳ **Pending State** - Loading indicators while waiting for responses
- 🎭 **Context Menu** - Right-click menu for message actions
- 📱 **Responsive** - Works on mobile and desktop

## Props

**ChatProps:**

| Prop                 | Type                                                             | Default       | Description                                         |
| -------------------- | ---------------------------------------------------------------- | ------------- | --------------------------------------------------- |
| `messages`           | `ChatHistoryItem[]`                                              | **required**  | Array of messages and date separators               |
| `isPending`          | `boolean`                                                        | **required**  | Whether waiting for a response                      |
| `onSendMessage`      | `(message: string, image?: File, submissionId?: string) => void` | **required**  | Send message handler                                |
| `messagesEndRef`     | `React.RefObject<HTMLDivElement \| null>`                        | **required**  | Ref for auto-scrolling to bottom                    |
| `isHistoryCompleted` | `boolean`                                                        | `false`       | If true, hides input field (completed conversation) |
| `backgroundImage`    | `string`                                                         | `chatBgImage` | Background image for chat area                      |
| `contextMenuConfig`  | `ContextMenuConfig`                                              | -             | Context menu configuration                          |
| `onEditMessage`      | `(messageId: string, newContent: string) => void`                | -             | Edit message handler                                |
| `onDeleteMessage`    | `(messageId: string) => void`                                    | -             | Delete message handler                              |
| `containerClassName` | `string`                                                         | `''`          | Additional CSS classes for container                |

**ChatHistoryItem Types:**

```typescript
// Message item
{
  content: string;
  role: MessageRole.USER | MessageRole.ASSISTANT;
  isTypingComplete: boolean;
  isLoading: boolean;
  image?: string;
}

// Date separator item
{
  type: 'date';
  date: string;
}
```

**ContextMenuConfig:**

```typescript
{
  enabled: boolean;
  customItems?: ContextMenuItem[];
}
```

## Usage

### Basic Example

```tsx
import Chat from '@/components/chat/Chat';
import { useRef, useState } from 'react';
import { ChatHistoryMessage, MessageRole } from '@/types/chat';

function App() {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([
    {
      content: 'Hello! How can I help you?',
      role: MessageRole.ASSISTANT,
      isTypingComplete: true,
      isLoading: false,
    },
  ]);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string, image?: File) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        content: message,
        role: MessageRole.USER,
        isTypingComplete: true,
        isLoading: false,
        image: image ? URL.createObjectURL(image) : undefined,
      },
    ]);

    setIsPending(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: `You said: "${message}"`,
          role: MessageRole.ASSISTANT,
          isTypingComplete: true,
          isLoading: false,
        },
      ]);
      setIsPending(false);
    }, 1000);
  };

  return (
    <div style={{ height: '100vh' }}>
      <Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} />
    </div>
  );
}
```

### With Typing Effect

```tsx
const [messages, setMessages] = useState([
  {
    content: 'This will type out character by character',
    role: MessageRole.ASSISTANT,
    isTypingComplete: false, // Triggers typing animation
    isLoading: false,
  },
]);
```

### With Date Separators

```tsx
const [messages] = useState([
  {
    type: 'date' as const,
    date: 'Yesterday',
  },
  {
    content: 'Hi there!',
    role: MessageRole.USER,
    isTypingComplete: true,
    isLoading: false,
  },
  {
    type: 'date' as const,
    date: 'Today',
  },
  {
    content: 'Good morning!',
    role: MessageRole.ASSISTANT,
    isTypingComplete: true,
    isLoading: false,
  },
]);
```

### With Context Menu

```tsx
import { MdContentCopy, MdEdit, MdDelete } from 'react-icons/md';

<Chat
  messages={messages}
  isPending={isPending}
  onSendMessage={handleSendMessage}
  messagesEndRef={messagesEndRef}
  contextMenuConfig={{ enabled: true }}
  onEditMessage={(id, content) => console.log('Edit', id, content)}
  onDeleteMessage={(id) => console.log('Delete', id)}
/>;
```

### With Custom Context Menu Items

```tsx
import { MdBookmark, MdShare } from 'react-icons/md';

const customItems = [
  {
    id: 'bookmark',
    label: 'Bookmark',
    icon: <MdBookmark size={16} />,
    onClick: (id) => alert(`Bookmarked ${id}`),
  },
  {
    id: 'share',
    label: 'Share',
    icon: <MdShare size={16} />,
    onClick: (id) => alert(`Share ${id}`),
  },
];

<Chat
  messages={messages}
  isPending={isPending}
  onSendMessage={handleSendMessage}
  messagesEndRef={messagesEndRef}
  contextMenuConfig={{ enabled: true, customItems }}
  onEditMessage={handleEditMessage}
  onDeleteMessage={handleDeleteMessage}
/>;
```

### With Custom Background

```tsx
import chatBgAltImage from '@/assets/images/chat/chat-bg-alt.webp';

<Chat messages={messages} isPending={isPending} onSendMessage={handleSendMessage} messagesEndRef={messagesEndRef} backgroundImage={chatBgAltImage} />;
```

### Completed History (No Input)

```tsx
<Chat
  messages={completedMessages}
  isPending={false}
  onSendMessage={() => {}}
  messagesEndRef={messagesEndRef}
  isHistoryCompleted={true} // Hides input field
/>
```

## Ladle Stories

The component includes 11 comprehensive stories:

### 1. **Default**

Basic chat with several messages and ability to send new ones. Interactive with functional message sending.

### 2. **WithPendingMessage**

Chat showing loading state while waiting for bot response. Displays pending indicator.

### 3. **CompletedHistory**

Completed conversation with no input field (`isHistoryCompleted: true`). Read-only view.

### 4. **EmptyChat**

Empty chat with just the input field. Starting point for new conversations.

### 5. **WithTypingEffect**

Demonstrates typing animation effect where assistant messages appear character-by-character. Animation starts automatically after mounting.

### 6. **WithDateSeparators**

Chat with date separators between messages grouped by day (December 1, December 2, Today).

### 7. **WithNewMessageAnimation**

Automatic message addition with slide-in animations every 3 seconds. Demonstrates the visual effect of new messages appearing.

### 8. **WithCustomBackground**

Shows how to use a custom background image (`chat-bg-alt.webp`) instead of the default.

### 9. **LoadingSkeleton**

Displays loading skeleton state with ChatSkeleton component while messages are loading. Shows real ChatInput at the bottom.

### 10. **WithContextMenuEnabled**

Demonstrates right-click context menu on messages with standard actions (Copy, Edit, Delete). Also supports long-press on mobile.

### 11. **WithCustomContextMenuItems**

Shows custom context menu with additional items (Bookmark, Share) appended to default menu items.

### 12. **WithContextMenuDisabled**

Context menu explicitly disabled - right-clicking does nothing.

## Features Detail

### Message Animations

New messages slide in from the appropriate side:

- **User messages:** Slide in from right
- **Assistant messages:** Slide in from left
- **Animation:** Controlled via CSS classes in `Chat.animations.css`
- **Duration:** Quick, subtle animation (barely noticeable)

### Typing Effect

When `isTypingComplete: false`, assistant messages animate character-by-character:

- Default speed: 30ms per character
- Customizable via TypingMessage component
- Callback when typing completes

### Context Menu

Right-click or long-press on messages to open context menu:

- **Default items:** Copy, Edit (user messages only), Delete
- **Custom items:** Add your own via `contextMenuConfig.customItems`
- **Smart positioning:** Adjusts when near screen edges
- **Touch support:** Long-press (500ms) on mobile

### Auto-Scroll

Messages automatically scroll to bottom when:

- New message is added
- Using the `messagesEndRef` provided to the component
- Smooth scroll behavior

### Background Customization

- Default: `chat-bg.webp`
- Custom: Pass any image via `backgroundImage` prop
- Applied as repeating background pattern

## Default Context Menu Items

The component provides default context menu items:

**For any message:**

- **Copy** - Copy message content to clipboard

**For user messages only:**

- **Edit** - Edit message content

**For any message:**

- **Delete** - Remove message from history

Custom items are appended to these defaults when provided.

## Related Components

- **ChatInput** ([CHAT-INPUT.md](./CHAT-INPUT.md)) - Message input field
- **Message** ([MESSAGE.md](./MESSAGE.md)) - Individual message components
- **ChatSkeleton** ([CHAT-SKELETON.md](./CHAT-SKELETON.md)) - Loading skeleton
- **ChatList** ([CHAT-LIST.md](./CHAT-LIST.md)) - Chat list sidebar
- **MessageContextMenu** ([MESSAGE-CONTEXT-MENU.md](./MESSAGE-CONTEXT-MENU.md)) - Context menu
