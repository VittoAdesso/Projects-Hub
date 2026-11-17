import React from 'react';
import { Callout } from '@/shared/ui/callout';

export const ReunionesView: React.FC = () => {
  return (
    <div id="reu" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          04 · El método
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Reuniones, paso a paso
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Las reuniones de análisis son el punto donde se gana o se pierde el proyecto. Si sales con dudas, construirás mal.
        </p>
      </div>

      {/* Las 3 reuniones del análisis */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Las 3 reuniones del análisis
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-6">
          No se hace todo en una sesión. Son tres momentos distintos, cada uno con su objetivo:
        </p>

        <div className="rail relative pl-8 border-l-2 border-[var(--pm-border-2,#ddd4c7)] space-y-8">
          {/* Step 1 */}
          <div className="step relative">
            <div className="knob hl absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-accent,#4f46e5)] text-white border-2 border-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              1
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                Reunión 1 — Observar (el &ldquo;as-is&rdquo;)
              </h3>
              <p className="mb-1 text-[14.5px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
                <strong>Objetivo:</strong> ver cómo trabajan hoy, sin opinar ni proponer todavía.
              </p>
              <p className="mb-2.5 text-sm text-[var(--pm-ink-3,#928b82)]">
                Aún no se graba para documentar — se mira y se pregunta. Salir con una idea clara de qué hace la persona hoy.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[14.5px] text-[var(--pm-ink-2,#5c5650)] mb-4">
                <li>
                  <strong className="text-[var(--pm-ink,#1a1714)]">Que te lo enseñen en vivo:</strong> &ldquo;Hazlo delante de mí como un día normal.&rdquo;
                </li>
                <li>No interrumpir con soluciones — solo observar y anotar dudas.</li>
                <li>Detectar dónde dudan, dónde corrigen a mano, dónde &ldquo;depende&rdquo;.</li>
                <li>Cerrar con: &ldquo;¿Esto es siempre así o hay días distintos?&rdquo;</li>
              </ul>
              <Callout variant="default">
                Si al observar ves que el proceso cambia según el caso o &ldquo;depende del criterio de alguien&rdquo;, ya tienes la primera señal de que es Tipo 2 o 3 — no Tipo 1.
              </Callout>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step relative">
            <div className="knob hl absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-accent,#4f46e5)] text-white border-2 border-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              2
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                Reunión 2 — Analizar y grabar (el &ldquo;how-to&rdquo;)
              </h3>
              <p className="mb-1 text-[14.5px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
                <strong>Objetivo:</strong> capturar el proceso completo como documentación, ya entendiendo lo básico.
              </p>
              <p className="mb-3 text-sm text-[var(--pm-ink-3,#928b82)]">
                Aquí <strong>sí se graba</strong>. Esta es la sesión que se convierte en el manual del proceso.
              </p>
              <p className="mb-1.5 font-semibold text-[14.5px] text-[var(--pm-ink,#1a1714)]">
                Durante la sesión:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)] mb-4">
                <li>Grabar la sesión</li>
                <li>Obtener demostración completa, paso a paso</li>
                <li>Registrar entradas y salidas</li>
                <li>Registrar excepciones</li>
                <li>Registrar validaciones</li>
                <li>Registrar responsables</li>
              </ol>
              <p className="mb-1.5 font-semibold text-[14.5px] text-[var(--pm-ink,#1a1714)]">
                Para que te enseñen lo que necesitas ver (no lo que ellos creen que importa):
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
                <li>&ldquo;Enséñame un caso normal de principio a fin, sin saltarte pasos.&rdquo;</li>
                <li>&ldquo;Ahora enséñame un caso raro — el que más te complica.&rdquo;</li>
                <li>&ldquo;¿Qué archivo abres primero? ¿De dónde sale?&rdquo;</li>
                <li>&ldquo;Cuando algo no cuadra, ¿qué haces exactamente?&rdquo;</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step relative">
            <div className="knob hl absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-accent,#4f46e5)] text-white border-2 border-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              3
            </div>
            <div className="body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                Reunión 3 y siguientes — Validar la propuesta
              </h3>
              <p className="mb-1 text-[14.5px] leading-relaxed text-[var(--pm-ink,#1a1714)]">
                <strong>Objetivo:</strong> confirmar que lo que vas a construir encaja, antes de desarrollar.
              </p>
              <p className="mb-3 text-sm text-[var(--pm-ink-3,#928b82)]">
                Llegas con propuesta, no con preguntas abiertas. El responsable funcional aprueba o ajusta.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
                <li>Presentar el flujo propuesto (incluida la validación humana si aplica).</li>
                <li>Confirmar las excepciones: &ldquo;¿Estos son todos los casos raros o falta alguno?&rdquo;</li>
                <li>Acordar quién valida qué, y con qué cadencia.</li>
                <li>Cerrar el alcance: lo que entra y, sobre todo, lo que NO entra en esta versión.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Las 10 preguntas obligatorias */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Las 10 preguntas obligatorias
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Se cubren entre la reunión 1 y la 2. Si al final del análisis alguna sigue sin respuesta, no se estima todavía.
        </p>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <ol className="list-decimal pl-5 space-y-1.5 text-[14.5px] text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
            <li>¿Qué problema resuelve?</li>
            <li>¿Quién utiliza el proceso?</li>
            <li>¿Qué datos entran?</li>
            <li>¿Qué datos salen?</li>
            <li>¿Qué ocurre si falla?</li>
            <li>¿Cuántas veces se ejecuta?</li>
            <li>¿Qué impacto económico tiene?</li>
            <li>¿Qué sistemas intervienen?</li>
            <li>¿Qué excepciones existen?</li>
            <li>¿Qué cambios se esperan en el futuro?</li>
          </ol>
        </div>
      </section>

      {/* Tips para llevar cualquier reunión */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Tips para llevar cualquier reunión
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-2">
              Antes
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[14px] text-[var(--pm-ink-2,#5c5650)]">
              <li>Un objetivo por reunión, escrito en la invitación.</li>
              <li>Si no hay decisión ni demo que ver, es un correo.</li>
              <li>Tiempo límite fijado de antemano.</li>
            </ul>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-2">
              Durante
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[14px] text-[var(--pm-ink-2,#5c5650)]">
              <li>Tú llevas la voz y el ritmo.</li>
              <li>Anota decisiones en el momento, no &ldquo;luego&rdquo;.</li>
              <li>No se acepta &ldquo;ya lo vemos sobre la marcha&rdquo;.</li>
            </ul>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-2">
              Al cerrar
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[14px] text-[var(--pm-ink-2,#5c5650)]">
              <li>Resume en voz alta: qué se decidió y quién hace qué.</li>
              <li>Confirma el único responsable funcional.</li>
              <li>Define la siguiente acción concreta.</li>
            </ul>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
            <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-2">
              Seguimiento
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[14px] text-[var(--pm-ink-2,#5c5650)]">
              <li>Máx. 20 min: avance, bloqueos, próximos pasos.</li>
              <li>Sin bloqueo ni decisión → estado escrito.</li>
              <li>Check-in de hipercare = la cadencia de Fase 8.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
