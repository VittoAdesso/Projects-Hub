import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import GuiaPowerPlatformTool from '@/features/guia-power-platform'
import {
  CHECKS_STORAGE_KEY,
  CONF,
  DIVUL,
  GLOS,
  L,
  MENTE,
  NOTES_STORAGE_KEY,
  P5,
  PIEZAS,
  PROMPTS,
  Q,
  QA,
  RUTA,
} from '@/features/guia-power-platform/data/guideData'
import {
  computeLegacyGuideOutputsHtml,
  computeLegacySimOutHtml,
} from '@/features/guia-power-platform/hooks/useGuiaPowerPlatform'
import type {
  ChecksStateMap,
  SimulatorValues,
} from '@/features/guia-power-platform/types'
import { resolveLegacyFile } from './setup'

interface LegacyMasterGuideSandbox {
  L: string
  MENTE: unknown[]
  PIEZAS: unknown[]
  PROMPTS: [string, string][]
  CONF: unknown[]
  RUTA: unknown[]
  DIVUL: string[]
  P5: string[]
  QA: string[]
  GLOS: unknown[]
  Q: unknown[]
  outputs: ReturnType<typeof computeLegacyGuideOutputsHtml>
  runSim: (v: SimulatorValues) => string
}

function loadLegacyMasterGuideSandbox(): LegacyMasterGuideSandbox {
  const htmlPath = resolveLegacyFile('guia-maestra-power-platform.html')
  const html = readFileSync(htmlPath, 'utf-8')
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  const inlineScript = scriptMatches[0]?.[1]
  if (!inlineScript) {
    throw new Error(
      'Could not find inline <script> in guia-maestra-power-platform.html'
    )
  }

  const elements: Record<
    string,
    {
      innerHTML: string
      textContent: string
      value: string
      addEventListener: () => void
    }
  > = {}

  const radioValues: Record<string, number> = {
    need: 0,
    src: 0,
    vol: 0,
    usr: 0,
    lic: 0,
  }

  const getElement = (id: string) => {
    if (!elements[id]) {
      elements[id] = {
        innerHTML: '',
        textContent: '',
        value: '',
        addEventListener: () => {},
      }
    }
    return elements[id]
  }

  const sandboxDocument = {
    body: { dataset: { mode: '' } },
    getElementById: (id: string) => getElement(id),
    querySelector: (sel: string) => {
      const match = /^input\[name=(\w+)\]:checked$/.exec(sel)
      if (match?.[1]) {
        return { value: String(radioValues[match[1]] ?? 0) }
      }
      return { value: '0' }
    },
    querySelectorAll: () => [],
    addEventListener: () => {},
  }

  const context = vm.createContext({
    document: sandboxDocument,
    localStorage: {
      getItem: () => null,
      setItem: () => {},
    },
    encodeURIComponent,
    JSON,
  })

  const instrumentedScript = `${inlineScript}
globalThis.__GM_EXPORT__ = {
  L, MENTE, PIEZAS, PROMPTS, CONF, RUTA, DIVUL, P5, QA, GLOS, Q,
  outputs: {
    menteHtml: el("mente").innerHTML,
    piezasHtml: el("piezas").innerHTML,
    promptsHtml: el("prompts").innerHTML,
    confHtml: el("conf").innerHTML,
    rutaHtml: el("ruta").innerHTML,
    divulHtml: el("divul").innerHTML,
    p5Html: el("p5").innerHTML,
    qaHtml: el("qa").innerHTML,
    glosHtml: el("glos").innerHTML,
    notasHtml: el("notas").innerHTML,
    simformHtml: el("simform").innerHTML,
    outHtml: el("out").innerHTML,
  },
  runSim: function(customV) {
    ${Object.keys(radioValues)
      .map((k) => `__setRadio("${k}", customV.${k});`)
      .join('')}
    sim();
    return el("out").innerHTML;
  }
};`

  ;(context as Record<string, unknown>).__setRadio = (
    k: string,
    val: number
  ) => {
    radioValues[k] = val
  }

  vm.runInContext(instrumentedScript, context)
  return (context as unknown as { __GM_EXPORT__: LegacyMasterGuideSandbox })
    .__GM_EXPORT__
}

