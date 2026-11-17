export type RiskTierIndex = 0 | 1 | 2;

export type AgentTextKey =
  | 'n'
  | 'o'
  | 'pl'
  | 'rv'
  | 'ec'
  | 'ea'
  | 'ef'
  | 'eo';

export type AgentSelectKey = 'd' | 'a' | 'u' | 's' | 'p' | 'st';

export type AgentChecksMap = Record<number, boolean>;

export interface AgentItem {
  n: string;
  o: string;
  pl: string;
  d: number;
  a: number;
  u: number;
  s: number;
  p: number;
  st: number;
  rv: string;
  ec: string;
  ea: string;
  ef: string;
  eo: string;
  ck: AgentChecksMap;
}

export interface AgentEvaluation {
  readonly sc: number;
  readonly t: RiskTierIndex;
  readonly why: readonly string[];
  readonly nc: number;
  readonly done: number;
  readonly pend: number;
  readonly ev: string;
  readonly evOk: boolean;
  readonly vd: string;
  readonly vc: string;
  readonly rvs: string;
  readonly ac: number;
}

export type PrincipleTuple = readonly [title: string, description: string];

export type HumanSupervisionRowTuple = readonly [
  level: string,
  supervision: string,
  logging: string,
  reviewFrequency: string,
];

export type FailureStepTuple = readonly [label: string, action: string];
