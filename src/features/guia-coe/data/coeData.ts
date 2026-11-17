import type {
  AdvisorQuestionTuple,
  ConceptTuple,
  MaturityLevelTuple,
  ModelTuple,
  NavAnchorItem,
  PhaseTuple,
  RaciRowTuple,
  RecommendationTuple,
} from '../types';

export const NAV_ANCHORS: readonly NavAnchorItem[] = [
  { id: 'c', label: 'Conceptos' },
  { id: 'm', label: 'Modelos' },
  { id: 'a', label: 'Asistente' },
  { id: 'f', label: 'Método' },
  { id: 'i', label: 'Integrar áreas' },
  { id: 'r', label: 'RACI' },
  { id: 'n', label: 'Madurez' },
  { id: 't', label: 'Consejos' },
] as const;

export const CO: readonly ConceptTuple[] = [
  [
    'CoE (Centro de Excelencia)',
    'Equipo o modelo que concentra conocimiento, reglas y herramientas de una disciplina para toda la organización.',
    'Que cada área no reinvente lo mismo y que el trabajo sea consistente.',
    'Montarlo como un departamento burocrático en vez de como un servicio útil.',
    '--bl',
  ],
  [
    'Gobernanza',
    'Define quién decide qué y con qué reglas.',
    'Evitar ambigüedad y trabajo sin aprobación.',
    'Reglas escritas que nadie sigue.',
    '--pu',
  ],
  [
    'Estándares',
    'Cómo se nombra, ordena y documenta el trabajo.',
    'Que otra persona pueda continuar lo que hizo alguien.',
    'Crear plantillas para todo antes de que hagan falta.',
    '--gr',
  ],
  [
    'Operación',
    'Cómo fluye el trabajo cada día: demanda, tablero, registro e incidencias.',
    'Visibilidad y prioridades claras.',
    'Un tablero que solo actualiza una persona.',
    '--or',
  ],
  [
    'Plataforma',
    'Herramientas, licencias, entornos y accesos.',
    'Controlar costes y riesgos.',
    'Credenciales compartidas por chat.',
    '--bl',
  ],
  [
    'Puerta (gate)',
    'Condición que debe cumplirse antes de avanzar, como tener un diseño aprobado antes de desarrollar.',
    'Evitar empezar a programar sin saber qué se pide.',
    'Poner demasiadas puertas a un equipo pequeño.',
    '--pu',
  ],
  [
    'Intake',
    'La vía por la que entran las solicitudes nuevas.',
    'Filtrar y ordenar la demanda.',
    'Peticiones de pasillo que nadie registra.',
    '--gr',
  ],
  [
    'Registro maestro',
    'Inventario único de proyectos con su estado y responsable.',
    'Es la base de los informes y de las auditorías.',
    'Tener dos listas que se contradicen.',
    '--or',
  ],
  [
    'RACI',
    'Reparto de Responsable, Aprobador, Consultado e Informado por cada decisión.',
    'Saber a quién acudir para cada cosa.',
    'Poner dos aprobadores en la misma decisión.',
    '--bl',
  ],
] as const;

export const MO: readonly ModelTuple[] = [
  [
    'Centralizado',
    'Un solo equipo atiende a todas las áreas.',
    'Equipos pequeños, herramientas comunes y poca madurez de partida.',
    'Coherencia, poco coste y decisiones rápidas.',
    'Cuello de botella y poca implicación de las áreas.',
    '--bl',
  ],
  [
    'Federado',
    'Cada área tiene su propio CoE, con unas reglas mínimas comunes.',
    'Áreas muy distintas, mucha gente y herramientas diferentes.',
    'Cercanía y autonomía.',
    'Duplicidades y estándares que se alejan.',
    '--or',
  ],
  [
    'Híbrido (núcleo y áreas)',
    'Un núcleo define reglas, estándares y plataforma; en cada área hay una persona de enlace que gestiona su demanda.',
    'Varias áreas con herramientas en parte comunes.',
    'Equilibrio entre control y cercanía.',
    'Roles poco claros si no se define quién decide qué.',
    '--gr',
  ],
] as const;

