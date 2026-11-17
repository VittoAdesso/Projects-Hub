import { useRef } from 'react'
import { exportElementAsPdf, exportElementAsPng } from '@/shared/lib/exportSheet'
import {
  GlossaryAndStatusCodesSection,
  ModularArchitectureSection,
  Phase1RulesSection,
  Phase2DeveloperRulesSection,
  SqlAtAGlanceSection,
  TypicalCombinationsFlows,
} from '../components/FlowsRulesAndGlossary'
import { NeedDecisionSelector } from '../components/NeedDecisionSelector'
import {
  Phase1StackTimeline,
  Phase2DevTimeline,
} from '../components/StackTimelineSection'
import { StackToolbarAndLegend } from '../components/StackToolbarAndLegend'
import { useChuletaStack } from '../hooks/useChuletaStack'

export function ChuletaStackView() {
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const {
    searchQuery,
    setSearchQuery,
    selectedNeedIndex,
    setSelectedNeedIndex,
    selectedNeed,
    statusMessage,
    setStatusMessage,
    filteredStackLayers,
    filteredDevLayers,
  } = useChuletaStack()

  const handleExportImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'chuleta-stack-tecnologico',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    })
  }

  const handleExportPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'chuleta-stack-tecnologico',
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
      className="mx-auto max-w-[980px] bg-background px-5 pt-7 pb-10 text-[15px] leading-[1.55] text-foreground"
    >
      <h1 className="m-0 mb-1.5 font-display text-[clamp(26px,5vw,38px)] leading-[1.1] font-bold tracking-[-0.02em]">
        Mi stack tecnológico
      </h1>
      <p className="sub m-0 mb-4 max-w-[62ch] text-muted-foreground">
        Qué hace cada pieza, cuándo usarla y qué la limita. La analogía: un
        vehículo con interfaz, sistema nervioso, brazos, enchufes, depósito e
        instrumentos.
      </p>

      <StackToolbarAndLegend
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusMessage={statusMessage}
        onExportImage={handleExportImage}
        onExportPdf={handleExportPdf}
        onPrint={handlePrint}
      />

      {/* Fase 1 */}
      <h2
        id="f1"
        className="ph mt-10 mb-1.5 border-t-[3px] border-foreground pt-3.5 font-display text-[26px] leading-[1.15] font-bold"
      >
        Fase 1 · Power Platform: usar y automatizar
      </h2>

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        El vehículo, pieza a pieza
      </h2>
      <Phase1StackTimeline layers={filteredStackLayers} />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Qué uso según la necesidad
      </h2>
      <NeedDecisionSelector
        selectedNeedIndex={selectedNeedIndex}
        selectedNeed={selectedNeed}
        onSelectNeed={setSelectedNeedIndex}
      />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Combinaciones típicas
      </h2>
      <TypicalCombinationsFlows />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Reglas que evitan problemas
      </h2>
      <Phase1RulesSection />

      {/* Fase 2 */}
      <h2
        id="f2"
        className="ph mt-10 mb-1.5 border-t-[3px] border-foreground pt-3.5 font-display text-[26px] leading-[1.15] font-bold"
      >
        Fase 2 · Desarrollo: front, back, API, datos y servidor
      </h2>
      <p className="sub m-0 mb-4 max-w-[62ch] text-muted-foreground">
        Para cuando hay que construir una solución propia, como lo haría un
        equipo de desarrollo: capas separadas, módulos con una sola
        responsabilidad y todo conectado por una API.
      </p>

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Arquitectura modular y componentes
      </h2>
      <ModularArchitectureSection />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Las piezas del desarrollo
      </h2>
      <Phase2DevTimeline layers={filteredDevLayers} />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        SQL en una mirada
      </h2>
      <SqlAtAGlanceSection />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Reglas del desarrollador
      </h2>
      <Phase2DeveloperRulesSection />

      <h2 className="mt-9 mb-3 font-display text-[20px] leading-[1.2] font-semibold">
        Glosario de APIs y bases de datos
      </h2>
      <GlossaryAndStatusCodesSection />

      <footer className="mt-[30px] border-t border-border pt-3 text-[12.5px] text-muted-foreground">
        La analogía del vehículo es didáctica: PAD no es un back-end, actúa como
        las manos sobre la pantalla. Las licencias son orientativas: verifícalas
        en tu tenant antes de comprometer una solución.
      </footer>
    </div>
  )
}
