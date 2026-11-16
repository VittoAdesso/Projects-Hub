import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ManualHeaderProps {
  className?: string;
}

export const ManualHeader: React.FC<ManualHeaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'brand flex items-center justify-between gap-3 py-4 border-b border-[var(--pm-border,#e9e2d8)]',
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="dot w-[9px] h-[9px] rounded-full bg-[var(--pm-accent,#4f46e5)] shrink-0 shadow-[0_0_0_4px_var(--pm-accent-soft,#ede9ff)]"
          aria-hidden="true"
        />
        <span className="name font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--pm-ink-3,#928b82)] font-semibold">
          MANUAL PM
        </span>
      </div>
      <div className="lema font-serif text-[15px] font-semibold text-[var(--pm-ink,#1a1714)] hidden sm:block">
        PRIMERO INTEGRA, LUEGO{' '}
        <strong className="text-[var(--pm-accent,#4f46e5)] font-semibold">EVOLUCIONA.</strong>
      </div>
    </div>
  );
};
