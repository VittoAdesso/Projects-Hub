import type {
  FieldDefinitionTuple,
  ProcessRow,
  RiskLevelClass,
  RiskLevelTuple,
} from '../types';

export const STORAGE_KEY = 'mapa-riesgo:rows';

export const DEFAULT_ROWS: readonly ProcessRow[] = [
  {
    n: 'Ejemplo: consolidación semanal en Excel',
    c: 2,
    p: 1,
    d: 1,
    k: 0,
    s: 0,
    t: 0,
  },
  {
    n: 'Ejemplo: carga de facturas en SAP',
    c: 3,
    p: 1,
    d: 0,
    k: 1,
    s: 1,
    t: 1,
  },
  {
    n: 'Ejemplo: aviso de vencimiento de contratos',
    c: 1,
    p: 2,
    d: 2,
    k: 0,
    s: 0,
    t: 2,
  },
] as const;

export const F: readonly FieldDefinitionTuple[] = [
  [
    'c',
    'Criticidad si falla',
    [
      [1, 'Baja'],
      [2, 'Media'],
      [3, 'Alta'],
    ],
  ],
  [
    'p',
    'Personas que saben operarlo',
    [
      [1, 'Solo una'],
      [2, 'Dos'],
      [3, 'Tres o más'],
    ],
  ],
  [
    'd',
    'Manual de operación',
    [
      [0, 'No hay'],
      [1, 'Parcial'],
      [2, 'Completo'],
    ],
  ],
  [
    'k',
    'Credenciales que caducan o rotan',
    [
      [0, 'No'],
      [1, 'Sí'],
    ],
  ],
  [
    's',
    'Depende de la pantalla de otro sistema',
    [
      [0, 'No'],
      [1, 'Sí'],
    ],
  ],
  [
    't',
    'Última prueba de recuperación',
    [
      [0, 'Nunca'],
      [1, 'Hace más de 6 meses'],
      [2, 'Reciente'],
    ],
  ],
] as const;

export const PP: readonly [number, number, number] = [3, 1.5, 0] as const;
export const DD: readonly [number, number, number] = [3, 1.5, 0] as const;
export const TT: readonly [number, number, number] = [2, 1, 0] as const;
export const MAXF = 10.5;

export const LV: readonly [RiskLevelTuple, RiskLevelTuple, RiskLevelTuple] = [
  ['Bajo', 'v'],
  ['Medio', 'a'],
  ['Alto', 'r'],
] as const;

export const CRITICALITY_LABELS: readonly [string, string, string] = [
  'Baja',
  'Media',
  'Alta',
] as const;

export const PILL_COLOR_CLASSES: Record<RiskLevelClass, string> = {
  v: 'v text-[var(--mr-pill-v,#1F6B3F)] border-[var(--mr-pill-v,#1F6B3F)]',
  a: 'a text-[var(--mr-pill-a,#8A5A00)] border-[var(--mr-pill-a,#8A5A00)]',
  r: 'r text-[var(--mr-pill-r,#B83232)] border-[var(--mr-pill-r,#B83232)]',
};
