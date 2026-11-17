export type GuideMode = 'estudio' | 'reunion' | 'desarollador'

export type DotColorKey = 'g' | 'a' | 'r'

export type MindsetPairTuple = readonly [trap: string, decision: string]

export type LinkTuple = readonly [label: string, url: string]

export type PieceCardTuple = readonly [
  dot: DotColorKey,
  title: string,
  whatIsIt: string,
  hardWall: string,
  links: readonly LinkTuple[],
]

export type PromptItemTuple = readonly [title: string, body: string]

export type ConfigRowTuple = readonly [
  what: string,
  where: string,
  note: string,
  url: string,
]

export type StudyRouteItemTuple = readonly [label: string, url: string]

export type GlossaryItemTuple = readonly [term: string, definition: string]

export type SimulatorQuestionKey = 'need' | 'src' | 'vol' | 'usr' | 'lic'

export type SimulatorQuestionTuple = readonly [
  key: SimulatorQuestionKey,
  legend: string,
  options: readonly string[],
]

export interface SimulatorValues {
  need: number
  src: number
  vol: number
  usr: number
  lic: number
}

export type SimulatorOutputTuple = readonly [
  dot: DotColorKey,
  label: string,
  text: string,
]

export type ChecksStateMap = Record<string, boolean>
