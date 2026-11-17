import { useCallback, useMemo, useState } from 'react'
import {
  CHECKS_STORAGE_KEY,
  CONF,
  DIVUL,
  GLOS,
  MENTE,
  NOTES_STORAGE_KEY,
  P5,
  PIEZAS,
  PROMPTS,
  Q,
  QA,
  RUTA,
} from '../data/guideData'
import type {
  ChecksStateMap,
  GuideMode,
  SimulatorOutputTuple,
  SimulatorQuestionKey,
  SimulatorValues,
} from '../types'

const SIMULATOR_TOOLS: readonly [string, string, string, string] = [
  'Canvas si el diseño es libre; basada en modelo si los datos son relacionales y están en Dataverse.',
  'Flujo en la nube si hay API; si solo hay pantalla, Power Automate Desktop.',
  'Power BI; revisa el modelo de datos y la actualización.',
  'Copilot Studio; revisa DLP para copilots y licencia.',
]

export function evaluateSimulator(
  v: SimulatorValues
): SimulatorOutputTuple[] {
  const o: SimulatorOutputTuple[] = []
  const tool = SIMULATOR_TOOLS[v.need] ?? SIMULATOR_TOOLS[0]
  o.push(['g', 'Herramienta', tool])

  if (v.src === 3) {
    o.push([
      'r',
      'Riesgo alto',
      'Sin API: selectores frágiles ante cambios de pantalla, resolución y versión. Necesitas reintentos, registro y una prueba en desatendido.',
    ])
  }
  if (v.src === 3 && v.need !== 1) {
    o.push([
      'a',
      'Ojo',
      'Sin API, lo normal es automatizar con PAD en lugar de una app o agente.',
    ])
  }
  if (v.src === 3) {
    o.push([
      'r',
      'Coste',
      'Atendido: Power Automate Premium (lista 15 USD por usuario al mes). Desatendido: licencia de proceso (lista 150 USD por bot al mes). Confirma.',
    ])
  } else if ((v.src === 1 || v.src === 2) && v.lic === 0) {
    o.push([
      'r',
      'Coste',
      'Dataverse y los conectores premium suelen exigir licencia. Con solo Microsoft 365 estándar, probablemente hay coste. Confírmalo antes de prometer.',
    ])
  } else if (v.src === 0 && v.lic === 0) {
    o.push([
      'g',
      'Coste',
      'Con conectores estándar, el coste adicional probable es 0. Verifica en tu tenant.',
    ])
  } else {
    o.push([
      'a',
      'Coste',
      'Hay licencias premium: comprueba cuántos usuarios las tienen y si la app usa per app o por usuario.',
    ])
  }

  if (v.need === 0 && v.vol >= 1) {
    o.push([
      'a',
      'Delegación',
      'Con más de 500 filas, usa fórmulas delegables y filtra en el origen. Las consultas no delegables solo ven 500 (hasta 2.000).',
    ])
  }
  if (v.src === 0 && v.vol === 2) {
    o.push([
      'r',
      'SharePoint',
      'Más de 5.000 elementos: columnas indexadas, vistas filtradas y límite de 12 búsquedas por vista. Valora Dataverse u otra base.',
    ])
  }
  if (v.src === 0 && v.need === 0 && v.vol >= 1) {
    o.push([
      'a',
      'Excel',
      'Si el origen es Excel, tiene menos operaciones delegables que Dataverse. Mejor SharePoint o Dataverse.',
    ])
  }
  if (v.usr === 2) {
    o.push([
      'a',
      'Usuarios',
      'Más de 100: calcula el coste por usuario frente a per app, y define soporte y entornos de desarrollo, pruebas y producción.',
    ])
  }

  o.push([
    'a',
    'Siempre',
    'Valida DLP (grupos de conectores) y planifica ALM con soluciones antes de publicar.',
  ])

  return o
}

export function computeLegacySimOutHtml(v: SimulatorValues): string {
  const o = evaluateSimulator(v)
  return o
    .map(
      (r) =>
        '<div class="card"><span class="dot ' +
        r[0] +
        '" style="display:inline-block;margin-right:8px"></span><b>' +
        r[1] +
        '.</b> ' +
        r[2] +
        '</div>'
    )
    .join('')
}

function legacyAnchor(u: string, t: string): string {
  return '<a href="' + u + '" target="_blank" rel="noopener">' + t + '</a>'
}

