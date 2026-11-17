import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import ChuletaStackTool from '@/features/chuleta-stack'
import {
  AF,
  C,
  C2,
  D,
  DV,
  F,
  G,
  K,
  L,
  R,
  R2,
  R3,
} from '@/features/chuleta-stack/data/stackData'
import {
  computeLegacyResHtml,
  computeLegacyStackOutputsHtml,
  filterDevLayers,
  filterStackLayers,
} from '@/features/chuleta-stack/hooks/useChuletaStack'
import { resolveLegacyFile } from './setup'

interface LegacyStackSandbox {
  C: Record<string, string>
  C2: Record<string, string>
  L: unknown[]
  D: [string, string, string, string][]
  F: unknown[]
  R: [string, string][]
  G: [string, string][]
  K: [string, string][]
  DV: unknown[]
  AF: [string, string][]
  R3: [string, string][]
  R2: [string, string][]
  outputs: {
    stackHtml: string
    chipsHtml: string
    resHtml: string
    flowsHtml: string
    rulesHtml: string
    glHtml: string
    codHtml: string
    stack2Html: string
    arqflowHtml: string
    rules3Html: string
    rules2Html: string
  }
  getResForPick: (i: number) => string
}

function loadLegacyStackSandbox(): LegacyStackSandbox {
  const htmlPath = resolveLegacyFile('chuleta-stack-tecnologico.html')
  const html = readFileSync(htmlPath, 'utf-8')
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  const inlineScript = scriptMatches[0]?.[1]
  if (!inlineScript) {
    throw new Error(
      'Could not find inline <script> in chuleta-stack-tecnologico.html'
    )
  }

  const elements: Record<
    string,
    {
      innerHTML: string
      textContent: string
      addEventListener: () => void
      onclick: unknown
    }
  > = {}

  const chipButtons: { setAttribute: (k: string, v: unknown) => void; ariaPressed: string }[] =
    Array.from({ length: 7 }, () => ({
      ariaPressed: 'false',
      setAttribute(k: string, v: unknown) {
        if (k === 'aria-pressed') {
          this.ariaPressed = String(v)
        }
      },
    }))

  const getElement = (sel: string) => {
    if (!elements[sel]) {
      elements[sel] = {
        innerHTML: '',
        textContent: '',
        addEventListener: () => {},
        onclick: null,
      }
    }
    return elements[sel]
  }

  const sandboxDocument = {
    querySelector: (sel: string) => getElement(sel),
    querySelectorAll: (sel: string) => {
      if (sel === '#chips button') return chipButtons
      return []
    },
    createElement: () => ({ href: '', download: '', click: () => {} }),
  }

  const context = vm.createContext({
    document: sandboxDocument,
    window: { print: () => {} },
    Date,
    Math,
    Number,
    String,
    Array,
    Object,
    JSON,
    setTimeout,
    URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
  })

  const instrumentedScript = `${inlineScript}
globalThis.__STACK_EXPORT__ = {
  C, C2, L, D, F, R, G, K, DV, AF, R3, R2,
  outputs: {
    stackHtml: $('#stack').innerHTML,
    chipsHtml: D.map((d, i) => '<button class="g" data-i="' + i + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + d[0] + '</button>').join(''),
    resHtml: $('#res').innerHTML,
    flowsHtml: $('#flows').innerHTML,
    rulesHtml: $('#rules').innerHTML,
    glHtml: $('#gl').innerHTML,
    codHtml: $('#cod').innerHTML,
    stack2Html: $('#stack2').innerHTML,
    arqflowHtml: $('#arqflow').innerHTML,
    rules3Html: $('#rules3').innerHTML,
    rules2Html: $('#rules2').innerHTML,
  },
  getResForPick: (idx) => {
    pick(idx);
    return $('#res').innerHTML;
  }
};`

  vm.runInContext(instrumentedScript, context)
  return (context as unknown as { __STACK_EXPORT__: LegacyStackSandbox })
    .__STACK_EXPORT__
}

