import { CONF, PROMPTS } from '../data/guideData'
import { itemMatchesSearch } from '../hooks/useGuiaPowerPlatform'
import type { GuideMode } from '../types'

export interface PromptsSectionProps {
  searchQuery: string
  activeMode: GuideMode
  copiedPromptLabels: Record<number, string>
  onCopyPrompt: (index: number, text: string) => void
}

export function PromptsSection({
  searchQuery,
  activeMode,
  copiedPromptLabels,
  onCopyPrompt,
}: PromptsSectionProps) {
  if (activeMode === 'reunion') {
    return null
  }

  const trimmedQuery = searchQuery.trim()
  const itemsWithVisibility = PROMPTS.map(([title, body], index) => {
    const fullText = `${title}${body}Copiar`
    const matches = itemMatchesSearch(fullText, searchQuery)
    return {
      index,
      title,
      body,
      hidden: !matches,
      forceOpen: Boolean(trimmedQuery && matches),
    }
  })

  const sectionHidden =
    Boolean(trimmedQuery) && itemsWithVisibility.every((item) => item.hidden)

  return (
    <section
      className="no-reunion my-[26px]"
      id="s-prompts"
      hidden={sectionHidden}
    >
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        4. Prompts para el Copilot de la oficina
      </h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        Sustituye lo que va entre corchetes. Cada uno sigue el esquema contexto,
        qué tengo y cómo responder.
      </p>

      <div id="prompts">
        {itemsWithVisibility.map(
          ({ index, title, body, hidden, forceOpen }) => (
            <details
              key={title}
              hidden={hidden}
              open={forceOpen ? true : undefined}
              className="item my-2.5 rounded-[10px] border border-border bg-card"
            >
              <summary className="flex cursor-pointer items-center gap-2.5 px-4 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {title}
              </summary>
              <div className="body border-t border-border px-4 pb-3.5">
                <pre
                  id={`pr${index}`}
                  className="my-2 rounded-md bg-muted px-3 py-2.5 font-mono text-[0.86rem] whitespace-pre-wrap text-foreground"
                >
                  {body}
                </pre>
                <button
                  type="button"
                  data-cp={`pr${index}`}
                  onClick={() => onCopyPrompt(index, body)}
                  className="b mr-1 cursor-pointer rounded-2xl border border-border bg-card px-3 py-1.5 font-sans text-[0.9rem] text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {copiedPromptLabels[index] ?? 'Copiar'}
                </button>
              </div>
            </details>
          )
        )}
      </div>
    </section>
  )
}

export interface ConfigTableSectionProps {
  searchQuery: string
  activeMode: GuideMode
}

export function ConfigTableSection({
  searchQuery,
  activeMode,
}: ConfigTableSectionProps) {
  if (activeMode === 'reunion') {
    return null
  }

  const trimmedQuery = searchQuery.trim()
  const rowsWithVisibility = CONF.map(([what, where, note, url]) => {
    const fullText = `${what}${where}${note}`
    const matches = itemMatchesSearch(fullText, searchQuery)
    return { what, where, note, url, hidden: !matches }
  })

  const sectionHidden =
    Boolean(trimmedQuery) && rowsWithVisibility.every((row) => row.hidden)

  return (
    <section
      className="no-reunion my-[26px]"
      id="s-conf"
      hidden={sectionHidden}
    >
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        5. Dónde se configura cada cosa
      </h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        Los nombres de menús pueden cambiar; confirma en la documentación
        enlazada.
      </p>

      <div className="tw overflow-x-auto rounded-[10px] border border-border bg-card">
        <table id="conf" className="w-full min-w-[520px] border-collapse">
          <tbody>
            <tr>
              <th className="px-3 py-2 text-left align-top font-semibold">
                Qué
              </th>
              <th className="px-3 py-2 text-left align-top font-semibold">
                Dónde
              </th>
              <th className="px-3 py-2 text-left align-top font-semibold">
                Nota
              </th>
            </tr>
            {rowsWithVisibility.map(({ what, where, note, url, hidden }) => (
              <tr
                key={what}
                hidden={hidden}
                className="item border-t border-border"
              >
                <td className="px-3 py-2 text-left align-top">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {what}
                  </a>
                </td>
                <td className="px-3 py-2 text-left align-top">{where}</td>
                <td className="px-3 py-2 text-left align-top">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
