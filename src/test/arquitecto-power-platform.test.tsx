import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import ArquitectoPowerPlatformTool from '@/features/arquitecto-power-platform'
import {
  L,
  MODULES,
  STORAGE_KEY,
} from '@/features/arquitecto-power-platform/data/modulesData'
import {
  calculateProgressStats,
  computeLegacyModulesHtml,
  evaluateQuizOption,
} from '@/features/arquitecto-power-platform/hooks/usePowerPlatformProgress'
import type {
  CompletedModulesMap,
  PowerPlatformModule,
} from '@/features/arquitecto-power-platform/types'
import { resolveLegacyFile } from './setup'

interface LegacyPaArqSandbox {
  L: string
  M: PowerPlatformModule[]
  initialHtml: string
  runUpdWithState: (state: CompletedModulesMap) => {
    pctText: string
    fillWidth: string
    indicators: string[]
  }
}

function loadLegacyPaArqSandbox(): LegacyPaArqSandbox {
  const htmlPath = resolveLegacyFile('power-platform-arquitecto-ruta.html')
  const html = readFileSync(htmlPath, 'utf-8')
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  const inlineScript = scriptMatches[0]?.[1]
  if (!inlineScript) {
    throw new Error(
      'Could not find inline <script> in power-platform-arquitecto-ruta.html'
    )
  }

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
globalThis.__PA_ARQ_EXPORT__ = {
  L: L,
  M: M,
  initialHtml: document.getElementById("m").innerHTML,
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
  return (context as unknown as { __PA_ARQ_EXPORT__: LegacyPaArqSandbox })
    .__PA_ARQ_EXPORT__
}

describe('Arquitectura de soluciones en Power Platform (arquitecto-power-platform)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('conserva paridad 100% en L, los 7 módulos de M y el HTML generado para #m', () => {
    const legacy = loadLegacyPaArqSandbox()

    expect(L).toBe(legacy.L)
    expect(JSON.parse(JSON.stringify(MODULES))).toEqual(legacy.M)
    expect(computeLegacyModulesHtml({})).toBe(legacy.initialHtml)
  })

  it('calcula exactamente el mismo porcentaje (#pct) e indicadores (#c0..#c6) que upd() para cualquier combinación de módulos completados', () => {
    const legacy = loadLegacyPaArqSandbox()

    // Test all 2^7 = 128 completion combinations
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

  it('filtra por nivel (Todos, Básico, Intermedio, Avanzado) y actualiza aria-pressed e hidden', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <ArquitectoPowerPlatformTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    const allDetails = () =>
      Array.from(document.querySelectorAll('#m details')) as HTMLElement[]
    const visibleDetails = () => allDetails().filter((d) => !d.hidden)

    // Default: Todos (7 modules visible)
    const btnTodos = screen.getByRole('button', { name: 'Todos' })
    const btnBasico = screen.getByRole('button', { name: 'Básico' })
    const btnIntermedio = screen.getByRole('button', { name: 'Intermedio' })
    const btnAvanzado = screen.getByRole('button', { name: 'Avanzado' })

    expect(btnTodos).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(7)

    // Filter Básico -> 2 modules
    fireEvent.click(btnBasico)
    expect(btnBasico).toHaveAttribute('aria-pressed', 'true')
    expect(btnTodos).toHaveAttribute('aria-pressed', 'false')
    expect(visibleDetails()).toHaveLength(2)

    // Filter Intermedio -> 3 modules
    fireEvent.click(btnIntermedio)
    expect(btnIntermedio).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(3)

    // Filter Avanzado -> 2 modules
    fireEvent.click(btnAvanzado)
    expect(btnAvanzado).toHaveAttribute('aria-pressed', 'true')
    expect(visibleDetails()).toHaveLength(2)

    // Back to Todos -> 7 modules
    fireEvent.click(btnTodos)
    expect(visibleDetails()).toHaveLength(7)
  })

  it('evalúa las preguntas de cada módulo (.ok/.no y bloqueo al acertar) y persiste el progreso en localStorage', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <ArquitectoPowerPlatformTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    // Module 0 quiz: option 1 ("funcional") is wrong, option 0 ("no funcional") is correct
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

    // Check module 0 and module 1 completed -> 2 / 7 = 29 %
    const check0 = document.querySelector(
      'input[type="checkbox"][data-d="0"]'
    ) as HTMLInputElement
    const check1 = document.querySelector(
      'input[type="checkbox"][data-d="1"]'
    ) as HTMLInputElement

    fireEvent.click(check0)
    expect(document.getElementById('pct')?.textContent).toBe('14 %')
    expect(document.getElementById('c0')?.textContent).toBe('✔')

    fireEvent.click(check1)
    expect(document.getElementById('pct')?.textContent).toBe('29 %')
    expect(document.getElementById('c1')?.textContent).toBe('✔')

    // Verify localStorage persistence under 'arquitecto-power-platform:progress'
    const storedRaw = localStorage.getItem(STORAGE_KEY)
    expect(storedRaw).toBeTruthy()
    const parsed = JSON.parse(storedRaw ?? '{}') as CompletedModulesMap
    expect(parsed).toEqual({ d0: true, d1: true })
  })
})
