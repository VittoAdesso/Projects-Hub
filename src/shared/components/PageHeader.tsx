import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  eyebrow,
  actions,
  className,
}) => {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 border-b border-surface-border pb-6 pt-2 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className="space-y-1.5 max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-accent font-sans">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
          {actions}
        </div>
      )}
    </header>
  );
};
