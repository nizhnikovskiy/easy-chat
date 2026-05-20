# ChatInput Media Upload

`ChatInput` owns the file selection UI and preview state, but it does not upload files to a server. Applications using the library decide how files are uploaded.

## Default Flow: Upload On Send

By default, selected files stay local until the user sends the message.

```tsx
<ChatInput
  enableMediaUpload
  mediaButton={{ accept: 'image/*', multiple: true, maxFiles: 8 }}
  onSend={(message, media) => {
    // media is File in single mode, File[] in multiple mode
  }}
/>
```

Use this when the message text and files should be submitted as one user action.

## Alternative Flow: Upload On Select

Set `uploadMode` to `onSelect` when the application should start uploading immediately after file selection.

```tsx
<ChatInput
  enableMediaUpload
  mediaButton={{
    accept: 'image/*',
    multiple: true,
    maxFiles: 8,
    uploadMode: 'onSelect',
    onUpload: async (files) => {
      // Upload selected files with application-specific API logic.
    },
  }}
/>
```

Use this when uploads should begin before the user presses send, for example to hide upload latency behind message composition.

## Callback Contract

- `onSelect(files)` fires after the selected list changes because the user picked files.
- `onUpload(files)` fires only when `uploadMode` is `onSelect`.
- `onSend(message, media)` fires when the user sends the message. In single mode `media` is a `File`; in multiple mode it is `File[]`.

The library does not own authentication, signed URLs, retries, progress persistence, or server response metadata.
