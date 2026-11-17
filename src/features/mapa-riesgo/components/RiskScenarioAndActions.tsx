import React from 'react';
import { LV, PILL_COLOR_CLASSES } from '../data/riskConstants';
import type { CalculatedProcessRow, PrioritizedAction } from '../types';
import { cn } from '@/shared/lib/utils';

export interface RiskScenarioProps {
  calculatedRows: readonly CalculatedProcessRow[];
}

export const RiskScenarioBox: React.FC<RiskScenarioProps> = ({
  calculatedRows,
}) => {
  const solo = calculatedRows.filter((x) => x.p === 1);
  const par = solo.filter((x) => x.d < 2);
  const ok = solo.filter((x) => x.d === 2);
  const cr = par.filter((x) => x.c === 3);
  const pl = (n: number, a: string, b: string) => (n === 1 ? a : b);

  return (
    <div
      id="sc2"
      className="box bg-[var(--mr-sf,#ffffff)] border border-[var(--mr-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid"
    >
      {solo.length > 0 ? (
        <div className="space-y-1 text-[14.5px] text-[var(--mr-ink,#16222E)]">
          {par.length > 0 ? (
            <p className="my-1">
              <b>{par.length}</b>{' '}
              {pl(
                par.length,
                'proceso se quedaría sin cobertura y sin manual completo',
                'procesos se quedarían sin cobertura y sin manual completo'
              )}
              : tardarían en recuperarse o se pararían.
            </p>
          ) : (
            <p className="my-1">
              Ningún proceso se quedaría sin cobertura y sin manual completo.
            </p>
          )}

          {cr.length > 0 && (
            <p className="my-1">
              De ellos, <b>{cr.length}</b>{' '}
              {pl(cr.length, 'es de criticidad alta', 'son de criticidad alta')}
              : {cr.map((x) => x.n || 'Sin nombre').join('; ')}.
            </p>
          )}

          {ok.length > 0 && (
            <p className="my-1">
              <b>{ok.length}</b>{' '}
              {pl(ok.length, 'proceso depende', 'procesos dependen')} de una
              sola persona pero{' '}
              {pl(
                ok.length,
                'tiene manual completo',
                'tienen manual completo'
              )}
              : otra persona podría continuarlos.
            </p>
          )}
        </div>
      ) : (
        <p className="my-1 text-[14.5px] text-[var(--mr-ink,#16222E)]">
          Ningún proceso depende de una sola persona: el escenario no genera paradas por esta causa.
        </p>
      )}
    </div>
  );
};

export interface RiskActionsProps {
  prioritizedActions: readonly PrioritizedAction[];
}

export const RiskActionsBox: React.FC<RiskActionsProps> = ({
  prioritizedActions,
}) => {
  return (
    <div
      id="ac"
      className="box bg-[var(--mr-sf,#ffffff)] border border-[var(--mr-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid"
    >
      {prioritizedActions.length > 0 ? (
        <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-sm text-[var(--mr-ink,#16222E)] space-y-1.5">
          {prioritizedActions.map(([row, text], idx) => {
            const [lvLabel, lvCode] = LV[row.lv];
            return (
              <li key={idx}>
                <span
                  className={cn(
                    'p inline-block rounded-full py-0.5 px-2.5 text-xs font-bold border',
                    PILL_COLOR_CLASSES[lvCode]
                  )}
                >
                  {lvLabel}
                </span>{' '}
                {text}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="my-1 text-[14.5px] text-[var(--mr-ink,#16222E)]">
          No hay acciones pendientes con los datos actuales.
        </p>
      )}
    </div>
  );
};
