import React from 'react';
import { PILLAR_BAR_WIDTH, PL, T } from '../data/leadData';
import type { DirectionSummaryData } from '../hooks/useGuiaLead';
import type { MaturityTuple } from '../types';
import { cn } from '@/shared/lib/utils';

export interface DirectionSummarySectionProps {
  maturityLevels: MaturityTuple;
  summaryData: DirectionSummaryData;
}

export const DirectionSummarySection: React.FC<DirectionSummarySectionProps> = ({
  maturityLevels,
  summaryData,
}) => {
  return (
    <div
      id="sum"
      className="sum bg-[var(--gl-sf,#ffffff)] border border-[var(--gl-ln,#D7DEE5)] border-l-[6px] border-l-[var(--gl-ink,#16222E)] rounded-lg py-[18px] px-5 print:break-inside-avoid"
    >
      <div className="row flex flex-wrap gap-y-2.5 gap-x-7 items-end mb-1.5">
        <p className="big font-[var(--font-schibsted)] font-bold text-[44px] leading-none text-[var(--gl-ink,#16222E)] m-0">
          N{summaryData.globalLevel}
        </p>
        <span className="text-[var(--gl-mut,#52616F)] text-[13px] leading-snug">
          nivel global
          <br />
          (el del pilar más débil)
        </span>
      </div>

      <p className="text-[14.5px] my-0.5 text-[var(--gl-ink,#16222E)]">
        {summaryData.diagnosticMessage}
      </p>

      <h4 className="font-[var(--font-schibsted)] font-semibold text-sm text-[var(--gl-ink,#16222E)] mt-4 mb-1">
        Nivel por pilar
      </h4>
      <div className="bars grid gap-2 mt-1.5">
        {PL.map(([name], i) => {
          const level = maturityLevels[i] ?? 0;
          const widthClass = PILLAR_BAR_WIDTH[level] ?? 'w-0';

          return (
            <div
              key={i}
              className="grid grid-cols-[130px_1fr_44px] gap-2.5 items-center text-[13.5px] text-[var(--gl-ink,#16222E)]"
            >
              <span>{name}</span>
              <span className="pg h-1.5 bg-[var(--gl-ln,#D7DEE5)] rounded-full overflow-hidden m-0">
                <i
                  className={cn(
                    'block h-full bg-[var(--gl-ink,#16222E)] transition-all duration-200',
                    widthClass
                  )}
                />
              </span>
              <span>N{level}</span>
            </div>
          );
        })}
      </div>

      <h4 className="font-[var(--font-schibsted)] font-semibold text-sm text-[var(--gl-ink,#16222E)] mt-4 mb-1">
        Dominio del rol por ruta
      </h4>
      <ul className="list-disc pl-[18px] m-0 space-y-0.5 text-[14.5px] text-[var(--gl-ink,#16222E)]">
        {T.map(([name], i) => (
          <li key={i}>
            {name}: {summaryData.trackPercentages[i] ?? 0}%
          </li>
        ))}
      </ul>

      <h4 className="font-[var(--font-schibsted)] font-semibold text-sm text-[var(--gl-ink,#16222E)] mt-4 mb-1">
        Cómo leerlo
      </h4>
      <p className="text-[14.5px] my-0.5 text-[var(--gl-ink,#16222E)]">
        Un pilar muy débil limita a todo el conjunto. Se recomienda subir un solo nivel a la vez y empezar por el más bajo, antes que seguir mejorando el que ya va bien.
      </p>
    </div>
  );
};
