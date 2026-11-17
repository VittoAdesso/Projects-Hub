import type {
  AnyLayerColorKey,
  FilteredDevLayerItem,
  FilteredStackLayerItem,
  LicenseCategoryKey,
} from '../types'

const LAYER_DOT_BG_CLASS: Record<AnyLayerColorKey, string> = {
  ui: 'bg-[#2563A8]',
  or: 'bg-[#2E7D52]',
  ex: 'bg-[#C2561C]',
  co: 'bg-[#6A4BB5]',
  da: 'bg-[#0E7490]',
  le: 'bg-[#8A5A00]',
  fe: 'bg-[#2563A8]',
  be: 'bg-[#6A4BB5]',
  db: 'bg-[#0E7490]',
  sv: 'bg-[#3D4C5B]',
  qa: 'bg-[#2E7D52]',
}

const LAYER_HEADING_TEXT_CLASS: Record<AnyLayerColorKey, string> = {
  ui: 'text-[#2563A8] dark:text-[#60a5fa]',
  or: 'text-[#2E7D52] dark:text-[#4ade80]',
  ex: 'text-[#C2561C] dark:text-[#fb923c]',
  co: 'text-[#6A4BB5] dark:text-[#a78bfa]',
  da: 'text-[#0E7490] dark:text-[#22d3ee]',
  le: 'text-[#8A5A00] dark:text-[#fbbf24]',
  fe: 'text-[#2563A8] dark:text-[#60a5fa]',
  be: 'text-[#6A4BB5] dark:text-[#a78bfa]',
  db: 'text-[#0E7490] dark:text-[#22d3ee]',
  sv: 'text-[#3D4C5B] dark:text-[#94a3b8]',
  qa: 'text-[#2E7D52] dark:text-[#4ade80]',
}

const LAYER_CARD_TOP_BORDER_CLASS: Record<AnyLayerColorKey, string> = {
  ui: 'border-t-[3px] border-t-[#2563A8]',
  or: 'border-t-[3px] border-t-[#2E7D52]',
  ex: 'border-t-[3px] border-t-[#C2561C]',
  co: 'border-t-[3px] border-t-[#6A4BB5]',
  da: 'border-t-[3px] border-t-[#0E7490]',
  le: 'border-t-[3px] border-t-[#8A5A00]',
  fe: 'border-t-[3px] border-t-[#2563A8]',
  be: 'border-t-[3px] border-t-[#6A4BB5]',
  db: 'border-t-[3px] border-t-[#0E7490]',
  sv: 'border-t-[3px] border-t-[#3D4C5B]',
  qa: 'border-t-[3px] border-t-[#2E7D52]',
}

const LICENSE_PILL_CLASS: Record<LicenseCategoryKey, string> = {
  ok: 'ok text-[#1F6B3F] dark:text-[#4ade80]',
  mx: 'mx text-[#8A5A00] dark:text-[#fbbf24]',
  pr: 'pr text-[#9B2C2C] dark:text-[#f87171]',
  ow: 'ow text-[#3D4C5B] dark:text-[#94a3b8]',
}

export interface Phase1StackTimelineProps {
  layers: readonly FilteredStackLayerItem[]
}

export function Phase1StackTimeline({ layers }: Phase1StackTimelineProps) {
  return (
    <div
      className="stack relative pl-[26px] before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-[3px] before:bg-border"
      id="stack"
    >
      {layers.map((layer) => (
        <section
          key={layer.key}
          hidden={layer.hidden}
          className="ly relative mb-6 break-inside-avoid"
        >
          <span
            aria-hidden="true"
            className={`absolute top-[3px] -left-[26px] h-[17px] w-[17px] rounded-full border-[3px] border-background ${LAYER_DOT_BG_CLASS[layer.key]}`}
          />
          <h3
            className={`m-0 font-display text-[17px] leading-[1.25] font-semibold ${LAYER_HEADING_TEXT_CLASS[layer.key]}`}
          >
            {layer.title}
            <small className="ml-2 font-sans text-[13px] font-normal text-muted-foreground">
              {layer.subtitle}
            </small>
          </h3>

          <div className="cards mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {layer.tools.map((tool) => (
              <article
                key={tool.name}
                hidden={tool.hidden}
                data-q={tool.dataQ}
                className={`tool rounded-lg border border-border bg-card px-3.5 py-3 break-inside-avoid ${LAYER_CARD_TOP_BORDER_CLASS[layer.key]}`}
              >
                <h4 className="m-0 flex items-start justify-between gap-2 font-display text-[15px] leading-[1.3] font-semibold">
                  <span>{tool.name}</span>
                  <span
                    className={`lic flex-none rounded-full border border-current px-[7px] py-[3px] font-sans text-[11.5px] leading-[1.2] font-semibold ${LICENSE_PILL_CLASS[tool.licenseKey]}`}
                  >
                    {tool.licenseLabel}
                  </span>
                </h4>
                <p className="r m-0 mb-1 text-[13px] text-muted-foreground">
                  {tool.role}
                </p>
                <p className="m-0 mt-1 text-[13.5px] text-muted-foreground">
                  <b className="font-semibold text-foreground">Úsala para:</b>{' '}
                  {tool.useFor}
                </p>
                <p className="m-0 mt-1 text-[13.5px] text-muted-foreground">
                  <b className="font-semibold text-foreground">Límite:</b>{' '}
                  {tool.limit}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export interface Phase2DevTimelineProps {
  layers: readonly FilteredDevLayerItem[]
}

export function Phase2DevTimeline({ layers }: Phase2DevTimelineProps) {
  return (
    <div
      className="stack relative pl-[26px] before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-[3px] before:bg-border"
      id="stack2"
    >
      {layers.map((layer) => (
        <section
          key={layer.key}
          hidden={layer.hidden}
          className="ly relative mb-6 break-inside-avoid"
        >
          <span
            aria-hidden="true"
            className={`absolute top-[3px] -left-[26px] h-[17px] w-[17px] rounded-full border-[3px] border-background ${LAYER_DOT_BG_CLASS[layer.key]}`}
          />
          <h3
            className={`m-0 font-display text-[17px] leading-[1.25] font-semibold ${LAYER_HEADING_TEXT_CLASS[layer.key]}`}
          >
            {layer.title}
            <small className="ml-2 font-sans text-[13px] font-normal text-muted-foreground">
              {layer.subtitle}
            </small>
          </h3>

          <div className="cards mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {layer.tools.map((tool) => (
              <article
                key={tool.title}
                hidden={tool.hidden}
                data-q={tool.dataQ}
                className={`tool rounded-lg border border-border bg-card px-3.5 py-3 break-inside-avoid ${LAYER_CARD_TOP_BORDER_CLASS[layer.key]}`}
              >
                <h4 className="m-0 flex items-start justify-between gap-2 font-display text-[15px] leading-[1.3] font-semibold">
                  <span>{tool.title}</span>
                  <span
                    className={`lic flex-none rounded-full border border-current px-[7px] py-[3px] font-sans text-[11.5px] leading-[1.2] font-semibold ${LICENSE_PILL_CLASS.ow}`}
                  >
                    {tool.badge}
                  </span>
                </h4>
                <p className="r m-0 mb-1 text-[13px] text-muted-foreground">
                  {tool.subtitle}
                </p>
                <ul className="m-0 mt-2 list-disc pl-[18px] text-[13.5px] text-muted-foreground">
                  {tool.bullets.map((bullet) => (
                    <li key={bullet} className="mb-1">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
