import React from 'react';
import { getTrafficLightHex } from '../hooks/useSupervisorCodigo';
import type { AuditEvaluationResult } from '../types';
import { cn } from '@/shared/lib/utils';

export interface AuditResultsSectionProps {
  projectName: string;
  evaluation: AuditEvaluationResult;
}

const getBorderLeftClass = (gp: number | null): string => {
  if (gp === null) return 'border-l-[var(--sc-ink,#16222E)]';
  if (gp >= 75) return 'border-l-[var(--sc-ok,#2E7D52)]';
  if (gp >= 50) return 'border-l-[var(--sc-warn,#B7791F)]';
  return 'border-l-[var(--sc-bad,#B83232)]';
};

const getScoreTextClass = (gp: number): string => {
  if (gp >= 75) return 'text-[var(--sc-ok,#2E7D52)]';
  if (gp >= 50) return 'text-[var(--sc-warn,#B7791F)]';
  return 'text-[var(--sc-bad,#B83232)]';
};

export const AuditResultsSection: React.FC<AuditResultsSectionProps> = ({
  projectName,
  evaluation,
}) => {
  const {
    globalPercentage: gp,
    evaluatedCount: n,
    totalItemsCount: all,
    groupRows: rows,
    findings: bad,
    criticalNoItems: c1,
    importantPendingItems: c2,
  } = evaluation;

  const topFindings = bad.slice(0, 6);

  return (
    <div className="space-y-3">
      {/* Resumen global (#sm) */}
      <div
        id="sm"
        aria-live="polite"
        className={cn(
          'sum bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] border-l-[6px] rounded-lg py-4 px-[18px] print:break-inside-avoid',
          getBorderLeftClass(gp)
        )}
      >
        {gp === null ? (
          <p className="m-0 text-sm text-[var(--sc-ink,#16222E)]">
            Marca los puntos de la auditoría para ver el resultado.
          </p>
        ) : (
          <div>
            <div className="row flex flex-wrap gap-y-2.5 gap-x-7 items-end mb-2">
              <p
                className={cn(
                  'big font-[var(--font-schibsted)] font-bold text-[44px] leading-none m-0',
                  getScoreTextClass(gp)
                )}
              >
                {gp}%
              </p>
              <span className="text-[var(--sc-mut,#52616F)] text-[13px] leading-snug">
                puntuación global
                {projectName && (
                  <>
                    <br />
                    {projectName}
                  </>
                )}
                <br />
                {n} de {all} puntos evaluados
              </span>
            </div>

            <div className="bars grid gap-2 mt-2">
              {rows.map(([nme, p, k, t], idx) => {
                const fillHex =
                  p === null ? '#D7DEE5' : getTrafficLightHex(p);
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-[150px_1fr_90px] gap-2.5 items-center text-[13.5px] text-[var(--sc-ink,#16222E)]"
                  >
                    <span>{nme}</span>
                    <span className="pg h-2 bg-[var(--sc-ln,#D7DEE5)] rounded overflow-hidden">
                      <svg
                        viewBox="0 0 100 8"
                        preserveAspectRatio="none"
                        className="w-full h-full block"
                        aria-hidden="true"
                      >
                        <rect
                          x={0}
                          y={0}
                          width={p ?? 0}
                          height={8}
                          fill={fillHex}
                        />
                      </svg>
                    </span>
                    <span>
                      {p === null ? 'sin datos' : `${p}% · ${k}/${t}`}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="mt-2.5 mb-0 text-[13.5px] text-[var(--sc-mut,#52616F)]">
              Verde desde 75%, ámbar desde 50% y rojo por debajo. Es una guía para priorizar, no una certificación.
            </p>
          </div>
        )}
      </div>

      {/* Lo más urgente (#ur) y Preguntas para el equipo (#qs) */}
      <div className="two grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
          <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
            Lo más urgente
          </h3>
          <div id="ur">
            {topFindings.length > 0 ? (
              <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-sm text-[var(--sc-ink,#16222E)] space-y-1.5">
                {topFindings.map((b, idx) => (
                  <li key={idx}>
                    <b className="font-semibold">
                      {b.v === 'n' ? 'No' : 'Parcial'}
                    </b>{' '}
                    · {b.t}{' '}
                    <span className="text-[var(--sc-mut,#52616F)]">
                      ({b.g})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
                Nada urgente con las respuestas actuales.
              </p>
            )}
          </div>
        </div>

        <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
          <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
            Preguntas para el equipo
          </h3>
          <div id="qs">
            {topFindings.length > 0 ? (
              <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-sm text-[var(--sc-ink,#16222E)] space-y-1.5">
                {topFindings.map((b, idx) => (
                  <li key={idx}>
                    {b.q || `¿Cómo se cumple esto y qué falta? «${b.t}»`}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
                Sin preguntas pendientes.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Plan sugerido (#plan) */}
      <div className="box bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] rounded-lg py-3.5 px-4 print:break-inside-avoid">
        <h3 className="font-[var(--font-schibsted)] font-semibold text-base text-[var(--sc-ink,#16222E)] mb-1">
          Plan sugerido
        </h3>
        <div id="plan">
          {n === 0 ? (
            <p className="my-1 text-sm text-[var(--sc-mut,#52616F)]">
              Cuando marques puntos aparecerá aquí un plan en tres pasos.
            </p>
          ) : (
            <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-sm text-[var(--sc-ink,#16222E)] space-y-1.5">
              <li>
                <b className="font-semibold">Primero:</b>{' '}
                {c1.length > 0
                  ? `${c1
                      .slice(0, 5)
                      .map((b) => b.t)
                      .join('; ')}.`
                  : 'no hay puntos críticos marcados como No.'}
              </li>
              <li>
                <b className="font-semibold">Después:</b>{' '}
                {c2.length > 0
                  ? `${c2
                      .slice(0, 5)
                      .map((b) => b.t)
                      .join('; ')}.`
                  : 'no hay nada importante pendiente.'}
              </li>
              <li>
                <b className="font-semibold">Siempre:</b> repetir esta revisión al cerrar cada fase del proyecto.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
