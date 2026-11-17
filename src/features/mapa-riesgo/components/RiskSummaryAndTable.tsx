import React from 'react';
import {
  CRITICALITY_LABELS,
  LV,
  PILL_COLOR_CLASSES,
} from '../data/riskConstants';
import type { CalculatedProcessRow } from '../types';
import { cn } from '@/shared/lib/utils';

export interface RiskSummaryAndTableProps {
  calculatedRows: readonly CalculatedProcessRow[];
  sortedByRisk: readonly CalculatedProcessRow[];
}

export const RiskSummaryAndTable: React.FC<RiskSummaryAndTableProps> = ({
  calculatedRows,
  sortedByRisk,
}) => {
  const solo = calculatedRows.filter((x) => x.p === 1);
  const red = calculatedRows.filter((x) => x.lv === 2);
  const topProcess = sortedByRisk[0];

  return (
    <div className="space-y-3.5">
      {/* Resumen (#sm) */}
      <div
        id="sm"
        className="sum bg-[var(--mr-sf,#ffffff)] border border-[var(--mr-ln,#D7DEE5)] border-l-[6px] border-l-[var(--mr-rd,#B83232)] rounded-lg py-4 px-[18px] print:break-inside-avoid"
      >
        {calculatedRows.length > 0 ? (
          <div>
            <div className="kp flex flex-wrap gap-y-2 gap-x-[30px] mb-2">
              <div>
                <b className="block font-[var(--font-schibsted)] font-bold text-[28px] leading-[1.1] text-[var(--mr-ink,#16222E)]">
                  {calculatedRows.length}
                </b>
                <span className="text-[12.5px] text-[var(--mr-mut,#52616F)]">
                  procesos
                </span>
              </div>
              <div>
                <b className="block font-[var(--font-schibsted)] font-bold text-[28px] leading-[1.1] text-[var(--mr-ink,#16222E)]">
                  {solo.length}
                </b>
                <span className="text-[12.5px] text-[var(--mr-mut,#52616F)]">
                  dependen de una sola persona
                </span>
              </div>
              <div>
                <b className="block font-[var(--font-schibsted)] font-bold text-[28px] leading-[1.1] text-[var(--mr-ink,#16222E)]">
                  {red.length}
                </b>
                <span className="text-[12.5px] text-[var(--mr-mut,#52616F)]">
                  en riesgo alto
                </span>
              </div>
            </div>
            <p className="text-[14.5px] my-1 text-[var(--mr-ink,#16222E)]">
              {solo.length > 0
                ? `${solo.length} de ${calculatedRows.length} procesos dependen de una sola persona.`
                : 'Ningún proceso depende de una sola persona.'}{' '}
              {red.length > 0 ? (
                <>
                  El más urgente es{' '}
                  <b>{topProcess?.n || 'Sin nombre'}</b>.
                </>
              ) : (
                'Ninguno está en riesgo alto con los datos actuales.'
              )}
            </p>
          </div>
        ) : (
          <p className="text-[14.5px] my-1 text-[var(--mr-ink,#16222E)]">
            Añade al menos un proceso para ver el mapa.
          </p>
        )}
      </div>

      {/* Tabla (#tb) */}
      <div className="sc overflow-x-auto rounded-lg border border-[var(--mr-ln,#D7DEE5)]">
        <table
          id="tb"
          className="w-full border-collapse text-[13.5px] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-ink,#16222E)]"
        >
          {calculatedRows.length > 0 && (
            <>
              <thead>
                <tr>
                  <th className="border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-bg,#F4F6F8)] py-2 px-2.5 text-center font-semibold">
                    #
                  </th>
                  <th className="border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-bg,#F4F6F8)] py-2 px-2.5 text-left font-semibold">
                    Proceso
                  </th>
                  <th className="border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-bg,#F4F6F8)] py-2 px-2.5 text-center font-semibold">
                    Criticidad
                  </th>
                  <th className="border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-bg,#F4F6F8)] py-2 px-2.5 text-center font-semibold">
                    Fragilidad
                  </th>
                  <th className="border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-bg,#F4F6F8)] py-2 px-2.5 text-center font-semibold">
                    Riesgo
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedByRisk.map((x, j) => {
                  const [lvLabel, lvCode] = LV[x.lv];
                  return (
                    <tr key={x.i}>
                      <td className="border border-[var(--mr-ln,#D7DEE5)] py-2 px-2.5 text-center">
                        {j + 1}
                      </td>
                      <td className="border border-[var(--mr-ln,#D7DEE5)] py-2 px-2.5 text-left">
                        {x.n || 'Sin nombre'}
                      </td>
                      <td className="border border-[var(--mr-ln,#D7DEE5)] py-2 px-2.5 text-center">
                        {CRITICALITY_LABELS[x.c - 1] ?? ''}
                      </td>
                      <td className="border border-[var(--mr-ln,#D7DEE5)] py-2 px-2.5 text-center">
                        {x.f.toFixed(1)} / 10
                      </td>
                      <td className="border border-[var(--mr-ln,#D7DEE5)] py-2 px-2.5 text-center">
                        <span
                          className={cn(
                            'p inline-block rounded-full py-0.5 px-2.5 text-xs font-bold border',
                            PILL_COLOR_CLASSES[lvCode]
                          )}
                        >
                          {lvLabel} · {x.risk.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
};
