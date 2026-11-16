import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'warn' | 'tip' | 'error';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = 'default',
  title,
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    default:
      'border-l-accent bg-accent-soft text-foreground',
    warn:
      'border-l-amber-600 bg-amber-500/10 text-amber-950 dark:text-amber-200 border-l-[3px]',
    tip:
      'border-l-emerald-600 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 border-l-[3px]',
    error:
      'border-l-rose-600 bg-rose-500/10 text-rose-950 dark:text-rose-200 border-l-[3px]',
  };

  return (
    <aside
      className={cn(
        'my-3 rounded-[var(--radius)] border-l-[3px] p-3.5 text-sm leading-relaxed border border-surface-border/50',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {title && (
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
      )}
      <div className="space-y-1">{children}</div>
    </aside>
  );
};
