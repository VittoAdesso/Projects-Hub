import { TC } from '../data/agentsData'
import type { AgentEvaluation, AgentItem } from '../types'

export interface CommitteePanelSectionProps {
  agents: readonly AgentItem[]
  evaluations: readonly AgentEvaluation[]
}

function formatAgentList(list: readonly AgentItem[]): string {
  return list.length > 0
    ? list.map((a) => a.n || 'Sin nombre').join('; ')
    : 'ninguno.'
}

export function CommitteePanelSection({
  agents,
  evaluations,
}: CommitteePanelSectionProps) {
  if (agents.length === 0) {
    return (
      <div
        className="box rounded-lg border border-border bg-card p-3.5 break-inside-avoid"
        id="sm"
        aria-live="polite"
      >
        <p>Añade agentes en el inventario para ver el panel.</p>
      </div>
    )
  }

  const nT = [0, 1, 2].map(
    (tier) => evaluations.filter((r) => r.t === tier).length
  )
  const prod = agents.filter((a) => a.st === 3).length
  const bad = agents.filter(
    (a, i) => a.st === 3 && evaluations[i]?.vc === TC[2]
  )
  const sinR = agents.filter((a) => !a.o.trim())
  const ven = agents.filter((_, i) => Boolean(evaluations[i]?.rvs))
  const lis = agents.filter((a, i) => a.st < 3 && evaluations[i]?.vc === TC[0])

  return (
    <div
      className="box rounded-lg border border-border bg-card p-3.5 break-inside-avoid"
      id="sm"
      aria-live="polite"
    >
      <div className="kp mb-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
        <div className="rounded-md border border-border bg-background p-2.5">
          <b className="block font-display text-[22px] leading-[1.1]">
            {agents.length}
          </b>
          <span className="text-xs text-muted-foreground">agentes</span>
        </div>

        <div className="rounded-md border border-border bg-background p-2.5">
          <b className="block font-display text-[22px] leading-[1.1] text-[#B83232]">
            {nT[2]}
          </b>
          <span className="text-xs text-muted-foreground">riesgo alto</span>
        </div>

        <div className="rounded-md border border-border bg-background p-2.5">
          <b className="block font-display text-[22px] leading-[1.1] text-[#B7791F]">
            {nT[1]}
          </b>
          <span className="text-xs text-muted-foreground">riesgo medio</span>
        </div>

        <div className="rounded-md border border-border bg-background p-2.5">
          <b className="block font-display text-[22px] leading-[1.1] text-[#2E7D52]">
            {nT[0]}
          </b>
          <span className="text-xs text-muted-foreground">riesgo bajo</span>
        </div>

        <div className="rounded-md border border-border bg-background p-2.5">
          <b className="block font-display text-[22px] leading-[1.1]">{prod}</b>
          <span className="text-xs text-muted-foreground">en producción</span>
        </div>
      </div>

      <ul className="t my-1.5 list-disc pl-[18px]">
        <li className="mb-[5px]">
          <b>En producción con controles pendientes:</b> {formatAgentList(bad)}
        </li>
        <li className="mb-[5px]">
          <b>Sin responsable asignado:</b> {formatAgentList(sinR)}
        </li>
        <li className="mb-[5px]">
          <b>Con revisión vencida o sin registrar:</b> {formatAgentList(ven)}
        </li>
        <li className="mb-[5px]">
          <b>Listos para pasar a producción:</b> {formatAgentList(lis)}
        </li>
      </ul>
    </div>
  )
}