export const Q: readonly AdvisorQuestionTuple[] = [
  ['¿Cuántas personas dedicadas tendrá el CoE?', ['1 o 2', '3 a 6', '7 o más']],
  [
    '¿Qué herramientas usan las áreas?',
    ['Casi las mismas', 'En parte las mismas', 'Muy distintas'],
  ],
  ['¿Qué hay escrito hoy?', ['Nada', 'Algo', 'Bastante']],
  ['¿Tiene apoyo de dirección?', ['Claro', 'Parcial', 'Ninguno']],
] as const;

export const MD: readonly [
  RecommendationTuple,
  RecommendationTuple,
  RecommendationTuple,
] = [
  [
    'Centralizado con una persona de enlace por área',
    'Con tan poca gente, repartir el CoE entre áreas no se sostiene. Centraliza las decisiones y pide a cada área una persona que te traiga su demanda.',
    [
      'Nombra una persona de enlace por área',
      'Haz una ficha de diagnóstico de una página por área',
      'Define roles, ciclo de vida y una sola puerta de aprobación',
      'Crea un registro maestro único y un tablero',
    ],
  ],
  [
    'Federado con un mínimo común',
    'Hay gente y herramientas distintas, así que cada área necesita autonomía. Antes de dársela, fija un mínimo común obligatorio.',
    [
      'Define el mínimo común: nombres, registro maestro y plataforma',
      'Acuerda quién arbitra entre áreas',
      'Cada área hace su diagnóstico y su tablero',
      'Revisa cada trimestre que se respetan los mínimos',
    ],
  ],
  [
    'Híbrido: núcleo y áreas',
    'Hay recursos y algo en común: el núcleo marca reglas y plataforma, y cada área gestiona su demanda con una persona de enlace.',
    [
      'Diagnóstico por área, empezando por la más madura',
      'Gobernanza común y reparto de decisiones (RACI)',
      'Estándares mínimos comunes y un registro maestro único',
      'Inventario de plataforma y accesos compartido',
    ],
  ],
] as const;

export const FS: readonly PhaseTuple[] = [
  [
    '0 · Diagnóstico',
    'Entender el punto de partida.',
    [
      '¿Cuántas personas son y qué hacen?',
      '¿Qué herramientas usan?',
      '¿Qué hay escrito ya?',
      '¿Dónde se guarda la información hoy?',
    ],
    'Una ficha de diagnóstico de una página por área.',
    'Proponer estructura antes de conocer el contexto.',
  ],
  [
    '1 · Gobernanza',
    'Fijar quién decide qué.',
    [
      '¿Quién aprueba qué?',
      '¿Cómo es el ciclo de vida de un proyecto?',
      '¿Qué entra y qué se rechaza?',
      '¿Qué regla no se puede saltar?',
    ],
    'Roles, ciclo de vida y al menos una puerta de aprobación.',
    'Demasiadas puertas, o más de un aprobador por decisión.',
  ],
  [
    '2 · Estándares',
    'Que el trabajo sea consistente.',
    [
      '¿Cómo se nombran los proyectos?',
      '¿Cómo se organizan las carpetas?',
      '¿Qué documentos genera cada tipo de proyecto?',
      '¿Cómo se versiona?',
    ],
    'Un formato de nombre (por ejemplo, DPTO-001 — Nombre), estructura de carpetas y una plantilla.',
    'Crear plantillas para todo desde el primer día.',
  ],
  [
    '3 · Operación',
    'Que el trabajo fluya y se vea.',
    [
      '¿Cómo llegan las solicitudes?',
      '¿Cómo se prioriza?',
      '¿Dónde está la lista de proyectos?',
      '¿Qué pasa si algo falla en producción?',
    ],
    'Tablero Kanban, registro maestro y un canal de incidencias.',
    'Un tablero que nadie mantiene.',
  ],
  [
    '4 · Plataforma',
    'Saber con qué y dónde se trabaja.',
    [
      '¿Qué herramientas y licencias hay?',
      '¿Qué entornos hay: desarrollo, pruebas y producción?',
      '¿Dónde se guardan las credenciales?',
    ],
    'Inventario de herramientas y política de accesos.',
    'Credenciales sueltas en chats o notas.',
  ],
  [
    '5 · Cierre',
    'Dejar claro qué se decidió y qué falta.',
    [
      '¿Qué hemos decidido?',
      '¿En qué nivel queda cada pilar?',
      '¿Qué se hace primero?',
    ],
    'El bloque de estado del CoE y una lista priorizada con responsable y fecha.',
    'Cerrar sin responsable ni fecha por tarea.',
  ],
] as const;

