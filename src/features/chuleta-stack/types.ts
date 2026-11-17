export type StackLayerKey = 'ui' | 'or' | 'ex' | 'co' | 'da' | 'le'

export type DevLayerKey = 'fe' | 'be' | 'db' | 'sv' | 'qa'

export type AnyLayerColorKey = StackLayerKey | DevLayerKey

export type LicenseCategoryKey = 'ok' | 'mx' | 'pr' | 'ow'

export type StackToolTuple = readonly [
  name: string,
  role: string,
  useFor: string,
  limit: string,
  licenseKey: LicenseCategoryKey,
  licenseLabel: string,
]

export type StackLayerTuple = readonly [
  key: StackLayerKey,
  title: string,
  subtitle: string,
  tools: readonly StackToolTuple[],
]

export type DecisionOptionTuple = readonly [
  needLabel: string,
  recommendedTool: string,
  reason: string,
  warning: string,
]

export type FlowStepTuple = readonly [label: string, colorKey: AnyLayerColorKey]

export type ArchitectureFlowTuple = readonly [
  title: string,
  steps: readonly FlowStepTuple[],
  description: string,
]

export type RuleTuple = readonly [boldLead: string, detail: string]

export type GlossaryTermTuple = readonly [term: string, definition: string]

export type HttpStatusCodeTuple = readonly [code: string, meaning: string]

export type DevToolTuple = readonly [
  title: string,
  subtitle: string,
  badge: string,
  bullets: readonly string[],
]

export type DevLayerTuple = readonly [
  key: DevLayerKey,
  title: string,
  subtitle: string,
  tools: readonly DevToolTuple[],
]

export interface FilteredStackToolItem {
  readonly name: string
  readonly role: string
  readonly useFor: string
  readonly limit: string
  readonly licenseKey: LicenseCategoryKey
  readonly licenseLabel: string
  readonly dataQ: string
  readonly hidden: boolean
}

export interface FilteredStackLayerItem {
  readonly key: StackLayerKey
  readonly title: string
  readonly subtitle: string
  readonly colorHex: string
  readonly hidden: boolean
  readonly tools: readonly FilteredStackToolItem[]
}

export interface FilteredDevToolItem {
  readonly title: string
  readonly subtitle: string
  readonly badge: string
  readonly bullets: readonly string[]
  readonly dataQ: string
  readonly hidden: boolean
}

export interface FilteredDevLayerItem {
  readonly key: DevLayerKey
  readonly title: string
  readonly subtitle: string
  readonly colorHex: string
  readonly hidden: boolean
  readonly tools: readonly FilteredDevToolItem[]
}
