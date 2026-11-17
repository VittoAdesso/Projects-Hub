import React from 'react';
import { Chip } from '@/shared/ui/chip';
import { TemplateBlock } from '../components/TemplateBlock';
import { getTemplateById } from '../data/templates';

export const IncidenciasView: React.FC = () => {
  const tplC1 = getTemplateById('c1')!;
  const tplC2a = getTemplateById('c2a')!;
  const tplC2b = getTemplateById('c2b')!;
  const tplC2c = getTemplateById('c2c')!;

  return (
    <div id="inc" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          05 · Bajo presión
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Incidencias y presión
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Para los dos momentos en que más se improvisa: cuando insisten fuera del proceso, y cuando algo se rompe.
        </p>
      </div>

      {/* Protocolo Petición informal */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1 flex items-center gap-2.5 flex-wrap">
          <Chip variant="amber">Protocolo</Chip>
          <span>Petición informal</span>
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Pasillo, correo cruzado, insistencia. El objetivo no es decir que no: es meter la petición dentro del sistema sin comprometer plazos.
        </p>

        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <ol className="list-decimal pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)] mb-5">
            <li>Responder con la plantilla oficial</li>
            <li>Registrar en backlog (Fase 0)</li>
            <li>No abrir análisis ni estimar</li>
            <li>No comprometer fecha</li>
          </ol>

          <TemplateBlock id={tplC1.id} label={tplC1.label} text={tplC1.text} />
        </div>
      </section>

      {/* Protocolo Crisis: algo se ha roto */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1 flex items-center gap-2.5 flex-wrap">
          <Chip variant="red">Protocolo</Chip>
          <span>Crisis: algo se ha roto</span>
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Un proceso falla en producción y el impacto es real. Lo primero no es arreglarlo — es comunicar.
        </p>

        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm mb-6">
          <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-3">
            Los 3 filtros de contención
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Filtro 1 · Identificar impacto (5 min):</strong> ¿Quién está afectado? ¿Hay impacto legal o financiero? ¿Se puede operar manualmente mientras tanto?
            </li>
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Filtro 2 · Contener y calmar (15 min):</strong> Enviar plantilla de calma. No dar soluciones técnicas. No dar horas exactas todavía.
            </li>
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Filtro 3 · Reversión (30 min):</strong> Si la solución no es evidente, aplicar el plan de reversión. Volver al estado anterior y analizar en frío.
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <TemplateBlock id={tplC2a.id} label={tplC2a.label} text={tplC2a.text} />
          <TemplateBlock id={tplC2b.id} label={tplC2b.label} text={tplC2b.text} />
          <TemplateBlock id={tplC2c.id} label={tplC2c.label} text={tplC2c.text} />
        </div>
      </section>
    </div>
  );
};
