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
        ? 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:bg-button-primary-bg-hover/90 focus:ring-button-primary-bg disabled:bg-button-disabled-bg disabled:text-button-disabled-text'
        : 'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-bg-hover active:bg-button-primary-bg-hover/90 focus:ring-button-primary-bg disabled:bg-button-disabled-bg disabled:text-button-disabled-text',
    secondary:
      theme === 'dark'
        ? 'bg-menu-hover-bg-dark text-menu-text-dark hover:bg-menu-hover-bg-dark/80 active:bg-menu-hover-bg-dark/70 focus:ring-menu-bg-dark disabled:bg-button-disabled-bg disabled:text-button-disabled-text'
        : 'bg-menu-hover-bg text-menu-text hover:bg-menu-hover-bg/80 active:bg-menu-hover-bg/70 focus:ring-menu-bg disabled:bg-button-disabled-bg disabled:text-button-disabled-text',
    outline:
      theme === 'dark'
        ? 'bg-input-bg-dark border-2 border-input-border-dark text-input-text-dark hover:bg-menu-hover-bg-dark active:bg-menu-hover-bg-dark/80 focus:ring-input-border-focus disabled:bg-input-bg-dark disabled:text-button-disabled-text disabled:border-input-border-dark/50'
        : 'bg-input-bg border-2 border-input-border text-input-text hover:bg-menu-hover-bg active:bg-menu-hover-bg/80 focus:ring-input-border-focus disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:border-input-border/50',
    ghost:
      theme === 'dark'
        ? 'bg-transparent text-input-text-dark hover:bg-menu-hover-bg-dark active:bg-menu-hover-bg-dark/80 focus:ring-input-border-focus disabled:text-button-disabled-text'
        : 'bg-transparent text-input-text hover:bg-menu-hover-bg active:bg-menu-hover-bg/80 focus:ring-input-border-focus disabled:text-button-disabled-text',
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
