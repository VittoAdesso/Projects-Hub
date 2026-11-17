export type ProcessSelectKey = 'c' | 'p' | 'd' | 'k' | 's' | 't';

export interface ProcessRow {
  n: string;
  c: number;
  p: number;
  d: number;
  k: number;
  s: number;
  t: number;
}

export type FieldOptionTuple = readonly [value: number, label: string];

export type FieldDefinitionTuple = readonly [
  key: ProcessSelectKey,
  label: string,
  options: readonly FieldOptionTuple[],
];

export type RiskLevelIndex = 0 | 1 | 2;

export type RiskLevelClass = 'v' | 'a' | 'r';

export type RiskLevelTuple = readonly [label: string, code: RiskLevelClass];

export interface CalculatedProcessRow extends ProcessRow {
  readonly i: number;
  readonly f: number;
  readonly risk: number;
  readonly lv: RiskLevelIndex;
}

export type PrioritizedAction = readonly [
  row: CalculatedProcessRow,
  text: string,
];
