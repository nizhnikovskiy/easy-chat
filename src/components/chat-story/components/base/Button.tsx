import type { FC, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'lg';
  fullWidth?: boolean;
  isIconOnly?: boolean;
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ 
  size = 'lg',
  fullWidth = true,
  isIconOnly = false,
  variant = 'default',
  className,
  disabled,
  children,
  ...props 
}) => {
  return (
    <button
      className={classNames(
        // TODO add font
        'font-montserrat font-semibold text-xs leading-3 tracking-wider text-center uppercase rounded-full cursor-pointer',
        'transition-colors duration-200',
        'inline-flex items-center justify-center',
        {
          'bg-bg-blue-500 text-text-900': variant === 'default',
          'bg-bg-white border-text-900 [box-shadow:0px_0px_1px_0px_#0000004D,0px_2px_10px_0px_#0000000F,0px_0px_5px_0px_#00000005]': variant === 'outline',
        },
        {'hover:bg-text-900 hover:text-text-white': !disabled},
        {'bg-bg-grey-200 text-text-500 cursor-not-allowed': disabled},
        {
          'h-11 w-11': size === 'lg' && isIconOnly,
          'h-11': size === 'lg' && !isIconOnly,
          'h-9 w-9': size === 'sm' && isIconOnly,
          'h-9': size === 'sm' && !isIconOnly,
        },
        {
          'w-full': fullWidth && !isIconOnly,
          'w-auto': !fullWidth && !isIconOnly,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
