# AssistantMessage Component

A ChatGPT-style message component that displays messages in plain text format without a bubble. Perfect for AI assistant responses with customizable action buttons.

## Features

- 💬 **Plain Text Format** - No bubble, clean minimal design like ChatGPT
- 🎯 **Left-Aligned Only** - Designed for assistant/bot messages
- ⚡ **Action Menu** - Fully customizable action buttons below message
- 👤 **Avatar Support** - Optional avatar display with custom colors
- ⏱️ **Timestamps** - Inline timestamp support
- 📱 **Context Menu** - Right-click and long-press support
- 🔐 **Copy Protection** - Optional text selection disabling
- 📊 **Message Grouping** - Visual grouping for consecutive messages
- 💀 **Skeleton Loading** - Built-in loading state

## Props

All props from base `MessageProps` are supported, plus:

| Prop               | Type                                            | Default         | Description                            |
| ------------------ | ----------------------------------------------- | --------------- | -------------------------------------- |
| `content`          | `ReactNode`                                     | **required**    | Message content to display             |
| `sender`           | `'user' \| 'other'`                             | **required**    | Must be 'other' for assistant messages |
| `actions`          | `AssistantMessageActionItem[]`                  | `[]`            | Action buttons below message           |
| `isLoading`        | `boolean`                                       | `false`         | Show skeleton loading state            |
| `showAvatar`       | `boolean`                                       | `true`          | Show/hide avatar                       |
| `avatarSrc`        | `string`                                        | -               | Custom avatar image URL                |
| `avatarBgColor`    | `string`                                        | `'bg-gray-400'` | Avatar background color                |
| `showUsername`     | `boolean`                                       | `false`         | Show/hide username                     |
| `username`         | `string`                                        | -               | Username to display                    |
| `showTimestamp`    | `boolean`                                       | `false`         | Show/hide timestamp                    |
| `timestamp`        | `string`                                        | -               | Timestamp text                         |
| `groupPosition`    | `'first' \| 'middle' \| 'last' \| 'standalone'` | -               | Position in message group              |
| `disableTextCopy`  | `boolean`                                       | `false`         | Prevent text selection                 |
| `messageId`        | `string`                                        | -               | Message identifier                     |
| `contextMenuItems` | `ContextMenuItem[]`                             | -               | Context menu items                     |

### AssistantMessageActionItem

| Property    | Type                           | Required | Description                               |
| ----------- | ------------------------------ | -------- | ----------------------------------------- |
| `id`        | `string`                       | ✅       | Unique identifier                         |
| `label`     | `string`                       | ✅       | Button label (can be empty for icon-only) |
| `icon`      | `ReactNode`                    | ❌       | Icon component                            |
| `onClick`   | `(messageId?: string) => void` | ✅       | Click handler                             |
| `disabled`  | `boolean`                      | ❌       | Disable button                            |
| `className` | `string`                       | ❌       | Custom classes                            |

## Usage

### Basic Example

```tsx
import AssistantMessage from '@/components/message/AssistantMessage';

<AssistantMessage content="Hello! I'm an AI assistant. How can I help you today?" sender='other' showAvatar={true} username='AI Assistant' showUsername={true} />;
```

### With Standard Actions

```tsx
import { MdRefresh, MdThumbUp, MdThumbDown, MdContentCopy } from 'react-icons/md';

const standardActions = [
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
    id: 'dislike',
    label: '',
    icon: <MdThumbDown size={14} />,
    onClick: (id) => console.log('Dislike', id),
  },
  {
    id: 'copy',
    label: '',
    icon: <MdContentCopy size={14} />,
    onClick: (id) => navigator.clipboard.writeText('message text'),
  },
];

<AssistantMessage content='This is a message with ChatGPT-style actions.' sender='other' showAvatar={true} username='AI Assistant' showUsername={true} messageId='msg-001' actions={standardActions} />;
```

### With Custom Actions

```tsx
import { MdVolumeUp, MdEdit, MdShare } from 'react-icons/md';

const customActions = [
  {
    id: 'read-aloud',
    label: 'Read Aloud',
    icon: <MdVolumeUp size={14} />,
    onClick: () => {
      // Implement text-to-speech
    },
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <MdEdit size={14} />,
    onClick: () => {
      // Enable edit mode
    },
  },
  {
    id: 'share',
    label: 'Share',
    icon: <MdShare size={14} />,
    onClick: () => {
      // Share message
    },
  },
];

<AssistantMessage content='Custom actions example' sender='other' messageId='msg-002' actions={customActions} />;
```

### Icon-Only Actions

