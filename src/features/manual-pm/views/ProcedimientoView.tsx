import React from 'react';
import type { SectionId } from '../types';
import { Chip } from '@/shared/ui/chip';
import { Callout } from '@/shared/ui/callout';

export interface ProcedimientoViewProps {
  onNavigate: (sectionId: SectionId) => void;
}

export const ProcedimientoView: React.FC<ProcedimientoViewProps> = ({ onNavigate }) => {
  return (
    <div id="proc" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          02 · Flujo
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Procedimiento operativo
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Las 9 fases obligatorias para cualquier solicitud. Sin atajos, sin excepciones.
        </p>
      </div>

      {/* Las 9 fases obligatorias */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-6">
          Las 9 fases obligatorias
        </h2>

        <div className="rail relative pl-8 border-l-2 border-[var(--pm-border-2,#ddd4c7)] space-y-8">
          {/* Step 0 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              0
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Recepción
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] m-0">
                Formulario o correo estructurado. Sin form, no existe. No se agenda reunión, no se analiza, no se estima.
              </p>
              <div className="mt-2 text-xs font-mono text-[var(--pm-ink-3,#928b82)]">
                Objetivo: registrar en backlog, nada más.
              </div>
            </div>
          </div>

          {/* Step 1 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              1
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Priorización preliminar
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] m-0">
                Asignación de semáforo según impacto y alineación con objetivos. Decide el orden en backlog — no cuándo empieza.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              2
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Análisis funcional
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] mb-3">
                Solo cuando hay capacidad. Sesión de observación directa (&ldquo;enséñame cómo lo haces hoy&rdquo;). Se graba. 10 preguntas obligatorias.
              </p>
              <button
                type="button"
                data-go="reu"
                onClick={() => onNavigate('reu')}
                className="text-left font-sans text-sm font-semibold text-[var(--pm-accent,#4f46e5)] border-b border-[var(--pm-accent-line,rgba(79,70,229,0.2))] hover:border-[var(--pm-accent,#4f46e5)] cursor-pointer inline-flex items-center gap-1 transition-colors"
              >
                Ver cómo llevar esta reunión paso a paso →
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              3
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Evaluación de arquitectura (Tipo 1 / 2 / 3)
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] mb-3">
                Clasificar antes de diseñar. Si es Tipo 2 o 3, planificar validación humana en el flujo. No forzar el 100% automático.
              </p>
              <button
                type="button"
                data-go="dec"
                onClick={() => onNavigate('dec')}
                className="text-left font-sans text-sm font-semibold text-[var(--pm-accent,#4f46e5)] border-b border-[var(--pm-accent-line,rgba(79,70,229,0.2))] hover:border-[var(--pm-accent,#4f46e5)] cursor-pointer inline-flex items-center gap-1 transition-colors"
              >
                Principio 80/20 y arquitectura recomendada →
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              4
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Estimación
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] m-0">
                Solo después del análisis. Nunca antes. Incluye desarrollo, testing, documentación, paso a producción y soporte inicial.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-amber,#b45309)] text-[var(--pm-amber,#b45309)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              5
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Desarrollo
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
                <li>Código documentado</li>
                <li>Variables descriptivas</li>
                <li>Gestión de errores</li>
                <li>Logs</li>
                <li>Control de versiones</li>
                <li>Documentación funcional y técnica</li>
              </ul>
              <Callout variant="accent" className="mt-3">
                Ningún desarrollo puede depender exclusivamente de una persona.
              </Callout>
            </div>
          </div>

          {/* Step 6 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-amber,#b45309)] text-[var(--pm-amber,#b45309)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              6
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Testing — 5 pruebas mínimas
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
                <li>Caso estándar</li>
                <li>Caso con errores</li>
                <li>Caso extremo</li>
                <li>Validación con usuario</li>
                <li>Validación de salida final</li>
              </ol>
            </div>
          </div>

          {/* Step 7 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-amber,#b45309)] text-[var(--pm-amber,#b45309)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              7
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Producción
              </h3>
              <ul className="space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
                <li className="flex items-center gap-2">✓ Aprobación funcional</li>
                <li className="flex items-center gap-2">✓ Evidencias de pruebas</li>
                <li className="flex items-center gap-2">✓ Plan de reversión</li>
                <li className="flex items-center gap-2">✓ Monitorización inicial</li>
              </ul>
            </div>
          </div>

          {/* Step 8 */}
          <div className="step relative">
            <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-amber,#b45309)] text-[var(--pm-amber,#b45309)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              8
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2 inline-flex items-center gap-2">
                Hipercare
                <span
                  className="font-sans text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--pm-bg-2,#f3efe9)] text-[var(--pm-ink-2,#5c5650)] border border-[var(--pm-border,#e9e2d8)]"
                  title="Hipercare (de 'hyper care', cuidado intensivo): periodo corto justo tras poner algo en producción en el que se vigila de cerca para cazar fallos antes de que se vuelvan crónicos."
                >
                  ¿qué es?
                </span>
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] mb-3">
                <strong>Es el periodo de vigilancia intensiva justo después de poner algo en producción.</strong> Las primeras semanas son las que más fallos esconden, así que se monitoriza de cerca y se va soltando.
              </p>
              <div className="tw overflow-x-auto rounded-[var(--radius-md,10px)] border border-[var(--pm-border,#e9e2d8)]">
                <table className="w-full border-collapse text-sm bg-[var(--pm-surface,#ffffff)] text-left">
                  <thead>
                    <tr className="bg-[var(--pm-bg-2,#f3efe9)] border-b border-[var(--pm-border,#e9e2d8)]">
                      <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                        Semana
                      </th>
                      <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                        Cadencia
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--pm-border,#e9e2d8)]">
                    <tr>
                      <td className="py-2 px-3.5 font-bold">1</td>
                      <td className="py-2 px-3.5">Monitorización diaria</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 font-bold">2</td>
                      <td className="py-2 px-3.5">Cada 48 horas</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 font-bold">3</td>
                      <td className="py-2 px-3.5">Revisión semanal</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 font-bold">4</td>
                      <td className="py-2 px-3.5">Cierre operativo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Step 9 */}
          <div className="step relative">
            <div className="knob hl absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-accent,#4f46e5)] text-white border-2 border-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              9
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-2">
                Mantenimiento
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] mb-3">
                Pasado el hipercare, el proceso entra en vida normal. Aquí es donde viven los procesos que llevan meses o años funcionando.
              </p>
              <div className="pull my-3.5 p-4 bg-[var(--pm-bg-2,#f3efe9)] border-l-4 border-[var(--pm-accent,#4f46e5)] rounded-r-[var(--radius-md,10px)] font-serif text-lg font-semibold text-[var(--pm-ink,#1a1714)]">
                Producción no significa terminado. Producción significa mantenible.
              </div>
              <p className="text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)] mb-3">
                <strong>Cuando un proceso veterano necesita algo, no es &ldquo;que se rompió la automatización&rdquo; — es una de estas tres cosas, y cada una se trata distinto:</strong>
              </p>
              <div className="tw overflow-x-auto rounded-[var(--radius-md,10px)] border border-[var(--pm-border,#e9e2d8)]">
                <table className="w-full border-collapse text-sm bg-[var(--pm-surface,#ffffff)] text-left">
                  <thead>
                    <tr className="bg-[var(--pm-bg-2,#f3efe9)] border-b border-[var(--pm-border,#e9e2d8)]">
                      <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                        Tipo de intervención
                      </th>
                      <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                        Qué pasó
                      </th>
                      <th className="py-2.5 px-3.5 font-mono text-[11.5px] uppercase tracking-wider text-[var(--pm-ink-3,#928b82)] font-semibold">
                        Cómo entra
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--pm-border,#e9e2d8)]">
                    <tr>
                      <td className="py-2.5 px-3.5">
                        <Chip variant="destructive">Corrección</Chip>
                      </td>
                      <td className="py-2.5 px-3.5">
                        Algo que funcionaba ha dejado de funcionar (cambió un formato, una ruta, una credencial caducó).
                      </td>
                      <td className="py-2.5 px-3.5">
                        Si para producción → 🔴 incidencia. Si no → backlog con prioridad alta.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5">
                        <Chip variant="warning">Adaptación</Chip>
                      </td>
                      <td className="py-2.5 px-3.5">
                        El entorno cambió: nueva versión de SAP, nueva norma legal, una columna nueva en el origen. El proceso sigue, pero hay que ajustarlo.
                      </td>
                      <td className="py-2.5 px-3.5">
                        Backlog, prioridad media. Se trata como mini-proyecto con su análisis.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3.5">
                        <Chip variant="success">Evolutivo</Chip>
                      </td>
                      <td className="py-2.5 px-3.5">
                        Funciona bien, pero piden ampliarlo: más casuísticas, un paso nuevo, más volumen.
                      </td>
                      <td className="py-2.5 px-3.5">
                        Backlog como solicitud nueva. Pasa por el flujo completo (Fase 0→9).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Callout variant="tip" className="mt-3.5">
                Regla práctica: si un proceso lleva ya 3-4 meses en producción y sigue necesitando retoques constantes, no es mantenimiento normal — es señal de que ha cruzado a Tipo 2 o 3 y toca plantear una{' '}
                <button
                  type="button"
                  data-go="est"
                  onClick={() => onNavigate('est')}
                  className="font-semibold text-[var(--pm-accent,#4f46e5)] underline underline-offset-2 hover:opacity-80 cursor-pointer"
                >
                  estabilización
                </button>
                , no parchear otra vez.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      {/* Gestión de capacidad */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-3">
          Gestión de capacidad
        </h2>
        <div className="card bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent-line,rgba(79,70,229,0.2))] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <p className="m-0 text-[15px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
            <strong>Máximo 2 proyectos activos simultáneos por recurso</strong> — &ldquo;recurso&rdquo; es cada persona del equipo, tú incluido. El resto, en backlog. Si hay incidencias críticas, deuda técnica o mantenimiento, tienen prioridad sobre nuevos desarrollos.
          </p>
        </div>
      </section>

      <div className="pull p-6 bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] font-serif text-xl sm:text-2xl font-semibold text-[var(--pm-ink,#1a1714)] text-center leading-snug shadow-sm">
        La velocidad sin control genera deuda técnica. La deuda técnica genera incidencias. Las incidencias consumen capacidad futura.
      </div>
    </div>
  );
};
