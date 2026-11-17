import React from 'react';
import type { SectionId } from '../types';
import { KitDesplegable } from '../components/KitDesplegable';
import { FlowDiagram } from '../components/FlowDiagram';
import { Chip } from '@/shared/ui/chip';

export interface InicioViewProps {
  onNavigate: (sectionId: SectionId) => void;
  isKitOpen?: boolean;
  onToggleKit?: () => void;
}

export const InicioView: React.FC<InicioViewProps> = ({
  onNavigate,
  isKitOpen,
  onToggleKit,
}) => {
  return (
    <div id="inicio" className="sec on space-y-12">
      {/* Hero */}
      <div className="hero pt-2 pb-6">
        <span className="hero-badge font-mono text-xs uppercase tracking-wider font-semibold text-[var(--pm-accent,#4f46e5)] bg-[var(--pm-accent-soft,#ede9ff)] px-3 py-1 rounded-full inline-block mb-3">
          Manual operativo del gestor de proyectos
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-4">
          Primero integra, luego evoluciona.
        </h1>
        <p className="lede text-lg sm:text-xl text-[var(--pm-ink-2,#5c5650)] leading-relaxed max-w-3xl">
          No se optimiza lo que no se comprende. No se automatiza lo que antes no es estable. Este manual es el sistema de trabajo para gestionar proyectos, responder a la presión y mantener el control del día a día.
        </p>
      </div>

      {/* Kit de emergencia */}
      <KitDesplegable
        onNavigate={onNavigate}
        isOpen={isKitOpen}
        onToggle={onToggleKit}
      />

      {/* Por dónde empiezo */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          ¿Por dónde empiezo?
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Elige tu situación de ahora mismo para saltar directo a lo que necesitas:
        </p>
        <div className="router grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            type="button"
            data-go="proc"
            onClick={() => onNavigate('proc')}
            className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 text-left cursor-pointer flex gap-3 items-start transition-all hover:border-[var(--pm-accent,#4f46e5)] hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="emoji text-2xl leading-none shrink-0" aria-hidden="true">
              📥
            </span>
            <span>
              <span className="rt block font-serif font-semibold text-[15px] text-[var(--pm-ink,#1a1714)] mb-1">
                Llega una solicitud nueva
              </span>
              <span className="rd block text-[13px] text-[var(--pm-ink-2,#5c5650)] leading-snug">
                Va a backlog. Fase 0 — no se agenda nada todavía.
              </span>
            </span>
          </button>

          <button
            type="button"
            data-go="inc"
            onClick={() => onNavigate('inc')}
            className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 text-left cursor-pointer flex gap-3 items-start transition-all hover:border-[var(--pm-accent,#4f46e5)] hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="emoji text-2xl leading-none shrink-0" aria-hidden="true">
              🔴
            </span>
            <span>
              <span className="rt block font-serif font-semibold text-[15px] text-[var(--pm-ink,#1a1714)] mb-1">
                Algo se ha roto en producción
              </span>
              <span className="rd block text-[13px] text-[var(--pm-ink-2,#5c5650)] leading-snug">
                Plantilla de calma — primeros 15 minutos.
              </span>
            </span>
          </button>

          <button
            type="button"
            data-go="inc"
            onClick={() => onNavigate('inc')}
            className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 text-left cursor-pointer flex gap-3 items-start transition-all hover:border-[var(--pm-accent,#4f46e5)] hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="emoji text-2xl leading-none shrink-0" aria-hidden="true">
              🚶
            </span>
            <span>
              <span className="rt block font-serif font-semibold text-[15px] text-[var(--pm-ink,#1a1714)] mb-1">
                Me lo piden por pasillo o correo
              </span>
              <span className="rd block text-[13px] text-[var(--pm-ink-2,#5c5650)] leading-snug">
                Protocolo de petición informal.
              </span>
            </span>
          </button>

          <button
            type="button"
            data-go="reu"
            onClick={() => onNavigate('reu')}
            className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 text-left cursor-pointer flex gap-3 items-start transition-all hover:border-[var(--pm-accent,#4f46e5)] hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="emoji text-2xl leading-none shrink-0" aria-hidden="true">
              🎥
            </span>
            <span>
              <span className="rt block font-serif font-semibold text-[15px] text-[var(--pm-ink,#1a1714)] mb-1">
                Tengo el form lleno, toca reunión
              </span>
              <span className="rd block text-[13px] text-[var(--pm-ink-2,#5c5650)] leading-snug">
                Qué hacer en la 1ª, 2ª y siguientes.
              </span>
            </span>
          </button>

          <button
            type="button"
            data-go="cor"
            onClick={() => onNavigate('cor')}
            className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 text-left cursor-pointer flex gap-3 items-start transition-all hover:border-[var(--pm-accent,#4f46e5)] hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="emoji text-2xl leading-none shrink-0" aria-hidden="true">
              ✉️
            </span>
            <span>
              <span className="rt block font-serif font-semibold text-[15px] text-[var(--pm-ink,#1a1714)] mb-1">
                Toca un reporte o correo
              </span>
              <span className="rd block text-[13px] text-[var(--pm-ink-2,#5c5650)] leading-snug">
                8 plantillas listas para editar y copiar.
              </span>
            </span>
          </button>

          <button
            type="button"
            data-go="rut"
            onClick={() => onNavigate('rut')}
            className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 text-left cursor-pointer flex gap-3 items-start transition-all hover:border-[var(--pm-accent,#4f46e5)] hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="emoji text-2xl leading-none shrink-0" aria-hidden="true">
              🧠
            </span>
            <span>
              <span className="rt block font-serif font-semibold text-[15px] text-[var(--pm-ink,#1a1714)] mb-1">
                Necesito organizar mi semana
              </span>
              <span className="rd block text-[13px] text-[var(--pm-ink-2,#5c5650)] leading-snug">
                Rutina semanal y regla diaria de 2 min.
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* El recorrido completo */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          El recorrido completo
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Toda solicitud sigue este camino. Nunca se salta un paso hacia delante por presión. La idea de fondo:{' '}
          <strong>se diseña y documenta antes de construir nada</strong>.
        </p>

        <FlowDiagram />

        <details className="mt-4 bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5">
          <summary className="font-semibold cursor-pointer text-[var(--pm-ink,#1a1714)] hover:text-[var(--pm-accent,#4f46e5)] transition-colors select-none">
            Ver detalle de cada fase (quién hace qué)
          </summary>
          <div className="tw overflow-x-auto mt-3 rounded-[var(--radius-md,10px)] border border-[var(--pm-border,#e9e2d8)]">
            <table className="w-full border-collapse text-sm bg-[var(--pm-surface,#ffffff)] text-left">
              <thead>
                <tr className="bg-[var(--pm-bg-2,#f3efe9)] border-b border-[var(--pm-border,#e9e2d8)]">
                  <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                    Fase
                  </th>
                  <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                    Qué pasa
                  </th>
                  <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                    Quién
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--pm-border,#e9e2d8)]">
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>0 · Recepción</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Se registra en backlog. Nada más.</td>
                  <td className="py-2.5 px-3.5 font-medium">PM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>1 · Priorización</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Se asigna semáforo 🔴🟠🟢</td>
                  <td className="py-2.5 px-3.5 font-medium">PM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>2 · Análisis</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Solo si hay capacidad. Reunión con responsable único.</td>
                  <td className="py-2.5 px-3.5 font-medium">PM + funcional</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>3 · Evaluación</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Se clasifica Tipo 1 / 2 / 3</td>
                  <td className="py-2.5 px-3.5 font-medium">PM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>4 · Estimación</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Nunca antes del análisis.</td>
                  <td className="py-2.5 px-3.5 font-medium">PM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>5-6 · Desarrollo + testing</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Código documentado, 5 pruebas mínimas.</td>
                  <td className="py-2.5 px-3.5 font-medium">Equipo</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>7 · Producción</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Checklist + plan de reversión.</td>
                  <td className="py-2.5 px-3.5 font-medium">PM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>8 · Hipercare</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Vigilancia intensiva las primeras 4 semanas.</td>
                  <td className="py-2.5 px-3.5 font-medium">PM</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3.5">
                    <strong>9 · Mantenimiento</strong>
                  </td>
                  <td className="py-2.5 px-3.5">Corrección, adaptación o evolutivo a lo largo del tiempo.</td>
                  <td className="py-2.5 px-3.5 font-medium">Equipo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </section>

      {/* Las dos reglas de oro */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Las dos reglas de oro
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          No son las únicas normas (el sistema son las 9 fases), pero sí las dos que más carga te quitan si las respetas siempre.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
            <Chip variant="accent">Regla Nº1</Chip>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
              No se aceptan fechas en la solicitud inicial. Primera respuesta, siempre:{' '}
              <em>
                &ldquo;Se registrará la solicitud, se analizará funcional y técnicamente, se evaluarán dependencias, riesgos y capacidad disponible, y posteriormente se propondrá una planificación.&rdquo;
              </em>
            </p>
          </div>
          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
            <Chip variant="accent">Regla Nº2 · Capacidad</Chip>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
              Máximo <strong>2 proyectos activos por recurso</strong> — esto te incluye a ti. El resto, en backlog. Backlog no es abandono: es capacidad pendiente de asignar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
