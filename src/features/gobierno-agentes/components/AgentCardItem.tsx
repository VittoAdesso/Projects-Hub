import {
  AC,
  AL,
  AU,
  CT,
  DA,
  PEOPLE_DECISION_OPTIONS,
  ST,
  TN,
} from '../data/agentsData'
import type {
  AgentEvaluation,
  AgentItem,
  AgentSelectKey,
  AgentTextKey,
  RiskTierIndex,
} from '../types'

export interface AgentCardItemProps {
  agent: AgentItem
  index: number
  evaluation: AgentEvaluation
  onUpdateTextField: (index: number, key: AgentTextKey, value: string) => void
  onUpdateNumericField: (
    index: number,
    key: AgentSelectKey,
    value: number
  ) => void
  onToggleControl: (
    agentIndex: number,
    controlIndex: number,
    checked: boolean
  ) => void
  onDelete: (index: number) => void
}

const TIER_TOP_BORDER_CLASS: Record<RiskTierIndex, string> = {
  0: 'border-t-4 border-t-[#2E7D52]',
  1: 'border-t-4 border-t-[#B7791F]',
  2: 'border-t-4 border-t-[#B83232]',
}

const TIER_BADGE_CLASS: Record<RiskTierIndex, string> = {
  0: 'bg-[#2E7D52] text-white',
  1: 'bg-[#B7791F] text-white',
  2: 'bg-[#B83232] text-white',
}

const TIER_FILL_CLASS: Record<RiskTierIndex, string> = {
  0: 'fill-[#2E7D52]',
  1: 'fill-[#B7791F]',
  2: 'fill-[#B83232]',
}

function getVerdictBorderClass(vc: string): string {
  if (vc === '#2E7D52') return 'border-l-4 border-l-[#2E7D52]'
  if (vc === '#B83232') return 'border-l-4 border-l-[#B83232]'
  return 'border-l-4 border-l-[#B7791F]'
}

