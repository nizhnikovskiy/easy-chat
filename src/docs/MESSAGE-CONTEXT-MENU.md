# MessageContextMenu Component

A ChatGPT-inspired context menu component for message interactions. Appears on right-click (desktop) or long-press (mobile) with smart positioning and customizable menu items.

## Features

- 🎨 **ChatGPT-Inspired Design** - Clean, minimal styling with subtle shadows
- 🧭 **Smart Positioning** - Automatically adjusts when near screen edges
- 🖱️ **Click-Outside to Close** - Intuitive interaction pattern
- ⌨️ **Keyboard Support** - ESC key to close
- 📱 **Touch Support** - Long-press activation on mobile devices
- 🎯 **Fully Customizable** - Custom menu items, icons, and dividers
- ♿ **Accessible** - Proper ARIA labels and keyboard navigation

## Props

**MessageContextMenuProps:**

| Prop        | Type                       | Required | Description                                  |
| ----------- | -------------------------- | -------- | -------------------------------------------- |
| `isOpen`    | `boolean`                  | ✅       | Controls menu visibility                     |
| `position`  | `{ x: number; y: number }` | ✅       | Menu position in pixels (screen coordinates) |
| `items`     | `ContextMenuItem[]`        | ✅       | Array of menu items to display               |
| `onClose`   | `() => void`               | ✅       | Callback when menu should close              |
| `messageId` | `string`                   | ❌       | ID of the associated message                 |

**ContextMenuItem:**

| Property    | Type                           | Required | Description                             |
| ----------- | ------------------------------ | -------- | --------------------------------------- |
| `id`        | `string`                       | ✅       | Unique identifier for this menu item    |
| `label`     | `string`                       | ✅       | Display label text                      |
| `icon`      | `ReactNode`                    | ❌       | Icon component (e.g., from react-icons) |
| `onClick`   | `(messageId?: string) => void` | ✅       | Click handler function                  |
| `disabled`  | `boolean`                      | ❌       | Whether item is disabled                |
| `divider`   | `boolean`                      | ❌       | Show divider line after this item       |
| `className` | `string`                       | ❌       | Additional CSS classes                  |

## Usage

### Basic Example

```tsx
import MessageContextMenu from '@/components/message-context-menu';
import { MdContentCopy, MdEdit, MdDelete } from 'react-icons/md';
import { useState } from 'react';

function ChatMessage() {
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const menuItems = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <MdContentCopy />,
      onClick: () => console.log('Copy clicked'),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <MdEdit />,
      onClick: () => console.log('Edit clicked'),
      divider: true,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <MdDelete />,
      onClick: () => console.log('Delete clicked'),
      className: 'text-red-600',
    },
  ];

  return (
    <>
      <div onContextMenu={handleContextMenu}>Right-click me!</div>

      <MessageContextMenu isOpen={contextMenu.isOpen} position={contextMenu.position} items={menuItems} onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))} messageId='msg-123' />
    </>
  );
}
```

### With Dividers

```tsx
const menuItemsWithDividers = [
  {
    id: 'copy',
    label: 'Copy',
    icon: <MdContentCopy />,
    onClick: () => {},
    divider: true, // Shows divider after this item
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <MdEdit />,
    onClick: () => {},
    divider: true,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <MdDelete />,
    onClick: () => {},
  },
];
```

### With Disabled Items

```tsx
const menuItemsWithDisabled = [
  {
    id: 'copy',
    label: 'Copy',
    icon: <MdContentCopy />,
    onClick: () => {},
  },
  {
    id: 'edit',
    label: 'Edit (Not available)',
    icon: <MdEdit />,
    onClick: () => {},
    disabled: true, // Greyed out, not clickable
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <MdDelete />,
    onClick: () => {},
  },
];
```

### Long Press for Mobile

