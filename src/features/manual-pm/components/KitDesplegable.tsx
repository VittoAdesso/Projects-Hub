import React, { useState } from 'react';
import { Slot } from './Slot';
import type { SectionId } from '../types';
import { cn } from '@/shared/lib/utils';

export interface KitDesplegableProps {
  onNavigate?: (sectionId: SectionId) => void;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const KitDesplegable: React.FC<KitDesplegableProps> = ({
  onNavigate,
  isOpen: controlledOpen,
  onToggle,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div
      className={cn(
        'kit bg-[var(--pm-red-soft,#fae3e3)] border border-[var(--pm-red,#b91c1c)] rounded-[var(--radius-xl,16px)] p-5 my-7 shadow-sm',
        className
      )}
    >
      <div className="kit-head flex items-center justify-between gap-3">
        <span className="kit-badge font-serif font-bold text-[17px] text-[var(--pm-red-ink,#991b1b)]">
          🧯 Romper en caso de incendio
        </span>
        <button
          type="button"
          id="kitToggle"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls="kitBody"
          className="kit-toggle bg-[var(--pm-red,#b91c1c)] text-white border-none font-sans text-[13px] font-semibold py-1.5 px-3.5 rounded-[var(--radius-sm,7px)] cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
        >
          {isOpen ? 'Ocultar' : 'Ver los pasos'}
        </button>
      </div>

      {isOpen && (
        <div id="kitBody" className="kit-body mt-4 animate-in fade-in duration-200">
          <p className="kit-intro font-semibold text-[var(--pm-ink,#1a1714)] mb-3.5">
            Algo se ha roto en producción. No leas todo — haz esto, en este orden:
          </p>
          <div className="kit-steps flex flex-col gap-2.5">
            <div className="kit-step flex gap-3 items-start text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              <span className="kit-n shrink-0 w-[26px] h-[26px] rounded-full bg-[var(--pm-red,#b91c1c)] text-white flex items-center justify-center font-mono font-semibold text-[13px]">
                1
              </span>
              <div>
                <strong className="text-[var(--pm-ink,#1a1714)]">Confirma el alcance.</strong> Qué proceso, qué impacto, a quién afecta. <em>Aún no busques la causa.</em>
              </div>
            </div>

            <div className="kit-step flex gap-3 items-start text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              <span className="kit-n shrink-0 w-[26px] h-[26px] rounded-full bg-[var(--pm-red,#b91c1c)] text-white flex items-center justify-center font-mono font-semibold text-[13px]">
                2
              </span>
              <div>
                <strong className="text-[var(--pm-ink,#1a1714)]">Comunica ya</strong> (no esperes a tener solución):
                <div className="kit-quote mt-2 p-2.5 px-3.5 bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border-2,#ddd4c7)] rounded-[var(--radius-md,10px)] font-mono text-[13px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
                  &ldquo;Hemos detectado una incidencia en <Slot>[proceso]</Slot>. Estamos conteniendo el impacto y analizando el alcance. Próxima actualización en <Slot>[tiempo]</Slot>.&rdquo;
                </div>
              </div>
            </div>

            <div className="kit-step flex gap-3 items-start text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              <span className="kit-n shrink-0 w-[26px] h-[26px] rounded-full bg-[var(--pm-red,#b91c1c)] text-white flex items-center justify-center font-mono font-semibold text-[13px]">
                3
              </span>
              <div>
                <strong className="text-[var(--pm-ink,#1a1714)]">Aplica el plan de reversión.</strong> El que dejaste escrito al pasar a producción.
              </div>
            </div>

            <div className="kit-step flex gap-3 items-start text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              <span className="kit-n shrink-0 w-[26px] h-[26px] rounded-full bg-[var(--pm-red,#b91c1c)] text-white flex items-center justify-center font-mono font-semibold text-[13px]">
                4
              </span>
              <div>
                <strong className="text-[var(--pm-ink,#1a1714)]">Solo ahora,</strong> busca la causa raíz.
              </div>
            </div>
          </div>

          <div className="kit-rules mt-3.5 p-2.5 px-3.5 bg-[var(--pm-surface,#ffffff)] rounded-[var(--radius-md,10px)] text-[12.5px] text-[var(--pm-ink-2,#5c5650)] font-medium">
            <span>⚠️ Nunca prometas hora exacta en el primer mensaje &nbsp;·&nbsp; Nunca cargues comunicación + solución tú solo si puedes delegar una</span>
          </div>

          <button
            type="button"
            className="kit-link mt-3.5 bg-transparent border-[1.5px] border-[var(--pm-red,#b91c1c)] text-[var(--pm-red-ink,#991b1b)] font-sans text-[13.5px] font-semibold py-2 px-3.5 rounded-[var(--radius-sm,7px)] cursor-pointer hover:bg-[var(--pm-red,#b91c1c)] hover:text-white transition-colors"
            data-go="inc"
            onClick={() => onNavigate?.('inc')}
          >
            Abrir sección completa de incidencias →
          </button>
        </div>
      )}
    </div>
  );
};
