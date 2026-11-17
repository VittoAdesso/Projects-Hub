import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import GobiernoAgentesTool from '@/features/gobierno-agentes'
import {
  AC,
  AL,
  AU,
  CT,
  DA,
  DEFAULT_AGENTS,
  MESES,
  NC,
  PR,
  ST,
  STORAGE_KEY,
  TC,
  TN,
  createBlankAgent,
} from '@/features/gobierno-agentes/data/agentsData'
import {
  computeLegacyAgentsOutputsHtml,
  evaluateAgent,
} from '@/features/gobierno-agentes/hooks/useGobiernoAgentes'
import type { AgentEvaluation, AgentItem } from '@/features/gobierno-agentes/types'
import { resolveLegacyFile } from './setup'

interface LegacySandbox {
  PR: [string, string][]
  DA: string[]
  AC: string[]
  AU: string[]
  AL: string[]
  ST: string[]
  CT: string[]
  NC: number[]
  MESES: number[]
  TN: string[]
  TC: string[]
  AG: AgentItem[]
  eva: (a: AgentItem) => AgentEvaluation
  runOutputs: (agents: readonly AgentItem[]) => {
    dyList: string[]
    sm: string
  }
}

function loadLegacyGobiernoSandbox(): LegacySandbox {
  const htmlPath = resolveLegacyFile('gobierno-agentes-ia.html')
  const html = readFileSync(htmlPath, 'utf-8')
  const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  const inlineScript = scriptMatches[0]?.[1]
  if (!inlineScript) {
    throw new Error('Could not find inline <script> in gobierno-agentes-ia.html')
  }

  const elements: Record<
    string,
    {
      innerHTML: string
      textContent: string
      addEventListener: () => void
      onclick: unknown
      parentElement: { style: { setProperty: () => void } }
    }
  > = {}

  const getElement = (sel: string) => {
    if (!elements[sel]) {
      elements[sel] = {
        innerHTML: '',
        textContent: '',
        addEventListener: () => {},
        onclick: null,
        parentElement: { style: { setProperty: () => {} } },
      }
    }
    return elements[sel]
  }

  const sandboxDocument = {
    querySelector: (sel: string) => getElement(sel),
    createElement: () => ({ href: '', download: '', click: () => {} }),
  }

  const context = vm.createContext({
    document: sandboxDocument,
    window: { print: () => {} },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
    },
    Date,
    Math,
    Number,
    String,
    Array,
    Object,
    JSON,
    parseFloat,
    isFinite,
    setTimeout,
    URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
  })

  const instrumentedScript = `${inlineScript}
globalThis.__GOV_EXPORT__ = {
  PR, DA, AC, AU, AL, ST, CT, NC, MESES, TN, TC, AG, eva,
  runOutputs: (customAgents) => {
    AG = JSON.parse(JSON.stringify(customAgents));
    agsHTML();
    dyn();
    panel();
    return {
      dyList: AG.map((_, idx) => $('#dy' + idx).innerHTML),
      sm: $('#sm').innerHTML,
    };
  }
};`

  vm.runInContext(instrumentedScript, context)
  return (context as unknown as { __GOV_EXPORT__: LegacySandbox }).__GOV_EXPORT__
}

