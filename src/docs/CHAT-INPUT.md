# ChatInput Component

A highly customizable chat input component inspired by Telegram's UX. This component supports text input, media uploads, and voice recording with flexible customization options.

## Features

- 📝 **Text Input** - Auto-growing textarea with character counter
- 📎 **Media Upload** - Support for image/file attachments with preview
- 🎤 **Voice Input** - Optional voice recording button
- 🔄 **Mode Toggle** - Switch between text and voice modes
- 🎨 **Fully Customizable** - All buttons and styles can be customized
- 📱 **Responsive** - Works great on mobile and desktop
- ♿ **Accessible** - WCAG 2.1 compliant with full keyboard and screen reader support
- 🔊 **Screen Reader Support** - Live announcements for key actions
- 🌍 **i18n Ready** - Customizable ARIA labels for internationalization
- 📲 **Touch-Optimized** - Min 44px touch targets, iOS Safari optimizations

## Installation

This component is self-contained and includes all necessary dependencies. Simply copy the `chat-input` folder to your project.

```bash
# No installation needed - all dependencies are included
```

## Basic Usage

```tsx
import { ChatInput } from './chat-input/ChatInput';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
    console.log('Sending:', msg);
  };

  return <ChatInput value={message} onChange={setMessage} onSend={handleSend} placeholder='Type a message...' />;
}
```

## Accessibility Features

### WCAG 2.1 Compliance

- ✅ **Keyboard Navigation** - Full keyboard support with Tab, Enter, Shift+Enter
- ✅ **Screen Reader Support** - ARIA labels, live regions, and announcements
- ✅ **Focus Management** - Visible focus indicators and logical tab order
- ✅ **Error States** - Accessible error messages with aria-invalid and aria-describedby
- ✅ **Touch Targets** - Minimum 44x44px for all interactive elements
- ✅ **Color Contrast** - WCAG AA compliant color combinations

### Screen Reader Announcements

The component announces important actions:

- "Message sent" when a message is successfully sent
- Character count updates as you type
- Error messages with assertive priority

### Customizable ARIA Labels

All interactive elements have customizable ARIA labels for internationalization:

```tsx
<ChatInput
  ariaLabel='Повідомлення' // Input field
  sendAriaLabel='Надіслати повідомлення' // Send button
  mediaAriaLabel='Прикріпити медіа' // Media button
  voiceAriaLabel='Записати голосове повідомлення' // Voice button
/>
```

## Mobile & Desktop Responsiveness

### Touch-Friendly Design

- **Minimum 44x44px touch targets** for all buttons
- **Larger touch areas** on mobile devices
- **Touch manipulation optimization** for better performance

### iOS Safari Optimizations

- **16px font size** on inputs to prevent automatic zoom
- **Safe area insets** support for notch devices (iPhone X+)
- **Proper viewport handling** for consistent behavior

### Responsive Spacing

- Adaptive padding: `3` on mobile, `4` on desktop (Tailwind scale)
- Responsive gaps between elements
- Adaptive font sizes for different screen sizes

### Safe Areas (iPhone Notch Support)

The component automatically adds padding for safe areas:

```css
padding-bottom: max(1rem, env(safe-area-inset-bottom));
padding-left: max(1rem, env(safe-area-inset-left));
padding-right: max(1rem, env(safe-area-inset-right));
```

## Props API

### ChatInputProps