export const ES =
  'ESTADO DEL CoE\n- Fase cerrada: [nombre de la fase]\n- Decisiones tomadas: [resumen breve]\n- Pilar y nivel: [pilar y nivel en que queda]\n- Pendiente: [qué falta]\n- Siguiente paso: [próxima fase y pregunta clara]';

export const HUB_CHIPS: readonly string[] = [
  'Gobernanza',
  'Estándares',
  'Operación',
  'Plataforma',
] as const;

export const COMMON_CORE_ITEMS: readonly string[] = [
  'Roles, ciclo de vida de un proyecto y puertas de aprobación',
  'Formato de nombres, carpetas, versionado y plantillas',
  'Un único registro maestro y un único tablero',
  'Inventario de herramientas, licencias, entornos y accesos',
  'Indicadores e informe para dirección',
] as const;

export const AREA_OWN_ITEMS: readonly string[] = [
  'Su lista de ideas y su prioridad dentro del área',
  'Sus procesos y su conocimiento del negocio',
  'Quién es su responsable y su persona de enlace',
  'El ritmo de trabajo, siempre dentro de las reglas comunes',
  'Casos de uso propios que luego pueden reutilizar otras áreas',
] as const;

export const RACI_HEADERS: readonly [string, string, string, string, string] = [
  'Decisión o actividad',
  'Dirección',
  'Lead del CoE',
  'Responsable de área',
  'Quien implementa',
] as const;

export const RC: readonly RaciRowTuple[] = [
  ['Fijar prioridades entre áreas', 'A', 'R', 'C', 'I'],
  ['Priorizar el backlog de un área', 'I', 'C', 'A/R', 'C'],
  ['Aprobar el inicio de un desarrollo (puerta)', '', 'A', 'C', 'R'],
  ['Aprobar el paso a producción', 'I', 'A', 'C', 'R'],
  ['Actualizar la documentación oficial', '', 'A', 'I', 'R'],
  ['Gestionar incidencias', 'I', 'A', 'C', 'R'],
  ['Decidir herramientas y licencias nuevas', 'A', 'R', 'C', 'I'],
  ['Revisar la gobernanza', 'I', 'A/R', 'C', 'C'],
] as const;

export const LD: readonly MaturityLevelTuple[] = [
  ['N1', 'Básico', 'Existe lo mínimo y está escrito.'],
  ['N2', 'Consistente', 'Se aplica de verdad, con pruebas de uso real.'],
  ['N3', 'Automatizado en parte', 'Se reduce el trabajo manual de mantenerlo.'],
  ['N4', 'Medido', 'Hay indicadores que se revisan con regularidad.'],
  ['N5', 'Optimizado', 'Se mejora de forma proactiva con esos indicadores.'],
] as const;

export const TP: readonly string[] = [
  'Empieza por el diagnóstico, no por las herramientas.',
  'Adapta la estructura al tamaño real del equipo: un CoE de dos personas no necesita lo mismo que uno de diez.',
  'Un solo aprobador por decisión.',
  'Explica cada concepto cuando toca decidirlo, no toda la teoría de golpe.',
  'Refuerza primero el pilar más débil y sube un nivel cada vez.',
  'Deja las decisiones por escrito en un registro de decisiones.',
  'Prepara una hoja de una página para dirección, con lo decidido y lo que falta.',
  'Mide antes de optimizar: sin indicadores, mejorar es opinar.',
] as const;

export const ER: readonly string[] = [
  'Querer unificarlo todo: las áreas necesitan autonomía en lo propio.',
  'Burocracia desproporcionada para el tamaño del equipo.',
  'No tener patrocinador que desbloquee decisiones entre áreas.',
  'Una plataforma sin responsable: licencias y accesos sin control.',
  'Indicadores que nadie lee ni usa para decidir.',
  'Dejar que cada área use su propio formato de nombres y registro.',
] as const;
