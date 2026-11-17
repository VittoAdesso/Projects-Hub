import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import DocumentacionPatronesTool from '@/features/documentacion-patrones'
import {
  ADR_TEMPLATE,
  L,
  MODULES,
  README_TEMPLATE,
  STORAGE_KEY,
} from '@/features/documentacion-patrones/data/modulesData'
import {
  calculateProgressStats,
  computeLegacyModulesHtml,
  evaluateQuizOption,
} from '@/features/documentacion-patrones/hooks/useDocPatternsProgress'
import type {
  CompletedModulesMap,
  DocPatternModule,
} from '@/features/documentacion-patrones/types'
import { resolveLegacyFile } from './setup'

interface LegacyPaDocSandbox {
  L: string
  M: DocPatternModule[]
  initialHtml: string
  t1Text: string
  t2Text: string
  runUpdWithState: (state: CompletedModulesMap) => {
    pctText: string
    fillWidth: string
    indicators: string[]
  }
}

function loadLegacyPaDocSandbox(): LegacyPaDocSandbox {
  const htmlPath = resolveLegacyFile('documentacion-patrones-ruta.html')
  const html = readFileSync(htmlPath, 'utf-8')
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  const inlineScript = scriptMatches[0]?.[1]
  if (!inlineScript) {
    throw new Error(
      'Could not find inline <script> in documentacion-patrones-ruta.html'
    )
  }

  const t1Match = /<pre id="t1">([\s\S]*?)<\/pre>/.exec(html)
  const t2Match = /<pre id="t2">([\s\S]*?)<\/pre>/.exec(html)
  const t1Text = t1Match?.[1] ?? ''
  const t2Text = t2Match?.[1] ?? ''

  const elements: Record<
    string,
    { innerHTML: string; textContent: string; style: { width: string } }
  > = {}

  const getElement = (id: string) => {
    if (!elements[id]) {
      elements[id] = { innerHTML: '', textContent: '', style: { width: '' } }
    }
    return elements[id]
  }

  const sandboxDocument = {
    getElementById: (id: string) => getElement(id),
    addEventListener: () => {},
    querySelectorAll: () => [],
  }

  const context = vm.createContext({
    document: sandboxDocument,
    localStorage: {
      getItem: () => null,
      setItem: () => {},
    },
    Math,
    JSON,
  })

  const instrumentedScript = `${inlineScript}
globalThis.__PA_DOC_EXPORT__ = {
  L: L,
  M: M,
  initialHtml: document.getElementById("m").innerHTML,
  t1Text: ${JSON.stringify(t1Text)},
  t2Text: ${JSON.stringify(t2Text)},
  runUpdWithState: function(customS) {
    S = JSON.parse(JSON.stringify(customS));
    upd();
    return {
      pctText: document.getElementById("pct").textContent,
      fillWidth: document.getElementById("fill").style.width,
      indicators: M.map(function(_, idx) { return document.getElementById("c" + idx).textContent; })
    };
  }
};`

  vm.runInContext(instrumentedScript, context)
  return (context as unknown as { __PA_DOC_EXPORT__: LegacyPaDocSandbox })
    .__PA_DOC_EXPORT__
}