function legacyChk(
  S: ChecksStateMap,
  k: string,
  t: string,
  u?: string
): string {
  return (
    '<label class="c item"><input type="checkbox" data-k="' +
    k +
    '"' +
    (S[k] ? ' checked' : '') +
    '><span>' +
    (u ? legacyAnchor(u, t) : t) +
    '</span></label>'
  )
}

export interface LegacyGuideOutputs {
  menteHtml: string
  piezasHtml: string
  promptsHtml: string
  confHtml: string
  rutaHtml: string
  divulHtml: string
  p5Html: string
  qaHtml: string
  glosHtml: string
  notasHtml: string
  simformHtml: string
  outHtml: string
}

export function computeLegacyGuideOutputsHtml(
  S: ChecksStateMap = {},
  N: readonly string[] = [],
  v: SimulatorValues = { need: 0, src: 0, vol: 0, usr: 0, lic: 0 }
): LegacyGuideOutputs {
  const menteHtml = MENTE.map(
    (m) =>
      '<div class="two item"><div class="card trap"><b>Trampa mental</b><br>' +
      m[0] +
      '</div><div class="card dec"><b>Decisión de arquitecto</b><br>' +
      m[1] +
      '</div></div>'
  ).join('')

  const piezasHtml = PIEZAS.map(
    (p) =>
      '<details class="item"><summary><span class="dot ' +
      p[0] +
      '"></span>' +
      p[1] +
      '</summary><div class="body"><p><b>Qué es.</b> ' +
      p[2] +
      '</p><p><b>Muro duro.</b> ' +
      p[3] +
      '</p>' +
      (p[4].length
        ? '<p>' + p[4].map((l) => legacyAnchor(l[1], l[0])).join(' · ') + '</p>'
        : '') +
      '</div></details>'
  ).join('')

  const promptsHtml = PROMPTS.map(
    (p, i) =>
      '<details class="item"><summary>' +
      p[0] +
      '</summary><div class="body"><pre id="pr' +
      i +
      '">' +
      p[1] +
      '</pre><button class="b" data-cp="pr' +
      i +
      '">Copiar</button></div></details>'
  ).join('')

  const confHtml =
    '<tr><th>Qué</th><th>Dónde</th><th>Nota</th></tr>' +
    CONF.map(
      (c) =>
        '<tr class="item"><td>' +
        legacyAnchor(c[3], c[0]) +
        '</td><td>' +
        c[1] +
        '</td><td>' +
        c[2] +
        '</td></tr>'
    ).join('')

  const rutaHtml = RUTA.map((r, i) => legacyChk(S, 'r' + i, r[0], r[1])).join(
    ''
  )

  const divulHtml =
    '<div class="note">Propuestos en la guía original. Abro una búsqueda en YouTube de cada nombre porque no verifiqué cada canal. CepaCode, por su parte, consta como canal de un especialista de Power Platform en español.</div>' +
    DIVUL.map(
      (d) =>
        '<div class="item">' +
        legacyAnchor(
          'https://www.youtube.com/results?search_query=' +
            encodeURIComponent(d + ' Power Platform'),
          'Buscar «' + d + '» en YouTube'
        ) +
        '</div>'
    ).join('')

  const p5Html = P5.map((t, i) => legacyChk(S, 'p' + i, t)).join('')
  const qaHtml = QA.map((t, i) => legacyChk(S, 'q' + i, t)).join('')

  const glosHtml = GLOS.map(
    (g) => '<div class="card item"><b>' + g[0] + '.</b> ' + g[1] + '</div>'
  ).join('')

  const notasHtml = N.map(
    (n, i) =>
      '<div class="card item">' +
      n.replace(/</g, '&lt;') +
      ' <button class="b" data-dn="' +
      i +
      '">Quitar</button></div>'
  ).join('')

  const simformHtml = Q.map(
    (q) =>
      '<fieldset><legend>' +
      q[1] +
      '</legend>' +
      q[2]
        .map(
          (o, i) =>
            '<label><input type="radio" name="' +
            q[0] +
            '" value="' +
            i +
            '"' +
            (i === 0 ? ' checked' : '') +
            '>' +
            o +
            '</label>'
        )
        .join('') +
      '</fieldset>'
  ).join('')

  const outHtml = computeLegacySimOutHtml(v)

  return {
    menteHtml,
    piezasHtml,
    promptsHtml,
    confHtml,
    rutaHtml,
    divulHtml,
    p5Html,
    qaHtml,
    glosHtml,
    notasHtml,
    simformHtml,
    outHtml,
  }
}

