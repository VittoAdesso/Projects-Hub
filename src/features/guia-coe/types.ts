export type CoeColorToken = '--bl' | '--pu' | '--gr' | '--or';

export type ConceptTuple = readonly [
  title: string,
  description: string,
  purpose: string,
  typicalMistake: string,
  colorToken: CoeColorToken,
];

export type ModelTuple = readonly [
  title: string,
  description: string,
  when: string,
  advantages: string,
  risks: string,
  colorToken: CoeColorToken,
];

export type AdvisorQuestionTuple = readonly [
  question: string,
  options: readonly [string, string, string],
];

export type AdvisorAnswers = readonly [number, number, number, number];

export type RecommendationTuple = readonly [
  title: string,
  summary: string,
  steps: readonly string[],
];

export interface AdvisorEvaluationResult {
  readonly isComplete: boolean;
  readonly modelIndex?: 0 | 1 | 2;
  readonly model?: RecommendationTuple;
  readonly warnings: readonly string[];
}

export type PhaseTuple = readonly [
  title: string,
  summary: string,
  questions: readonly string[],
  deliverable: string,
  toAvoid: string,
];

export type RaciRowTuple = readonly [
  decision: string,
  direccion: string,
  leadCoe: string,
  responsableArea: string,
  quienImplementa: string,
];

export type MaturityLevelTuple = readonly [
  code: string,
  name: string,
  description: string,
];

export interface NavAnchorItem {
  readonly id: string;
  readonly label: string;
}
