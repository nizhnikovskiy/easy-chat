import { FC } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftLabel?: React.ReactNode;
  rightLabel?: React.ReactNode;
}

export const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  leftLabel,
  rightLabel,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      {leftLabel && (
        <span className={`mr-3 text-md font-medium flex items-center gap-1 ${checked ? 'text-text-300' : 'text-text-500'}`}>
          {leftLabel}
        </span>
      )}
      <input 
        type="checkbox" 
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="relative w-14 h-8 bg-bg-grey-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-bg-blue-500"></div>
      {rightLabel && (
        <span className={`ml-3 text-md font-medium flex items-center gap-1 ${checked ? 'text-text-500' : 'text-text-300'}`}>
          {rightLabel}
        </span>
      )}
    </label>
  );
};
