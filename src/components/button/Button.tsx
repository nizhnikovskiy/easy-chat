import type { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isIconOnly?: boolean;
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

const Button: FC<ButtonProps> = ({ variant = 'primary', size = 'md', fullWidth = false, isIconOnly = false, className = '', disabled, children, theme = 'light', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 touch-manipulation';

  const variantStyles = {
    primary:
      theme === 'dark'
        ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 disabled:bg-gray-700 disabled:text-gray-500'
        : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300 disabled:text-gray-500',
    secondary:
      theme === 'dark'
        ? 'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500 focus:ring-gray-500 disabled:bg-gray-800 disabled:text-gray-600'
        : 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300 disabled:text-gray-500',
    outline:
      theme === 'dark'
        ? 'bg-gray-800 border-2 border-gray-600 text-gray-200 hover:bg-gray-700 active:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-900 disabled:text-gray-600 disabled:border-gray-700'
        : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200',
    ghost:
      theme === 'dark'
        ? 'bg-transparent text-gray-200 hover:bg-gray-800 active:bg-gray-700 focus:ring-gray-500 disabled:text-gray-600'
        : 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500 disabled:text-gray-400',
  };

  // Touch-friendly sizes (minimum 44x44px for mobile)
  const sizeStyles = {
    sm: isIconOnly ? 'min-w-[36px] min-h-[36px] w-9 h-9 text-sm' : 'px-3 py-2 text-sm min-h-[36px]',
    md: isIconOnly ? 'min-w-[44px] min-h-[44px] w-11 h-11 text-base' : 'px-4 py-2.5 text-base min-h-[44px]',
    lg: isIconOnly ? 'min-w-[48px] min-h-[48px] w-12 h-12 text-lg' : 'px-6 py-3 text-lg min-h-[48px]',
  };

  const widthStyle = fullWidth && !isIconOnly ? 'w-full' : '';
  const disabledStyle = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
