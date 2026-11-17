import type {
  ConfigRowTuple,
  GlossaryItemTuple,
  GuideMode,
  MindsetPairTuple,
  PieceCardTuple,
  PromptItemTuple,
  SimulatorQuestionTuple,
  StudyRouteItemTuple,
} from '../types'

export const CHECKS_STORAGE_KEY = 'guia-power-platform:checks'
export const NOTES_STORAGE_KEY = 'guia-power-platform:notes'

export const MODE_OPTIONS: readonly {
  readonly value: GuideMode
  readonly label: string
}[] = [
  { value: 'estudio', label: 'Estudio' },
  { value: 'reunion', label: 'Reunión' },
  { value: 'desarollador', label: 'Auditoría desarollador' },
] as const

export const L = 'https://learn.microsoft.com/'

export const MENTE: readonly MindsetPairTuple[] = [
  [
    'Tengo que saber cómo se programa para decidir.',
    'Necesito saber qué es posible, qué cuesta y dónde se rompe. Que otro lo construya.',
  ],
  [
    'Si puedo hacerlo yo, lo hago yo.',
    'Decido quién lo construye y fijo el criterio de calidad con la lista de control.',
  ],
  [
    'Decir que no es fallar.',
    'Digo «así no, así sí» con una alternativa, un plazo y un coste.',
  ],
  [
    'Necesito certeza antes de decidir.',
    'Decido con supuestos escritos y una fecha de revisión.',
  ],
  [
    'La solución más elegante es la mejor.',
    'La más sencilla que cumple y que otra persona puede mantener.',
  ],
  [
    'Empiezo a construir y lo veo sobre la marcha.',
    'Primero las 5 preguntas, luego el simulador, luego el plazo.',
  ],
] as const

export const PIEZAS: readonly PieceCardTuple[] = [
  [
    'a',
    'Power Apps Canvas',
    'Aplicación de diseño libre, rápida para un caso concreto.',
    'Las consultas no delegables traen solo 500 filas por defecto, ajustable hasta 2.000. El límite de 2.000 no es el tamaño máximo de los datos: con fórmulas delegables el origen hace el trabajo.',
    [
      [
        'Documentación de delegación',
        L + 'power-apps/maker/canvas-apps/delegation-overview',
      ],
    ],
  ],
  [
    'a',
    'Apps basadas en modelo',
    'Interfaz guiada por datos y relaciones de Dataverse.',
    'Parten de Dataverse; revisa su licencia y capacidad antes de prometerlas.',
    [['Documentación', L + 'en-us/power-apps/maker/model-driven-apps/']],
  ],
  [
    'g',
    'Flujos en la nube (Power Automate)',
    'Automatización por API entre servicios.',
    'Cada conector premium exige licencia, y una política DLP puede bloquear conectores y suspender flujos.',
    [
      [
        'Preguntas de licencias',
        L + 'en-us/power-platform/admin/powerapps-flow-licensing-faq',
      ],
    ],
  ],
  [
    'r',
    'Power Automate Desktop (RPA)',
    'Para sistemas que no tienen API: maneja la pantalla.',
    'Los selectores dependen de la resolución, el DPI, los cambios de la aplicación y la versión del sistema. En desatendido, la resolución de pantalla debe coincidir con la de las sesiones atendidas. El conector de flujos de escritorio es premium.',
    [
      [
        'Solución de fallos desatendidos',
        L +
          'en-us/power-automate/desktop-flows/how-to/troubleshoot-unattended-execution-failures',
      ],
    ],
  ],
  [
    'a',
    'SharePoint como base de datos',
    'Cómodo y ya incluido en Microsoft 365.',
    'Umbral de vista de lista de 5.000 elementos, 12 búsquedas (lookups) por vista y recomendación de no pasar de 5.000 permisos únicos. Admite hasta 30 millones de elementos.',
    [
      [
        'Listas grandes en SharePoint',
        'https://support.microsoft.com/en-us/office/manage-large-lists-and-libraries-b8588dae-9387-48c2-9248-c24122f07c59',
      ],
    ],
  ],
  [
    'a',
    'Dataverse',
    'Datos relacionales, seguridad por filas y columnas, soluciones para ALM.',
    'Suele exigir licencia premium y consume capacidad. Confirma tu caso antes de elegirlo.',
    [
      [
        'Introducción a Dataverse',
        L + 'en-us/power-apps/maker/data-platform/data-platform-intro',
      ],
    ],
  ],
  [
    'r',
    'Políticas DLP',
    'Reglas de qué conectores pueden usarse juntos.',
    'Tres grupos: Business, Non-business y Blocked. Un recurso no puede mezclar conectores de Business y Non-business. Algunos conectores no se pueden bloquear. Los módulos de flujos de escritorio también se clasifican, y los flujos no conformes se suspenden.',
    [
      [
        'Estrategia DLP',
        L + 'en-us/power-platform/guidance/adoption/dlp-strategy',
      ],
      ['DLP en flujos de escritorio', L + 'power-automate/prevent-data-loss'],
    ],
  ],
  [
    'r',
    'Licencias',
    'Estándar incluido con Microsoft 365; premium aparte.',
    'Precios de lista en USD (confirma): Power Apps Premium 20 por usuario al mes; Power Automate Premium 15 por usuario al mes; Power Automate Process 150 por bot al mes. Un solo conector premium puede obligar a licenciar a todos los usuarios de esa app.',
    [
      [
        'Preguntas de licencias',
        L + 'en-us/power-platform/admin/powerapps-flow-licensing-faq',
      ],
      ['Precios', 'https://www.microsoft.com/en-us/power-platform/pricing'],
    ],
  ],
  [
    'a',
    'Copilot Studio',
    'Agentes conversacionales.',
    'La aplicación de DLP para copilots está desactivada por defecto. La licencia es aparte; confírmala.',
    [
      [
        'DLP para copilots',
        L + 'en-us/microsoft-copilot-studio/admin-data-loss-prevention',
      ],
    ],
  ],
  [
    'g',
    'Power BI (orientativo)',
    'Informes y paneles.',
    'Suele fallar por el modelo de datos y la actualización, más que por la herramienta. Licencia de consumo aparte; no verificado aquí.',
    [],
  ],
] as const

