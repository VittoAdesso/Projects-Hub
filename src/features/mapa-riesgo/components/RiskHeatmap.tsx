import React from 'react';
import type { CalculatedProcessRow } from '../types';
import { cn } from '@/shared/lib/utils';

export interface RiskHeatmapProps {
  calculatedRows: readonly CalculatedProcessRow[];
  rankMap: ReadonlyMap<number, number>;
}

const CRITICALITY_ROWS = [
  { c: 3, label: 'Criticidad alta' },
  { c: 2, label: 'Criticidad media' },
  { c: 1, label: 'Criticidad baja' },
] as const;

const FRAGILITY_COLS = [0, 1, 2] as const;

const HEATMAP_CELL_BG: Record<number, string> = {
  0: 'g0 bg-[var(--mr-g0,#E4F3EA)]',
  1: 'g1 bg-[var(--mr-g1,#F7EDD8)]',
  2: 'g2 bg-[var(--mr-g2,#F8E0E0)]',
};

export const RiskHeatmap: React.FC<RiskHeatmapProps> = ({
  calculatedRows,
  rankMap,
}) => {
  return (
    <div
      id="hm"
      role="img"
      aria-label="Mapa de calor de criticidad frente a fragilidad"
      className="hm grid grid-cols-[70px_repeat(3,1fr)] gap-1 mt-3 text-[13px]"
    >
      {calculatedRows.length > 0 && (
        <>
          <div />
          <div className="x text-center text-[var(--mr-mut,#52616F)] text-[12.5px]">
            Fragilidad baja
          </div>
          <div className="x text-center text-[var(--mr-mut,#52616F)] text-[12.5px]">
            Fragilidad media
          </div>
          <div className="x text-center text-[var(--mr-mut,#52616F)] text-[12.5px]">
            Fragilidad alta
          </div>

          {CRITICALITY_ROWS.map(({ c, label }) => (
            <React.Fragment key={c}>
              <div className="l flex items-center text-[var(--mr-mut,#52616F)] text-[12.5px]">
                {label}
              </div>
              {FRAGILITY_COLS.map((fi) => {
                const cellItems = calculatedRows.filter(
                  (x) =>
                    x.c === c &&
                    Math.min(2, Math.floor(x.f / (10 / 3))) === fi
                );
                const g = Math.min(2, Math.floor((c - 1 + fi) / 1.5));

                return (
                  <div
                    key={fi}
                    className={cn(
                      'c min-h-[66px] rounded-md p-1.5 flex flex-wrap gap-1 content-start',
                      HEATMAP_CELL_BG[g]
                    )}
                  >
                    {cellItems.map((x) => (
                      <span
                        key={x.i}
                        title={x.n}
                        className="n w-[26px] h-[26px] rounded-full bg-[var(--mr-ink,#16222E)] text-[var(--mr-sf,#ffffff)] font-[var(--font-schibsted)] font-bold text-[13px] leading-[26px] text-center inline-block"
                      >
                        {rankMap.get(x.i)}
                      </span>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};
