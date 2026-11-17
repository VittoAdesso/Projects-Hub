import React from 'react';
import { ES, FS } from '../data/coeData';
import { CopyButton } from '@/shared/components/CopyButton';
import { cn } from '@/shared/lib/utils';

export interface CoePhasesSectionProps {
  activePhase: number;
  onSelectPhase: (phaseIndex: number) => void;
}

export const CoePhasesSection: React.FC<CoePhasesSectionProps> = ({
  activePhase,
  onSelectPhase,
}) => {
  const currentPhase = FS[activePhase] ?? FS[0]!;

  return (
    <div className="space-y-2.5">
      <div
        id="ph"
        role="group"
        aria-label="Fases"
        className="ph flex flex-wrap gap-1.5"
      >
        {FS.map((phase, idx) => {
          const isPressed = activePhase === idx;
          return (
            <button
              key={idx}
              type="button"
              data-k={idx}
              aria-pressed={isPressed}
              onClick={() => onSelectPhase(idx)}
              className={cn(
                'min-h-[44px] px-3.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coe-bl,#2563A8)]',
                isPressed
                  ? 'bg-[var(--coe-ink,#16222E)] text-[var(--coe-sf,#ffffff)] border-[var(--coe-ink,#16222E)]'
                  : 'bg-[var(--coe-sf,#ffffff)] text-[var(--coe-ink,#16222E)] border-[var(--coe-ln,#D7DEE5)] hover:bg-surface-hover'
              )}
            >
              {phase[0]}
            </button>
          );
        })}
      </div>

      <div
        id="fp"
        aria-live="polite"
        className="bg-[var(--coe-sf,#ffffff)] border border-[var(--coe-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid"
      >
        <h3 className="font-[var(--font-schibsted)] font-bold text-[19px] text-[var(--coe-ink,#16222E)] mb-0.5">
          {currentPhase[0]}
        </h3>
        <p className="text-sm text-[var(--coe-ink,#16222E)] my-0.5">
          {currentPhase[1]}
        </p>

        <h4 className="font-[var(--font-schibsted)] font-semibold text-[13.5px] text-[var(--coe-ink,#16222E)] mt-2.5 mb-0.5">
          Qué preguntarles
        </h4>
        <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-[13.5px] text-[var(--coe-mut,#52616F)] space-y-1">
          {currentPhase[2].map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>

        <h4 className="font-[var(--font-schibsted)] font-semibold text-[13.5px] text-[var(--coe-ink,#16222E)] mt-2.5 mb-0.5">
          Qué dejar hecho
        </h4>
        <p className="text-sm text-[var(--coe-ink,#16222E)] my-0.5">
          {currentPhase[3]}
        </p>

        <h4 className="font-[var(--font-schibsted)] font-semibold text-[13.5px] text-[var(--coe-ink,#16222E)] mt-2.5 mb-0.5">
          Qué evitar
        </h4>
        <p className="text-sm text-[var(--coe-ink,#16222E)] my-0.5">
          {currentPhase[4]}
        </p>

        {activePhase === 5 && (
          <div className="mt-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-[var(--font-schibsted)] font-semibold text-[13.5px] text-[var(--coe-ink,#16222E)] m-0">
                Plantilla de cierre
              </h4>
              <div className="print:hidden" data-html2canvas-ignore="true">
                <CopyButton
                  text={ES}
                  label="Copiar plantilla"
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                />
              </div>
            </div>
            <pre className="mt-1 p-2.5 px-3 bg-[var(--coe-bg,#F4F6F8)] border border-[var(--coe-ln,#D7DEE5)] rounded-lg font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-[var(--coe-ink,#16222E)]">
              {ES}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