export function AgentCardItem({
  agent,
  index,
  evaluation,
  onUpdateTextField,
  onUpdateNumericField,
  onToggleControl,
  onDelete,
}: AgentCardItemProps) {
  const tierName = TN[evaluation.t] ?? 'Bajo'
  const progressPct =
    evaluation.nc > 0 ? (evaluation.done / evaluation.nc) * 100 : 0

  return (
    <section
      className={`ag mb-3.5 rounded-lg border border-border bg-card p-4 break-inside-avoid ${TIER_TOP_BORDER_CLASS[evaluation.t]}`}
    >
      {/* Row 1: Nombre, Responsable, Plataforma */}
      <div className="fr mb-2.5 grid grid-cols-1 items-end gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="w sm:col-span-2">
          <label
            htmlFor={`n${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Nombre del agente
          </label>
          <input
            id={`n${index}`}
            data-i={index}
            data-k="n"
            value={agent.n}
            onChange={(e) => onUpdateTextField(index, 'n', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={`o${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Responsable
          </label>
          <input
            id={`o${index}`}
            data-i={index}
            data-k="o"
            value={agent.o}
            onChange={(e) => onUpdateTextField(index, 'o', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={`pl${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Plataforma
          </label>
          <input
            id={`pl${index}`}
            data-i={index}
            data-k="pl"
            value={agent.pl}
            onChange={(e) => onUpdateTextField(index, 'pl', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>
      </div>

      {/* Row 2: 6 Selectors */}
      <div className="fr mb-2.5 grid grid-cols-1 items-end gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          <label
            htmlFor={`d${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Datos que usa
          </label>
          <select
            id={`d${index}`}
            data-i={index}
            data-k="d"
            value={agent.d}
            onChange={(e) =>
              onUpdateNumericField(index, 'd', Number(e.target.value))
            }
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          >
            {DA.map((opt, j) => (
              <option key={opt} value={j}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`a${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Qué puede hacer
          </label>
          <select
            id={`a${index}`}
            data-i={index}
            data-k="a"
            value={agent.a}
            onChange={(e) =>
              onUpdateNumericField(index, 'a', Number(e.target.value))
            }
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          >
            {AC.map((opt, j) => (
              <option key={opt} value={j}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`u${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Autonomía
          </label>
          <select
            id={`u${index}`}
            data-i={index}
            data-k="u"
            value={agent.u}
            onChange={(e) =>
              onUpdateNumericField(index, 'u', Number(e.target.value))
            }
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          >
            {AU.map((opt, j) => (
              <option key={opt} value={j}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`s${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Alcance
          </label>
          <select
            id={`s${index}`}
            data-i={index}
            data-k="s"
            value={agent.s}
            onChange={(e) =>
              onUpdateNumericField(index, 's', Number(e.target.value))
            }
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          >
            {AL.map((opt, j) => (
              <option key={opt} value={j}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`p${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Decisiones sobre personas
          </label>
          <select
            id={`p${index}`}
            data-i={index}
            data-k="p"
            value={agent.p}
            onChange={(e) =>
              onUpdateNumericField(index, 'p', Number(e.target.value))
            }
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          >
            {PEOPLE_DECISION_OPTIONS.map((opt, j) => (
              <option key={opt} value={j}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`st${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Estado
          </label>
          <select
            id={`st${index}`}
            data-i={index}
            data-k="st"
            value={agent.st}
            onChange={(e) =>
              onUpdateNumericField(index, 'st', Number(e.target.value))
            }
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          >
            {ST.map((opt, j) => (
              <option key={opt} value={j}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Revisión, Evaluación y Borrar */}
      <div className="fr mb-2.5 grid grid-cols-1 items-end gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          <label
            htmlFor={`rv${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Última revisión
          </label>
          <input
            id={`rv${index}`}
            type="date"
            data-i={index}
            data-k="rv"
            value={agent.rv}
            onChange={(e) => onUpdateTextField(index, 'rv', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={`ec${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Casos de prueba
          </label>
          <input
            id={`ec${index}`}
            inputMode="decimal"
            data-i={index}
            data-k="ec"
            value={agent.ec}
            onChange={(e) => onUpdateTextField(index, 'ec', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={`ea${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Casos acertados
          </label>
          <input
            id={`ea${index}`}
            inputMode="decimal"
            data-i={index}
            data-k="ea"
            value={agent.ea}
            onChange={(e) => onUpdateTextField(index, 'ea', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={`ef${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Fallos de seguridad
          </label>
          <input
            id={`ef${index}`}
            inputMode="decimal"
            data-i={index}
            data-k="ef"
            value={agent.ef}
            onChange={(e) => onUpdateTextField(index, 'ef', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor={`eo${index}`}
            className="mb-[3px] block text-xs font-semibold text-muted-foreground"
          >
            Objetivo de acierto (%)
          </label>
          <input
            id={`eo${index}`}
            inputMode="decimal"
            data-i={index}
            data-k="eo"
            value={agent.eo}
            onChange={(e) => onUpdateTextField(index, 'eo', e.target.value)}
            className="w-full rounded border border-border bg-card px-2 py-[7px] font-sans text-[13.5px] text-foreground"
          />
        </div>

        <div className="no print:hidden" data-html2canvas-ignore="true">
          <button
            type="button"
            data-del={index}
            aria-label={`Borrar el agente ${index + 1}`}
            onClick={() => onDelete(index)}
            className="cursor-pointer rounded-md border border-border bg-card px-3.5 py-2 font-sans text-[13px] font-semibold text-[#B83232] transition-colors hover:bg-muted/60"
          >
            Borrar
          </button>
        </div>
      </div>

      {/* Dynamic Evaluation Block */}
      <div className="dy" id={`dy${index}`}>
        <span
          className={`tier inline-block rounded px-2.5 py-[3px] text-[13px] font-bold ${TIER_BADGE_CLASS[evaluation.t]}`}
        >
          Riesgo {tierName.toLowerCase()}
        </span>{' '}
        <span className="text-[13px] text-muted-foreground">
          puntuación {evaluation.sc} de 12
        </span>

        {evaluation.why.length > 0 && (
          <ul className="t my-1.5 list-disc pl-[18px]">
            {evaluation.why.map((reason) => (
              <li key={reason} className="mb-[5px]">
                {reason}
              </li>
            ))}
          </ul>
        )}

        <p className="big mt-2.5 text-[15px] font-bold">
          Controles obligatorios: {evaluation.done} de {evaluation.nc}
        </p>

        <div className="pg my-2 h-2 overflow-hidden rounded bg-[#E6EBF0] dark:bg-muted">
          <svg
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            className="block h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="0"
              y="0"
              width={progressPct}
              height="8"
              className={TIER_FILL_CLASS[evaluation.t]}
            />
          </svg>
        </div>

        {CT.slice(0, evaluation.nc).map((controlText, j) => {
          const checked = Boolean(agent.ck[j])
          return (
            <div
              key={controlText}
              className="ck flex items-start gap-2 border-t border-border py-[5px] text-[13.5px]"
            >
              <input
                type="checkbox"
                id={`c${index}_${j}`}
                data-i={index}
                data-c={j}
                checked={checked}
                onChange={(e) => onToggleControl(index, j, e.target.checked)}
                className="mt-[3px] h-4 w-4 shrink-0 cursor-pointer accent-primary"
              />
              <label htmlFor={`c${index}_${j}`} className="cursor-pointer">
                {controlText}
              </label>
            </div>
          )
        })}

        <div
          className={`vd mt-2.5 rounded bg-background px-3 py-2 text-[13.5px] ${getVerdictBorderClass(evaluation.vc)}`}
        >
          <b>{evaluation.vd}</b>
          {evaluation.t >= 1 && evaluation.ev && (
            <>
              <br />
              Evaluación: {evaluation.ev}
            </>
          )}
          {evaluation.rvs && (
            <>
              <br />
              {evaluation.rvs}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