export const PROMPTS: readonly PromptItemTuple[] = [
  [
    'Traducir una petición de negocio a arquitectura',
    'Contexto: trabajo en sistemas de una empresa con Microsoft 365 y Power Platform, con makers junior. Qué tengo: esta petición de negocio: [pega la petición]. Cómo responder: actúa como arquitecto senior de Power Platform y no me des tutoriales de código. Devuelve: 1) el problema en 2 frases; 2) herramienta recomendada y por qué; 3) fuente de datos y volumen esperado; 4) riesgos de delegación, DLP y licencias; 5) preguntas que debo hacer al negocio antes de fijar plazos.',
  ],
  [
    'Auditar la entrega de un desarollador',
    'Contexto: soy responsable técnico y reviso lo que entrega un desarollador. Qué tengo: esta descripción o capturas de la entrega: [pega]. Cómo responder: revisa delegación, manejo de errores, nombres, credenciales, pruebas con volumen y documentación. Devuelve una lista de hallazgos por gravedad (alta, media, baja) y una pregunta concreta que debo hacerle por cada alta.',
  ],
  [
    'Destrabar una advertencia de delegación',
    'Contexto: app Canvas sobre [SharePoint o Dataverse] con unas [N] filas. Qué tengo: esta fórmula Power Fx: [fórmula] y esta advertencia: [texto]. Cómo responder: explica por qué no es delegable, propón una alternativa delegable y dime qué hacer si no existe.',
  ],
  [
    'SharePoint o Dataverse para un caso',
    'Contexto: necesito elegir dónde guardar los datos. Qué tengo: [datos, relaciones, usuarios, volumen y crecimiento, licencias disponibles]. Cómo responder: tabla comparativa con seguridad, volumen, relaciones, licencia y mantenimiento; después una recomendación y el riesgo principal de cada opción.',
  ],
  [
    'Revisar un flujo de PAD antes de pasarlo a desatendido',
    'Contexto: flujo de escritorio que hoy funciona en modo atendido. Qué tengo: lista de pasos y aplicaciones: [pega]. Cómo responder: identifica los puntos frágiles (selectores, resolución, tiempos de espera, datos duplicados tras un reintento), propón reintentos, registro y una prueba antes de pasar a producción.',
  ],
  [
    'Responder a negocio con un «así no»',
    'Contexto: negocio pide [petición] y no es viable tal cual por [motivo: datos, licencia, DLP, plazo]. Cómo responder: redacta un correo breve y cordial que explique el motivo en lenguaje no técnico, proponga una alternativa con plazo y coste aproximado, y cierre con la decisión que necesito de ellos.',
  ],
] as const

export const CONF: readonly ConfigRowTuple[] = [
  [
    'Límite de filas en consultas no delegables',
    'Power Apps Studio > Configuración > General',
    'Va de 1 a 2.000. Ponerlo en 1 ayuda a detectar qué fórmula no delega.',
    L +
      'en-us/training/modules/work-with-data-source-limits-powerapps-canvas-app/3-delegation-warnings-limits-functions',
  ],
  [
    'Directivas de datos (DLP)',
    'Centro de administración de Power Platform > Directivas > Directivas de datos > Nueva directiva',
    'Clasifica conectores y define el grupo por defecto para los nuevos (se recomienda Non-business).',
    L + 'power-automate/prevent-data-loss',
  ],
  [
    'DLP de flujos de escritorio',
    'Misma directiva, módulos de flujos de escritorio',
    'Solo se evalúan los módulos clasificados de forma explícita.',
    L + 'power-automate/prevent-data-loss',
  ],
  [
    'Fallos de PAD en desatendido',
    'Resolución, DPI, tiempos de espera y reparar selector',
    'Usa varios selectores, imagen de respaldo y directiva de reintento.',
    L +
      'en-us/power-automate/desktop-flows/how-to/troubleshoot-unattended-execution-failures',
  ],
  [
    'Listas grandes de SharePoint',
    'Indexar columnas, vistas filtradas y carpetas',
    'El umbral de 5.000 no se puede cambiar en SharePoint Online.',
    'https://support.microsoft.com/en-us/office/manage-large-lists-and-libraries-b8588dae-9387-48c2-9248-c24122f07c59',
  ],
  [
    'Licencias y capacidad',
    'Preguntas de licencias y página de precios',
    'Confirma con tu proveedor qué cubre tu tenant.',
    L + 'en-us/power-platform/admin/powerapps-flow-licensing-faq',
  ],
] as const

