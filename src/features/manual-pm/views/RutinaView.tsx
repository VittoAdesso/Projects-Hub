import React from 'react';
import { Callout } from '@/shared/ui/callout';

export const RutinaView: React.FC = () => {
  return (
    <div id="rut" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          01 · Tú
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Mi rutina
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Esto es lo que de verdad evita el colapso: no improvisar cada día cómo vas a gestionar el ruido.
        </p>
      </div>

      {/* Rutina semanal */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Rutina semanal
        </h2>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <div className="divide-y divide-[var(--pm-border,#e9e2d8)]">
            <div className="day flex flex-col sm:flex-row gap-1 sm:gap-5 py-3.5 first:pt-0">
              <span className="when font-mono text-xs font-bold text-[var(--pm-accent,#4f46e5)] min-w-[130px] shrink-0">
                Lunes · 30 min
              </span>
              <span className="what text-[14.5px] text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
                <strong className="text-[var(--pm-ink,#1a1714)] font-semibold">Triaje de backlog.</strong> Repasas solo lo que entró la semana anterior. Asignas semáforo (Fase 1). Nada se analiza todavía, solo se clasifica.
              </span>
            </div>

            <div className="day flex flex-col sm:flex-row gap-1 sm:gap-5 py-3.5">
              <span className="when font-mono text-xs font-bold text-[var(--pm-accent,#4f46e5)] min-w-[130px] shrink-0">
                Resto semana
              </span>
              <span className="what text-[14.5px] text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
                <strong className="text-[var(--pm-ink,#1a1714)] font-semibold">Bloques protegidos.</strong> El tiempo de desarrollo/análisis va solo a los proyectos con hueco (máx. 2). No se abren reuniones de análisis nuevas aunque insistan.
              </span>
            </div>

            <div className="day flex flex-col sm:flex-row gap-1 sm:gap-5 py-3.5 last:pb-0">
              <span className="when font-mono text-xs font-bold text-[var(--pm-accent,#4f46e5)] min-w-[130px] shrink-0">
                Viernes · 15 min
              </span>
              <span className="what text-[14.5px] text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
                <strong className="text-[var(--pm-ink,#1a1714)] font-semibold">Estado + hipercare.</strong> Repasas qué procesos están en vigilancia post-producción según les toque (día 1 / 48h / semanal) y mandas un estado corto para no recibir interrupciones entre semana.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Regla diaria — 2 minutos */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Regla diaria — 2 minutos
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Lo primero cada mañana: clasificar lo que ha entrado por color. El color decide qué haces, no la urgencia con que te lo pidan.
        </p>

        <div className="lights grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="light r p-4 rounded-[var(--radius-xl,16px)] border-[1.5px] border-[var(--pm-red,#b91c1c)] bg-[var(--pm-red-soft,#fae3e3)]">
            <h4 className="font-serif font-bold text-[15px] text-[var(--pm-red-ink,#991b1b)] mb-1.5">
              🔴 Rojo
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Producción parada, riesgo legal o financiero.{' '}
              <strong className="text-[var(--pm-ink,#1a1714)]">Para lo que estés haciendo</strong> y aplica la plantilla de calma (Incidencias).
            </p>
          </div>

          <div className="light a p-4 rounded-[var(--radius-xl,16px)] border-[1.5px] border-[var(--pm-amber,#b45309)] bg-[var(--pm-amber-soft,#fbeed8)]">
            <h4 className="font-serif font-bold text-[15px] text-[var(--pm-amber-ink,#92400e)] mb-1.5">
              🟠 Naranja
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Mejora relevante o evolutivo importante.{' '}
              <strong className="text-[var(--pm-ink,#1a1714)]">A backlog con prioridad media</strong>. Entra en cola cuando se libere uno de tus 2 huecos. No lo tocas hoy.
            </p>
          </div>

          <div className="light g p-4 rounded-[var(--radius-xl,16px)] border-[1.5px] border-[var(--pm-green,#15803d)] bg-[var(--pm-green-soft,#e3f3e8)]">
            <h4 className="font-serif font-bold text-[15px] text-[var(--pm-green-ink,#166534)] mb-1.5">
              🟢 Verde
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Idea, optimización deseable.{' '}
              <strong className="text-[var(--pm-ink,#1a1714)]">A backlog, sin fecha.</strong> Se revisa en el triaje del lunes. Cero culpa por no atenderlo ya.
            </p>
          </div>
        </div>

        <Callout variant="accent" className="mt-4">
          Si nada es rojo, no se evalúa nada fuera del triaje semanal. Esa es la regla que te libera la cabeza.
        </Callout>
      </section>

      {/* Script anti-presión */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Script anti-presión
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Cuando te presionan, no improvises respuesta nueva — eso es lo que desgasta. Tienes cuatro frases fijas según la situación.
        </p>

        <div className="space-y-3">
          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
            <p className="mb-1 font-semibold text-[14.5px] text-[var(--pm-ink,#1a1714)]">
              &ldquo;Esto es rápido, ¿lo miras ya?&rdquo;
            </p>
            <p className="m-0 italic text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              &ldquo;Se registrará la solicitud, se analizará funcional y técnicamente, se evaluarán dependencias, riesgos y capacidad disponible, y posteriormente se propondrá una planificación.&rdquo;
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
            <p className="mb-1 font-semibold text-[14.5px] text-[var(--pm-ink,#1a1714)]">
              &ldquo;¿Para cuándo lo tienes?&rdquo;
            </p>
            <p className="m-0 italic text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              &ldquo;Aún no puedo dar fecha: hasta no analizarlo no sé el esfuerzo real. En cuanto entre en cola y lo evalúe, te doy una planificación con plazos.&rdquo;
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
            <p className="mb-1 font-semibold text-[14.5px] text-[var(--pm-ink,#1a1714)]">
              Insisten por tercera vez con lo mismo
            </p>
            <p className="m-0 italic text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              &ldquo;Lo tengo registrado y priorizado. Ahora mismo tengo 2 proyectos activos; en cuanto se libere capacidad, este entra. Te aviso en cuanto pueda arrancarlo.&rdquo;
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-5 shadow-sm">
            <p className="mb-1 font-semibold text-[14.5px] text-[var(--pm-ink,#1a1714)]">
              &ldquo;Es que esto es urgente / crítico&rdquo;
            </p>
            <p className="m-0 italic text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
              &ldquo;Entendido. Para tratarlo como crítico necesito confirmar el impacto: ¿hay producción parada o riesgo legal/financiero? Si es así, lo subo a prioridad máxima ahora. Si no, lo dejo priorizado en cola.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-14 pt-7 border-t border-[var(--pm-border,#e9e2d8)] text-center">
        <div className="sig font-serif text-sm font-semibold text-[var(--pm-ink-2,#5c5650)]">
          Primero integra · <strong className="text-[var(--pm-accent,#4f46e5)] font-semibold">Luego evoluciona</strong>
        </div>
      </footer>
    </div>
  );
};