| Prop                 | Type                                      | Default                  | Description                      |
| -------------------- | ----------------------------------------- | ------------------------ | -------------------------------- |
| `value`              | `string`                                  | `''`                     | Current message value            |
| `onChange`           | `(value: string) => void`                 | -                        | Change handler for message input |
| `onSend`             | `(message: string, media?: File) => void` | -                        | Send message handler             |
| `placeholder`        | `string`                                  | `'Type a message...'`    | Placeholder text                 |
| `disabled`           | `boolean`                                 | `false`                  | Disable all inputs               |
| `isLoading`          | `boolean`                                 | `false`                  | Show loading state               |
| `maxLength`          | `number`                                  | -                        | Maximum input length             |
| `showCharacterCount` | `boolean`                                 | `false`                  | Show character counter           |
| `enableMediaUpload`  | `boolean`                                 | `false`                  | Enable media upload button       |
| `mediaButton`        | `MediaButtonProps`                        | -                        | Media button customization       |
| `enableVoiceInput`   | `boolean`                                 | `false`                  | Enable voice input button        |
| `voiceButton`        | `VoiceButtonProps`                        | -                        | Voice button customization       |
| `sendButton`         | `SendButtonProps`                         | -                        | Send button customization        |
| `enableModeToggle`   | `boolean`                                 | `false`                  | Enable voice/text mode toggle    |
| `isVoiceMode`        | `boolean`                                 | `false`                  | Current voice mode state         |
| `onModeChange`       | `(isVoiceMode: boolean) => void`          | -                        | Mode change handler              |
| `className`          | `string`                                  | `''`                     | Container className              |
| `inputClassName`     | `string`                                  | `''`                     | Input className                  |
| `autoFocus`          | `boolean`                                 | `false`                  | Auto-focus input on mount        |
| `autoGrow`           | `boolean`                                 | `true`                   | Auto-grow textarea               |
| `maxRows`            | `number`                                  | `5`                      | Maximum rows for auto-grow       |
| `error`              | `boolean`                                 | `false`                  | Error state                      |
| `errorMessage`       | `string`                                  | -                        | Error message for screen readers |
| `ariaLabel`          | `string`                                  | `'Message input'`        | ARIA label for input             |
| `sendAriaLabel`      | `string`                                  | `'Send message'`         | ARIA label for send button       |
| `mediaAriaLabel`     | `string`                                  | `'Attach media'`         | ARIA label for media button      |
| `voiceAriaLabel`     | `string`                                  | `'Record voice message'` | ARIA label for voice button      |

### SendButtonProps

| Prop        | Type                                               | Description                  |
| ----------- | -------------------------------------------------- | ---------------------------- |
| `component` | `ReactNode`                                        | Custom send button component |
| `label`     | `string`                                           | Button label text            |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Button style variant         |
| `onClick`   | `() => void`                                       | Custom click handler         |
| `disabled`  | `boolean`                                          | Disable button               |
| `className` | `string`                                           | Custom className             |

### MediaButtonProps

| Prop        | Type                   | Description                                |
| ----------- | ---------------------- | ------------------------------------------ |
| `component` | `ReactNode`            | Custom media button component              |
| `label`     | `string`               | Button label text                          |
| `accept`    | `string`               | Accepted file types (default: `'image/*'`) |
| `onUpload`  | `(file: File) => void` | Upload handler                             |
| `disabled`  | `boolean`              | Disable button                             |
| `className` | `string`               | Custom className                           |

### VoiceButtonProps

| Prop               | Type         | Description                   |
| ------------------ | ------------ | ----------------------------- |
| `component`        | `ReactNode`  | Custom voice button component |
| `idleLabel`        | `string`     | Label when idle               |
| `recordingLabel`   | `string`     | Label when recording          |
| `onStartRecording` | `() => void` | Start recording handler       |
| `onStopRecording`  | `() => void` | Stop recording handler        |
| `isRecording`      | `boolean`    | Current recording state       |
| `disabled`         | `boolean`    | Disable button                |
| `className`        | `string`     | Custom className              |

## Examples

### With Error State

```tsx
<ChatInput value={message} onChange={setMessage} onSend={handleSend} error={hasError} errorMessage='Message cannot be empty' />
```

### With Media Upload

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  enableMediaUpload
  mediaButton={{
    accept: 'image/*,video/*',
    onUpload: (file) => console.log('Uploaded:', file),
  }}
/>
```

### With Voice Input

```tsx
const [isRecording, setIsRecording] = useState(false);

