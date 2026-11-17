import type { DocPatternModule, FilterLevel } from '../types'

export const STORAGE_KEY = 'documentacion-patrones:progress'

export const L = 'https://learn.microsoft.com/'

export const FILTER_OPTIONS: readonly {
  readonly value: FilterLevel
  readonly label: string
}[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'Básico', label: 'Básico' },
  { value: 'Intermedio', label: 'Intermedio' },
  { value: 'Avanzado', label: 'Avanzado' },
] as const

export const MODULES: readonly DocPatternModule[] = [
  {
    t: 'Qué documentar y para quién',
    l: 'Básico',
    o: 'Decidir qué documento hace falta antes de escribirlo.',
    k: [
      'Cuatro lectores típicos: usuario final, soporte, quien mantiene y dirección',
      'Documentación de uso frente a documentación técnica',
      'Qué debe responder cada documento: qué hace, cómo se usa, qué hacer si falla',
      'Mantener la documentación junto a la solución',
    ],
    r: [
      [
        'Fundamentos del arquitecto de soluciones',
        L + 'en-us/azure/well-architected/architect-role/fundamentals',
      ],
      ['Documentación de Power Platform', L + 'en-us/power-platform/'],
    ],
    p: 'Elige una solución tuya y escribe una ficha para el usuario final (usa la plantilla de abajo) sin ningún término técnico. Pídele a alguien de otra área que la lea y anota dónde se atasca.',
    q: [
      'Antes de escribir un documento, ¿qué conviene definir primero?',
      [
        'quién lo va a leer y para qué',
        'el color y la tipografía',
        'la herramienta de exportación a PDF',
      ],
      0,
    ],
  },
  {
    t: 'Convenciones de nombres y comentarios',
    l: 'Básico',
    o: 'Que cualquiera entienda un elemento sin abrirlo.',
    k: [
      'Nombres descriptivos para flujos, apps, tablas y variables',
      'Prefijos o estructuras consistentes por proyecto y entorno',
      'Notas y comentarios en las acciones que no son evidentes',
      'Una página de estándares compartida por todo el equipo',
    ],
    r: [
      [
        'Guía de codificación de Power Automate: manejo de errores',
        L + 'en-in/power-automate/guidance/coding-guidelines/error-handling',
      ],
      [
        'Kit de inicio del CoE',
        L + 'en-us/power-platform/guidance/coe/starter-kit',
      ],
    ],
    p: 'Escribe una página de estándares con reglas para nombrar flujos, variables y conexiones. Aplícala a tres flujos existentes y renómbralos.',
    q: [
      'El objetivo de una convención de nombres es…',
      [
        'identificar el propósito sin abrir el elemento',
        'reducir el costo de licencias',
        'cifrar los datos',
      ],
      0,
    ],
  },
  {
    t: 'Registro de decisiones (ADR)',
    l: 'Intermedio',
    o: 'Dejar escrito por qué el sistema es como es.',
    k: [
      'Qué es una decisión arquitectónica significativa',
      'Estructura de un registro: contexto, opciones, decisión, compromisos, confianza',
      'Los registros no se editan: se reemplazan con uno nuevo',
      'Dividir una decisión por fases cuando hace falta',
    ],
    r: [
      [
        'Registro de decisiones de arquitectura (Microsoft)',
        L +
          'en-us/azure/well-architected/architect-role/architecture-decision-record',
      ],
      [
        'Fundamentos del arquitecto de soluciones',
        L + 'en-us/azure/well-architected/architect-role/fundamentals',
      ],
    ],
    p: 'Redacta dos ADR de decisiones reales de tu CoE (por ejemplo, SharePoint o Dataverse, o PAD o cloud flow) usando la plantilla. Registra el nivel de confianza.',
    q: [
      'Si una decisión ya aceptada cambia, ¿qué se hace con su ADR?',
      [
        'escribir un registro nuevo que lo reemplace y vincularlo',
        'editar el original',
        'borrarlo',
      ],
      0,
    ],
  },
  {
    t: 'Diagramas y comunicación del diseño',
    l: 'Intermedio',
    o: 'Explicar la arquitectura de forma visual.',
    k: [
      'Un diagrama por pregunta: contexto, componentes, flujo de datos',
      'Mostrar integraciones, entornos y límites de seguridad',
      'Leyenda y nivel de detalle según la audiencia',
      'Revisar el diagrama cada vez que cambie la solución',
    ],
    r: [
      [
        'Ejemplos reales de arquitectura de Power Platform',
        L +
          'en-us/power-platform/guidance/architecture/real-world-examples/overview',
      ],
      [
        'Guía de estudio PL-600: comunicar el diseño visualmente',
        L + 'en-us/credentials/certifications/resources/study-guides/pl-600',
      ],
    ],
    p: 'Dibuja dos diagramas de una misma solución: uno para dirección (qué sistemas se conectan) y otro para quien la mantiene (componentes, entornos y conexiones).',
    q: [
      'Un diagrama de arquitectura sirve ante todo para…',
      [
        'comunicar el diseño de forma visual a cada audiencia',
        'reemplazar toda la documentación escrita',
        'mejorar el rendimiento',
      ],
      0,
    ],
  },
  {
    t: 'Patrones de diseño en la nube',
    l: 'Intermedio',
    o: 'Reconocer patrones conocidos para problemas comunes.',
    k: [
      'Qué es un patrón: problema, consideraciones y compromisos',
      'Anti-Corruption Layer, Circuit Breaker, Compensating Transaction, Bulkhead, Asynchronous Request-Reply',
      'Elegir por el problema, no por la tecnología',
      'Relación entre patrones y pilares Well-Architected',
    ],
    r: [
      [
        'Catálogo de patrones de diseño en la nube',
        L + 'en-us/azure/architecture/patterns',
      ],
      [
        'Pilares de Power Platform Well-Architected',
        L + 'en-us/power-platform/well-architected/pillars',
      ],
    ],
    p: 'Elige tres patrones del catálogo y busca un ejemplo en una solución tuya. Por ejemplo, un conector o flujo hijo que aísla un sistema antiguo se parece a Anti-Corruption Layer. Anota el compromiso de cada uno.',
    q: [
      'Un patrón se elige según…',
      [
        'el problema que necesitas resolver, no la tecnología que quieres usar',
        'su popularidad',
        'su número de páginas',
      ],
      0,
    ],
  },
  {
    t: 'Patrones en Power Automate',
    l: 'Avanzado',
    o: 'Aplicar patrones de fiabilidad a los flujos.',
    k: [
      'Try-catch con ámbitos (scopes) y Configurar ejecución posterior',
      'Directivas de reintento y errores transitorios',
      'Terminar el flujo con estado y mensaje',
      'Registrar errores y notificar, con Application Insights si procede',
      'Flujos hijo para lógica reutilizable',
    ],
    r: [
      [
        'Manejo de errores robusto en Power Automate',
        L + 'en-in/power-automate/guidance/coding-guidelines/error-handling',
      ],
      [
        'Módulo: buenas prácticas de manejo de errores',
        L + 'en-us/training/modules/error-handling',
      ],
      [
        'Catálogo de patrones de diseño en la nube',
        L + 'en-us/azure/architecture/patterns',
      ],
    ],
    p: 'Toma un flujo existente y rediseñalo con ámbitos Try y Catch, un registro de errores y una notificación. Documenta la decisión en un ADR.',
    q: [
      'Para gestionar errores de un grupo de acciones a la vez se usan…',
      [
        'ámbitos (scopes) con patrón try-catch',
        'variables globales',
        'conectores premium',
      ],
      0,
    ],
  },
  {
    t: 'Operación y traspaso',
    l: 'Avanzado',
    o: 'Dejar la solución lista para que otra persona la opere.',
    k: [
      'Procedimientos de operación: errores frecuentes, cambio de credenciales, accesos',
      'Monitorización y alertas',
      'Traspaso a un suplente y continuidad en vacaciones',
      'Revisión periódica de la documentación',
    ],
    r: [
      [
        'Pilar de excelencia operativa (Well-Architected)',
        L + 'en-us/power-platform/well-architected/pillars',
      ],
      [
        'Kit de inicio del CoE',
        L + 'en-us/power-platform/guidance/coe/starter-kit',
      ],
      [
        'Power Platform Well-Architected',
        L + 'en-us/power-platform/well-architected/',
      ],
    ],
    p: 'Escribe un procedimiento de operación de una página para una solución crítica y pide a un compañero que lo ejecute sin tu ayuda. Corrige lo que le falte.',
    q: [
      'El pilar centrado en observabilidad y operaciones seguras es…',
      ['Operational Excellence', 'Experience Optimization', 'Reliability'],
      0,
    ],
  },
] as const

export const ADR_TEMPLATE = `ADR-0001: [título breve de la decisión]
Estado: propuesta | aceptada | reemplazada por ADR-XXXX
Fecha: [AAAA-MM-DD]
Responsables: [quién decide]

Contexto y problema:
[qué situación obliga a decidir]

Opciones consideradas:
1. [opción A]
2. [opción B]

Decisión:
[qué se decidió y por qué]

Compromisos asumidos:
[qué se cede con esta decisión]

Nivel de confianza: alto | medio | bajo
Material de apoyo: [enlaces, si los hay]`

export const README_TEMPLATE = `[Nombre de la solución]
Qué hace: [una frase, sin jerga]
Quién la usa: [área o rol]
Cómo se usa: [3 a 5 pasos para el usuario final]
Qué hacer si falla: [a quién avisar y qué información dar]

Para quien la mantiene
Componentes: [apps, flujos, tablas, conectores]
Entornos: [desarrollo, pruebas, producción]
Dependencias: [sistemas, cuentas de servicio, conexiones]
Decisiones clave: [enlaces a los ADR]
Cómo desplegar: [pasos o enlace]
Responsable y suplente: [nombres]`
