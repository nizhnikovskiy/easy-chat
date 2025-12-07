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
      <div className={`${theme === 'dark' ? 'bg-gray-700 bg-opacity-80 text-gray-200' : 'bg-gray-800 bg-opacity-60 text-white'} text-xs px-3 py-1.5 rounded-full shadow-sm`}>{date}</div>
    </div>
  );
};

export default DateSeparator;