describe('Guía maestra: arquitectura Power Platform (guia-power-platform)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('conserva paridad 100% en todas las constantes (L, MENTE, PIEZAS, PROMPTS, CONF, RUTA, DIVUL, P5, QA, GLOS, Q) y HTML inicial', () => {
    const legacy = loadLegacyMasterGuideSandbox()

    expect(L).toBe(legacy.L)
    expect(JSON.parse(JSON.stringify(MENTE))).toEqual(legacy.MENTE)
    expect(JSON.parse(JSON.stringify(PIEZAS))).toEqual(legacy.PIEZAS)
    expect(JSON.parse(JSON.stringify(PROMPTS))).toEqual(legacy.PROMPTS)
    expect(JSON.parse(JSON.stringify(CONF))).toEqual(legacy.CONF)
    expect(JSON.parse(JSON.stringify(RUTA))).toEqual(legacy.RUTA)
    expect(JSON.parse(JSON.stringify(DIVUL))).toEqual(legacy.DIVUL)
    expect(JSON.parse(JSON.stringify(P5))).toEqual(legacy.P5)
    expect(JSON.parse(JSON.stringify(QA))).toEqual(legacy.QA)
    expect(JSON.parse(JSON.stringify(GLOS))).toEqual(legacy.GLOS)
    expect(JSON.parse(JSON.stringify(Q))).toEqual(legacy.Q)

    expect(computeLegacyGuideOutputsHtml()).toEqual(legacy.outputs)
  })

  it('verifica paridad matemática y textual exacta de sim() en las 288 combinaciones del simulador de decisiones', () => {
    const legacy = loadLegacyMasterGuideSandbox()

    // 4 (need) * 4 (src) * 3 (vol) * 3 (usr) * 2 (lic) = 288 combinations
    for (let need = 0; need < 4; need++) {
      for (let src = 0; src < 4; src++) {
        for (let vol = 0; vol < 3; vol++) {
          for (let usr = 0; usr < 3; usr++) {
            for (let lic = 0; lic < 2; lic++) {
              const v: SimulatorValues = { need, src, vol, usr, lic }
              expect(computeLegacySimOutHtml(v)).toBe(legacy.runSim(v))
            }
          }
        }
      }
    }
  })

  it('alterna los 3 modos (Estudio, Reunión, Auditoría desarollador), copia los 6 prompts exactamente y filtra con #q', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    })

    render(
      <ThemeProvider>
        <MemoryRouter>
          <GuiaPowerPlatformTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    // Default mode: Estudio -> all 10 sections visible
    expect(document.getElementById('s-mente')).toBeTruthy()
    expect(document.getElementById('s-sim')).toBeTruthy()
    expect(document.getElementById('s-prompts')).toBeTruthy()

    // Test copying all 6 prompts in Estudio mode
    for (let i = 0; i < PROMPTS.length; i++) {
      const copyBtn = document.querySelector(
        `button[data-cp="pr${i}"]`
      ) as HTMLButtonElement
      expect(copyBtn).toBeTruthy()
      fireEvent.click(copyBtn)
      await waitFor(() => {
        expect(copyBtn.textContent).toBe('Copiado')
      })
      expect(writeTextMock).toHaveBeenCalledWith(PROMPTS[i]?.[1])
    }

    // Switch to Reunión mode -> hides .no-reunion (#s-mente, #s-prompts, #s-conf, #s-ruta, #s-amp), keeps #s-sim, #s-piezas, #s-sop, #s-glos, #s-notas
    fireEvent.click(screen.getByRole('button', { name: 'Reunión' }))
    expect(document.getElementById('s-mente')).toBeNull()
    expect(document.getElementById('s-prompts')).toBeNull()
    expect(document.getElementById('s-sim')).toBeTruthy()
    expect(document.getElementById('s-glos')).toBeTruthy()

    // Switch to Auditoría desarollador mode -> hides .no-desarollador (#s-mente, #s-sim, #s-ruta, #s-glos, #s-amp), keeps #s-prompts, #s-conf, #s-sop
    fireEvent.click(
      screen.getByRole('button', { name: 'Auditoría desarollador' })
    )
    expect(document.getElementById('s-sim')).toBeNull()
    expect(document.getElementById('s-glos')).toBeNull()
    expect(document.getElementById('s-prompts')).toBeTruthy()
    expect(document.getElementById('s-conf')).toBeTruthy()

    // Back to Estudio mode
    fireEvent.click(screen.getByRole('button', { name: 'Estudio' }))
    expect(document.getElementById('s-mente')).toBeTruthy()

    // Search filter #q -> auto-opens matching <details class="item">
    const searchInput = screen.getByLabelText(
      'Buscar en la guía'
    ) as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: '2.000' } })

    const canvasPieceDetails = Array.from(
      document.querySelectorAll('#piezas details')
    )[0] as HTMLDetailsElement
    expect(canvasPieceDetails.hidden).toBe(false)
    expect(canvasPieceDetails.open).toBe(true)

    fireEvent.change(searchInput, { target: { value: '' } })
  })

  it('persiste casillas (r, p, q), reinicia proyecto (#reset sin borrar ruta de estudio) y gestiona notas en localStorage', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <GuiaPowerPlatformTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    const checkR0 = document.querySelector(
      'input[type="checkbox"][data-k="r0"]'
    ) as HTMLInputElement
    const checkP0 = document.querySelector(
      'input[type="checkbox"][data-k="p0"]'
    ) as HTMLInputElement
    const checkQ0 = document.querySelector(
      'input[type="checkbox"][data-k="q0"]'
    ) as HTMLInputElement

    fireEvent.click(checkR0)
    fireEvent.click(checkP0)
    fireEvent.click(checkQ0)

    expect(checkR0.checked).toBe(true)
    expect(checkP0.checked).toBe(true)
    expect(checkQ0.checked).toBe(true)

    const storedChecksBefore = JSON.parse(
      localStorage.getItem(CHECKS_STORAGE_KEY) ?? '{}'
    ) as ChecksStateMap
    expect(storedChecksBefore).toEqual({ r0: true, p0: true, q0: true })

    // Click Reiniciar para un nuevo proyecto (#reset) -> clears p* and q*, preserves r0
    fireEvent.click(
      screen.getByRole('button', { name: 'Reiniciar para un nuevo proyecto' })
    )
    expect(checkR0.checked).toBe(true)
    expect(checkP0.checked).toBe(false)
    expect(checkQ0.checked).toBe(false)

    const storedChecksAfter = JSON.parse(
      localStorage.getItem(CHECKS_STORAGE_KEY) ?? '{}'
    ) as ChecksStateMap
    expect(storedChecksAfter).toEqual({ r0: true })

    // Add a custom note in #s-notas
    const noteInput = screen.getByLabelText('Nueva nota') as HTMLInputElement
    fireEvent.change(noteInput, {
      target: { value: 'Validar siempre conectores premium con compras' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }))

    expect(
      screen.getByText(/Validar siempre conectores premium con compras/)
    ).toBeInTheDocument()

    const storedNotes = JSON.parse(
      localStorage.getItem(NOTES_STORAGE_KEY) ?? '[]'
    ) as string[]
    expect(storedNotes).toEqual([
      'Validar siempre conectores premium con compras',
    ])

    // Remove the note
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }))
    expect(
      JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY) ?? '[]')
    ).toEqual([])
  })
})