export const RUTA: readonly StudyRouteItemTuple[] = [
  [
    'Delegación: lee la página oficial',
    L + 'power-apps/maker/canvas-apps/delegation-overview',
  ],
  [
    'Elegir Canvas o basada en modelo: sesión en español de Microsoft Reactor',
    'https://developer.microsoft.com/es-es/reactor/series/S-1109/',
  ],
  [
    'DLP: estrategia de directivas',
    L + 'en-us/power-platform/guidance/adoption/dlp-strategy',
  ],
  [
    'Licencias: preguntas frecuentes',
    L + 'en-us/power-platform/admin/powerapps-flow-licensing-faq',
  ],
  [
    'PAD: fallos en ejecución desatendida',
    L +
      'en-us/power-automate/desktop-flows/how-to/troubleshoot-unattended-execution-failures',
  ],
  [
    'SharePoint: listas grandes',
    'https://support.microsoft.com/en-us/office/manage-large-lists-and-libraries-b8588dae-9387-48c2-9248-c24122f07c59',
  ],
  ['ALM: soluciones y entornos', L + 'en-us/power-platform/alm/overview-alm'],
  ['Un vídeo de un divulgador de la lista de abajo', '#s-ruta'],
] as const

export const DIVUL: readonly string[] = [
  'CepaCode',
  'Dioni Gómez',
  'Microsoft Mechanics',
  'Reza Dorrani',
  'Mario Trueba',
] as const

export const P5: readonly string[] = [
  '¿Qué problema resuelve y cómo sabremos que está resuelto?',
  '¿Dónde viven los datos hoy, cuántas filas hay y cuánto crecen?',
  '¿Cuántos usuarios son, quiénes y qué licencias tienen?',
  '¿Existe una API o solo se puede trabajar por pantalla?',
  '¿Quién la mantiene y qué pasa si falla?',
] as const

export const QA: readonly string[] = [
  'Sin advertencias de delegación, o justificadas por escrito',
  'Filtros hechos en el origen y columnas indexadas en SharePoint',
  'Nombres con la convención del equipo y variables comentadas',
  'Manejo de errores con aviso (try-catch con ámbitos en flujos)',
  'Sin contraseñas en claro; conexiones con cuenta de servicio',
  'Probado con un volumen de datos realista, en un entorno de pruebas',
  'Ficha de uso y ficha de mantenimiento entregadas',
  'DLP y licencias validadas',
  'Plan de reversión y persona suplente definidos',
] as const

export const GLOS: readonly GlossaryItemTuple[] = [
  [
    'Delegación',
    'Que el origen de datos ejecute el filtro en lugar de traer las filas a la app.',
  ],
  [
    'Conector estándar y premium',
    'Estándar: incluido con Microsoft 365. Premium: requiere licencia aparte.',
  ],
  ['DLP', 'Reglas que impiden combinar o usar ciertos conectores.'],
  [
    'Entorno',
    'Espacio aislado donde viven apps, flujos y datos (desarrollo, pruebas, producción).',
  ],
  [
    'Solución',
    'Paquete que agrupa componentes para moverlos entre entornos (ALM).',
  ],
  ['ALM', 'Gestión del ciclo de vida: versionar, probar y desplegar.'],
  [
    'Selector',
    'Descripción de un control de pantalla que PAD usa para encontrarlo.',
  ],
  [
    'Atendido y desatendido',
    'Atendido: con una persona en sesión. Desatendido: en una máquina sin persona; requiere licencia de proceso.',
  ],
  [
    'Umbral de vista de lista',
    'Límite de 5.000 elementos que una consulta de SharePoint puede procesar a la vez.',
  ],
  ['Dataverse', 'Plataforma de datos relacional de Power Platform.'],
] as const

export const Q: readonly SimulatorQuestionTuple[] = [
  [
    'need',
    '¿Qué necesitas?',
    [
      'App para personas',
      'Automatizar un proceso',
      'Informe o panel',
      'Agente conversacional',
    ],
  ],
  [
    'src',
    '¿De dónde vienen los datos?',
    [
      'SharePoint o Excel',
      'Dataverse',
      'Otra base o servicio con conector premium',
      'Sistema sin API (solo pantalla)',
    ],
  ],
  ['vol', '¿Cuántas filas?', ['Menos de 500', '500 a 5.000', 'Más de 5.000']],
  ['usr', '¿Cuántos usuarios?', ['Menos de 10', '10 a 100', 'Más de 100']],
  [
    'lic',
    '¿Qué licencias hay?',
    ['Solo Microsoft 365 estándar', 'También hay licencias premium'],
  ],
] as const
