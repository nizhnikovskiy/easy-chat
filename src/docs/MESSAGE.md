# Message Components

Reusable message components for chat interfaces with full customization options, accessibility features, and responsive design.

## Components

This document covers the following message components:

- **Message** - Base message component with bubble
- **StaticMessage** - Message with static text (no animation
- **TypingMessage** - Message with typing animation
- **AssistantMessage** - ChatGPT-style plain text message with actions
- **TypingAssistantMessage** - Assistant message with typing animation

### Message

Base message component with customizable appearance and behavior.

**Props:**

- `content` (ReactNode) - Message content to display
- `sender` ('user' | 'other') - Determines alignment and bubble color
- `showAvatar` (boolean, optional) - Show/hide avatar (default: true)
- `avatarSrc` (string, optional) - Custom avatar image URL
- `avatarBgColor` (string, optional) - Custom background color for avatar when no avatarSrc is provided. Accepts Tailwind classes or CSS colors (default: 'bg-gray-400')
- `showUsername` (boolean, optional) - Show/hide username label (default: false)
- `username` (string, optional) - Username to display
- `showTimestamp` (boolean, optional) - Show/hide timestamp (default: false)
- `timestamp` (string, optional) - Timestamp text (e.g., "10:30")
- `className` (string, optional) - Additional CSS classes
- `aria-label` (string, optional) - Custom ARIA label for accessibility
- `groupPosition` ('first' | 'middle' | 'last' | 'standalone', optional) - Position in message group for visual grouping
- `showReadStatus` (boolean, optional) - Show/hide read status indicator (default: false)
- `isRead` (boolean, optional) - Whether the message has been read (default: false)
- `messageId` (string, optional) - Unique message identifier (required for context menu)
- `contextMenuItems` (ContextMenuItem[], optional) - Context menu items for right-click/long-press
- `isLoading` (boolean, optional) - Show skeleton loading state instead of content
- `disableTextCopy` (boolean, optional) - Prevent text selection and copying (default: false)

**Example:**

```tsx
<Message content='Hello, how are you?' sender='other' showAvatar={true} username='John Doe' showUsername={true} showTimestamp={true} timestamp='10:30' />
```

### StaticMessage

Message component for displaying static text (no animation).

**Props:** Extends all `Message` props except `content`

- `text` (string) - Static text content

**Example:**

```tsx
<StaticMessage text='This is a static message' sender='user' showAvatar={true} showTimestamp={true} timestamp='10:31' />
```

### TypingMessage

Message component with character-by-character typing animation.

**Props:** Extends all `Message` props except `content`

- `text` (string) - Text to animate
- `typingSpeed` (number, optional) - Milliseconds per character (default: 30)
- `onComplete` (function, optional) - Callback when typing completes

**Example:**

```tsx
<TypingMessage
  text='This text will type out character by character'
  sender='other'
  typingSpeed={25}
  onComplete={() => console.log('Typing complete!')}
  showAvatar={true}
  showUsername={true}
  username='AI Assistant'
/>
```

### AssistantMessage

ChatGPT-style message component that displays plain text without a bubble.

**Props:** Extends all `MessageProps` except `isLoading`

- `content` (ReactNode) - Message content
- `actions` (AssistantMessageActionItem[], optional) - Action buttons below message (e.g., Regenerate, Like, Dislike, Copy)
- `isLoading` (boolean, optional) - Show skeleton loading state

**Example:**

```tsx
import { MdRefresh, MdThumbUp, MdContentCopy } from 'react-icons/md';

<AssistantMessage
  content='I am a ChatGPT-style message with actions!'
  sender='other'
  showAvatar={true}
  username='AI Assistant'
  showUsername={true}
  messageId='msg-001'
  actions={[
    {
      id: 'regenerate',
      label: 'Regenerate',
      icon: <MdRefresh size={14} />,
      onClick: (id) => console.log('Regenerate', id),
    },
    {
      id: 'like',
      label: '',
      icon: <MdThumbUp size={14} />,
      onClick: (id) => console.log('Like', id),
    },
    {
      id: 'copy',
      label: '',
      icon: <MdContentCopy size={14} />,
      onClick: (id) => console.log('Copy', id),
    },
  ]}
/>;
```

> See [ASSISTANT-MESSAGE.md](./ASSISTANT-MESSAGE.md) for detailed documentation.

### TypingAssistantMessage

Assistant message with character-by-character typing animation.

**Props:** Extends all `AssistantMessageProps` except `content` and `isLoading`

- `text` (string) - Text to animate with typing effect
- `typingSpeed` (number, optional) - Milliseconds per character (default: 30)
- `onComplete` (function, optional) - Callback when typing completes
- `isLoading` (boolean, optional) - Show skeleton instead of animation

**Example:**

```tsx
<TypingAssistantMessage
  text='This text will type out character by character with full formatting support.'
  sender='other'
  typingSpeed={25}
  onComplete={() => console.log('Typing complete!')}
  showAvatar={true}
  showUsername={true}
  username='AI Assistant'
  actions={standardActions}
/>
```

## Features

### Customization

1. **Sender alignment** - Messages from 'user' align right (blue bubble), from 'other' align left (gray bubble)
2. **Avatar display** - Optional avatar with automatic fallback to initials
3. **Username label** - Optional username display above message bubble
4. **Timestamp** - Telegram-style timestamp in bubble corner
5. **Custom styling** - Pass additional CSS classes via `className` prop

### Message Grouping

When displaying consecutive messages from the same user, use the `groupPosition` prop to create visually grouped messages:

- **`first`** - First message in a group: Shows username, hides avatar, removes square corner
- **`middle`** - Middle messages in a group: Hides username and avatar, removes square corner
- **`last`** - Last message in a group: Hides username, shows avatar, displays square corner
- **`standalone`** or `undefined` - Single message: Shows username and avatar, displays square corner

**Example:**

```tsx
{/* Group of 3 messages from the same user */}
<Message
  content="First message"
  sender="other"
  username="John"
  showUsername={true}
  showAvatar={true}
  groupPosition="first"
/>
<Message
  content="Second message"
  sender="other"
  showAvatar={true}
  groupPosition="middle"
/>
<Message
  content="Third message"
  sender="other"
  showAvatar={true}
  groupPosition="last"
/>
```

This creates a visually cohesive group where:

- Username appears only above the first message
- Avatar appears only next to the last message
- Square corner (tail) appears only on the last message
- Messages have tighter spacing (mb-1 instead of mb-4)

### Read Status

Display read/sent status for messages with checkmarks:

- **`showReadStatus`** - Enable read status display
- **`isRead`** - `true` shows double checkmarks (read), `false` shows single checkmark (sent)

**Example:**

```tsx
<Message content='This message has been read' sender='user' showReadStatus={true} isRead={true} showTimestamp={true} timestamp='10:30' />
```

### Text Copy Protection

Prevent users from selecting and copying message text:

- **`disableTextCopy`** - When set to `true`, users cannot select or copy the message text

**Example:**

```tsx
<Message content='This confidential message cannot be copied' sender='other' disableTextCopy={true} username='Secure Bot' />
```

This is useful for:

- Confidential information
- Temporary codes or passwords
- Protected content
- Security-sensitive messages

### Accessibility

- Semantic HTML (`<article>`, `<time>`)
- ARIA labels for screen readers
- Proper color contrast
- Keyboard navigation support
- Descriptive alternative text

### Responsive Design

- Mobile and desktop optimized
- Touch-friendly spacing
- Flexible bubble width (max 80% on mobile, 70% on desktop)
- Text wrapping for long content

## Usage

Import components:

```tsx
import { Message, StaticMessage, TypingMessage } from '@/components/message';
```

Basic usage:

```tsx
// Static message
<StaticMessage
  text="Hello!"
  sender="other"
  showAvatar={true}
  username="Assistant"
  showUsername={true}
/>

// Typing animation
<TypingMessage
  text="I'm typing this message..."
  sender="other"
  typingSpeed={30}
  onComplete={() => console.log('Done!')}
/>
```

## Ladle Stories

View component variations in Ladle. Each component has its own story file:

### Message.stories.tsx

Over 45+ stories demonstrating all base message features:

- Avatar variations (with/without, left/right)
- Avatar color options (Blue, Green, Purple, Red, Orange)
- Username display options
- Timestamp display
- Read status indicators
- Message grouping (first, middle, last, standalone)
- Text copy protection
- Context menu integration
- Long messages and text wrapping
- Custom styling
- Loading skeletons

**Avatar Color Stories:** Each color has a separate story for better clarity:

- `Avatar Color - Blue`
- `Avatar Color - Green`
- `Avatar Color - Purple`
- `Avatar Color - Red`
- `Avatar Color - Orange`

### StaticMessage.stories.tsx

10 stories for static text messages:

- Default static message
- Short and long text
- With/without avatar
- Custom avatars
- Minimal styling
- Chat history examples
- Different alignments
- Copy protection

### TypingMessage.stories.tsx

17 stories for typing animation:

- Default typing animation
- Fast/slow typing speeds
- Long text typing
- Completion callbacks
- User typing messages
- Conversation examples
- Multiple typing messages
- Minimal styling
- Custom avatars
- Copy disabled
- **Formatted text typing** (bold, italic, code, links, combined)

### AssistantMessage.stories.tsx

15 stories for ChatGPT-style messages:

- Basic (no actions)
- With standard actions (Regenerate, Like, Dislike, Copy)
- With timestamp
- Long messages
- Custom actions
- Icon-only actions
- Conversation examples
- Grouped messages
- Without avatar
- Custom avatar colors
- Disabled actions
- Text copy disabled
- Minimal style

> See [ASSISTANT-MESSAGE.md](./ASSISTANT-MESSAGE.md) for detailed documentation

### TypingAssistantMessage.stories.tsx

11 stories for typing assistant messages:

- Default typing animation
- With actions
- With formatting support
- Long messages
- Fast/slow typing
- Grouped messages
- With timestamp and read status
- No avatar
- With context menu

Run Ladle to view stories:

```bash
npm run ladle
```

## Styling

Components use Tailwind CSS. Key design elements:

- User messages: Blue background (#3B82F6)
- Other messages: Gray background (#E5E7EB)
- Rounded corners with directional tail
- Telegram-inspired timestamp positioning
- Smooth shadows for depth

## File Structure

```
message/
├── Message.tsx                  # Base component
├── Message.stories.tsx          # Base component stories
├── StaticMessage.tsx            # Static text variant
├── StaticMessage.stories.tsx    # Static message stories
├── TypingMessage.tsx            # Typing animation variant
├── TypingMessage.stories.tsx    # Typing animation stories
├── types.ts                     # TypeScript interfaces
├── index.ts                     # Barrel exports
└── README.md                    # This file
```
