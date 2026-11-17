import { FILTER_OPTIONS } from '../data/modulesData'
import type { FilterLevel } from '../types'

export interface ProgressFilterBarProps {
  percentage: number
  activeFilter: FilterLevel
  onSelectFilter: (filter: FilterLevel) => void
}

export function ProgressFilterBar({
  percentage,
  activeFilter,
  onSelectFilter,
}: ProgressFilterBarProps) {
  return (
    <div className="bar sticky top-14 z-10 border-b border-border bg-background px-5 py-2.5">
      <div className="mx-auto flex max-w-[860px] flex-wrap items-center gap-3.5">
        <span id="pct" className="font-semibold">
          {percentage} %
        </span>

        <div className="track h-2 min-w-[140px] flex-1 overflow-hidden rounded-lg bg-border">
          <svg
            id="fill"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            className="block h-full w-full"
            aria-hidden="true"
          >
            <rect
              x="0"
              y="0"
              width={percentage}
              height="8"
              className="fill-[#0e8a6b] transition-all duration-300 dark:fill-[#3dd0a6]"
            />
          </svg>
        </div>

        <span className="f">
          {FILTER_OPTIONS.map((opt) => {
            const isPressed = activeFilter === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                data-l={opt.value}
                aria-pressed={isPressed}
                onClick={() => onSelectFilter(opt.value)}
                className={`mr-1 cursor-pointer rounded-2xl border px-3 py-[5px] text-[0.9rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isPressed
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:bg-muted/60'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </span>
      </div>
    </div>
  )
}
