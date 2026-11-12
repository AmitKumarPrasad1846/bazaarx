import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-small',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-base font-medium',
    };

    const variantClasses = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover focus-ring',
      secondary:
        'bg-surface hover:bg-surface-elevated text-text border hairline-border active:bg-surface-elevated focus-ring',
      ghost:
        'bg-transparent hover:bg-surface text-text-secondary hover:text-text active:bg-surface focus-ring',
      danger:
        'bg-danger text-white hover:bg-danger/90 active:bg-danger/90 focus-ring',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-btn select-none transition-all duration-150',
          'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin stroke-[2]" />
            <span className="opacity-80">{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

