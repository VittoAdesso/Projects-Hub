import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface SlotProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Slot: React.FC<SlotProps> = ({ children, className, ...props }) => {
  return (
    <span
      className={cn(
        'slot font-semibold px-1 py-0.5 rounded border border-dashed text-[12.5px]',
        'bg-[var(--pm-slot-bg,#f3ecff)] text-[var(--pm-slot,#7c3aed)] border-[var(--pm-slot,#7c3aed)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
