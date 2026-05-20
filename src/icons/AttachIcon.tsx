import type { EasyChatIconProps } from './types';

export const AttachIcon = ({ size = 20, title, ...props }: EasyChatIconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...props}>
    {title ? <title>{title}</title> : null}
    <path d='M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48' />
  </svg>
);
