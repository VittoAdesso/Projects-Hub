import React from 'react';
import { SECTIONS } from '../data/sections';
import type { SectionId } from '../types';
import { cn } from '@/shared/lib/utils';

export interface ManualNavProps {
  activeSection: SectionId;
  onSelectSection: (sectionId: SectionId) => void;
  className?: string;
}

export const ManualNav: React.FC<ManualNavProps> = ({
  activeSection,
  onSelectSection,
  className,
}) => {
  return (
    <nav
      id="tabs"
      role="tablist"
      aria-label="Secciones del Manual PM"
      className={cn(
        'tabs flex gap-0.5 overflow-x-auto scrollbar-none border-b border-[var(--pm-border,#e9e2d8)] -mb-px',
        className
      )}
    >
      {SECTIONS.map((s) => {
        const isActive = s.id === activeSection;
        const displayLabel = s.id === 'rut' ? 'Rutina' : s.label;

        return (
          <button
            key={s.id}
            role="tab"
            type="button"
            data-target={s.id}
            aria-selected={isActive}
            aria-controls={`sec-${s.id}`}
            id={`tab-${s.id}`}
            onClick={() => onSelectSection(s.id)}
            className={cn(
              'tab-btn bg-transparent border-none font-sans text-sm font-semibold py-2.5 px-3.5 pb-3 cursor-pointer whitespace-nowrap border-b-[2.5px] transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pm-accent,#4f46e5)]',
              isActive
                ? 'text-[var(--pm-accent,#4f46e5)] border-[var(--pm-accent,#4f46e5)]'
                : 'text-[var(--pm-ink-3,#928b82)] border-transparent hover:text-[var(--pm-ink,#1a1714)]'
            )}
          >
            <span className="tab-n font-mono text-[11px] opacity-75">{s.num}</span>
            <span>{displayLabel}</span>
          </button>
        );
      })}
    </nav>
  );
};
