import type { SVGProps } from 'react';

/**
 * Shared props for Easy Chat built-in SVG icons.
 *
 * Icons inherit text color through `currentColor`, so consumers can style them
 * with regular CSS or Tailwind text color utilities.
 */
export interface EasyChatIconProps extends SVGProps<SVGSVGElement> {
  /** Rendered icon width and height. */
  size?: number | string;
  /** Accessible title for standalone icon usage. Omit when the parent button already has an aria-label. */
  title?: string;
}