describe('Centro de gobierno de agentes de IA (gobierno-agentes)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('conserva paridad 100% en catálogos, principios, controles y agentes iniciales con el HTML legacy', () => {
    const legacy = loadLegacyGobiernoSandbox()

    expect(PR.map((p) => [...p])).toEqual(legacy.PR)
    expect([...DA]).toEqual(legacy.DA)
    expect([...AC]).toEqual(legacy.AC)
    expect([...AU]).toEqual(legacy.AU)
    expect([...AL]).toEqual(legacy.AL)
    expect([...ST]).toEqual(legacy.ST)
    expect([...CT]).toEqual(legacy.CT)
    expect([...NC]).toEqual(legacy.NC)
    expect([...MESES]).toEqual(legacy.MESES)
    expect([...TN]).toEqual(legacy.TN)
    expect([...TC]).toEqual(legacy.TC)
    expect(DEFAULT_AGENTS).toEqual(legacy.AG)
  })

  it('verifica paridad matemática exacta de eva() en las 512 combinaciones de factores de clasificación y estados de evaluación/revisión', () => {
    const legacy = loadLegacyGobiernoSandbox()
    const now = new Date()

    // 1. Exhaustive 4 * 4 * 4 * 4 * 2 = 512 classification combinations
    for (let d = 0; d < 4; d++) {
      for (let a = 0; a < 4; a++) {
        for (let u = 0; u < 4; u++) {
          for (let s = 0; s < 4; s++) {
            for (let p = 0; p < 2; p++) {
              const sample: AgentItem = {
                ...createBlankAgent(`Agent-${d}-${a}-${u}-${s}-${p}`),
                d,
                a,
                u,
                s,
                p,
                st: (d + a + u) % 4,
              }
              expect(evaluateAgent(sample, now)).toEqual(legacy.eva(sample))
            }
          }
        }
      }
    }

    // 2. Test evaluation & review edge cases across tiers and statuses
    const testVariations: Partial<AgentItem>[] = [
      { st: 3, ec: '', ea: '', ef: '', eo: '', rv: '' },
      { st: 3, ec: '20', ea: '19', ef: '0', eo: '90', rv: '2020-01-15' },
      { st: 2, ec: '20', ea: '25', ef: '0', eo: '90', rv: '2099-01-15' },
      { st: 3, ec: '20', ea: '15', ef: '0', eo: '85', rv: '2021-06-01' },
      { st: 3, ec: '20', ea: '20', ef: '2', eo: '95', rv: '' },
      { st: 1, ec: '10', ea: '10', ef: '0', eo: '0', rv: '' },
      {
        st: 3,
        d: 0,
        a: 0,
        u: 0,
        s: 0,
        p: 0,
        ck: { 0: true, 1: true, 2: true, 3: true },
        rv: '2099-12-31',
      },
      {
        st: 2,
        d: 2,
        a: 2,
        u: 1,
        s: 1,
        p: 0,
        ec: '50',
        ea: '48',
        ef: '0',
        eo: '95',
        ck: {
          0: true,
          1: true,
          2: true,
          3: true,
          4: true,
          5: true,
          6: true,
          7: true,
          8: true,
        },
        rv: '2020-03-10',
      },
    ]

    for (const variation of testVariations) {
      const agent: AgentItem = {
        ...createBlankAgent('Variation'),
        ...variation,
      }
      expect(evaluateAgent(agent, now)).toEqual(legacy.eva(agent))
    }
  })

  it('produce exactamente el mismo HTML en #dy y #sm que el script original', () => {
    const legacy = loadLegacyGobiernoSandbox()
    const now = new Date()

    // Case A: Default agents
    const defaultOut = computeLegacyAgentsOutputsHtml(DEFAULT_AGENTS, now)
    const legacyDefaultOut = legacy.runOutputs(DEFAULT_AGENTS)
    expect(defaultOut).toEqual(legacyDefaultOut)

    // Case B: Empty agents inventory
    const emptyOut = computeLegacyAgentsOutputsHtml([], now)
    const legacyEmptyOut = legacy.runOutputs([])
    expect(emptyOut).toEqual(legacyEmptyOut)

    // Case C: Custom multi-agent scenario covering all 4 committee lists
    const customAgents: AgentItem[] = [
      {
        ...createBlankAgent('Agente Prod Pendiente'),
        o: '',
        pl: 'Vertex AI',
        d: 3,
        a: 3,
        u: 3,
        s: 3,
        p: 1,
        st: 3,
        rv: '2021-01-01',
        ec: '10',
        ea: '8',
        ef: '1',
        eo: '90',
        ck: { 0: true },
      },
      {
        ...createBlankAgent('Agente Listo'),
        o: 'Ana García',
        pl: 'OpenAI',
        d: 0,
        a: 0,
        u: 0,
        s: 1,
        p: 0,
        st: 2,
        rv: '2099-05-01',
        ck: { 0: true, 1: true, 2: true, 3: true },
      },
    ]
    const customOut = computeLegacyAgentsOutputsHtml(customAgents, now)
    const legacyCustomOut = legacy.runOutputs(customAgents)
    expect(customOut).toEqual(legacyCustomOut)
  })

  it('renderiza la interfaz completa, actualiza el nivel de riesgo y controles en vivo, añade/borra agentes y persiste en localStorage', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})

    render(
      <ThemeProvider>
        <MemoryRouter>
          <GobiernoAgentesTool />
        </MemoryRouter>
      </ThemeProvider>
    )

    // Verify main headings
    expect(
      screen.getByRole('heading', {
        name: 'Centro de gobierno de agentes de IA',
        level: 1,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '1 · Principios de gobierno',
        level: 2,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '2 · Inventario y control de agentes',
        level: 2,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: '3 · Panel del comité',
        level: 2,
      })
    ).toBeInTheDocument()

    // First agent starts at Riesgo bajo (score 3, 4 controls)
    expect(screen.getByText('Riesgo bajo')).toBeInTheDocument()
    expect(
      screen.getByText('Controles obligatorios: 0 de 4')
    ).toBeInTheDocument()

    // Second agent starts at Riesgo alto (16 controls)
    expect(screen.getByText('Riesgo alto')).toBeInTheDocument()
    expect(
      screen.getByText('Controles obligatorios: 0 de 16')
    ).toBeInTheDocument()

    // Change "Decisiones sobre personas" on Agent 0 from No (0) to Sí (1) -> promotes to Riesgo alto (16 controls)
    const peopleSelect0 = document.getElementById('p0') as HTMLSelectElement
    expect(peopleSelect0).toBeTruthy()
    fireEvent.change(peopleSelect0, { target: { value: '1' } })

    expect(screen.getAllByText('Riesgo alto')).toHaveLength(2)
    expect(
      screen.getAllByText('Controles obligatorios: 0 de 16')
    ).toHaveLength(2)

    // Check first mandatory control on Agent 0
    const controlCheckbox = document.getElementById(
      'c0_0'
    ) as HTMLInputElement
    expect(controlCheckbox).toBeTruthy()
    fireEvent.click(controlCheckbox)
    expect(
      screen.getByText('Controles obligatorios: 1 de 16')
    ).toBeInTheDocument()

    // Verify localStorage persistence with 'gobierno-agentes:agents'
    const storedRaw = localStorage.getItem(STORAGE_KEY)
    expect(storedRaw).toBeTruthy()
    const storedAgents = JSON.parse(storedRaw ?? '[]') as AgentItem[]
    expect(storedAgents).toHaveLength(2)
    expect(storedAgents[0]?.p).toBe(1)
    expect(storedAgents[0]?.ck[0]).toBe(true)

    // Add a new agent
    const addBtn = screen.getByRole('button', { name: 'Añadir agente' })
    fireEvent.click(addBtn)
    expect(
      screen.getByRole('button', { name: 'Borrar el agente 3' })
    ).toBeInTheDocument()

    // Delete all 3 agents and check empty committee panel state
    fireEvent.click(screen.getByRole('button', { name: 'Borrar el agente 3' }))
    fireEvent.click(screen.getByRole('button', { name: 'Borrar el agente 2' }))
    fireEvent.click(screen.getByRole('button', { name: 'Borrar el agente 1' }))

    expect(
      screen.getByText('Añade agentes en el inventario para ver el panel.')
    ).toBeInTheDocument()

    // Test print button
    fireEvent.click(screen.getByRole('button', { name: 'Imprimir' }))
    expect(printSpy).toHaveBeenCalledTimes(1)
    printSpy.mockRestore()
  })
})
