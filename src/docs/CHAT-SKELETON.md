# ChatSkeleton Component

Adaptive loading skeleton for chat interfaces that automatically fits all message types.

## Features

- **Fully Adaptive**: Automatically adjusts to different message container types (bubbles, plain text, typing indicators)
- **Multiple Message Types**:
  - `bubble` - Regular message with background bubble
  - `plain` - Assistant-style message without bubble
  - `typing` - Typing indicator with animated dots
- **Random Width Generation**: Creates natural-looking skeleton with varied text line widths
- **Grouping Support**: Respects message grouping positions (standalone, first, middle, last)
- **Actions Menu Skeleton**: Optional skeleton for action buttons (plain type only)
- **Customizable**: Configure message count, input visibility, and mixed types

## Components

### MessageSkeleton

Individual message skeleton that adapts to different message types.

**Props:**

- `sender` - `'user' | 'other'` - Message sender type
- `groupPosition?` - `'standalone' | 'first' | 'middle' | 'last'` - Position in message group
- `type?` - `'bubble' | 'plain' | 'typing'` - Skeleton type (default: `'bubble'`)
- `showActions?` - `boolean` - Show action buttons skeleton (plain type only)

**Example:**

```tsx
import { MessageSkeleton } from '@/components/chat-skeleton';

// Regular bubble message
<MessageSkeleton sender="user" type="bubble" />

// Assistant-style plain message with actions
<MessageSkeleton sender="other" type="plain" showActions={true} />

// Typing indicator
<MessageSkeleton sender="other" type="typing" />
```

### ChatSkeleton

Complete chat skeleton with multiple messages and optional input field.

**Props:**

- `messageCount?` - `number` - Number of skeleton messages (default: `5`)
- `showInput?` - `boolean` - Show input field skeleton (default: `true`)
- `mixedTypes?` - `boolean` - Mix bubble and plain message types (default: `false`)

**Example:**

```tsx
import ChatSkeleton from '@/components/chat-skeleton';

// Basic skeleton
<ChatSkeleton messageCount={5} showInput={true} />

// Mixed types
<ChatSkeleton messageCount={8} mixedTypes={true} />

// Without input
<ChatSkeleton messageCount={3} showInput={false} />
```

## Adaptive Behavior

The skeleton automatically adapts to match the real message components:

1. **Message.tsx** - Uses `type="bubble"` with colored background and tail
2. **AssistantMessage.tsx** - Uses `type="plain"` with `showActions={true}`
3. **TypingMessage.tsx** - Uses `type="typing"` with animated dots

### Width Adaptation

- Removed fixed width constraints (`w-70`) from original implementation
- Uses `max-w-[80%] md:max-w-[70%]` to match real message containers
- Random widths for text lines create natural variation
- `min-w-0` on bubble container allows proper flex shrinking

## Animation

All skeletons use the built-in `animate-pulse` Tailwind class for a smooth loading effect.

## Stories

View the component in Ladle with various configurations:

- **Default** - Standard skeleton with 5 messages
- **FewMessages** - Skeleton with 3 messages
- **ManyMessages** - Skeleton with 10 messages
- **WithoutInput** - Skeleton without input field
- **WithChatBackground** - Skeleton with chat background image
- **MixedTypes** - Mix of bubble and plain message types
- **WithTypingIndicator** - Shows typing indicator skeleton
