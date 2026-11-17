import { Fragment } from 'react'
import {
  AF,
  F,
  G,
  K,
  MODULAR_FOLDER_TREE,
  R,
  R2,
  R3,
  SQL_CHEATSHEET_SNIPPET,
} from '../data/stackData'
import type { AnyLayerColorKey, FlowStepTuple, RuleTuple } from '../types'

const STEP_LEFT_BORDER_CLASS: Record<AnyLayerColorKey, string> = {
  ui: 'border-l-4 border-l-[#2563A8]',
  or: 'border-l-4 border-l-[#2E7D52]',
  ex: 'border-l-4 border-l-[#C2561C]',
  co: 'border-l-4 border-l-[#6A4BB5]',
  da: 'border-l-4 border-l-[#0E7490]',
  le: 'border-l-4 border-l-[#8A5A00]',
  fe: 'border-l-4 border-l-[#2563A8]',
  be: 'border-l-4 border-l-[#6A4BB5]',
  db: 'border-l-4 border-l-[#0E7490]',
  sv: 'border-l-4 border-l-[#3D4C5B]',
  qa: 'border-l-4 border-l-[#2E7D52]',
}

function FlowStepsRow({
  steps,
  id,
}: {
  steps: readonly FlowStepTuple[]
  id?: string
}) {
  return (
    <div id={id} className="st flex flex-wrap items-center gap-1.5">
      {steps.map(([label, colorKey], index) => (
        <Fragment key={`${label}-${index}`}>
          {index > 0 && (
            <i aria-hidden="true" className="text-muted-foreground not-italic">
              →
            </i>
          )}
          <span
            className={`rounded-md border border-border bg-background px-[9px] py-[5px] text-[13.5px] ${STEP_LEFT_BORDER_CLASS[colorKey]}`}
          >
            {label}
          </span>
        </Fragment>
      ))}
    </div>
  )
}

export function TypicalCombinationsFlows() {
  return (
    <div id="flows">
      {F.map(([title, steps, description]) => (
        <div
          key={title}
          className="fl mb-2.5 rounded-lg border border-border bg-card px-3.5 py-3 break-inside-avoid"
        >
          <h4 className="m-0 mb-1.5 font-display text-[15px] font-semibold">
            {title}
          </h4>
          <FlowStepsRow steps={steps} />
          <p className="m-0 mt-1.5 text-[13.5px] text-muted-foreground">
            {description}
          </p>
        </div>
      ))}
    </div>
  )
}

export function RulesList({
  id,
  rules,
}: {
  id: string
  rules: readonly RuleTuple[]
}) {
  return (
    <ul id={id} className="rules m-0 grid list-none gap-2 p-0">
      {rules.map(([boldLead, detail]) => (
        <li
          key={boldLead}
          className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-[14px]"
        >
          <b className="font-semibold">{boldLead}</b> {detail}
        </li>
      ))}
    </ul>
  )
}

export function Phase1RulesSection() {
  return <RulesList id="rules" rules={R} />
}

export function ModularArchitectureSection() {
  return (
    <>
      <div className="fl mb-2.5 rounded-lg border border-border bg-card px-3.5 py-3 break-inside-avoid">
        <h4 className="m-0 mb-1.5 font-display text-[15px] font-semibold">
          Camino de una petición
        </h4>
        <FlowStepsRow id="arqflow" steps={AF} />
        <p className="m-0 mt-1.5 text-[13.5px] text-muted-foreground">
          El servidor aloja la API y la base de datos. El front-end nunca toca
          la base de datos: siempre pasa por la API.
        </p>
      </div>

      <div className="fl mb-2.5 rounded-lg border border-border bg-card px-3.5 py-3 break-inside-avoid">
        <h4 className="m-0 mb-1.5 font-display text-[15px] font-semibold">
          Estructura de carpetas de un proyecto modular
        </h4>
        <pre className="m-0 mt-2 rounded-lg border border-border bg-background px-3.5 py-3 font-mono text-[12.5px] leading-[1.55] break-words whitespace-pre-wrap text-foreground">
          {MODULAR_FOLDER_TREE}
        </pre>
      </div>

      <RulesList id="rules3" rules={R3} />
    </>
  )
}

export function SqlAtAGlanceSection() {
  return (
    <div className="fl mb-2.5 rounded-lg border border-border bg-card px-3.5 py-3 break-inside-avoid">
      <h4 className="m-0 mb-1.5 font-display text-[15px] font-semibold">
        Las cuatro operaciones y un JOIN
      </h4>
      <pre className="m-0 mt-2 rounded-lg border border-border bg-background px-3.5 py-3 font-mono text-[12.5px] leading-[1.55] break-words whitespace-pre-wrap text-foreground">
        {SQL_CHEATSHEET_SNIPPET}
      </pre>
      <p className="m-0 mt-1.5 text-[13.5px] text-muted-foreground">
        UPDATE y DELETE siempre con WHERE: sin él afectan a toda la tabla. La
        clave primaria identifica cada fila; la clave foránea la relaciona con
        otra tabla; un índice acelera las búsquedas.
      </p>
    </div>
  )
}

export function Phase2DeveloperRulesSection() {
  return <RulesList id="rules2" rules={R2} />
}

export function GlossaryAndStatusCodesSection() {
  return (
    <>
      <dl
        id="gl"
        className="m-0 grid grid-cols-1 gap-x-[18px] gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
      >
        {G.map(([term, definition]) => (
          <div key={term} className="border-t border-border py-2">
            <dt className="font-semibold">{term}</dt>
            <dd className="m-0 mt-0.5 text-[13.5px] text-muted-foreground">
              {definition}
            </dd>
          </div>
        ))}
      </dl>

      <div id="cod" className="cod mt-3 flex flex-wrap gap-2">
        {K.map(([code, meaning]) => (
          <span
            key={code}
            className="rounded-md border border-border bg-card px-2.5 py-[5px] text-[13px]"
          >
            <b className="font-semibold">{code}</b> {meaning}
          </span>
        ))}
      </div>
    </>
  )
}
