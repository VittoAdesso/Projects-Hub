import { MODE_OPTIONS } from '../data/guideData'
import type { GuideMode } from '../types'

export interface GuideToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  activeMode: GuideMode
  onSelectMode: (mode: GuideMode) => void
}

export function GuideToolbar({
  searchQuery,
  onSearchChange,
  activeMode,
  onSelectMode,
}: GuideToolbarProps) {
  return (
    <div className="bar sticky top-14 z-10 border-b border-border bg-background px-5 py-2.5">
      <div className="mx-auto flex max-w-[900px] flex-wrap items-center gap-2.5">
        <input
          type="search"
          id="q"
          placeholder="Buscar: 2000, DLP, PAD, licencia, selector…"
          aria-label="Buscar en la guía"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-w-[180px] flex-1 rounded-lg border border-border bg-card px-3 py-2 font-sans text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />

        <span className="pill" id="modes">
          {MODE_OPTIONS.map((opt) => {
            const isPressed = activeMode === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                data-mode={opt.value}
                aria-pressed={isPressed}
                onClick={() => onSelectMode(opt.value)}
                className={`mr-1 cursor-pointer rounded-2xl border px-3 py-1.5 font-sans text-[0.9rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
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
