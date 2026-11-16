import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface FlowDiagramProps {
  className?: string;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flowmap bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm my-6',
        className
      )}
    >
      {/* First track: Planning / Design */}
      <div className="fm-track flex items-stretch gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <div className="fm-node flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-accent-soft,#ede9ff)] border border-[var(--pm-accent-line,rgba(79,70,229,0.16))] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-accent,#4f46e5)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            0
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Recepción
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-accent-soft,#ede9ff)] border border-[var(--pm-accent-line,rgba(79,70,229,0.16))] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-accent,#4f46e5)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            1
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Priorización
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-accent-soft,#ede9ff)] border border-[var(--pm-accent-line,rgba(79,70,229,0.16))] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-accent,#4f46e5)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            2
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Análisis
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-accent-soft,#ede9ff)] border border-[var(--pm-accent-line,rgba(79,70,229,0.16))] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-accent,#4f46e5)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            3
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Evaluación
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-accent-soft,#ede9ff)] border border-[var(--pm-accent-line,rgba(79,70,229,0.16))] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-accent,#4f46e5)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            4
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Estimación
          </span>
        </div>
      </div>

      {/* Middle gate */}
      <div className="fm-gate text-center font-mono text-xs font-semibold text-[var(--pm-amber-ink,#92400e)] bg-[var(--pm-amber-soft,#fbeed8)] rounded-full py-1.5 px-3.5 my-3 mx-auto w-fit max-w-full">
        ⬇ &nbsp;solo aquí empieza a construirse&nbsp; ⬇
      </div>

      {/* Second track: Construction and Live */}
      <div className="fm-track flex items-stretch gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <div className="fm-node build flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-amber-soft,#fbeed8)] border border-[var(--pm-amber,#b45309)] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-amber,#b45309)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            5
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Desarrollo
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node build flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-amber-soft,#fbeed8)] border border-[var(--pm-amber,#b45309)] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-amber,#b45309)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            6
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Testing
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node build flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-amber-soft,#fbeed8)] border border-[var(--pm-amber,#b45309)] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-amber,#b45309)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            7
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Producción
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node build flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-amber-soft,#fbeed8)] border border-[var(--pm-amber,#b45309)] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-amber,#b45309)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            8
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Hipercare
          </span>
        </div>
        <div className="fm-arrow flex items-center text-[var(--pm-ink-3,#928b82)] text-lg shrink-0">→</div>

        <div className="fm-node live flex-1 min-w-[84px] flex flex-col items-center gap-1.5 bg-[var(--pm-green-soft,#e3f3e8)] border border-[var(--pm-green,#15803d)] rounded-[var(--radius-md,10px)] p-3 py-3 text-center">
          <span className="fm-num font-mono font-bold text-base text-[var(--pm-green,#15803d)] w-7 h-7 rounded-lg bg-[var(--pm-surface,#ffffff)] flex items-center justify-center shadow-xs">
            9
          </span>
          <span className="fm-lbl text-xs font-semibold text-[var(--pm-ink-2,#5c5650)] leading-tight">
            Mantenim.
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="fm-legend flex flex-wrap gap-3.5 mt-4 pt-3.5 border-t border-[var(--pm-border,#e9e2d8)] text-[12.5px] text-[var(--pm-ink-2,#5c5650)]">
        <span className="inline-flex items-center gap-1.5">
          <i className="dotc plan w-[11px] h-[11px] rounded-[3px] inline-block bg-[var(--pm-accent,#4f46e5)]" />{' '}
          Diseño (no se programa nada)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="dotc build w-[11px] h-[11px] rounded-[3px] inline-block bg-[var(--pm-amber,#b45309)]" />{' '}
          Construcción
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="dotc live w-[11px] h-[11px] rounded-[3px] inline-block bg-[var(--pm-green,#15803d)]" />{' '}
          Vida en producción
        </span>
      </div>
    </div>
  );
};
