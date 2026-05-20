import type { EasyChatIconProps } from './types';

export const MicIcon = ({ size = 20, title, ...props }: EasyChatIconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...props}>
    {title ? <title>{title}</title> : null}
    <path d='M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z' />
    <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
    <path d='M12 19v3' />
  </svg>
);
