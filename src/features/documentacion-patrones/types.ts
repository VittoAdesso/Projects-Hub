export type DifficultyLevel = 'Básico' | 'Intermedio' | 'Avanzado'

export type FilterLevel = 'todos' | DifficultyLevel

export type TemplateId = 't1' | 't2'

export type ResourceLinkTuple = readonly [label: string, url: string]

export type QuizTuple = readonly [
  question: string,
  options: readonly [string, string, string],
  correctIndex: number,
]

export interface DocPatternModule {
  readonly t: string
  readonly l: DifficultyLevel
  readonly o: string
  readonly k: readonly string[]
  readonly r: readonly ResourceLinkTuple[]
  readonly p: string
  readonly q: QuizTuple
}

export type CompletedModulesMap = Record<string, boolean>

export type QuizSelectionsMap = Record<number, readonly number[]>
