# Easy Chat Theming Guide

Easy Chat uses **CSS Variables** for theming, making it highly customizable while maintaining excellent developer experience. You can override these variables to match your brand colors without rebuilding or configuring Tailwind.

## Table of Contents

- [Quick Start](#quick-start)
- [Available CSS Variables](#available-css-variables)
- [Theme Examples](#theme-examples)
- [Best Practices](#best-practices)
- [Advanced Usage](#advanced-usage)

## Quick Start

### Basic Customization

Override the CSS variables in your application's CSS file:

```css
/* your-app.css */
@import 'easy-chat/styles';

:root {
  /* Customize user message colors */
  --chat-message-user-bg: #8b5cf6; /* Purple user messages */
  --chat-message-user-text: #ffffff;
  
  /* Customize other user message colors */
  --chat-message-other-bg: #f3f4f6;
  --chat-message-other-text: #1f2937;
  
  /* Customize primary button */
  --chat-button-primary-bg: #8b5cf6;
  --chat-button-primary-bg-hover: #7c3aed;
}
```

### Dark Theme Customization

Customize dark theme colors separately:

```css
:root {
  /* Dark theme colors */
  --chat-message-user-bg-dark: #6d28d9;
  --chat-message-other-bg-dark: #374151;
  --chat-input-bg-dark: #1f2937;
}
```

## Available CSS Variables

### Message Bubbles - Light Theme

```css
:root {
  /* User Messages (Right side) */
  --chat-message-user-bg: #3b82f6;        /* Background color */
  --chat-message-user-text: #ffffff;      /* Text color */
  --chat-message-user-timestamp: #dbeafe; /* Timestamp color */
  
  /* Other Messages (Left side) */
  --chat-message-other-bg: #e5e7eb;       /* Background color */
  --chat-message-other-text: #111827;     /* Text color */
  --chat-message-other-timestamp: #6b7280; /* Timestamp color */
}
```

### Message Bubbles - Dark Theme

```css
:root {
  /* User Messages Dark */
  --chat-message-user-bg-dark: #1d4ed8;
  --chat-message-user-text-dark: #ffffff;
  --chat-message-user-timestamp-dark: #93c5fd;
  
  /* Other Messages Dark */
  --chat-message-other-bg-dark: #374151;
  --chat-message-other-text-dark: #f3f4f6;
  --chat-message-other-timestamp-dark: #9ca3af;
}
```

### Chat Input

```css
:root {
  /* Light Theme */
  --chat-input-bg: #ffffff;
  --chat-input-text: #111827;
  --chat-input-placeholder: #9ca3af;
  --chat-input-border: #d1d5db;
  --chat-input-border-focus: #3b82f6;
  
  /* Dark Theme */
  --chat-input-bg-dark: #1f2937;
  --chat-input-text-dark: #f9fafb;
  --chat-input-placeholder-dark: #6b7280;
  --chat-input-border-dark: #4b5563;
}
```

### Buttons

```css
:root {
  --chat-button-primary-bg: #3b82f6;
  --chat-button-primary-bg-hover: #2563eb;
  --chat-button-primary-text: #ffffff;
  --chat-button-disabled-bg: #e5e7eb;
  --chat-button-disabled-text: #9ca3af;
}
```

### Context Menu

```css
:root {
  /* Light Theme */
  --chat-menu-bg: #ffffff;
  --chat-menu-text: #111827;
  --chat-menu-hover-bg: #f3f4f6;
  --chat-menu-border: #e5e7eb;
  
  /* Dark Theme */
  --chat-menu-bg-dark: #374151;
  --chat-menu-text-dark: #f9fafb;
  --chat-menu-hover-bg-dark: #4b5563;
  --chat-menu-border-dark: #4b5563;
}
```

### Date Separator

```css
:root {
  /* Light Theme */
  --chat-separator-bg: #f3f4f6;
  --chat-separator-text: #6b7280;
  
  /* Dark Theme */
  --chat-separator-bg-dark: #374151;
  --chat-separator-text-dark: #9ca3af;
}
```

### Chat List

```css
:root {
  /* Light Theme */
  --chat-list-item-bg: #ffffff;
  --chat-list-item-hover-bg: #f9fafb;
  --chat-list-item-active-bg: #eff6ff;
  --chat-list-item-text: #111827;
  
  /* Dark Theme */
  --chat-list-item-bg-dark: #1f2937;
  --chat-list-item-hover-bg-dark: #374151;
  --chat-list-item-active-bg-dark: #1e3a8a;
  --chat-list-item-text-dark: #f9fafb;
}
```

### Skeleton Loading

```css
:root {
  /* Light Theme */
  --chat-skeleton-bg: #e5e7eb;
  --chat-skeleton-shimmer: #f3f4f6;
  
  /* Dark Theme */
  --chat-skeleton-bg-dark: #4b5563;
  --chat-skeleton-shimmer-dark: #6b7280;
}
```

### Avatar & Username

```css
:root {
  --chat-avatar-bg: #9ca3af;
  --chat-avatar-text: #ffffff;
  --chat-username-text: #6b7280;
  --chat-username-text-dark: #9ca3af;
}
```

## Theme Examples

### Example 1: Purple Theme

```css
@import 'easy-chat/styles';

:root {
  /* User messages in purple */
  --chat-message-user-bg: #8b5cf6;
  --chat-message-user-bg-dark: #7c3aed;
  
  /* Accent colors */
  --chat-button-primary-bg: #8b5cf6;
  --chat-button-primary-bg-hover: #7c3aed;
  --chat-input-border-focus: #8b5cf6;
}
```

### Example 2: Green Theme (WhatsApp-like)

```css
@import 'easy-chat/styles';

:root {
  /* User messages in green */
  --chat-message-user-bg: #25d366;
  --chat-message-user-text: #ffffff;
  --chat-message-user-timestamp: #e6fff3;
  
  /* Dark theme */
  --chat-message-user-bg-dark: #128c7e;
  
  /* Buttons */
  --chat-button-primary-bg: #25d366;
  --chat-button-primary-bg-hover: #20bd5c;
}
```

### Example 3: Minimalist Monochrome

```css
@import 'easy-chat/styles';

:root {
  /* User messages */
  --chat-message-user-bg: #000000;
  --chat-message-user-text: #ffffff;
  
  /* Other messages */
  --chat-message-other-bg: #f5f5f5;
  --chat-message-other-text: #000000;
  
  /* Buttons */
  --chat-button-primary-bg: #000000;
  --chat-button-primary-bg-hover: #333333;
}
```

### Example 4: Brand-Specific Theme

```css
@import 'easy-chat/styles';

:root {
  /* Use your brand colors */
  --chat-message-user-bg: var(--brand-primary);
  --chat-message-user-bg-dark: var(--brand-primary-dark);
  --chat-button-primary-bg: var(--brand-primary);
  --chat-button-primary-bg-hover: var(--brand-primary-hover);
  --chat-input-border-focus: var(--brand-accent);
}
```

### Example 5: Multiple Themes with Data Attributes

```css
@import 'easy-chat/styles';

/* Default theme */
:root {
  --chat-message-user-bg: #3b82f6;
}

/* Blue theme */
[data-chat-theme="blue"] {
  --chat-message-user-bg: #3b82f6;
  --chat-button-primary-bg: #3b82f6;
}

/* Purple theme */
[data-chat-theme="purple"] {
  --chat-message-user-bg: #8b5cf6;
  --chat-button-primary-bg: #8b5cf6;
}

/* Green theme */
[data-chat-theme="green"] {
  --chat-message-user-bg: #10b981;
  --chat-button-primary-bg: #10b981;
}
```

Then in your React app:

```tsx
<div data-chat-theme="purple">
  <Chat {...props} />
</div>
```

## Best Practices

### 1. **Start with User Message Colors**

The most visible change is the user message bubble color:

```css
:root {
  --chat-message-user-bg: #your-brand-color;
  --chat-message-user-bg-dark: #your-brand-color-dark;
}
```

### 2. **Maintain Contrast Ratios**

Ensure text is readable on backgrounds (WCAG AA: 4.5:1 for normal text):

```css
/* Good contrast */
--chat-message-user-bg: #2563eb;
--chat-message-user-text: #ffffff;

/* Poor contrast - avoid */
--chat-message-user-bg: #93c5fd; /* Too light */
--chat-message-user-text: #ffffff; /* Hard to read */
```

### 3. **Use CSS Variables for Consistency**

Reference your existing CSS variables:

```css
:root {
  /* Your app's design system */
  --primary-color: #8b5cf6;
  --primary-hover: #7c3aed;
  
  /* Easy Chat using your colors */
  --chat-message-user-bg: var(--primary-color);
  --chat-button-primary-bg: var(--primary-color);
  --chat-button-primary-bg-hover: var(--primary-hover);
}
```

### 4. **Test Both Themes**

Always test light and dark theme variables:

```tsx
<Chat theme="light" {...props} />
<Chat theme="dark" {...props} />
```

### 5. **Scope Variables When Needed**

Use scoped variables for multiple chat instances:

```css
.support-chat {
  --chat-message-user-bg: #10b981; /* Green for support */
}

.sales-chat {
  --chat-message-user-bg: #f59e0b; /* Orange for sales */
}
```

## Advanced Usage

### Dynamic Theme Switching

```tsx
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <div data-theme={theme}>
      <Chat theme={theme} {...props} />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### Per-User Color Customization

```tsx
function ChatWithUserColors({ userColor }: { userColor: string }) {
  return (
    <div style={{
      '--chat-message-user-bg': userColor,
    } as React.CSSProperties}>
      <Chat {...props} />
    </div>
  );
}
```

### Using with Tailwind CSS Configuration

While Easy Chat uses CSS variables, you can also extend Tailwind's theme:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'chat-primary': '#8b5cf6',
      },
    },
  },
};
```

Then in your CSS:

```css
:root {
  --chat-message-user-bg: theme('colors.chat-primary');
}
```

## Migration from Hardcoded Colors

If you were using Easy Chat before the theming system, your existing code will continue to work with the default colors. To customize:

**Before:**
```tsx
// No customization possible
<Chat {...props} />
```

**After:**
```css
/* Add to your CSS */
:root {
  --chat-message-user-bg: #your-color;
}
```

```tsx
// Same component, custom colors!
<Chat {...props} />
```

## Troubleshooting

### Colors Not Applying

1. Make sure you import the Easy Chat styles:
```tsx
import 'easy-chat/styles';
```

2. Ensure your CSS variables are defined before the import or in a separate file that loads after.

3. Check CSS specificity - your variables should be in `:root` or a parent element.

### Dark Theme Not Working

Make sure you're passing the `theme` prop:

```tsx
<Chat theme="dark" {...props} />
```

### Variables Not Updating Dynamically

CSS variables update in real-time, but make sure you're not using inline styles that override them.

## Support

For more examples and live demos, visit: [https://nizhnikovskiy.github.io/easy-chat/](https://nizhnikovskiy.github.io/easy-chat/)

For issues or questions, open an issue on [GitHub](https://github.com/nizhnikovskiy/easy-chat/issues).

