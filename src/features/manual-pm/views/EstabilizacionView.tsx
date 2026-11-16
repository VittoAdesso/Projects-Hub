import React from 'react';
import { AreaTabs } from '../components/AreaTabs';
import { Chip } from '@/shared/ui/chip';

export const EstabilizacionView: React.FC = () => {
  return (
    <div id="est" className="sec on space-y-12">
      {/* Head */}
      <div className="head pt-2 pb-6 border-b border-[var(--pm-border,#e9e2d8)]">
        <div className="eyebrow font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--pm-accent,#4f46e5)] mb-2">
          07 · Evolución
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--pm-ink,#1a1714)] mb-3">
          Plan de estabilización
        </h1>
        <p className="lead text-lg text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
          Plantilla genérica para cuando un proceso ha crecido más allá de su diseño original. Aplicable a cualquier departamento.
        </p>
      </div>

      {/* Causas habituales */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Causas habituales (revisar las 4)
        </h2>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <ol className="list-decimal pl-5 space-y-2 text-[14.5px] text-[var(--pm-ink-2,#5c5650)] leading-relaxed">
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Cambios en los datos de origen.</strong> Las fuentes no siempre mantienen la misma estructura ni comportamiento.
            </li>
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Casuísticas no automatizables.</strong> Altas/bajas pendientes, históricos, datos inconsistentes, información fuera de plazo — requieren interpretación.
            </li>
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Dependencia de conocimiento experto.</strong> Confirmaciones que residen solo en la cabeza del equipo funcional, no en las fuentes.
            </li>
            <li>
              <strong className="text-[var(--pm-ink,#1a1714)]">Crecimiento progresivo.</strong> Cada nueva excepción añadió reglas; la complejidad creció más rápido que el diseño original.
            </li>
          </ol>
        </div>
        <div className="pull my-4 p-5 bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] font-serif text-lg font-semibold text-[var(--pm-ink,#1a1714)] text-center leading-relaxed shadow-sm">
          No es recomendable automatizar el 100% del flujo sin introducir riesgos significativos sobre la calidad de la información.
        </div>
      </section>

      {/* Propuesta operativa (6 fases) */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Propuesta operativa (6 fases)
        </h2>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <div className="rail relative pl-8 border-l-2 border-[var(--pm-border-2,#ddd4c7)] space-y-6">
            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                1
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Generación del máster
                </h3>
                <p className="m-0 text-sm text-[var(--pm-ink-2,#5c5650)]">
                  Fichero consolidado, formato estable, columnas no modificables sin validación previa.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                2
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Entrega de histórico
                </h3>
                <p className="m-0 text-sm text-[var(--pm-ink-2,#5c5650)]">
                  Punto de partida para futuras actualizaciones.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                3
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Actualización operativa
                </h3>
                <p className="m-0 text-sm text-[var(--pm-ink-2,#5c5650)]">
                  Cadencia regular de archivos de salida desde las fuentes.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob warn absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-amber-soft,#fbeed8)] border-2 border-[var(--pm-amber,#b45309)] text-[var(--pm-amber,#b45309)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                4
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Validación funcional
                </h3>
                <p className="m-0 text-sm text-[var(--pm-ink-2,#5c5650)]">
                  Altas, bajas, incidencias, inconsistencias — revisadas por alguien con conocimiento funcional.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                5
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Actualización del máster
                </h3>
                <p className="m-0 text-sm text-[var(--pm-ink-2,#5c5650)]">
                  Se convierte en la única fuente de verdad.
                </p>
              </div>
            </div>

            <div className="step relative">
              <div className="knob absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-[var(--pm-surface,#ffffff)] border-2 border-[var(--pm-accent,#4f46e5)] text-[var(--pm-accent,#4f46e5)] flex items-center justify-center font-mono font-bold text-xs shadow-xs">
                6
              </div>
              <div className="body">
                <h3 className="font-serif text-base font-bold text-[var(--pm-ink,#1a1714)] mb-1">
                  Consumo final
                </h3>
                <p className="m-0 text-sm text-[var(--pm-ink-2,#5c5650)]">
                  El sistema final (dashboard, carga, informe) consume exclusivamente el máster validado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plantillas por área */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Plantillas por área
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          El mismo patrón aterrizado en cuatro contextos distintos, como punto de partida para rellenar. Cambia la pestaña para ver cada uno.
        </p>

        <AreaTabs />
      </section>

      {/* Roadmap */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Roadmap
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5 shadow-sm">
            <Chip variant="destructive">Corto plazo</Chip>
            <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Recuperar la operativa: máster, histórico, estabilización, responsables.
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5 shadow-sm">
            <Chip variant="warning">Medio plazo</Chip>
            <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Mejorar calidad: validaciones recurrentes, excepciones repetitivas.
            </p>
          </div>

          <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5 shadow-sm">
            <Chip variant="success">Largo plazo</Chip>
            <p className="mt-2.5 mb-0 text-sm leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              Más automatización: formalizar reglas, documentar excepciones, evaluar IA de apoyo.
            </p>
          </div>
        </div>
      </section>

      {/* Riesgos de no implementarlo */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-4">
          Riesgos de no implementarlo
        </h2>
        <div className="card bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm">
          <ul className="list-disc pl-5 space-y-1 text-[14.5px] text-[var(--pm-ink-2,#5c5650)]">
            <li>Aumentan las incidencias</li>
            <li>Aumentan los falsos positivos</li>
            <li>Aumentan los errores de negocio</li>
            <li>Disminuye la confianza en los datos</li>
            <li>Correcciones posteriores con mayor coste</li>
          </ul>
        </div>
      </section>

      {/* Ejemplos aplicados reales */}
      <section className="blk">
        <h2 className="font-serif text-2xl font-bold text-[var(--pm-ink,#1a1714)] mb-1">
          Ejemplos aplicados reales
        </h2>
        <p className="sub text-[15px] text-[var(--pm-ink-2,#5c5650)] mb-4">
          Tres casos donde se aplicó este plan, con su flujo real y la frase que se usó ante dirección. Despliega cada uno.
        </p>

        <div className="space-y-3">
          <details className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5">
            <summary className="font-semibold cursor-pointer text-[var(--pm-ink,#1a1714)] hover:text-[var(--pm-accent,#4f46e5)] transition-colors select-none">
              1 · RRHH — dashboard de bajas IT{' '}
              <span className="font-sans text-[13px] font-medium text-[var(--pm-ink-3,#928b82)]">
                (caso real)
              </span>
            </summary>
            <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              <p>
                El proceso de datos de RRHH para el dashboard de bajas IT no era una consolidación lineal: incorporaba validación funcional, análisis y decisiones que dependían del conocimiento operativo del área. Flujo real:{' '}
                <span className="font-mono text-[13px] text-[var(--pm-ink,#1a1714)]">
                  Origen → Validación → Contraste → Corrección → Decisión → Resultado
                </span>
                .
              </p>
              <p>
                Casuísticas detectadas: altas pendientes de sincronización, bajas comunicadas con retraso, movimientos históricos, datos inconsistentes entre sistemas, información fuera de plazo. DSI pasó a generar y mantener el fichero maestro como única fuente de verdad, con validación funcional semanal antes de cada actualización.
              </p>
              <p>
                Frase resumen usada con dirección:{' '}
                <em>
                  &ldquo;No hemos descubierto un fallo técnico. Hemos descubierto que una parte del proceso que se consideraba automatizable corresponde a validación funcional y gobierno del dato que requiere intervención humana antes de publicar.&rdquo;
                </em>
              </p>
            </div>
          </details>

          <details className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5">
            <summary className="font-semibold cursor-pointer text-[var(--pm-ink,#1a1714)] hover:text-[var(--pm-accent,#4f46e5)] transition-colors select-none">
              2 · Financiero — conciliación de facturas
            </summary>
            <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              <p>
                Un proceso que cruzaba un export de SAP con un Excel de control para conciliar facturas se diseñó como flujo automático directo. Con el tiempo empezó a generar diferencias que nadie filtraba antes de cerrar. Flujo real necesario:{' '}
                <span className="font-mono text-[13px] text-[var(--pm-ink,#1a1714)]">
                  Export SAP + Excel → Cruce automático → Detección de diferencias → Validación contable → Cierre
                </span>
                .
              </p>
              <p>
                Casuísticas que requerían criterio: diferencias por redondeo o cambio de divisa, facturas duplicadas con ligeras variaciones, apuntes registrados fuera de periodo. La automatización marcaba como &ldquo;error&rdquo; cosas que eran correctas, y daba por buenas otras que no lo eran.
              </p>
              <p>
                Frase resumen usada con dirección:{' '}
                <em>
                  &ldquo;El cruce automático funciona; lo que faltaba es un paso de validación contable que decida, ante cada diferencia, si es un error real o una variación legítima antes de cerrar la conciliación.&rdquo;
                </em>
              </p>
            </div>
          </details>

          <details className="bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 sm:p-5">
            <summary className="font-semibold cursor-pointer text-[var(--pm-ink,#1a1714)] hover:text-[var(--pm-accent,#4f46e5)] transition-colors select-none">
              3 · Operaciones — consolidación de incidencias de producción
            </summary>
            <div className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-[var(--pm-ink-2,#5c5650)]">
              <p>
                Un proceso que recogía incidencias de producción desde correos, Excel y un sistema de gestión para consolidarlas y clasificarlas se intentó automatizar al 100%. La clasificación automática fallaba porque dependía de entender la causa, no solo de leer el texto. Flujo real necesario:{' '}
                <span className="font-mono text-[13px] text-[var(--pm-ink,#1a1714)]">
                  Correos + Excel + sistema → Consolidación → Detección de casos ambiguos → Clasificación humana → Publicación del estado
                </span>
                .
              </p>
              <p>
                Casuísticas que requerían criterio: incidencias con descripción incompleta, casos que encajaban en dos categorías a la vez, prioridad real distinta de la declarada. El responsable de operaciones clasificaba lo ambiguo con un criterio que no estaba escrito en ninguna regla.
              </p>
              <p>
                Frase resumen usada con dirección:{' '}
                <em>
                  &ldquo;La consolidación de las tres fuentes está automatizada; la clasificación de los casos ambiguos requiere el criterio operativo de la persona que conoce el proceso, antes de publicar el estado consolidado.&rdquo;
                </em>
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};
