import React from 'react';
import { FILTER_OPTIONS } from '../data/modules';
import type { FilterLevel } from '../types';
import { cn } from '@/shared/lib/utils';

export interface ProgressHeaderBarProps {
  progressPercentage: number;
  activeFilter: FilterLevel;
  onFilterChange: (filter: FilterLevel) => void;
}

const PROGRESS_WIDTH_CLASS: Record<number, string> = {
  0: 'w-0',
  13: 'w-[13%]',
  25: 'w-1/4',
  38: 'w-[38%]',
  50: 'w-1/2',
  63: 'w-[63%]',
  75: 'w-3/4',
  88: 'w-[88%]',
  100: 'w-full',
};

export const ProgressHeaderBar: React.FC<ProgressHeaderBarProps> = ({
  progressPercentage,
  activeFilter,
  onFilterChange,
}) => {
  const widthClass = PROGRESS_WIDTH_CLASS[progressPercentage] ?? 'w-0';

  return (
    <div className="bar sticky top-14 z-10 bg-background/95 backdrop-blur-sm py-3 px-4 sm:px-5 border-b border-surface-border">
      <div className="max-w-[860px] mx-auto flex flex-wrap items-center gap-3.5">
        <span
          id="pct"
          className="font-mono text-sm font-semibold text-foreground min-w-[44px]"
        >
          {progressPercentage} %
        </span>

        <div
          className="track flex-1 min-w-[140px] h-2 bg-surface-border rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de la ruta"
        >
          <div
            id="fill"
            data-progress={progressPercentage}
            className={cn(
              'fill h-full bg-[var(--rg-ok,#0e8a6b)] transition-all duration-300',
              widthClass
            )}
          />
        </div>

        <div
          className="f flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filtrar por nivel"
        >
          {FILTER_OPTIONS.map((option) => {
            const isPressed = activeFilter === option;
            const displayLabel = option === 'todos' ? 'Todos' : option;

            return (
              <button
                key={option}
                type="button"
                data-l={option}
                aria-pressed={isPressed}
                onClick={() => onFilterChange(option)}
                className={cn(
                  'border rounded-full px-3 py-1 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isPressed
                    ? 'bg-accent text-accent-foreground border-accent shadow-xs'
                    : 'bg-surface text-foreground border-surface-border hover:bg-surface-hover'
                )}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
