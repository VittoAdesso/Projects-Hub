import React from 'react';
import { CHART_RISK_COLORS } from '../data/prioritizerConstants';
import type { CalculatedIdeaRow } from '../types';

export interface ValueEffortChartProps {
  validRows: readonly CalculatedIdeaRow[];
  medianX: number;
  medianY: number;
  rankMap: ReadonlyMap<number, number>;
}

export const ValueEffortChart: React.FC<ValueEffortChartProps> = ({
  validRows,
  medianX,
  medianY,
  rankMap,
}) => {
  const x0 = 44;
  const x1 = 404;
  const y0 = 18;
  const y1 = 318;
  const mx = Math.max(1, ...validRows.map((x) => x.d)) * 1.15;
  const my = Math.max(1, ...validRows.map((x) => x.hy)) * 1.15;

  const px = (v: number) => x0 + (v / mx) * (x1 - x0);
  const py = (v: number) => y1 - (v / my) * (y1 - y0);

  return (
    <div className="chart bg-[var(--pr-sf,#ffffff)] border border-[var(--pr-ln,#D7DEE5)] rounded-lg p-2.5 print:break-inside-avoid">
      <svg
        id="sv"
        viewBox="0 0 420 360"
        role="img"
        aria-label="Matriz de valor frente a esfuerzo de las ideas"
        className="w-full h-auto block"
      >
        <rect
          x={x0}
          y={y0}
          width={x1 - x0}
          height={y1 - y0}
          fill="#fff"
          stroke="#D7DEE5"
        />

        {validRows.length > 0 && (
          <>
            <line
              x1={px(medianX)}
              y1={y0}
              x2={px(medianX)}
              y2={y1}
              stroke="#52616F"
              strokeDasharray="5 4"
            />
            <line
              x1={x0}
              y1={py(medianY)}
              x2={x1}
              y2={py(medianY)}
              stroke="#52616F"
              strokeDasharray="5 4"
            />

            <text
              x={x0 + 6}
              y={y0 + 16}
              fontSize="12"
              fill="#1F6B3F"
              fontWeight="600"
            >
              Hazlo ya
            </text>
            <text
              x={x1 - 6}
              y={y0 + 16}
              fontSize="12"
              fill="#2563A8"
              fontWeight="600"
              textAnchor="end"
            >
              Estratégico
            </text>
            <text
              x={x0 + 6}
              y={y1 - 8}
              fontSize="12"
              fill="#52616F"
              fontWeight="600"
            >
              Relleno
            </text>
            <text
              x={x1 - 6}
              y={y1 - 8}
              fontSize="12"
              fill="#B83232"
              fontWeight="600"
              textAnchor="end"
            >
              Replantéalo
            </text>

            {validRows.map((x) => {
              const fillColor = CHART_RISK_COLORS[x.k - 1] ?? '#2E7D52';
              return (
                <React.Fragment key={x.i}>
                  <circle
                    cx={px(x.d)}
                    cy={py(x.hy)}
                    r="12"
                    fill={fillColor}
                  />
                  <text
                    x={px(x.d)}
                    y={py(x.hy) + 4.5}
                    fontSize="12"
                    fontWeight="700"
                    fill="#fff"
                    textAnchor="middle"
                  >
                    {rankMap.get(x.i)}
                  </text>
                </React.Fragment>
              );
            })}
          </>
        )}

        <text
          x={(x0 + x1) / 2}
          y="348"
          fontSize="12.5"
          fill="#52616F"
          textAnchor="middle"
        >
          Esfuerzo en días (más a la derecha, más trabajo)
        </text>
        <text
          transform={`translate(13 ${(y0 + y1) / 2}) rotate(-90)`}
          fontSize="12.5"
          fill="#52616F"
          textAnchor="middle"
        >
          Horas ahorradas al año
        </text>
      </svg>

      <div className="leg flex flex-wrap gap-y-1.5 gap-x-4 text-[12.5px] text-[var(--pr-mut,#52616F)] mt-2 mx-0.5">
        <span className="inline-flex items-center">
          <i className="inline-block w-[11px] h-[11px] rounded-full mr-1.5 bg-[var(--pr-gr,#2E7D52)]" />
          Riesgo bajo
        </span>
        <span className="inline-flex items-center">
          <i className="inline-block w-[11px] h-[11px] rounded-full mr-1.5 bg-[var(--pr-am,#B7791F)]" />
          Riesgo medio
        </span>
        <span className="inline-flex items-center">
          <i className="inline-block w-[11px] h-[11px] rounded-full mr-1.5 bg-[var(--pr-rd,#B83232)]" />
          Riesgo alto
        </span>
      </div>
    </div>
  );
};
