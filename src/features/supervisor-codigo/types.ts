export type AuditValue = 'c' | 'p' | 'n' | 'x';

export type AuditAnswersMap = Record<string, AuditValue>;

export type AuditOptionTuple = readonly [value: AuditValue, label: string];

export type AuditItemTuple =
  | readonly [text: string, weight: 1 | 2 | 3]
  | readonly [text: string, weight: 1 | 2 | 3, question: string];

export type AuditGroupTuple = readonly [
  name: string,
  colorHex: string,
  items: readonly AuditItemTuple[],
];

export type PhaseRefTuple = readonly [name: string, description: string];

export type ConceptRefTuple = readonly [
  name: string,
  definition: string,
  warningSign: string,
];

export type GroupScoreTuple = readonly [
  name: string,
  percentage: number | null,
  evaluatedCount: number,
  totalCount: number,
];

export interface AuditFinding {
  readonly g: string;
  readonly t: string;
  readonly wt: 1 | 2 | 3;
  readonly v: 'n' | 'p';
  readonly q?: string;
}

export interface SupervisorStorageState {
  s: AuditAnswersMap;
  n: string;
}

export interface AuditEvaluationResult {
  readonly globalPercentage: number | null;
  readonly evaluatedCount: number;
  readonly totalItemsCount: number;
  readonly groupRows: readonly GroupScoreTuple[];
  readonly findings: readonly AuditFinding[];
  readonly criticalNoItems: readonly AuditFinding[];
  readonly importantPendingItems: readonly AuditFinding[];
}