describe('Mi stack tecnológico: chuleta (chuleta-stack)', () => {
  it('conserva paridad 100% en todos los catálogos estáticos (C, C2, L, D, F, R, G, K, DV, AF, R3, R2)', () => {
    const legacy = loadLegacyStackSandbox()

    expect(C).toEqual(legacy.C)
    expect(C2).toEqual(legacy.C2)
    expect(JSON.parse(JSON.stringify(L))).toEqual(legacy.L)
    expect(JSON.parse(JSON.stringify(D))).toEqual(legacy.D)
    expect(JSON.parse(JSON.stringify(F))).toEqual(legacy.F)
    expect(JSON.parse(JSON.stringify(R))).toEqual(legacy.R)
    expect(JSON.parse(JSON.stringify(G))).toEqual(legacy.G)
    expect(JSON.parse(JSON.stringify(K))).toEqual(legacy.K)
    expect(JSON.parse(JSON.stringify(DV))).toEqual(legacy.DV)
    expect(JSON.parse(JSON.stringify(AF))).toEqual(legacy.AF)
    expect(JSON.parse(JSON.stringify(R3))).toEqual(legacy.R3)
    expect(JSON.parse(JSON.stringify(R2))).toEqual(legacy.R2)
  })

  it('produce exactamente el mismo HTML en #stack, #chips, #res (en las 7 opciones), #flows, #rules, #gl, #cod, #stack2, #arqflow, #rules3 y #rules2', () => {
    const legacy = loadLegacyStackSandbox()
    const computed = computeLegacyStackOutputsHtml(0)

    expect(computed).toEqual(legacy.outputs)

    for (let i = 0; i < D.length; i++) {
      expect(computeLegacyResHtml(i)).toBe(legacy.getResForPick(i))
    }
  })

  it('filtra las herramientas (.tool) y oculta las capas vacías (.ly) exactamente igual que el buscador #q original', () => {
    const testQueries = [
      '',
      'sap',
      'api',
      'excel',
      'docker',
      '  OPENAPI  ',
      'inexistente-xyz',
    ]

    for (const rawQuery of testQueries) {
      const v = rawQuery.trim().toLowerCase()
      const s1 = filterStackLayers(rawQuery)
      const s2 = filterDevLayers(rawQuery)

      for (const layer of s1) {
        for (const tool of layer.tools) {
          const expectedHidden = Boolean(v && !tool.dataQ.includes(v))
          expect(tool.hidden).toBe(expectedHidden)
        }
        const expectedLayerHidden = !layer.tools.some((t) => !t.hidden)
        expect(layer.hidden).toBe(expectedLayerHidden)
      }

      for (const layer of s2) {
        for (const tool of layer.tools) {
          const expectedHidden = Boolean(v && !tool.dataQ.includes(v))
          expect(tool.hidden).toBe(expectedHidden)
        }
        const expectedLayerHidden = !layer.tools.some((t) => !t.hidden)
        expect(layer.hidden).toBe(expectedLayerHidden)
      }
    }
  })

  it('renderiza la interfaz completa, cambia las 7 decisiones en #chips, filtra en vivo con #q y ejecuta window.print()', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})

    render(
      <ThemeProvider>
        <MemoryRouter>
          <ChuletaStackTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    // Verify main headings
    expect(
      screen.getByRole('heading', { name: 'Mi stack tecnológico', level: 1 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Fase 1 · Power Platform: usar y automatizar',
        level: 2,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Fase 2 · Desarrollo: front, back, API, datos y servidor',
        level: 2,
      })
    ).toBeInTheDocument()

    // Check all 7 decision buttons in #chips
    const resBox = document.getElementById('res')
    expect(resBox).toBeTruthy()

    D.forEach(([needLabel, recommendedTool, reason, warning], index) => {
      const chipBtn = screen.getByRole('button', { name: needLabel })
      fireEvent.click(chipBtn)
      expect(chipBtn).toHaveAttribute('aria-pressed', 'true')
      expect(resBox?.textContent).toContain(recommendedTool)
      expect(resBox?.textContent).toContain(reason)
      expect(resBox?.textContent).toContain(warning)

      // Other buttons should have aria-pressed="false"
      D.forEach(([otherLabel], otherIndex) => {
        if (otherIndex !== index) {
          expect(
            screen.getByRole('button', { name: otherLabel })
          ).toHaveAttribute('aria-pressed', 'false')
        }
      })
    })

    // Test search input #q filtering
    const searchInput = screen.getByLabelText(
      'Buscar en la chuleta'
    ) as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: 'SAP' } })

    const allToolArticles = Array.from(
      document.querySelectorAll('article.tool')
    ) as HTMLElement[]
    const visibleTools = allToolArticles.filter((el) => !el.hidden)
    expect(visibleTools).toHaveLength(1)
    expect(visibleTools[0]?.textContent).toContain('PAD')

    // Clear search -> all 26 tool cards (15 Phase 1 + 11 Phase 2) become visible again
    fireEvent.change(searchInput, { target: { value: '' } })
    const visibleAfterClear = allToolArticles.filter((el) => !el.hidden)
    expect(visibleAfterClear).toHaveLength(26)

    // Test Print button
    fireEvent.click(screen.getByRole('button', { name: 'Imprimir' }))
    expect(printSpy).toHaveBeenCalledTimes(1)
    printSpy.mockRestore()
  })
})
