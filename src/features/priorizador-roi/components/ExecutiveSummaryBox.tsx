import React from 'react';
import { formatEsNumber } from '../hooks/usePriorizadorRoi';
import type { CalculatedIdeaRow } from '../types';

export interface ExecutiveSummaryBoxProps {
  validRows: readonly CalculatedIdeaRow[];
  sortedValidRows: readonly CalculatedIdeaRow[];
  costPerHour: number;
}

export const ExecutiveSummaryBox: React.FC<ExecutiveSummaryBoxProps> = ({
  validRows,
  sortedValidRows,
  costPerHour,
}) => {
  const th = validRows.reduce((a, x) => a + x.hy, 0);
  const ta = validRows.reduce((a, x) => a + x.ah, 0);
  const qw = sortedValidRows.filter((x) => x.q === 0);
  const topIdea = sortedValidRows[0];

  return (
    <div
      id="sm"
      className="sum bg-[var(--pr-sf,#ffffff)] border border-[var(--pr-ln,#D7DEE5)] border-l-[6px] border-l-[var(--pr-gr,#2E7D52)] rounded-lg py-4 px-[18px] print:break-inside-avoid"
    >
      {validRows.length > 0 && topIdea ? (
        <div>
          <div className="kp flex flex-wrap gap-y-2 gap-x-[30px] mb-2">
            <div>
              <b className="block font-[var(--font-schibsted)] font-bold text-[28px] leading-[1.1] text-[var(--pr-ink,#16222E)]">
                {validRows.length}
              </b>
              <span className="text-[12.5px] text-[var(--pr-mut,#52616F)]">
                ideas valoradas
              </span>
            </div>
            <div>
              <b className="block font-[var(--font-schibsted)] font-bold text-[28px] leading-[1.1] text-[var(--pr-ink,#16222E)]">
                {formatEsNumber(th)}
              </b>
              <span className="text-[12.5px] text-[var(--pr-mut,#52616F)]">
                horas ahorradas al año
              </span>
            </div>
            {costPerHour > 0 && (
              <div>
                <b className="block font-[var(--font-schibsted)] font-bold text-[28px] leading-[1.1] text-[var(--pr-ink,#16222E)]">
                  {formatEsNumber(ta)} €
                </b>
                <span className="text-[12.5px] text-[var(--pr-mut,#52616F)]">
                  ahorro anual estimado
                </span>
              </div>
            )}
          </div>

          <p className="text-[14.5px] my-1 text-[var(--pr-ink,#16222E)]">
            La primera en el ranking es{' '}
            <b>{topIdea.n || 'Sin nombre'}</b>, con{' '}
            {formatEsNumber(topIdea.hy)} horas al año y{' '}
            {formatEsNumber(topIdea.d)} días de esfuerzo.
          </p>

          <p className="text-[14.5px] my-1 text-[var(--pr-ink,#16222E)]">
            {qw.length > 0
              ? `Para empezar ya: ${qw
                  .map((x) => x.n || 'Sin nombre')
                  .join('; ')}.`
              : 'Ninguna idea cae en el cuadrante de empezar ya: conviene dividir las más grandes en partes más pequeñas.'}
          </p>

          {costPerHour === 0 && (
            <p className="text-[14.5px] my-1 text-[var(--pr-ink,#16222E)]">
              Indica el coste por hora para ver también el ahorro en euros y cuándo se amortiza cada idea.
            </p>
          )}

          <p className="text-[14.5px] my-1 text-[var(--pr-ink,#16222E)]">
            Estimaciones propias, pendientes de validar con cada área.
          </p>
        </div>
      ) : (
        <p className="text-[14.5px] my-1 text-[var(--pr-ink,#16222E)]">
          Rellena horas y días en al menos una idea para generar el resumen.
        </p>
      )}
    </div>
  );
};