describe('Documentación y patrones de diseño (documentacion-patrones)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('conserva paridad 100% en L, los 7 módulos de M, el HTML generado para #m y las plantillas #t1 y #t2', () => {
    const legacy = loadLegacyPaDocSandbox()

    expect(L).toBe(legacy.L)
    expect(JSON.parse(JSON.stringify(MODULES))).toEqual(legacy.M)
    expect(computeLegacyModulesHtml({})).toBe(legacy.initialHtml)
    expect(ADR_TEMPLATE).toBe(legacy.t1Text)
    expect(README_TEMPLATE).toBe(legacy.t2Text)
  })

  it('calcula exactamente el mismo porcentaje (#pct) e indicadores (#c0..#c6) que upd() para las 128 combinaciones de módulos completados', () => {
    const legacy = loadLegacyPaDocSandbox()

    for (let mask = 0; mask < 128; mask++) {
      const state: CompletedModulesMap = {}
      for (let i = 0; i < 7; i++) {
        if ((mask & (1 << i)) !== 0) {
          state[`d${i}`] = true
        }
      }

      const stats = calculateProgressStats(state)
      const legacyStats = legacy.runUpdWithState(state)

      expect(`${stats.percentage} %`).toBe(legacyStats.pctText)
      expect(`${stats.percentage}%`).toBe(legacyStats.fillWidth)
      expect([...stats.indicators]).toEqual(legacyStats.indicators)
    }
  })

  it('filtra por nivel (Todos, Básico, Intermedio, Avanzado) y copia exactamente las plantillas #t1 y #t2', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    })

    render(
      <ThemeProvider>
        <MemoryRouter>
          <DocumentacionPatronesTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    const allDetails = () =>
      Array.from(document.querySelectorAll('#m details')) as HTMLElement[]
    const visibleDetails = () => allDetails().filter((d) => !d.hidden)

    const btnTodos = screen.getByRole('button', { name: 'Todos' })
    const btnBasico = screen.getByRole('button', { name: 'Básico' })
    const btnIntermedio = screen.getByRole('button', { name: 'Intermedio' })
    const btnAvanzado = screen.getByRole('button', { name: 'Avanzado' })

    expect(btnTodos).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(7)

    fireEvent.click(btnBasico)
    expect(btnBasico).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(2)

    fireEvent.click(btnIntermedio)
    expect(btnIntermedio).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(3)

    fireEvent.click(btnAvanzado)
    expect(btnAvanzado).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(2)

    fireEvent.click(btnTodos)
    expect(visibleDetails()).toHaveLength(7)

    // Copy template t1 (ADR) and t2 (README)
    const copyT1Btn = document.querySelector(
      'button[data-c="t1"]'
    ) as HTMLButtonElement
    const copyT2Btn = document.querySelector(
      'button[data-c="t2"]'
    ) as HTMLButtonElement

    fireEvent.click(copyT1Btn)
    await waitFor(() => {
      expect(copyT1Btn.textContent).toBe('Copiado')
    })
    expect(writeTextMock).toHaveBeenCalledWith(ADR_TEMPLATE)

    fireEvent.click(copyT2Btn)
    await waitFor(() => {
      expect(copyT2Btn.textContent).toBe('Copiado')
    })
    expect(writeTextMock).toHaveBeenCalledWith(README_TEMPLATE)
  })

  it('evalúa las preguntas de cada módulo (.ok/.no y bloqueo al acertar) y persiste el progreso en localStorage', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <DocumentacionPatronesTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    expect(evaluateQuizOption(0, 1)).toBe(false)
    expect(evaluateQuizOption(0, 0)).toBe(true)

    const wrongBtn = document.querySelector(
      'button[data-m="0"][data-o="1"]'
    ) as HTMLButtonElement
    const rightBtn = document.querySelector(
      'button[data-m="0"][data-o="0"]'
    ) as HTMLButtonElement
    const thirdBtn = document.querySelector(
      'button[data-m="0"][data-o="2"]'
    ) as HTMLButtonElement

    fireEvent.click(wrongBtn)
    expect(wrongBtn.className).toContain('no')
    expect(wrongBtn).not.toBeDisabled()

    fireEvent.click(rightBtn)
    expect(rightBtn.className).toContain('ok')
    expect(wrongBtn).toBeDisabled()
    expect(rightBtn).toBeDisabled()
    expect(thirdBtn).toBeDisabled()

    const check0 = document.querySelector(
      'input[type="checkbox"][data-d="0"]'
    ) as HTMLInputElement
    const check2 = document.querySelector(
      'input[type="checkbox"][data-d="2"]'
    ) as HTMLInputElement

    fireEvent.click(check0)
    expect(document.getElementById('pct')?.textContent).toBe('14 %')
    expect(document.getElementById('c0')?.textContent).toBe('✔')

    fireEvent.click(check2)
    expect(document.getElementById('pct')?.textContent).toBe('29 %')
    expect(document.getElementById('c2')?.textContent).toBe('✔')

    const storedRaw = localStorage.getItem(STORAGE_KEY)
    expect(storedRaw).toBeTruthy()
    const parsed = JSON.parse(storedRaw ?? '{}') as CompletedModulesMap
    expect(parsed).toEqual({ d0: true, d2: true })
  })
})
