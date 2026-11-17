import { D } from '../data/stackData'
import type { DecisionOptionTuple } from '../types'

export interface NeedDecisionSelectorProps {
  selectedNeedIndex: number
  selectedNeed: DecisionOptionTuple
  onSelectNeed: (index: number) => void
}

export function NeedDecisionSelector({
  selectedNeedIndex,
  selectedNeed,
  onSelectNeed,
}: NeedDecisionSelectorProps) {
  return (
    <>
      <div className="chips flex flex-wrap gap-2" id="chips">
        {D.map((option, index) => {
          const isPressed = index === selectedNeedIndex
          return (
            <button
              key={option[0]}
              type="button"
              data-i={index}
              aria-pressed={isPressed}
              onClick={() => onSelectNeed(index)}
              className={`g min-h-[44px] cursor-pointer rounded-lg border px-3.5 py-2.5 font-sans text-[14px] font-medium transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8] ${
                isPressed
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-card text-foreground hover:bg-muted/60'
              }`}
            >
              {option[0]}
            </button>
          )
        })}
      </div>

      <div
        id="res"
        aria-live="polite"
        className="mt-3 rounded-lg border border-border border-l-[5px] border-l-[#2E7D52] bg-card px-4 py-3.5"
      >
        <strong className="mb-1 block font-display text-[18px] font-semibold">
          {selectedNeed[1]}
        </strong>
        <p className="m-0 mt-1 text-muted-foreground">{selectedNeed[2]}</p>
        <p className="m-0 mt-1 text-muted-foreground">
          <b className="font-semibold text-foreground">Cuidado:</b>{' '}
          {selectedNeed[3]}
        </p>
      </div>
    </>
  )
}