```tsx
const iconOnlyActions = [
  {
    id: 'regenerate',
    label: '', // Empty label for icon-only
    icon: <MdRefresh size={16} />,
    onClick: () => {},
  },
  {
    id: 'like',
    label: '',
    icon: <MdThumbUp size={16} />,
    onClick: () => {},
  },
  {
    id: 'copy',
    label: '',
    icon: <MdContentCopy size={16} />,
    onClick: () => {},
  },
];

<AssistantMessage content='Icon-only actions for compact appearance' sender='other' actions={iconOnlyActions} />;
```

### Grouped Messages

```tsx
// First message in group
<AssistantMessage
  content="This is the first message."
  sender="other"
  username="AI"
  showUsername={true}
  showAvatar={true}
  groupPosition="first"
  actions={actions}
/>

// Middle messages (no avatar, no username, tighter spacing)
<AssistantMessage
  content="This is a middle message."
  sender="other"
  groupPosition="middle"
  actions={actions}
/>

// Last message in group (shows avatar)
<AssistantMessage
  content="This is the last message."
  sender="other"
  showAvatar={true}
  groupPosition="last"
  actions={actions}
/>
```

### With Loading State

```tsx
<AssistantMessage
  content='' // Content ignored when loading
  sender='other'
  showAvatar={true}
  username='AI Assistant'
  showUsername={true}
  actions={actions}
  isLoading={true} // Shows skeleton
/>
```

## Ladle Stories

15 comprehensive stories demonstrate all features:

### 1. **Basic (No Actions)**

Simple message without action buttons.

### 2. **With Standard Actions**

ChatGPT-style actions: Regenerate, Like, Dislike, Copy.

### 3. **With Timestamp**

Message with inline timestamp display.

### 4. **Long Message**

Demonstrates text wrapping for longer content.

### 5. **Custom Actions**

Custom action set with Read Aloud, Edit, Share, Copy.

### 6. **Icon-Only Actions**

Compact action buttons without labels.

### 7. **Conversation Example**

Multiple messages showing typical chat flow.

### 8. **Grouped Messages**

Messages with `first`, `middle`, `last` grouping.

### 9. **Without Avatar**

Message without avatar display.

### 10. **With Custom Avatar Color**

Custom avatar background color (`bg-purple-500`).

### 11. **Disabled Actions**

Some action buttons disabled and greyed out.

### 12. **Text Copy Disabled**

Message text cannot be selected or copied.

### 13. **Minimal Style**

No avatar, no username, no timestamp - just content and actions.

## Differences from Standard Message Component

| Feature         | Message                      | AssistantMessage         |
| --------------- | ---------------------------- | ------------------------ |
| **Bubble**      | Colored bubble (blue/gray)   | Plain text, no bubble    |
| **Alignment**   | User (right) or Other (left) | Left only                |
| **Action Menu** | No                           | Yes (fully customizable) |
| **Use Case**    | General chat messages        | AI/Bot responses         |
| **Styling**     | Telegram-style               | ChatGPT-style            |

## Action Menu Design

Actions are displayed in a horizontal row below the message:

```
┌─────────────────────────────────────┐
│ Message content here...             │
│                                     │
│ [🔄 Regenerate] [👍] [👎] [📋]    │
└─────────────────────────────────────┘
```

### Action Button Styling

- **Hover:** Light gray background
- **Active:** Slightly darker background
- **Disabled:** Greyed out, no hover effect
- **Icon + Label:** Icon on left, label on right
- **Icon Only:** Circular hover effect

## Skeleton Loading State

When `isLoading={true}`, displays an animated skeleton:

- Pulsing avatar placeholder (if `showAvatar={true}`)
- Username placeholder (if `showUsername={true}`)
- Multiple shimmer lines for content
- Action button placeholders

## Accessibility

- Semantic HTML (`<article>`, `<button>`)
- ARIA labels for screen readers
- Proper button roles
- Keyboard navigation
- Disabled state properly announced

## Styling

- Uses Tailwind CSS classes
- No colored bubble background
- Subtle hover effects on actions
- Responsive text wrapping
- Consistent with ChatGPT design

## Related Components

- **Message** - Standard bubble-style messages
- **TypingAssistantMessage** - Assistant message with typing animation
- **MessageContextMenu** - Right-click context menu
- **Chat** - Full chat interface

## File Structure

```
message/
├── AssistantMessage.tsx
├── AssistantMessage.stories.tsx
├── TypingAssistantMessage.tsx
├── TypingAssistantMessage.stories.tsx
└── types.ts
```
