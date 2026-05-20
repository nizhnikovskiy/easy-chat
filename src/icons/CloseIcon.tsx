import type { EasyChatIconProps } from './types';

export const CloseIcon = ({ size = 20, title, ...props }: EasyChatIconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...props}>
    {title ? <title>{title}</title> : null}
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
);
