import React from 'react';
import { QN, QUADRANT_PILL_CLASSES } from '../data/prioritizerConstants';
import { formatEsNumber } from '../hooks/usePriorizadorRoi';
import type { CalculatedIdeaRow } from '../types';
import { cn } from '@/shared/lib/utils';

export interface RankingTableProps {
  sortedValidRows: readonly CalculatedIdeaRow[];
  costPerHour: number;
}

export const RankingTable: React.FC<RankingTableProps> = ({
  sortedValidRows,
  costPerHour,
}) => {
  const hasCost = costPerHour > 0;

  return (
    <div className="sc overflow-x-auto rounded-lg border border-[var(--pr-ln,#D7DEE5)]">
      <table
        id="tb"
        className="w-full border-collapse text-[13.5px] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)]"
      >
        <thead>
          <tr>
            <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-left font-semibold">
              #
            </th>
            <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-left font-semibold">
              Idea
            </th>
            <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-right font-semibold">
              Horas/año
            </th>
            <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-right font-semibold">
              Esfuerzo
            </th>
            <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-right font-semibold">
              Puntos
            </th>
            {hasCost && (
              <>
                <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-right font-semibold">
                  Ahorro/año
                </th>
                <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-right font-semibold">
                  Amortiza
                </th>
              </>
            )}
            <th className="border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-bg,#F4F6F8)] py-2 px-2.5 text-right font-semibold">
              Cuadrante
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedValidRows.length > 0 ? (
            sortedValidRows.map((x, j) => (
              <tr key={x.i}>
                <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-left">
                  {j + 1}
                </td>
                <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-left">
                  {x.n || 'Sin nombre'}
                </td>
                <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-right">
                  {formatEsNumber(x.hy)}
                </td>
                <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-right">
                  {formatEsNumber(x.d)} d
                </td>
                <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-right">
                  {formatEsNumber(x.sc, 1)}
                </td>
                {hasCost && (
                  <>
                    <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-right">
                      {formatEsNumber(x.ah)} €
                    </td>
                    <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-right">
                      {x.pay === null ? 'No' : `${formatEsNumber(x.pay, 1)} m`}
                    </td>
                  </>
                )}
                <td className="border border-[var(--pr-ln,#D7DEE5)] py-2 px-2.5 text-right">
                  <span
                    className={cn(
                      'q inline-block rounded-full py-0.5 px-2.5 text-xs font-semibold border',
                      QUADRANT_PILL_CLASSES[x.q]
                    )}
                  >
                    {QN[x.q]}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={hasCost ? 8 : 6}
                className="border border-[var(--pr-ln,#D7DEE5)] py-2.5 px-2.5 text-left"
              >
                Rellena horas y días en al menos una idea.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
