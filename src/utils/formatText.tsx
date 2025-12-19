import { ReactNode } from 'react';

/**
 * Text formatting utility for message components
 *
 * Supports markdown-like syntax:
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - `code`
 * - ~~strikethrough~~
 * - [label](url)
 */

interface FormatToken {
  type: 'text' | 'bold' | 'italic' | 'code' | 'strikethrough' | 'link';
  content: string;
  url?: string;
}

// Parse text into tokens
function tokenize(text: string): FormatToken[] {
  const tokens: FormatToken[] = [];
  let currentIndex = 0;

  const patterns = [
    // Bold: **text** or __text__
    { regex: /\*\*(.+?)\*\*/g, type: 'bold' as const },
    { regex: /__(.+?)__/g, type: 'bold' as const },
    // Italic: *text* or _text_ (but not __ or **)
    { regex: /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, type: 'italic' as const },
    { regex: /(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, type: 'italic' as const },
    // Code: `text`
    { regex: /`(.+?)`/g, type: 'code' as const },
    // Strikethrough: ~~text~~
    { regex: /~~(.+?)~~/g, type: 'strikethrough' as const },
    // Links: [label](url)
    { regex: /\[(.+?)\]\((.+?)\)/g, type: 'link' as const },
  ];

  // Find all matches with their positions
  const matches: Array<{ start: number; end: number; token: FormatToken }> = [];

  patterns.forEach(({ regex, type }) => {
    regex.lastIndex = 0; // Reset regex state
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (type === 'link') {
        matches.push({
          start,
          end,
          token: { type, content: match[1], url: match[2] },
        });
      } else {
        matches.push({
          start,
          end,
          token: { type, content: match[1] },
        });
      }
    }
  });

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  // Build tokens array, handling overlaps (first match wins)
  matches.forEach((match) => {
    // Add plain text before this match
    if (currentIndex < match.start) {
      const plainText = text.slice(currentIndex, match.start);
      if (plainText) {
        tokens.push({ type: 'text', content: plainText });
      }
    }

    // Skip if this match overlaps with previous one
    if (currentIndex <= match.start) {
      tokens.push(match.token);
      currentIndex = match.end;
    }
  });

  // Add remaining plain text
  if (currentIndex < text.length) {
    tokens.push({ type: 'text', content: text.slice(currentIndex) });
  }

  return tokens;
}

// Render tokens as React elements
function renderTokens(tokens: FormatToken[]): ReactNode[] {
  return tokens.map((token, index) => {
    const key = `token-${index}`;

    switch (token.type) {
      case 'bold':
        return (
          <strong key={key} className='font-bold'>
            {token.content}
          </strong>
        );

      case 'italic':
        return (
          <em key={key} className='italic'>
            {token.content}
          </em>
        );

      case 'code':
        return (
          <code key={key} className='px-1.5 py-0.5 mx-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-sm'>
            {token.content}
          </code>
        );

      case 'strikethrough':
        return (
          <span key={key} className='line-through'>
            {token.content}
          </span>
        );

      case 'link':
        return (
          <a key={key} href={token.url} target='_blank' rel='noopener noreferrer' className='underline hover:no-underline text-blue-600 dark:text-blue-400'>
            {token.content}
          </a>
        );

      case 'text':
      default:
        return token.content;
    }
  });
}

/**
 * Format text with markdown-like syntax
 *
 * @param text - Text to format
 * @returns Array of React nodes with formatted content
 */
export function formatText(text: string): ReactNode[] {
  if (!text) return [];

  const tokens = tokenize(text);
  return renderTokens(tokens);
}

/**
 * Get plain text length (without formatting markers)
 * Useful for typing animations
 *
 * @param text - Text with formatting
 * @returns Length of visible text
 */
export function getPlainTextLength(text: string): number {
  const tokens = tokenize(text);
  return tokens.reduce((length, token) => length + token.content.length, 0);
}

/**
 * Get formatted text at a specific character position
 * Useful for typing animations that need to reveal text character by character
 *
 * @param text - Full text with formatting
 * @param visibleLength - Number of visible characters to show
 * @returns Formatted React nodes for the visible portion
 */
export function getFormattedTextAtPosition(text: string, visibleLength: number): ReactNode[] {
  if (visibleLength <= 0) return [];

  const tokens = tokenize(text);
  const result: ReactNode[] = [];
  let remainingLength = visibleLength;

  tokens.forEach((token, index) => {
    if (remainingLength <= 0) return;

    const tokenLength = token.content.length;

    if (remainingLength >= tokenLength) {
      // Show entire token
      result.push(
        ...renderTokens([token]).map((node, i) => {
          // Re-key the nodes to avoid conflicts
          if (typeof node === 'object' && node !== null && 'key' in node) {
            return { ...node, key: `partial-${index}-${i}` };
          }
          return node;
        })
      );
      remainingLength -= tokenLength;
    } else {
      // Show partial token
      const partialToken: FormatToken = {
        ...token,
        content: token.content.slice(0, remainingLength),
      };
      result.push(
        ...renderTokens([partialToken]).map((node, i) => {
          if (typeof node === 'object' && node !== null && 'key' in node) {
            return { ...node, key: `partial-${index}-${i}` };
          }
          return node;
        })
      );
      remainingLength = 0;
    }
  });

  return result;
}

/**
 * Get indices of word boundaries in plain text
 *
 * @param text - Text with formatting
 * @returns Array of character counts where words end
 */
export function getWordBoundaries(text: string): number[] {
  const plainText = tokenize(text).reduce((acc, token) => acc + token.content, '');
  const boundaries: number[] = [];
  const words = plainText.split(/(\s+)/);

  let currentPos = 0;
  words.forEach((word) => {
    currentPos += word.length;
    if (word.trim().length > 0) {
      boundaries.push(currentPos);
    }
  });

  // Ensure the last position is included if not already
  if (boundaries.length === 0 || boundaries[boundaries.length - 1] < plainText.length) {
    boundaries.push(plainText.length);
  }

  return boundaries;
}

/**
 * Recursively wrap text in spans with animation class
 *
 * @param nodes - React nodes to process
 * @returns Processed nodes with words wrapped in animated spans
 */
import { cloneElement, isValidElement } from 'react';

export function wrapWordsWithAnimation(nodes: ReactNode[]): ReactNode[] {
  return nodes
    .map((node, index) => {
      if (typeof node === 'string') {
        // Split by words but keep whitespace
        const parts = node.split(/(\s+)/);
        return parts.map((part, i) => {
          if (part.trim().length === 0) return part;
          return (
            <span key={`word-${index}-${i}`} className='animate-word-in'>
              {part}
            </span>
          );
        });
      }

      if (isValidElement(node)) {
        const children = (node.props as any).children;
        if (children) {
          const processedChildren = Array.isArray(children) ? wrapWordsWithAnimation(children) : wrapWordsWithAnimation([children]);

          return cloneElement(node, {
            key: node.key || `animated-${index}`,
            children: processedChildren,
          } as any);
        }
      }

      return node;
    })
    .flat();
}
