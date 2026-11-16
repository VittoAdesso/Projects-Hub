import React from 'react';
import type { SectionId } from '../types';
import { Chip } from '@/shared/ui/chip';
import { Callout } from '@/shared/ui/callout';

export interface DecisionViewProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const DecisionView: React.FC<DecisionViewProps> = ({ onNavigate }) => {
  return (
    <div id="dec" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          03 · El núcleo
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Toma de decisión
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Tres criterios para decidir qué entra, cómo se diseña y quién decide.
        </p>
      </div>

      {/* 1 · ¿Esto se automatiza al 100%? */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          1 · ¿Esto se automatiza al 100%?
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          No todo debe automatizarse. El 100% no siempre es el objetivo.
        </p>
        <div className="card bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent-line,rgba(79,70,229,0.2))] rounded-[var(--radius-xl,16px)] p-6 sm:p-8 shadow-sm">
          <Chip variant="default" className="mb-3">
            Principio de diseño
          </Chip>
          <p className="font-serif text-xl sm:text-2xl font-bold leading-snug text-[var(--pm-ink,#1a1714)] my-3.5">
            En muchos casos, el diseño correcto es 80% automatizado / 20% supervisado.
          </p>
          <p className="m-0 text-[15px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
            Reduce complejidad, incidencias y coste de mantenimiento, y permite adaptarse a nuevas casuísticas. Cuanto más cerca esté un proceso del Tipo 3, menos recomendable es forzar el 100%.
          </p>
        </div>
      </section>

      {/* 2 · Arquitectura para procesos complejos */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          2 · Arquitectura para procesos complejos
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          El patrón sirve para cualquier destino final — un dashboard, un Excel maestro, una carga a SAP, un envío de correos. Lo importante es el paso de validación humana antes de publicar.
        </p>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <div className="rail relative pl-8 border-l-2 border-[var(--pm-border-2,#ddd4c7)] space-y-6">
            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                1
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Obtención de datos
                </h3>
                <p className="m-0 text-[13.5px] text-[var(--pm-ink-3,#928b82)]">
                  De donde sea: SAP, Excel, formularios, correos, SharePoint.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                2
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Transformación automática
                </h3>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                3
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Detección de inconsistencias
                </h3>
              </div>
            </div>

            <div className="step relative">
              <div className="knob warn absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-amber-soft,#fbeed8)] border-2 border-[var(--pm-amber,#b45309)] text-[var(--pm-amber,#b45309)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                4
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Validación humana
                </h3>
                <p className="m-0 text-[13.5px] text-[var(--pm-ink-3,#928b82)]">
                  La fase que más se omite — y la que más incidencias evita. Alguien con conocimiento revisa lo dudoso antes de que entre.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                5
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Publicación en el sistema final
                </h3>
                <p className="m-0 text-[13.5px] text-[var(--pm-ink-3,#928b82)]">
                  Power BI, un maestro consolidado, una carga, un informe.
                </p>
              </div>
            </div>
          </div>

          <Callout variant="accent" className="mt-5">
            Este modelo es más estable que intentar automatizar decisiones que cambian constantemente.
          </Callout>
        </div>
      </section>

      {/* 3 · ¿Quién decide? */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          3 · ¿Quién decide?
        </h2>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <p className="m-0 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
            Un <strong>único responsable funcional</strong> por solicitud. Ante varios stakeholders, siempre:{' '}
            <em>&ldquo;Se requiere un único interlocutor responsable de consolidar requisitos y aprobar cambios.&rdquo;</em> Tienes un correo listo para pedir esto en la sección{' '}
            <button
              type="button"
              data-go="cor"
              onClick={() => onNavigate('cor')}
              className="font-semibold text-[var(--pm-accent,#4f46e5)] border-b border-[var(--pm-accent-line,rgba(79,70,229,0.2))] hover:border-[var(--pm-accent,#4f46e5)] cursor-pointer inline-flex items-center gap-1 transition-colors"
            >
              Correos
            </button>
            .
          </p>
        </div>
      </section>

      {/* Semáforo de priorización */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Semáforo de priorización
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5 shadow-sm">
            <Chip variant="destructive">Rojo</Chip>
            <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Producción parada · error operativo · riesgo financiero o legal
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5 shadow-sm">
            <Chip variant="warning">Naranja</Chip>
            <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Mejora relevante · reduce trabajo manual · evolutivo importante
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5 shadow-sm">
            <Chip variant="success">Verde</Chip>
            <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Idea · optimización · deseable
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
