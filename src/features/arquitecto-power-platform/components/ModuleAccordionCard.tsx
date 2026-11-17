import type { PowerPlatformModule } from '../types'

export interface ModuleAccordionCardProps {
  index: number
  moduleItem: PowerPlatformModule
  hidden: boolean
  isCompleted: boolean
  indicator: '✔' | '○'
  selectedOptions: readonly number[]
  onSelectQuizOption: (moduleIndex: number, optionIndex: number) => void
  onToggleCompleted: (moduleIndex: number, checked: boolean) => void
}

export function ModuleAccordionCard({
  index,
  moduleItem,
  hidden,
  isCompleted,
  indicator,
  selectedOptions,
  onSelectQuizOption,
  onToggleCompleted,
}: ModuleAccordionCardProps) {
  const correctIndex = moduleItem.q[2]
  const isSolved = selectedOptions.includes(correctIndex)

  return (
    <details
      data-l={moduleItem.l}
      hidden={hidden}
      className="my-3 rounded-[10px] border border-border bg-card"
    >
      <summary className="flex cursor-pointer items-center gap-2.5 px-4 py-3.5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <span
          id={`c${index}`}
          className={
            isCompleted
              ? 'text-[#0e8a6b] dark:text-[#3dd0a6]'
              : 'text-muted-foreground'
          }
        >
          {indicator}
        </span>
        <span>
          {index}. {moduleItem.t}
        </span>
        <span className="lv ml-auto text-[0.85rem] font-normal text-muted-foreground">
          {moduleItem.l}
        </span>
      </summary>

      <div className="body border-t border-border px-[18px] pb-[18px]">
        <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">Objetivo</h3>
        <p className="m-0">{moduleItem.o}</p>

        <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">Temas</h3>
        <ul className="m-0 list-disc pl-5">
          {moduleItem.k.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">
          Recursos oficiales
        </h3>
        <ul className="m-0 list-disc pl-5">
          {moduleItem.r.map(([label, url]) => (
            <li key={`${label}-${url}`}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">Práctica</h3>
        <p className="m-0">{moduleItem.p}</p>

        <div className="q">
          <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">
            Comprueba lo aprendido
          </h3>
          <p className="m-0 mb-1.5">{moduleItem.q[0]}</p>

          {moduleItem.q[1].map((optionText, optionIndex) => {
            const wasClicked = selectedOptions.includes(optionIndex)
            const isCorrectOption = optionIndex === correctIndex
            const stateClass = wasClicked
              ? isCorrectOption
                ? 'ok border-[#0e8a6b] bg-[#0e8a6b]/18 dark:border-[#3dd0a6] dark:bg-[#3dd0a6]/18'
                : 'no border-[#b3261e] dark:border-[#ff8a80]'
              : 'border-border bg-background hover:bg-muted/50'

            return (
              <button
                key={optionText}
                type="button"
                data-m={index}
                data-o={optionIndex}
                disabled={isSolved}
                onClick={() => onSelectQuizOption(index, optionIndex)}
                className={`my-1.5 block w-full cursor-pointer rounded-lg border px-3 py-2 text-left font-sans text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default ${stateClass}`}
              >
                {optionText}
              </button>
            )
          })}
        </div>

        <label className="d mt-3.5 flex cursor-pointer items-center gap-2 font-semibold">
          <input
            type="checkbox"
            data-d={index}
            checked={isCompleted}
            onChange={(e) => onToggleCompleted(index, e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-primary"
          />{' '}
          Módulo completado
        </label>
      </div>
    </details>
  )
}
