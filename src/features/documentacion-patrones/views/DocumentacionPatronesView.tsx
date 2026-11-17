import { ModuleAccordionCard } from '../components/ModuleAccordionCard'
import { ProgressFilterBar } from '../components/ProgressFilterBar'
import { TemplatesAndScopeSection } from '../components/TemplatesAndScopeSection'
import { MODULES } from '../data/modulesData'
import {
  isModuleVisibleForFilter,
  useDocPatternsProgress,
} from '../hooks/useDocPatternsProgress'

export function DocumentacionPatronesView() {
  const {
    completedMap,
    activeFilter,
    setActiveFilter,
    quizSelections,
    toggleModuleCompleted,
    selectQuizOption,
    copiedTemplates,
    copyTemplate,
    progressStats,
  } = useDocPatternsProgress()

  return (
    <div className="text-[16px] leading-[1.6] text-foreground">
      <header className="mx-auto max-w-[860px] px-5 pt-7 pb-3">
        <h1 className="m-0 mb-1.5 text-[1.9rem] leading-[1.2] font-bold">
          Documentación y patrones de diseño
        </h1>
        <p className="m-0 mb-3.5 max-w-[62ch] text-muted-foreground">
          Cómo documentar soluciones para que otros las entiendan y las
          mantengan, y cómo reconocer patrones de diseño aplicables a Power
          Platform y a la automatización. Marca cada módulo al terminarlo; el
          progreso se guarda en tu navegador.
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

      <TemplatesAndScopeSection
        copiedTemplates={copiedTemplates}
        onCopyTemplate={(id) => void copyTemplate(id)}
      />
    </div>
  )
}
