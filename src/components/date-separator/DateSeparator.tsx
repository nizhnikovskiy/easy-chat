import { FC } from 'react';

interface DateSeparatorProps {
  date: string;
  theme?: 'light' | 'dark';
}

/**
 * DateSeparator component - displays a centered date label between messages
 * Similar to Telegram's date separators
 */
const DateSeparator: FC<DateSeparatorProps> = ({ date, theme = 'light' }) => {
  return (
    <div className='flex justify-center items-center my-4'>
      <div className={`${theme === 'dark' ? 'bg-separator-bg-dark text-separator-text-dark' : 'bg-separator-bg text-separator-text'} text-xs px-3 py-1.5 rounded-full shadow-sm`}>{date}</div>
    </div>
  );
};

export default DateSeparator;
