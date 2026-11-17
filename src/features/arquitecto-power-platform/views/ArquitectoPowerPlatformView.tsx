import { ModuleAccordionCard } from '../components/ModuleAccordionCard'
import { NotesAndCommunitySection } from '../components/NotesAndCommunitySection'
import { ProgressFilterBar } from '../components/ProgressFilterBar'
import { MODULES } from '../data/modulesData'
import {
  isModuleVisibleForFilter,
  usePowerPlatformProgress,
} from '../hooks/usePowerPlatformProgress'

export function ArquitectoPowerPlatformView() {
  const {
    completedMap,
    activeFilter,
    setActiveFilter,
    quizSelections,
    toggleModuleCompleted,
    selectQuizOption,
    progressStats,
  } = usePowerPlatformProgress()

  return (
    <div className="text-[16px] leading-[1.6] text-foreground">
      <header className="mx-auto max-w-[860px] px-5 pt-7 pb-3">
        <h1 className="m-0 mb-1.5 text-[1.9rem] leading-[1.2] font-bold">
          Arquitectura de soluciones en Power Platform
        </h1>
        <p className="m-0 mb-3.5 max-w-[62ch] text-muted-foreground">
          Ruta para quien pasa de construir a diseñar: requisitos, fit/gap,
          entornos, datos, seguridad, integraciones y validación. Marca cada
          módulo al terminarlo; el progreso se guarda en tu navegador.
        </p>
      </header>

      <ProgressFilterBar
        percentage={progressStats.percentage}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      <div id="m" className="mx-auto max-w-[860px] px-5 pt-4 pb-6">
        {MODULES.map((moduleItem, index) => {
          const hidden = !isModuleVisibleForFilter(moduleItem, activeFilter)
          const isCompleted = Boolean(completedMap[`d${index}`])
          const indicator = progressStats.indicators[index] ?? '○'
          const selectedOptions = quizSelections[index] ?? []

          return (
            <ModuleAccordionCard
              key={moduleItem.t}
              index={index}
              moduleItem={moduleItem}
              hidden={hidden}
              isCompleted={isCompleted}
              indicator={indicator}
              selectedOptions={selectedOptions}
              onSelectQuizOption={selectQuizOption}
              onToggleCompleted={toggleModuleCompleted}
            />
          )
        })}
      </div>

      <NotesAndCommunitySection />
    </div>
  )
}
