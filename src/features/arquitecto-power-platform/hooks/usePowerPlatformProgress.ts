import { useCallback, useMemo, useState } from 'react'
import { MODULES, STORAGE_KEY } from '../data/modulesData'
import type {
  CompletedModulesMap,
  FilterLevel,
  PowerPlatformModule,
  QuizSelectionsMap,
} from '../types'

export interface ProgressStats {
  readonly completedCount: number
  readonly totalCount: number
  readonly percentage: number
  readonly indicators: readonly ('✔' | '○')[]
}

export function calculateProgressStats(
  completedMap: CompletedModulesMap,
  modules: readonly PowerPlatformModule[] = MODULES
): ProgressStats {
  let completedCount = 0
  const indicators = modules.map((_, index) => {
    const isDone = Boolean(completedMap[`d${index}`])
    if (isDone) completedCount++
    return isDone ? '✔' : '○'
  })
  const totalCount = modules.length
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return {
    completedCount,
    totalCount,
    percentage,
    indicators,
  }
}

export function isModuleVisibleForFilter(
  moduleItem: PowerPlatformModule,
  filter: FilterLevel
): boolean {
  return filter === 'todos' || moduleItem.l === filter
}

export function evaluateQuizOption(
  moduleIndex: number,
  optionIndex: number,
  modules: readonly PowerPlatformModule[] = MODULES
): boolean {
  const mod = modules[moduleIndex]
  if (!mod) return false
  return optionIndex === mod.q[2]
}

export function computeLegacyModulesHtml(
  completedMap: CompletedModulesMap = {},
  modules: readonly PowerPlatformModule[] = MODULES
): string {
  let h = ''
  modules.forEach((x, i) => {
    h +=
      '<details data-l="' +
      x.l +
      '"><summary><span id="c' +
      i +
      '"></span>' +
      i +
      '. ' +
      x.t +
      '<span class="lv">' +
      x.l +
      '</span></summary><div class="body">' +
      '<h3>Objetivo</h3><p>' +
      x.o +
      '</p><h3>Temas</h3><ul>' +
      x.k.map((k) => '<li>' + k + '</li>').join('') +
      '</ul>' +
      '<h3>Recursos oficiales</h3><ul>' +
      x.r
        .map(
          (r) =>
            '<li><a href="' +
            r[1] +
            '" target="_blank" rel="noopener">' +
            r[0] +
            '</a></li>'
        )
        .join('') +
      '</ul>' +
      '<h3>Práctica</h3><p>' +
      x.p +
      '</p>' +
      '<div class="q"><h3>Comprueba lo aprendido</h3><p>' +
      x.q[0] +
      '</p>' +
      x.q[1]
        .map(
          (o, j) => '<button data-m="' + i + '" data-o="' + j + '">' + o + '</button>'
        )
        .join('') +
      '</div>' +
      '<label class="d"><input type="checkbox" data-d="' +
      i +
      '"' +
      (completedMap['d' + i] ? ' checked' : '') +
      '> Módulo completado</label></div></details>'
  })
  return h
}

export function loadProgressFromStorage(
  key: string = STORAGE_KEY
): CompletedModulesMap {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const clean: CompletedModulesMap = {}
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'boolean') {
          clean[k] = v
        }
      }
      return clean
    }
  } catch {
    // Ignore storage read errors
  }
  return {}
}

export function saveProgressToStorage(
  completedMap: CompletedModulesMap,
  key: string = STORAGE_KEY
): void {
  try {
    localStorage.setItem(key, JSON.stringify(completedMap))
  } catch {
    // Ignore storage write errors
  }
}

export function usePowerPlatformProgress() {
  const [completedMap, setCompletedMap] = useState<CompletedModulesMap>(() =>
    loadProgressFromStorage()
  )
  const [activeFilter, setActiveFilter] = useState<FilterLevel>('todos')
  const [quizSelections, setQuizSelections] = useState<QuizSelectionsMap>({})

  const toggleModuleCompleted = useCallback(
    (moduleIndex: number, checked: boolean) => {
      setCompletedMap((prev) => {
        const next: CompletedModulesMap = {
          ...prev,
          [`d${moduleIndex}`]: checked,
        }
        saveProgressToStorage(next)
        return next
      })
    },
    []
  )

  const selectQuizOption = useCallback(
    (moduleIndex: number, optionIndex: number) => {
      setQuizSelections((prev) => {
        const existing = prev[moduleIndex] ?? []
        const mod = MODULES[moduleIndex]
        if (!mod) return prev
        const alreadySolved = existing.includes(mod.q[2])
        if (alreadySolved) return prev
        if (existing.includes(optionIndex)) return prev
        return {
          ...prev,
          [moduleIndex]: [...existing, optionIndex],
        }
      })
    },
    []
  )

  const progressStats = useMemo(
    () => calculateProgressStats(completedMap, MODULES),
    [completedMap]
  )

  return {
    completedMap,
    activeFilter,
    setActiveFilter,
    quizSelections,
    toggleModuleCompleted,
    selectQuizOption,
    progressStats,
  }
}
