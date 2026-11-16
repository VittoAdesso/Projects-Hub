import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'red' | 'amber' | 'green' | 'accent';
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'accent',
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    red: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 [&>span]:bg-rose-600',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 [&>span]:bg-amber-600',
    green: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 [&>span]:bg-emerald-600',
    accent: 'bg-accent-soft text-accent [&>span]:bg-accent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11.5px] font-semibold leading-normal select-none',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
};
