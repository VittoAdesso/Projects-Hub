export type IdeaFieldKey = 'n' | 'a' | 'h' | 'd' | 'r' | 'x';

export type QuadrantIndex = 0 | 1 | 2 | 3;

export interface IdeaRow {
  n: string;
  a: string;
  h: number | string;
  d: number | string;
  r: number | string;
  x: number | string;
}

export interface PrioritizerState {
  ch: string;
  rows: IdeaRow[];
}

export interface CalculatedIdeaRow extends IdeaRow {
  readonly i: number;
  readonly hy: number;
  readonly d: number;
  readonly k: number;
  readonly sc: number;
  readonly ah: number;
  readonly pay: number | null;
  readonly ok: boolean;
  q: QuadrantIndex;
}

export interface PrioritizerCalculationResult {
  readonly L: CalculatedIdeaRow[];
  readonly V: CalculatedIdeaRow[];
  readonly mY: number;
  readonly mX: number;
  readonly ch: number;
}
