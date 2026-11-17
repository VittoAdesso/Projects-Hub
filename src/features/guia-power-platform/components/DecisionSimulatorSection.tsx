import { Q } from '../data/guideData'
import type {
  DotColorKey,
  GuideMode,
  SimulatorOutputTuple,
  SimulatorQuestionKey,
  SimulatorValues,
} from '../types'

const DOT_INLINE_CLASS: Record<DotColorKey, string> = {
  g: 'g bg-[#0e8a6b] dark:bg-[#3dd0a6]',
  a: 'a bg-[#b7791f] dark:bg-[#f0b95a]',
  r: 'r bg-[#b3261e] dark:bg-[#ff8a80]',
}

export interface DecisionSimulatorSectionProps {
  activeMode: GuideMode
  values: SimulatorValues
  outputs: readonly SimulatorOutputTuple[]
  onChangeValue: (key: SimulatorQuestionKey, value: number) => void
}

export function DecisionSimulatorSection({
  activeMode,
  values,
  outputs,
  onChangeValue,
}: DecisionSimulatorSectionProps) {
  if (activeMode === 'desarollador') {
    return null
  }

  return (
    <section className="no-desarollador my-[26px]" id="s-sim">
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        3. Simulador de decisiones
      </h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        Responde en 30 segundos antes de comprometer plazos o presupuesto. Es
        una orientación, no un presupuesto.
      </p>

      <div id="simform">
        {Q.map(([key, legend, options]) => (
          <fieldset
            key={key}
            className="my-2.5 rounded-[10px] border border-border bg-card px-3.5 py-2"
          >
            <legend className="px-1.5 font-semibold">{legend}</legend>
            {options.map((optLabel, optionIndex) => (
              <label
                key={optLabel}
                className="my-1 mr-3.5 inline-flex cursor-pointer items-center gap-1.5"
              >
                <input
                  type="radio"
                  name={key}
                  value={optionIndex}
                  checked={values[key] === optionIndex}
                  onChange={() => onChangeValue(key, optionIndex)}
                  className="cursor-pointer accent-primary"
                />
                {optLabel}
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <div id="out">
        {outputs.map(([dot, label, text], idx) => (
          <div
            key={`${label}-${idx}`}
            className="card my-2 rounded-[10px] border border-border bg-card px-4 py-3"
          >
            <span
              className={`dot mr-2 inline-block h-3 w-3 rounded-full ${DOT_INLINE_CLASS[dot]}`}
            />
            <b>{label}.</b> {text}
          </div>
        ))}
      </div>
    </section>
  )
}
