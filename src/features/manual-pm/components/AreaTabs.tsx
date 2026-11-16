import React, { useState } from 'react';
import { AREAS, AREA_EXAMPLES } from '../data/areas';
import type { AreaId } from '../types';
import { Chip } from '@/shared/ui/chip';
import { cn } from '@/shared/lib/utils';

export interface AreaTabsProps {
  defaultArea?: AreaId;
  className?: string;
}

export const AreaTabs: React.FC<AreaTabsProps> = ({ defaultArea = 'rrhh', className }) => {
  const [activeArea, setActiveArea] = useState<AreaId>(defaultArea);

  const currentExample = AREA_EXAMPLES.find((a) => a.id === activeArea) ?? AREA_EXAMPLES[0]!;

  return (
    <div className={cn('w-full', className)}>
      <div className="areatabs flex gap-1.5 flex-wrap mb-4" id="areatabs" role="tablist" aria-label="Áreas funcionales">
        {AREAS.map((area) => {
          const isActive = area.id === activeArea;
          return (
            <button
              key={area.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              data-area={area.id}
              onClick={() => setActiveArea(area.id)}
              className={cn(
                'py-1.5 px-3.5 rounded-full font-sans text-[13.5px] font-semibold transition-all border cursor-pointer',
                isActive
                  ? 'on bg-[var(--pm-accent,#4f46e5)] text-white border-[var(--pm-accent,#4f46e5)] shadow-sm'
                  : 'bg-[var(--pm-surface,#ffffff)] border-[var(--pm-border-2,#ddd4c7)] text-[var(--pm-ink-2,#5c5650)] hover:border-[var(--pm-accent-line,rgba(79,70,229,0.2))]'
              )}
            >
              {area.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`areapanel-${currentExample.id}`}
        data-area={currentExample.id}
        className="areapanel on card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm transition-all animate-in fade-in duration-200"
      >
        <Chip variant="warning" className="mb-2">
          {currentExample.chip}
        </Chip>
        <p className="mt-3 mb-1.5 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
          <strong className="font-semibold text-[var(--pm-ink,#1a1714)]">Proceso típico:</strong>{' '}
          {currentExample.proceso}
        </p>
        <p className="mb-1.5 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
          <strong className="font-semibold text-[var(--pm-ink,#1a1714)]">Dónde aparece el juicio humano:</strong>{' '}
          {currentExample.juicio}
        </p>
        <p className="mb-1.5 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
          <strong className="font-semibold text-[var(--pm-ink,#1a1714)]">Qué valida la persona funcional:</strong>{' '}
          {currentExample.valida}
        </p>
        <p className="mb-0 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
          <strong className="font-semibold text-[var(--pm-ink,#1a1714)]">Punto de validación:</strong>{' '}
          {currentExample.validacion}
        </p>
      </div>
    </div>
  );
};
