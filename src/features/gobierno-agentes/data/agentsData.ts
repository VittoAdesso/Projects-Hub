import type {
  AgentItem,
  FailureStepTuple,
  HumanSupervisionRowTuple,
  PrincipleTuple,
} from '../types';

export const STORAGE_KEY = 'gobierno-agentes:agents';

export const PR: readonly PrincipleTuple[] = [
  [
    'Propósito acotado',
    'Cada agente tiene una finalidad escrita en una frase. Si no cabe en una frase, son dos agentes.',
  ],
  [
    'Mínimo privilegio',
    'Accede solo a las fuentes y acciones que necesita, nunca a todo lo que podría.',
  ],
  [
    'Humano según el impacto',
    'Cuanto mayor es el impacto de un error, más cerca debe estar una persona.',
  ],
  [
    'Trazabilidad',
    'Se sabe qué hizo, con qué datos y por qué, y se puede demostrar.',
  ],
  [
    'Evaluar antes de publicar',
    'Ningún agente pasa a producción sin pruebas con casos reales y un objetivo definido.',
  ],
  [
    'Siempre se puede apagar',
    'Hay un responsable, una parada rápida y un plan de retirada.',
  ],
] as const;

export const DA: readonly [string, string, string, string] = [
  'Públicos o genéricos',
  'Internos',
  'Confidenciales',
  'Personales o sensibles',
] as const;

export const AC: readonly [string, string, string, string] = [
  'Solo responde',
  'Prepara borradores',
  'Escribe en sistemas internos',
  'Envía al exterior o mueve dinero o datos',
] as const;

export const AU: readonly [string, string, string, string] = [
  'Sugiere y la persona decide',
  'La persona aprueba cada acción',
  'Actúa y se supervisa después',
  'Autónomo',
] as const;

export const AL: readonly [string, string, string, string] = [
  'Una persona',
  'Un equipo',
  'Un departamento',
  'Toda la empresa o externos',
] as const;

export const ST: readonly [string, string, string, string] = [
  'Idea',
  'Prototipo',
  'Piloto',
  'Producción',
] as const;

export const PEOPLE_DECISION_OPTIONS: readonly [string, string] = [
  'No',
  'Sí',
] as const;

export const CT: readonly string[] = [
  'Responsable nombrado y propósito escrito en una frase',
  'Instrucciones y fuentes de conocimiento documentadas',
  'Acceso solo a fuentes aprobadas, con permisos mínimos',
  'Los usuarios saben que hablan con una IA',
  'Pruebas con casos de evaluación antes de publicar',
  'Aprobación del responsable del área',
  'Registro de conversaciones y acciones según la política',
  'Aviso de que puede equivocarse y una vía para reportar errores',
  'Revisión periódica programada',
  'Revisión de seguridad y de privacidad con el DPO',
  'Evaluación de impacto y revisión legal',
  'Una persona aprueba las acciones críticas',
  'Pruebas de abuso: inyección de instrucciones y fuga de datos',
  'Registro completo y auditable',
  'Plan de retirada y desactivación rápida, probado',
  'Aprobación formal de dirección',
] as const;

export const NC: readonly [4, 9, 16] = [4, 9, 16] as const;

export const MESES: readonly [12, 6, 3] = [12, 6, 3] as const;

export const TN: readonly ['Bajo', 'Medio', 'Alto'] = [
  'Bajo',
  'Medio',
  'Alto',
] as const;

export const TC: readonly ['#2E7D52', '#B7791F', '#B83232'] = [
  '#2E7D52',
  '#B7791F',
  '#B83232',
] as const;

export function createBlankAgent(name: string = ''): AgentItem {
  return {
    n: name,
    o: '',
    pl: '',
    d: 1,
    a: 0,
    u: 0,
    s: 0,
    p: 0,
    st: 0,
    rv: '',
    ec: '',
    ea: '',
    ef: '',
    eo: '',
    ck: {},
  };
}

export const DEFAULT_AGENTS: readonly AgentItem[] = [
  {
    ...createBlankAgent('Ejemplo: asistente de consultas internas'),
    o: 'Responsable del área',
    pl: 'Copilot Studio',
    d: 1,
    a: 0,
    u: 0,
    s: 2,
    st: 2,
  },
  {
    ...createBlankAgent('Ejemplo: agente de apoyo a la selección de personal'),
    o: 'Responsable de RR. HH.',
    pl: 'Copilot Studio',
    d: 3,
    a: 1,
    u: 1,
    s: 1,
    p: 1,
    st: 1,
  },
] as const;

export const HUMAN_SUPERVISION_ROWS: readonly HumanSupervisionRowTuple[] = [
  [
    'Bajo',
    'La persona usa la respuesta y decide.',
    'Según la política de la empresa.',
    'Cada 12 meses',
  ],
  [
    'Medio',
    'Una persona revisa antes de que algo salga al exterior o se escriba en un sistema.',
    'Conversaciones y acciones.',
    'Cada 6 meses',
  ],
  [
    'Alto',
    'Una persona aprueba cada acción crítica. Parada de emergencia disponible.',
    'Completo y auditable.',
    'Cada 3 meses',
  ],
] as const;

export const FAILURE_PROTOCOL_STEPS: readonly FailureStepTuple[] = [
  ['Contener:', 'desactivar el agente o quitarle los permisos de escritura.'],
  [
    'Evaluar:',
    'qué datos y qué acciones se vieron afectados, y durante cuánto tiempo.',
  ],
  [
    'Avisar:',
    'al responsable, a seguridad y al DPO si hay datos personales.',
  ],
  [
    'Corregir:',
    'encontrar la causa en las instrucciones, las fuentes o los permisos.',
  ],
  [
    'Reevaluar:',
    'repetir las pruebas, incluida la que habría detectado el fallo, antes de reactivarlo.',
  ],
  ['Registrar:', 'dejar el incidente y la lección aprendida en el inventario.'],
] as const;
