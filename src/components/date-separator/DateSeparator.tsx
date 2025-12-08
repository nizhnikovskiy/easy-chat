import { FC } from 'react';

interface DateSeparatorProps {
  date: string;
  theme?: 'light' | 'dark';
}

/**
 * DateSeparator - Telegram-style centered date label
 * 
 * Displays any date string in a rounded pill. You control the format.
 * 
 * ## Theming Variables
 * - `--chat-separator-bg` / `--chat-separator-bg-dark`
 * - `--chat-separator-text` / `--chat-separator-text-dark`
 * 
 * @example
 * ```tsx
 * <DateSeparator date="Today" theme="light" />
 * <DateSeparator date="Yesterday" theme="dark" />
 * <DateSeparator date="Monday, Jan 15" theme="light" />
 * ```
 */
const DateSeparator: FC<DateSeparatorProps> = ({ date, theme = 'light' }) => {
  return (
    <div className='flex justify-center items-center my-4'>
      <div className={`${theme === 'dark' ? 'bg-separator-bg-dark text-separator-text-dark' : 'bg-separator-bg text-separator-text'} text-xs px-3 py-1.5 rounded-full shadow-sm`}>{date}</div>
    </div>
  );
};

export default DateSeparator;