<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  enableVoiceInput
  voiceButton={{
    isRecording,
    onStartRecording: () => setIsRecording(true),
    onStopRecording: () => setIsRecording(false),
  }}
/>;
```

### Complete Setup (All Features)

```tsx
const [message, setMessage] = useState('');
const [isVoiceMode, setIsVoiceMode] = useState(false);
const [isRecording, setIsRecording] = useState(false);

<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  enableMediaUpload
  enableVoiceInput
  enableModeToggle
  isVoiceMode={isVoiceMode}
  onModeChange={setIsVoiceMode}
  voiceButton={{
    isRecording,
    onStartRecording: () => setIsRecording(true),
    onStopRecording: () => setIsRecording(false),
  }}
/>;
```

### Custom Styling

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  className='bg-gray-50 border-t-2 border-blue-500'
  inputClassName='border-blue-300 focus:ring-blue-600'
  sendButton={{
    variant: 'primary',
    className: 'bg-blue-600 hover:bg-blue-700',
  }}
/>
```

### With Character Counter

```tsx
<ChatInput value={message} onChange={setMessage} onSend={handleSend} maxLength={280} showCharacterCount placeholder='Type up to 280 characters...' />
```

### Custom Send Button

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  sendButton={{
    label: 'Send Message',
    variant: 'primary',
  }}
/>
```

### Internationalization (i18n)

```tsx
<ChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSend}
  placeholder={t('chat.placeholder')}
  ariaLabel={t('chat.input.aria')}
  sendAriaLabel={t('chat.send.aria')}
  mediaAriaLabel={t('chat.media.aria')}
  voiceAriaLabel={t('chat.voice.aria')}
  errorMessage={t('chat.error.empty')}
/>
```

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line
- **Tab** - Navigate between interactive elements
- **Space/Enter** - Activate focused button

## Best Practices

### Accessibility

1. Always provide meaningful `ariaLabel` props for internationalization
2. Use `error` and `errorMessage` props for validation feedback
3. Ensure proper color contrast if customizing colors
4. Test with keyboard-only navigation
5. Test with screen readers (NVDA, JAWS, VoiceOver)

### Mobile Optimization

1. Component automatically handles touch-friendly sizes
2. iOS Safari zoom prevention is built-in (16px font size)
3. Safe area insets are automatically applied
4. Test on actual devices, not just browser emulators

### Performance

1. Use controlled state management for `value` prop
2. Debounce `onChange` handler if doing heavy operations
3. Optimize media preview generation for large files

## Customization

All parts of the component can be customized:

1. **Buttons** - Pass custom components or use built-in variants
2. **Styling** - Use `className` props for custom styles
3. **Behavior** - Control all interactions via props
4. **Icons** - Icons are included in `components/Icons.tsx` and can be modified
5. **ARIA Labels** - Customize all labels for internationalization

## File Structure

```
chat-input/
├── ChatInput.tsx           # Main component
├── ChatInput.stories.tsx   # Ladle stories
├── types.ts                # TypeScript types
├── README.md               # This file
└── components/
    ├── Button.tsx          # Button component
    ├── Switch.tsx          # Toggle switch
    └── Icons.tsx           # Icon components
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari 12+, Chrome Mobile)
- Screen readers (NVDA, JAWS, VoiceOver, TalkBack)

## Testing Recommendations

### Accessibility Testing

- **Keyboard**: Navigate and use all features with keyboard only
- **Screen Readers**: Test with NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- **Color Contrast**: Use tools like axe DevTools or WAVE
- **Touch Targets**: Verify all buttons meet 44x44px minimum

### Responsive Testing

- **Mobile**: Test on actual iOS and Android devices
- **Tablets**: Test on iPad and Android tablets
- **Desktop**: Test various screen sizes and zoom levels
- **Notch Devices**: Test safe area handling on iPhone X+

## License

MIT
