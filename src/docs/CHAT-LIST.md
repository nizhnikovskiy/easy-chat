# ChatList Component

A Telegram-inspired chat list component that displays a sidebar with active conversations. The component is highly customizable with support for positioning, styling, and real-time updates.

## Features

- 📱 **Telegram-Style Design** - Clean, modern sidebar interface
- 🎨 **Fully Customizable** - Colors, positioning, dimensions all configurable
- 📍 **Flexible Positioning** - Can be placed on left or right side
- 🔔 **Unread Badge** - Shows unread message counts
- 🟢 **Online Status** - Displays user online/offline indicators
- 🔍 **Search Bar** - Built-in search functionality
- ⚡ **Active State** - Highlights currently selected chat
- 📅 **Smart Timestamps** - Relative time display (e.g., "15 minutes ago")
- 🌈 **Dark/Light Themes** - Customizable color schemes
- 🤖 **LLM-Style Support** - Optional avatar hiding for AI chat interfaces

## Components

### ChatList

Main container component that renders the chat list sidebar.

**Props:**

| Prop                    | Type                       | Default      | Description                            |
| ----------------------- | -------------------------- | ------------ | -------------------------------------- |
| `items`                 | `ChatListItemData[]`       | **required** | Array of chat conversations to display |
| `position`              | `'left' \| 'right'`        | `'left'`     | Sidebar position on screen             |
| `onChatSelect`          | `(chatId: string) => void` | -            | Callback when a chat is clicked        |
| `activeChatId`          | `string`                   | -            | ID of currently active/selected chat   |
| `width`                 | `string`                   | `'350px'`    | Width of the sidebar                   |
| `height`                | `string`                   | `'100vh'`    | Height of the sidebar                  |
| `backgroundColor`       | `string`                   | `'#ffffff'`  | Background color of sidebar            |
| `activeBackgroundColor` | `string`                   | `'#f0f0f0'`  | Background color of active chat item   |
| `textColor`             | `string`                   | `'#000000'`  | Primary text color                     |
| `timestampColor`        | `string`                   | `'#8e8e93'`  | Timestamp and secondary text color     |
| `unreadBadgeColor`      | `string`                   | `'#34c759'`  | Unread message badge color             |
| `className`             | `string`                   | `''`         | Additional CSS classes                 |

### ChatListItemData

Data structure for individual chat items.

**Properties:**

| Property      | Type             | Required | Description                                                        |
| ------------- | ---------------- | -------- | ------------------------------------------------------------------ |
| `id`          | `string`         | ✅       | Unique identifier for the chat                                     |
| `name`        | `string`         | ✅       | Display name of the chat/contact                                   |
| `avatar`      | `string`         | ❌       | URL to avatar image                                                |
| `lastMessage` | `string`         | ❌       | Preview of the last message                                        |
| `timestamp`   | `Date \| string` | ❌       | Time of last message                                               |
| `unreadCount` | `number`         | ❌       | Number of unread messages (0 hides badge)                          |
| `isActive`    | `boolean`        | ❌       | Whether this chat is currently active                              |
| `isOnline`    | `boolean`        | ❌       | Whether the contact is online                                      |
| `showAvatar`  | `boolean`        | ❌       | Show/hide avatar (default: true). Set to false for LLM-style chats |

## Usage

### Basic Example

```tsx
import { ChatList } from '@/components/chat-list';
import type { ChatListItemData } from '@/types/chat-list';

const chats: ChatListItemData[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '/avatars/alice.jpg',
    lastMessage: 'See you tomorrow!',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    lastMessage: 'Thanks for your help!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
    isOnline: false,
  },
];

function App() {
  const [activeChatId, setActiveChatId] = useState<string>();

  return <ChatList items={chats} activeChatId={activeChatId} onChatSelect={setActiveChatId} />;
}
```

### Combined with Chat Component

```tsx
import { ChatList } from '@/components/chat-list';
import Chat from '@/components/chat/Chat';

function MessengerApp() {
  const [activeChatId, setActiveChatId] = useState('1');
  const [messages, setMessages] = useState([]);

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    // Load messages for selected chat
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Chat List on Left */}
      <ChatList items={chats} position='left' activeChatId={activeChatId} onChatSelect={handleChatSelect} />

      {/* Chat Window on Right */}
      <div style={{ flex: 1 }}>
        <Chat messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
```

