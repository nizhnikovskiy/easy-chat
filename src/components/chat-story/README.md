# Chat Story Component

This folder contains a self-contained Chat component with voice capabilities, ready to be dropped into another project.

## Dependencies

Ensure the following dependencies are installed in your project:

```bash
npm install @heygen/streaming-avatar react-i18next react-markdown axios
```

## Usage

1.  Copy this entire `chat-story` folder to your components directory (e.g., `src/components/chat-story`).
2.  Import `Chat` from `./Chat`.
3.  Wrap your application or the component in `ReflectionProvider` and `AvatarImageProvider` if they are not already present (or use the ones included in `context/`).

## Story

A Ladle story is included in `Chat.stories.tsx`.

## Configuration

- **Avatar**: The avatar integration uses `@heygen/streaming-avatar`. You may need to configure authentication in `api/auth/accessToken.ts`.
- **API**: The `api/controllers/avatar.ts` file contains logic for transcribing audio. Ensure your backend endpoints match or update this file.
