import React from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'light' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  success?: boolean;
  withArrow?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      success = false,
      withArrow = false,
      icon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeCls = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
    const variantCls = `btn-${variant}`;

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`btn ${variantCls} ${sizeCls} ${className}`}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" strokeWidth={2} />
            {size !== 'sm' && <span className="opacity-90">Please wait...</span>}
          </>
        ) : success ? (
          <>
            <Check className="w-4 h-4 text-current" strokeWidth={2.5} />
            <span>Success</span>
          </>
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
            {withArrow && <ArrowRight className="w-4 h-4 btn-arrow" strokeWidth={2} />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
