import React from 'react';
import type { CoeColorToken } from '../types';
import { cn } from '@/shared/lib/utils';

export interface ColoredBorderCardProps {
  title: string;
  colorToken?: CoeColorToken;
  as?: 'article' | 'div';
  className?: string;
  children: React.ReactNode;
}

const BORDER_COLOR_CLASSES: Record<CoeColorToken, string> = {
  '--bl': 'border-t-[var(--coe-bl,#2563A8)]',
  '--pu': 'border-t-[var(--coe-pu,#6A4BB5)]',
  '--gr': 'border-t-[var(--coe-gr,#2E7D52)]',
  '--or': 'border-t-[var(--coe-or,#C2561C)]',
};

const TITLE_COLOR_CLASSES: Record<CoeColorToken, string> = {
  '--bl': 'text-[var(--coe-bl,#2563A8)]',
  '--pu': 'text-[var(--coe-pu,#6A4BB5)]',
  '--gr': 'text-[var(--coe-gr,#2E7D52)]',
  '--or': 'text-[var(--coe-or,#C2561C)]',
};

export const ColoredBorderCard: React.FC<ColoredBorderCardProps> = ({
  title,
  colorToken = '--bl',
  as: Component = 'article',
  className,
  children,
}) => {
  return (
    <Component
      className={cn(
        'card bg-[var(--coe-sf,#ffffff)] border border-[var(--coe-ln,#D7DEE5)] border-t-[3px] rounded-lg py-3 px-3.5 shadow-2xs print:break-inside-avoid',
        BORDER_COLOR_CLASSES[colorToken],
        className
      )}
    >
      <h3
        className={cn(
          'font-[var(--font-schibsted)] font-semibold text-base leading-tight mb-1',
          TITLE_COLOR_CLASSES[colorToken]
        )}
      >
        {title}
      </h3>
      <div className="space-y-1 text-[13.5px] text-[var(--coe-mut,#52616F)]">
        {children}
      </div>
    </Component>
  );
};
