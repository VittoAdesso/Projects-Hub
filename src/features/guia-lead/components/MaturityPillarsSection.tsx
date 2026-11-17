import React from 'react';
import { PL } from '../data/leadData';
import type { MaturityTuple } from '../types';
import { cn } from '@/shared/lib/utils';

export interface MaturityPillarsSectionProps {
  maturityLevels: MaturityTuple;
  onSelectPillarLevel: (pillarIndex: 0 | 1 | 2 | 3, level: number) => void;
}

const LEVELS = [0, 1, 2, 3, 4, 5] as const;

export const MaturityPillarsSection: React.FC<MaturityPillarsSectionProps> = ({
  maturityLevels,
  onSelectPillarLevel,
}) => {
  return (
    <div id="pls" className="space-y-2.5">
      {PL.map(([name, subtitle, descriptions], pIdx) => {
        const pillarIndex = pIdx as 0 | 1 | 2 | 3;
        const currentLevel = maturityLevels[pillarIndex];

        return (
          <section
            key={pIdx}
            className="pl bg-[var(--gl-sf,#ffffff)] border border-[var(--gl-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid"
          >
            <h3 className="font-[var(--font-schibsted)] font-semibold text-[17px] text-[var(--gl-ink,#16222E)] m-0">
              {name}
              <small className="font-[var(--font-instrument)] font-normal text-[13px] text-[var(--gl-mut,#52616F)] ml-2">
                {subtitle}
              </small>
            </h3>

            <div
              className="lv flex flex-wrap gap-1.5 my-2.5"
              role="group"
              aria-label={`Nivel de ${name}`}
            >
              {LEVELS.map((v) => {
                const isPressed = currentLevel === v;
                return (
                  <button
                    key={v}
                    type="button"
                    data-p={pIdx}
                    data-v={v}
                    aria-pressed={isPressed}
                    onClick={() => onSelectPillarLevel(pillarIndex, v)}
                    className={cn(
                      'min-h-[40px] px-3.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]',
                      isPressed
                        ? 'bg-[var(--gl-ink,#16222E)] text-[var(--gl-sf,#ffffff)] border-[var(--gl-ink,#16222E)]'
                        : 'bg-[var(--gl-sf,#ffffff)] text-[var(--gl-ink,#16222E)] border-[var(--gl-ln,#D7DEE5)] hover:bg-surface-hover'
                    )}
                  >
                    N{v}
                  </button>
                );
              })}
            </div>

            <p className="mt-1 mb-0 text-[13.5px] text-[var(--gl-mut,#52616F)]">
              {currentLevel > 0 ? (
                <>
                  <b className="text-[var(--gl-ink,#16222E)] font-semibold">
                    Hoy, N{currentLevel}:
                  </b>{' '}
                  {descriptions[currentLevel - 1]}
                </>
              ) : (
                <>
                  <b className="text-[var(--gl-ink,#16222E)] font-semibold">
                    Hoy:
                  </b>{' '}
                  todavía no hay nada escrito sobre este pilar.
                </>
              )}
            </p>

            {currentLevel < 5 ? (
              <p className="mt-1 mb-0 text-[13.5px] text-[var(--gl-mut,#52616F)]">
                <b className="text-[var(--gl-ink,#16222E)] font-semibold">
                  Para llegar a N{currentLevel + 1}:
                </b>{' '}
                {descriptions[currentLevel]}
              </p>
            ) : (
              <p className="mt-1 mb-0 text-[13.5px] text-[var(--gl-mut,#52616F)]">
                <b className="text-[var(--gl-ink,#16222E)] font-semibold">
                  Siguiente paso:
                </b>{' '}
                mantener el nivel y revisarlo con regularidad.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
};
