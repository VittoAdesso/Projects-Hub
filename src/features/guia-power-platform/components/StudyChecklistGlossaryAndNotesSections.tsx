import { DIVUL, GLOS, P5, QA, RUTA } from '../data/guideData'
import { itemMatchesSearch } from '../hooks/useGuiaPowerPlatform'
import type { ChecksStateMap, GuideMode } from '../types'

export interface StudyRouteSectionProps {
  searchQuery: string
  activeMode: GuideMode
  checksMap: ChecksStateMap
  onToggleCheck: (key: string, checked: boolean) => void
}

export function StudyRouteSection({
  searchQuery,
  activeMode,
  checksMap,
  onToggleCheck,
}: StudyRouteSectionProps) {
  if (activeMode === 'reunion' || activeMode === 'desarollador') {
    return null
  }

  const trimmedQuery = searchQuery.trim()
  const rutaItems = RUTA.map(([label, url], index) => {
    const matches = itemMatchesSearch(label, searchQuery)
    return { key: `r${index}`, label, url, hidden: !matches }
  })

  const divulItems = DIVUL.map((name) => {
    const text = `Buscar «${name}» en YouTube`
    const matches = itemMatchesSearch(text, searchQuery)
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} Power Platform`)}`
    return { name, text, url, hidden: !matches }
  })

  const sectionHidden =
    Boolean(trimmedQuery) &&
    rutaItems.every((i) => i.hidden) &&
    divulItems.every((i) => i.hidden)

  return (
    <section
      className="no-reunion no-desarollador my-[26px]"
      id="s-ruta"
      hidden={sectionHidden}
    >
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        6. Ruta de estudio y divulgadores
      </h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        Bloques de 15 minutos. Marca lo que ya tienes claro.
      </p>

      <div id="ruta">
        {rutaItems.map(({ key, label, url, hidden }) => {
          const isExternal = url.startsWith('http')
          return (
            <label
              key={key}
              hidden={hidden}
              className="c item my-1.5 flex cursor-pointer items-start gap-2"
            >
              <input
                type="checkbox"
                data-k={key}
                checked={Boolean(checksMap[key])}
                onChange={(e) => onToggleCheck(key, e.target.checked)}
                className="mt-1 h-4 w-4 cursor-pointer accent-primary"
              />
              <span>
                <a
                  href={url}
                  target={isExternal ? '_blank' : '_blank'}
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  {label}
                </a>
              </span>
            </label>
          )
        })}
      </div>

      <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">Divulgadores</h3>
      <div id="divul">
        <div className="note my-3 rounded-r-lg border-l-4 border-primary bg-card px-3.5 py-2.5 text-muted-foreground">
          Propuestos en la guía original. Abro una búsqueda en YouTube de cada
          nombre porque no verifiqué cada canal. CepaCode, por su parte, consta
          como canal de un especialista de Power Platform en español.
        </div>
        {divulItems.map(({ name, text, url, hidden }) => (
          <div key={name} hidden={hidden} className="item my-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              {text}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export interface MeetingAndDelegationSectionProps {
  searchQuery: string
  checksMap: ChecksStateMap
  onToggleCheck: (key: string, checked: boolean) => void
  onResetProjectChecks: () => void
}

export function MeetingAndDelegationSection({
  searchQuery,
  checksMap,
  onToggleCheck,
  onResetProjectChecks,
}: MeetingAndDelegationSectionProps) {
  const trimmedQuery = searchQuery.trim()
  const p5Items = P5.map((text, index) => ({
    key: `p${index}`,
    text,
    hidden: !itemMatchesSearch(text, searchQuery),
  }))

  const qaItems = QA.map((text, index) => ({
    key: `q${index}`,
    text,
    hidden: !itemMatchesSearch(text, searchQuery),
  }))

  const sectionHidden =
    Boolean(trimmedQuery) &&
    p5Items.every((i) => i.hidden) &&
    qaItems.every((i) => i.hidden)

  return (
    <section className="my-[26px]" id="s-sop" hidden={sectionHidden}>
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        7. Reunión y delegación
      </h2>

      <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">
        Las 5 preguntas antes de aceptar un proyecto
      </h3>
      <div id="p5">
        {p5Items.map(({ key, text, hidden }) => (
          <label
            key={key}
            hidden={hidden}
            className="c item my-1.5 flex cursor-pointer items-start gap-2"
          >
            <input
              type="checkbox"
              data-k={key}
              checked={Boolean(checksMap[key])}
              onChange={(e) => onToggleCheck(key, e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer accent-primary"
            />
            <span>{text}</span>
          </label>
        ))}
      </div>

      <h3 className="mt-4 mb-1.5 text-[1rem] font-semibold">
        Control de calidad antes de dar por buena una entrega
      </h3>
      <div id="qa">
        {qaItems.map(({ key, text, hidden }) => (
          <label
            key={key}
            hidden={hidden}
            className="c item my-1.5 flex cursor-pointer items-start gap-2"
          >
            <input
              type="checkbox"
              data-k={key}
              checked={Boolean(checksMap[key])}
              onChange={(e) => onToggleCheck(key, e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer accent-primary"
            />
            <span>{text}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        id="reset"
        onClick={onResetProjectChecks}
        className="b mt-2 mr-1 cursor-pointer rounded-2xl border border-border bg-card px-3 py-1.5 font-sans text-[0.9rem] text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Reiniciar para un nuevo proyecto
      </button>
    </section>
  )
}

export interface GlossarySectionProps {
  searchQuery: string
  activeMode: GuideMode
}

export function GlossarySection({
  searchQuery,
  activeMode,
}: GlossarySectionProps) {
  if (activeMode === 'desarollador') {
    return null
  }

  const trimmedQuery = searchQuery.trim()
  const glosItems = GLOS.map(([term, definition]) => {
    const fullText = `${term}. ${definition}`
    return {
      term,
      definition,
      hidden: !itemMatchesSearch(fullText, searchQuery),
    }
  })

  const sectionHidden =
    Boolean(trimmedQuery) && glosItems.every((i) => i.hidden)

  return (
    <section
      className="no-desarollador my-[26px]"
      id="s-glos"
      hidden={sectionHidden}
    >
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">8. Glosario rápido</h2>
      <div id="glos">
        {glosItems.map(({ term, definition, hidden }) => (
          <div
            key={term}
            hidden={hidden}
            className="card item my-2.5 rounded-[10px] border border-border bg-card px-4 py-3"
          >
            <b>{term}.</b> {definition}
          </div>
        ))}
      </div>
    </section>
  )
}

export interface MyNotesSectionProps {
  searchQuery: string
  notes: readonly string[]
  newNoteInput: string
  onNewNoteInputChange: (value: string) => void
  onAddNote: () => void
  onDeleteNote: (index: number) => void
}

export function MyNotesSection({
  searchQuery,
  notes,
  newNoteInput,
  onNewNoteInputChange,
  onAddNote,
  onDeleteNote,
}: MyNotesSectionProps) {
  const trimmedQuery = searchQuery.trim()
  const noteItems = notes.map((noteText, index) => {
    const fullText = `${noteText} Quitar`
    return {
      index,
      noteText,
      hidden: !itemMatchesSearch(fullText, searchQuery),
    }
  })

  const sectionHidden =
    Boolean(trimmedQuery) &&
    noteItems.length > 0 &&
    noteItems.every((i) => i.hidden)

  return (
    <section className="my-[26px]" id="s-notas" hidden={sectionHidden}>
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        9. Mis reglas y notas
      </h2>
      <p className="sub m-0 mb-2.5 text-muted-foreground">
        Añade aquí tus propias reglas y aprendizajes. Se guardan en este
        navegador y el buscador las encuentra.
      </p>

      <div className="flex flex-wrap gap-2">
        <input
          type="search"
          id="nt"
          placeholder="Escribe una regla o nota"
          aria-label="Nueva nota"
          value={newNoteInput}
          onChange={(e) => onNewNoteInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAddNote()
            }
          }}
          className="min-w-[200px] flex-1 rounded-lg border border-border bg-card px-3 py-2 font-sans text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <button
          type="button"
          id="addn"
          onClick={onAddNote}
          className="b mr-1 cursor-pointer rounded-2xl border border-border bg-card px-3 py-1.5 font-sans text-[0.9rem] text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Añadir
        </button>
      </div>

      <div id="notas">
        {noteItems.map(({ index, noteText, hidden }) => (
          <div
            key={`${index}-${noteText}`}
            hidden={hidden}
            className="card item my-2.5 rounded-[10px] border border-border bg-card px-4 py-3"
          >
            {noteText}{' '}
            <button
              type="button"
              data-dn={index}
              onClick={() => onDeleteNote(index)}
              className="b mr-1 cursor-pointer rounded-2xl border border-border bg-card px-3 py-1.5 font-sans text-[0.9rem] text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export interface ExpandGuideSectionProps {
  activeMode: GuideMode
}

export function ExpandGuideSection({ activeMode }: ExpandGuideSectionProps) {
  if (activeMode === 'reunion' || activeMode === 'desarollador') {
    return null
  }

  return (
    <section className="no-reunion no-desarollador my-[26px]" id="s-amp">
      <h2 className="m-0 mb-1 text-[1.25rem] font-bold">
        10. Cómo ampliar esta guía
      </h2>
      <div className="card my-2.5 rounded-[10px] border border-border bg-card px-4 py-3">
        Las tarjetas, prompts, preguntas y glosario están en listas al inicio
        del bloque{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          &lt;script&gt;
        </code>
        :{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          MENTE
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          PIEZAS
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          PROMPTS
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          CONF
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          RUTA
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          DIVUL
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          P5
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          QA
        </code>
        ,{' '}
        <code className="rounded bg-muted px-[5px] py-[1px] font-mono text-[0.86rem]">
          GLOS
        </code>
        . Para añadir algo, copia una línea, cambia el texto y guarda. Si
        prefieres no tocar código, pide: «añade a la guía [tema], con el mismo
        formato».
        <br />
        Ideas pendientes: ALM y entornos, Power BI, seguridad en Dataverse,
        Copilot Studio en detalle, plantillas de respuesta a negocio.
      </div>
      <div className="note my-3 rounded-r-lg border-l-4 border-primary bg-card px-3.5 py-2.5 text-muted-foreground">
        <b className="font-semibold text-foreground">Alcance y verificación.</b>{' '}
        Límites y reglas con enlace oficial: delegación, DLP, SharePoint,
        desatendido en PAD y preguntas de licencias. Precios: son de lista en
        USD y cambian; confírmalos en la{' '}
        <a
          href="https://www.microsoft.com/en-us/power-platform/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-2 hover:underline"
        >
          página de precios
        </a>{' '}
        y con tu proveedor de licencias. Las tarjetas de Power BI y Copilot
        Studio son orientativas y sin verificar aquí. Última revisión: 14 de
        noviembre de 2026.
      </div>
    </section>
  )
}
