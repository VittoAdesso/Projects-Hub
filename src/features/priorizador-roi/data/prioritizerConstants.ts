import type { IdeaRow, QuadrantIndex } from '../types';

export const STORAGE_KEY = 'priorizador-roi:state';

export const DEFAULT_IDEAS: readonly IdeaRow[] = [
  {
    n: 'Ejemplo: informe semanal automático',
    a: 'Operaciones',
    h: 20,
    d: 5,
    r: 1,
    x: 0,
  },
  {
    n: 'Ejemplo: alta de usuarios en SAP',
    a: 'Soporte',
    h: 40,
    d: 15,
    r: 2,
    x: 0,
  },
  {
    n: 'Ejemplo: agente de consultas internas',
    a: 'Varias',
    h: 30,
    d: 30,
    r: 3,
    x: 1200,
  },
] as const;

export const QN: readonly [string, string, string, string] = [
  'Hazlo ya',
  'Proyecto estratégico',
  'Relleno',
  'Replantéalo',
] as const;

export const QUADRANT_PILL_CLASSES: Record<QuadrantIndex, string> = {
  0: 'q1 text-[var(--pr-q1,#1F6B3F)] border-[var(--pr-q1,#1F6B3F)]',
  1: 'q2 text-[var(--pr-q2,#2563A8)] border-[var(--pr-q2,#2563A8)]',
  2: 'q3 text-[var(--pr-q3,#52616F)] border-[var(--pr-q3,#52616F)]',
  3: 'q4 text-[var(--pr-q4,#B83232)] border-[var(--pr-q4,#B83232)]',
};

export const RISK_OPTIONS: readonly [
  readonly [1, 'Bajo'],
  readonly [2, 'Medio'],
  readonly [3, 'Alto'],
] = [
  [1, 'Bajo'],
  [2, 'Medio'],
  [3, 'Alto'],
] as const;

export const CHART_RISK_COLORS: readonly [string, string, string] = [
  '#2E7D52',
  '#B7791F',
  '#B83232',
] as const;