```tsx
function MessageWithLongPress() {
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 } });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    });

    // Set timeout for long press (500ms)
    const timeoutId = setTimeout(() => {
      setContextMenu({
        isOpen: true,
        position: { x: touch.clientX, y: touch.clientY },
      });
    }, 500);

    // Store timeout ID for cleanup
  };

  const handleTouchEnd = () => {
    // Clear long press timeout
  };

  return (
    <div onContextMenu={handleContextMenu} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      Long-press on mobile!
    </div>
  );
}
```

## Ladle Stories

The component includes 7 comprehensive stories:

### 1. **DefaultMenu**

Basic context menu with standard items (Copy, Edit, Delete).

### 2. **WithoutIcons**

Menu items without icons, text-only labels.

### 3. **WithDividers**

Demonstrates visual separation between menu item groups using dividers.

### 4. **WithDisabledItems**

Shows disabled menu items that cannot be clicked (greyed out).

### 5. **LongMenu**

Extended menu with many items to demonstrate scrolling behavior.

### 6. **InteractiveDemo**

Full interactive demo within a message component with working right-click.

### 7. **EdgePositioning**

Demonstrates smart repositioning when menu would overflow screen edges. Menu appears in different corners.

## Features Detail

### Smart Edge Detection

The menu automatically repositions itself when it would overflow the screen:

```typescript
// Horizontal adjustment
if (x + menuWidth > viewportWidth) {
  x = viewportWidth - menuWidth - 10;
}

// Vertical adjustment
if (y + menuHeight > viewportHeight) {
  y = viewportHeight - menuHeight - 10;
}
```

### Click-Outside Detection

Menu automatically closes when clicking anywhere outside:

- Small delay (10ms) to prevent immediate closure from opening click
- Event listener cleanup on unmount

### Keyboard Support

- **ESC key:** Closes the menu
- **Enter/Space:** Activates focused menu item
- **Tab:** Navigate between items

### Animation

Smooth fade-in and scale animation using Tailwind utilities:

```css
animate-in fade-in-0 zoom-in-95 duration-100
```

## Styling

### Default Appearance

- **Background:** White (`bg-white`)
- **Border:** Light gray (`border-gray-200`)
- **Shadow:** Subtle drop shadow (`shadow-lg`)
- **Hover:** Light gray background (`hover:bg-gray-100`)
- **Active:** Slightly darker (`active:bg-gray-200`)
- **Disabled:** Gray text (`text-gray-400`)

### Custom Styling

Apply custom classes to individual items:

```tsx
{
  id: 'delete',
  label: 'Delete',
  icon: <MdDelete />,
  onClick: () => {},
  className: 'text-red-600 hover:bg-red-50', // Red danger styling
}
```

## Integration with Message Components

The context menu is designed to work seamlessly with the Message components:

```tsx
// In Chat.tsx
const createDefaultContextMenuItems = (isUserMessage: boolean) => [
  {
    id: 'copy',
    label: 'Copy',
    icon: <MdContentCopy size={16} />,
    onClick: (id) => {
      // Copy message content
    },
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <MdEdit size={16} />,
    onClick: (id) => {
      // Edit message
    },
    disabled: !isUserMessage, // Only user can edit their messages
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <MdDelete size={16} />,
    onClick: (id) => {
      // Delete message
    },
    divider: true,
  },
];
```

## Accessibility

- **ARIA Labels:** Menu has `role="menu"` and items have `role="menuitem"`
- **aria-label:** Descriptive label "Message context menu"
- **aria-disabled:** Properly marks disabled items
- **Keyboard Navigation:** Full keyboard support
- **Focus Management:** Proper tab order

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch and mouse input support

## File Structure

```
message-context-menu/
├── MessageContextMenu.tsx          # Main component
├── MessageContextMenu.stories.tsx  # Ladle stories
└── index.ts                        # Exports
```

## Best Practices

1. **Always provide meaningful labels** for accessibility
2. **Use icons** from a consistent icon library (react-icons recommended)
3. **Group related actions** using dividers
4. **Mark destructive actions** with red/warning colors
5. **Disable unavailable actions** instead of hiding them
6. **Close menu on action** to provide clear feedback