### LLM-Style Chats (No Avatars)

For AI/LLM chat interfaces, you can hide avatars to create a cleaner look:

```tsx
const llmChats: ChatListItemData[] = [
  {
    id: '1',
    name: 'ChatGPT 4',
    lastMessage: 'How can I assist you today?',
    timestamp: new Date(),
    showAvatar: false, // No avatar for LLM chats
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    lastMessage: 'I analyzed the code you shared...',
    timestamp: new Date(),
    unreadCount: 2,
    showAvatar: false, // No avatar for LLM chats
  },
  {
    id: '3',
    name: 'John Doe',
    avatar: '/avatars/john.jpg',
    lastMessage: 'Thanks!',
    timestamp: new Date(),
    showAvatar: true, // Regular chat with avatar
  },
];

<ChatList items={llmChats} />;
```

### Custom Dark Theme

```tsx
<ChatList items={chats} width='400px' backgroundColor='#2c2c2c' activeBackgroundColor='#3a3a3a' textColor='#ffffff' timestampColor='#9ca3af' unreadBadgeColor='#ef4444' />
```

### Right-Side Position

```tsx
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <ChatList items={chats} position='right' />
</div>
```

## Ladle Stories

The component includes 10 comprehensive stories demonstrating different use cases:

### 1. **Default**

Basic chat list with sample conversations, avatars, and unread badges.

### 2. **WithUnreadMessages**

Shows varied unread message counts across different chats.

### 3. **WithActiveChat**

Demonstrates active chat highlighting (Carol White is selected).

### 4. **LeftPosition**

Chat list positioned on the left side of the screen (default).

### 5. **RightPosition**

Chat list positioned on the right side of the screen.

### 6. **CombinedWithChatLeft**

Full messenger interface with chat list on left and chat window on right. Interactive demo with working message sending.

### 7. **CombinedWithChatRight**

Full messenger interface with chat list on right and chat window on left.

### 8. **CustomStyling**

Dark theme with custom colors and dimensions.

### 9. **EmptyChatList**

Shows empty state when no chats are available.

### 10. **LLM-Style Chats (No Avatars)**

Demonstrates LLM-style chats without avatars mixed with regular user chats. Shows how `showAvatar: false` creates a cleaner interface for AI assistants (ChatGPT, Claude, Gemini, Perplexity) while
maintaining regular avatars for human contacts.

## Features Detail

### Smart Timestamp Formatting

Timestamps are automatically formatted based on recency:

- **< 1 hour:** "X minutes ago"
- **< 24 hours:** "X hours ago"
- **< 7 days:** "X days ago"
- **> 7 days:** Full date

### Unread Badge

- Badge appears when `unreadCount > 0`
- Displays count up to 99
- Shows "99+" for counts over 99
- Badge color customizable via `unreadBadgeColor` prop

###Online Status

- Green dot indicator when `isOnline: true`
- Positioned on bottom-right of avatar
- Automatically hidden when avatar is not shown

### Avatar Display

- **Default behavior:** Avatar always shows (either image or initial letter)
- **LLM-style:** Set `showAvatar: false` to hide avatar completely
- **Use case:** Perfect for AI chat interfaces where avatars are unnecessary

### Search Bar

- Built-in search input in header
- Currently UI-only (filtering logic to be implemented by parent)
- Customizable styling via theme colors

### Active Chat Highlighting

- Distinct background color for active chat
- Controlled via `activeChatId` prop
- Visual feedback for user selection

## Styling

The component uses:

- **Inline styles** for dynamic theming
- **Tailwind CSS** for layout and spacing
- **Custom borders** for visual separation
- **Hover effects** on chat items and buttons

### Default Theme Colors

```css
Background: #ffffff
Active Background: #f0f0f0
Text: #000000
Timestamp: #8e8e93
Unread Badge: #34c759
Border: #e5e5ea
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Interactive elements are properly sized
- Color contrast meets WCAG guidelines

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design adapts to different screen sizes

## File Structure

```
chat-list/
├── ChatList.tsx          # Main component
├── ChatListItem.tsx      # Individual chat item
├── ChatList.stories.tsx  # Ladle stories
└── index.ts              # Exports
```
