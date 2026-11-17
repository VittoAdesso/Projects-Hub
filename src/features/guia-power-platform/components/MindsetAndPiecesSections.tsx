import { Fragment } from 'react'
import { MENTE, PIEZAS } from '../data/guideData'
import { itemMatchesSearch } from '../hooks/useGuiaPowerPlatform'
import type { DotColorKey, GuideMode } from '../types'

const DOT_BG_CLASS: Record<DotColorKey, string> = {
  g: 'g bg-[#0e8a6b] dark:bg-[#3dd0a6]',
  a: 'a bg-[#b7791f] dark:bg-[#f0b95a]',
  r: 'r bg-[#b3261e] dark:bg-[#ff8a80]',
}

export interface MindsetSectionProps {
  searchQuery: string
  activeMode: GuideMode
}

export function MindsetSection({
  searchQuery,
  activeMode,
}: MindsetSectionProps) {
  if (activeMode === 'reunion' || activeMode === 'desarollador') {
    return null
  }

  const trimmedQuery = searchQuery.trim()
  const itemsWithVisibility = MENTE.map(([trap, decision]) => {
    const fullText = `Trampa mental${trap}Decisión de arquitecto${decision}`
    const matches = itemMatchesSearch(fullText, searchQuery)
    return { trap, decision, hidden: !matches }
  })

  const sectionHidden =
    Boolean(trimmedQuery) && itemsWithVisibility.every((item) => item.hidden)

  return (
    <section
      className="no-reunion no-desarollador my-[26px]"
      id="s-mente"
      hidden={sectionHidden}
    >
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">1. Cambio de chip</h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        De quien construye a quien decide. Cada pareja muestra el reflejo
        habitual y la decisión que conviene tomar.
      </p>
      <div id="mente">
        {itemsWithVisibility.map(({ trap, decision, hidden }) => (
          <div
            key={trap}
            hidden={hidden}
            className="two item my-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            <div className="card trap rounded-[10px] border border-border border-l-4 border-l-[#b3261e] bg-card px-4 py-3 dark:border-l-[#ff8a80]">
              <b>Trampa mental</b>
              <br />
              {trap}
            </div>
            <div className="card dec rounded-[10px] border border-border border-l-4 border-l-[#0e8a6b] bg-card px-4 py-3 dark:border-l-[#3dd0a6]">
              <b>Decisión de arquitecto</b>
              <br />
              {decision}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export interface PiecesSectionProps {
  searchQuery: string
}

export function PiecesSection({ searchQuery }: PiecesSectionProps) {
  const trimmedQuery = searchQuery.trim()
  const itemsWithVisibility = PIEZAS.map(
    ([dot, title, whatIsIt, hardWall, links]) => {
      const linksText = links.map(([lbl]) => lbl).join(' · ')
      const fullText = `${title}Qué es. ${whatIsIt}Muro duro. ${hardWall}${linksText}`
      const matches = itemMatchesSearch(fullText, searchQuery)
      return {
        dot,
        title,
        whatIsIt,
        hardWall,
        links,
        hidden: !matches,
        forceOpen: Boolean(trimmedQuery && matches),
      }
    }
  )

  const sectionHidden =
    Boolean(trimmedQuery) && itemsWithVisibility.every((item) => item.hidden)

  return (
    <section className="my-[26px]" id="s-piezas" hidden={sectionHidden}>
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        2. Mapa de piezas y muros duros
      </h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        Verde: estándar. Ámbar: funciona con condiciones. Rojo: muro técnico, de
        gobierno o de pago. Abre cada tarjeta.
      </p>
      <div id="piezas">
        {itemsWithVisibility.map(
          ({ dot, title, whatIsIt, hardWall, links, hidden, forceOpen }) => (
            <details
              key={title}
              hidden={hidden}
              open={forceOpen ? true : undefined}
              className="item my-2.5 rounded-[10px] border border-border bg-card"
            >
              <summary className="flex cursor-pointer items-center gap-2.5 px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span
                  className={`dot h-3 w-3 flex-none rounded-full ${DOT_BG_CLASS[dot]}`}
                />
                {title}
              </summary>
              <div className="body border-t border-border px-4 pb-3.5">
                <p className="my-2.5">
                  <b>Qué es.</b> {whatIsIt}
                </p>
                <p className="my-2.5">
                  <b>Muro duro.</b> {hardWall}
                </p>
                {links.length > 0 && (
                  <p className="my-2.5">
                    {links.map(([label, url], idx) => (
                      <Fragment key={`${label}-${url}`}>
                        {idx > 0 && ' · '}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          {label}
                        </a>
                      </Fragment>
                    ))}
                  </p>
                )}
              </div>
            </details>
          )
        )}
      </div>
    </section>
  )
}
