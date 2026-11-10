import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'accent' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      default:
        'bg-foreground text-background hover:opacity-90 shadow-sm active:translate-y-[0.5px]',
      outline:
        'border border-surface-border bg-transparent hover:bg-muted hover:text-foreground text-foreground shadow-sm',
      secondary:
        'bg-muted text-foreground hover:bg-surface-hover shadow-sm',
      ghost:
        'hover:bg-muted text-foreground hover:text-foreground',
      accent:
        'bg-accent text-accent-foreground hover:opacity-95 shadow-sm active:translate-y-[0.5px]',
      link:
        'text-accent underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizes = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-10 px-6 text-base',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