export function itemMatchesSearch(itemText: string, rawQuery: string): boolean {
  const s = rawQuery.trim().toLowerCase()
  if (!s) return true
  return itemText.toLowerCase().includes(s)
}

export function loadChecksFromStorage(
  key: string = CHECKS_STORAGE_KEY
): ChecksStateMap {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const clean: ChecksStateMap = {}
      for (const [k, val] of Object.entries(parsed)) {
        if (typeof val === 'boolean') {
          clean[k] = val
        }
      }
      return clean
    }
  } catch {
    // Ignore storage read errors
  }
  return {}
}

export function loadNotesFromStorage(
  key: string = NOTES_STORAGE_KEY
): string[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed.filter((n): n is string => typeof n === 'string')
    }
  } catch {
    // Ignore storage read errors
  }
  return []
}

export function saveGuideStateToStorage(
  checks: ChecksStateMap,
  notes: readonly string[],
  checksKey: string = CHECKS_STORAGE_KEY,
  notesKey: string = NOTES_STORAGE_KEY
): void {
  try {
    localStorage.setItem(checksKey, JSON.stringify(checks))
    localStorage.setItem(notesKey, JSON.stringify(notes))
  } catch {
    // Ignore storage write errors
  }
}

export function useGuiaPowerPlatform() {
  const [activeMode, setActiveMode] = useState<GuideMode>('estudio')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [simulatorValues, setSimulatorValues] = useState<SimulatorValues>({
    need: 0,
    src: 0,
    vol: 0,
    usr: 0,
    lic: 0,
  })
  const [checksMap, setChecksMap] = useState<ChecksStateMap>(() =>
    loadChecksFromStorage()
  )
  const [notes, setNotes] = useState<string[]>(() => loadNotesFromStorage())
  const [newNoteInput, setNewNoteInput] = useState<string>('')
  const [copiedPromptLabels, setCopiedPromptLabels] = useState<
    Record<number, string>
  >({})

  const updateSimulatorValue = useCallback(
    (key: SimulatorQuestionKey, value: number) => {
      setSimulatorValues((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    []
  )

  const toggleCheck = useCallback(
    (key: string, checked: boolean) => {
      setChecksMap((prev) => {
        const next: ChecksStateMap = {
          ...prev,
          [key]: checked,
        }
        saveGuideStateToStorage(next, notes)
        return next
      })
    },
    [notes]
  )

  const resetProjectChecks = useCallback(() => {
    setChecksMap((prev) => {
      const next: ChecksStateMap = { ...prev }
      for (const prefix of ['p', 'q']) {
        for (let i = 0; i < 20; i++) {
          delete next[`${prefix}${i}`]
        }
      }
      saveGuideStateToStorage(next, notes)
      return next
    })
  }, [notes])

  const addNote = useCallback(() => {
    const trimmed = newNoteInput.trim()
    if (!trimmed) return
    setNotes((prev) => {
      const next = [...prev, trimmed]
      saveGuideStateToStorage(checksMap, next)
      return next
    })
    setNewNoteInput('')
  }, [newNoteInput, checksMap])

  const deleteNote = useCallback(
    (index: number) => {
      setNotes((prev) => {
        const next = prev.filter((_, i) => i !== index)
        saveGuideStateToStorage(checksMap, next)
        return next
      })
    },
    [checksMap]
  )

  const copyPrompt = useCallback(async (index: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPromptLabels((prev) => ({ ...prev, [index]: 'Copiado' }))
    } catch {
      setCopiedPromptLabels((prev) => ({
        ...prev,
        [index]: 'Selecciona y copia a mano',
      }))
    }
  }, [])

  const simulatorOutputs = useMemo(
    () => evaluateSimulator(simulatorValues),
    [simulatorValues]
  )

  return {
    activeMode,
    setActiveMode,
    searchQuery,
    setSearchQuery,
    simulatorValues,
    updateSimulatorValue,
    simulatorOutputs,
    checksMap,
    toggleCheck,
    resetProjectChecks,
    notes,
    newNoteInput,
    setNewNoteInput,
    addNote,
    deleteNote,
    copiedPromptLabels,
    copyPrompt,
  }
}
