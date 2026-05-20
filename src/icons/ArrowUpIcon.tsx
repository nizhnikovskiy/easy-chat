import type { EasyChatIconProps } from './types';

export const ArrowUpIcon = ({ size = 20, title, ...props }: EasyChatIconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...props}>
    {title ? <title>{title}</title> : null}
    <path d='m5 12 7-7 7 7' />
    <path d='M12 19V5' />
  </svg>
);
