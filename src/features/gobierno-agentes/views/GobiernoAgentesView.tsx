import { useRef } from 'react'
import { exportElementAsPdf, exportElementAsPng } from '@/shared/lib/exportSheet'
import { AgentCardItem } from '../components/AgentCardItem'
import { AgentsToolbarAndNav } from '../components/AgentsToolbarAndNav'
import { CommitteePanelSection } from '../components/CommitteePanelSection'
import {
  FailureProtocolSection,
  HumanSupervisionTableSection,
  PrinciplesGridSection,
} from '../components/StaticGovernanceSections'
import { useGobiernoAgentes } from '../hooks/useGobiernoAgentes'

export function GobiernoAgentesView() {
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const {
    agents,
    evaluations,
    statusMessage,
    setStatusMessage,
    updateAgentText,
    updateAgentSelect,
    toggleAgentControl,
    addAgent,
    deleteAgent,
  } = useGobiernoAgentes()

  const handleExportImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'gobierno-agentes-ia',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    })
  }

  const handleExportPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'gobierno-agentes-ia',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      id="sheet"
      ref={sheetRef}
      className="mx-auto max-w-[1140px] px-5 pt-7 pb-14 text-[14.5px] leading-[1.55] text-foreground"
    >
      {/* Hero */}
      <div className="hero mb-3.5 rounded-lg bg-[#16293B] px-[26px] py-[22px] text-white">
        <h1 className="mb-1.5 font-display text-[25px] leading-[1.2] font-bold">
          Centro de gobierno de agentes de IA
        </h1>
        <p className="m-0 max-w-[78ch] text-[14px] opacity-90">
          Inventario de agentes, clasificación de riesgo, controles obligatorios
          según el nivel, evaluación antes de publicar y un panel para el
          comité. Lo que hace falta para liderar la IA con control y sin frenar
          la innovación.
        </p>
      </div>

      {/* Top Toolbar + Status + Section Anchor Nav */}
      <AgentsToolbarAndNav
        statusMessage={statusMessage}
        onExportImage={handleExportImage}
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
      />

      {/* Section 1: Principios de gobierno */}
      <h2
        id="a"
        className="mt-[26px] mb-2 border-b-2 border-primary pb-1 font-display text-[19px] leading-[1.2] font-bold text-primary"
      >
        1 · Principios de gobierno
      </h2>
      <PrinciplesGridSection />

      {/* Section 2: Inventario y control de agentes */}
      <h2
        id="b"
        className="mt-[26px] mb-2 border-b-2 border-primary pb-1 font-display text-[19px] leading-[1.2] font-bold text-primary"
      >
        2 · Inventario y control de agentes
      </h2>
      <p className="sub mb-3 text-[13.5px] text-muted-foreground">
        Registra cada agente y responde a seis preguntas. El nivel de riesgo y
        los controles obligatorios se calculan solos. Los dos primeros son
        ejemplos inventados: edítalos o bórralos. Los datos se quedan en este
        navegador.
      </p>

      <div id="ags">
        {agents.map((agent, index) => {
          const evaluation = evaluations[index]
          if (!evaluation) return null
          return (
            <AgentCardItem
              key={index}
              agent={agent}
              index={index}
              evaluation={evaluation}
              onUpdateTextField={updateAgentText}
              onUpdateNumericField={updateAgentSelect}
              onToggleControl={toggleAgentControl}
              onDelete={deleteAgent}
            />
          )
        })}
      </div>

      <div
        className="bar no mb-1.5 flex flex-wrap gap-2 print:hidden"
        data-html2canvas-ignore="true"
      >
        <button
          id="ad"
          type="button"
          onClick={addAgent}
          className="g cursor-pointer rounded-md border border-border bg-card px-3.5 py-2 font-sans text-[13px] font-semibold text-foreground transition-colors hover:bg-muted/60"
        >
          Añadir agente
        </button>
      </div>

      {/* Section 3: Panel del comité */}
      <h2
        id="c"
        className="mt-[26px] mb-2 border-b-2 border-primary pb-1 font-display text-[19px] leading-[1.2] font-bold text-primary"
      >
        3 · Panel del comité
      </h2>
      <CommitteePanelSection agents={agents} evaluations={evaluations} />

      {/* Section 4: Cuándo debe intervenir una persona */}
      <h2
        id="d"
        className="mt-[26px] mb-2 border-b-2 border-primary pb-1 font-display text-[19px] leading-[1.2] font-bold text-primary"
      >
        4 · Cuándo debe intervenir una persona
      </h2>
      <HumanSupervisionTableSection />

      {/* Section 5: Si un agente falla */}
      <h2
        id="e"
        className="mt-[26px] mb-2 border-b-2 border-primary pb-1 font-display text-[19px] leading-[1.2] font-bold text-primary"
      >
        5 · Si un agente falla
      </h2>
      <FailureProtocolSection />

      {/* Footer */}
      <footer className="mt-[30px] border-t border-border pt-3 text-[12.5px] text-muted-foreground">
        La clasificación y los controles son una propuesta de gobierno práctica,
        no una evaluación jurídica. El encaje con el Reglamento europeo de IA y
        con la protección de datos debe validarlo el área legal y el DPO, sobre
        todo si el agente apoya decisiones sobre personas.
      </footer>
    </div>
  )
}
