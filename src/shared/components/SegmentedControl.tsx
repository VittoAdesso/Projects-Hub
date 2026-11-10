import React, { useRef } from 'react';
import { cn } from '@/shared/lib/utils';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SegmentedControlProps<T extends string = string> {
  options: readonly SegmentOption<T>[] | SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  ariaLabel?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  ariaLabel = 'Opciones',
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % options.length;
      const nextOption = options[nextIndex];
      if (nextOption) {
        onChange(nextOption.value);
        const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('button');
        buttons?.[nextIndex]?.focus();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + options.length) % options.length;
      const prevOption = options[prevIndex];
      if (prevOption) {
        onChange(prevOption.value);
        const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('button');
        buttons?.[prevIndex]?.focus();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius)] border border-surface-border bg-muted/60 p-1 text-sm font-medium',
        className
      )}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              'inline-flex items-center gap-2 rounded-[calc(var(--radius)-3px)] px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
              isSelected
                ? 'bg-surface text-foreground shadow-[var(--shadow-sm)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
