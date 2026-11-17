import { ADR_TEMPLATE, README_TEMPLATE } from '../data/modulesData'
import type { TemplateId } from '../types'

export interface TemplatesAndScopeSectionProps {
  copiedTemplates: Record<TemplateId, string>
  onCopyTemplate: (id: TemplateId) => void
}

export function TemplatesAndScopeSection({
  copiedTemplates,
  onCopyTemplate,
}: TemplatesAndScopeSectionProps) {
  return (
    <div className="mx-auto max-w-[860px] px-5 pt-0 pb-[60px]">
      <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">
        Plantillas para copiar
      </h3>
      <p className="my-2">
        Basadas en los elementos que recomienda la guía de Microsoft sobre
        registros de decisiones. Ajústalas a tu equipo.
      </p>

      <p className="mt-4 mb-1">
        <b>Registro de decisión (ADR)</b>
      </p>
      <pre
        id="t1"
        className="my-2 overflow-x-auto rounded-lg bg-muted px-3.5 py-3 font-mono text-[0.85rem] leading-[1.5] whitespace-pre-wrap text-foreground"
      >
        {ADR_TEMPLATE}
      </pre>
      <button
        type="button"
        data-c="t1"
        onClick={() => onCopyTemplate('t1')}
        className="cp cursor-pointer rounded-lg border border-border bg-card px-3 py-[5px] font-sans text-[0.9rem] text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {copiedTemplates.t1}
      </button>

      <p className="mt-4 mb-1">
        <b>Ficha de una solución (README)</b>
      </p>
      <pre
        id="t2"
        className="my-2 overflow-x-auto rounded-lg bg-muted px-3.5 py-3 font-mono text-[0.85rem] leading-[1.5] whitespace-pre-wrap text-foreground"
      >
        {README_TEMPLATE}
      </pre>
      <button
        type="button"
        data-c="t2"
        onClick={() => onCopyTemplate('t2')}
        className="cp cursor-pointer rounded-lg border border-border bg-card px-3 py-[5px] font-sans text-[0.9rem] text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {copiedTemplates.t2}
      </button>

      <div className="note my-3.5 rounded-r-lg border-l-4 border-primary bg-card px-3.5 py-2.5 text-muted-foreground">
        <b className="font-semibold text-foreground">Alcance.</b> Los patrones
        de la lista de nube son independientes de la tecnología; los ejemplos de
        aplicación en Power Platform de cada módulo son analogías de esta guía y
        no una lista oficial de Microsoft. Revisa los enlaces cada trimestre.
        Última verificación: 13 de noviembre de 2026.
      </div>
    </div>
  )
}
