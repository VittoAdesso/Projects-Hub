import type {
  FilterLevel,
  PowerPlatformModule,
  ResourceLinkTuple,
} from '../types'

export const STORAGE_KEY = 'arquitecto-power-platform:progress'

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

export const MODULES: readonly PowerPlatformModule[] = [
  {
    t: 'El rol y el análisis de requisitos',
    l: 'Básico',
    o: 'Entender qué decide un arquitecto y cómo capturar requisitos.',
    k: [
      'Evaluar requisitos de negocio y criterios de éxito',
      'Estado actual de los procesos y riesgos de la organización',
      'Requisitos funcionales y no funcionales',
      'Evaluar la arquitectura empresarial existente y las fuentes de datos',
    ],
    r: [
      [
        'Guía de estudio PL-600: competencias del rol',
        L + 'en-us/credentials/certifications/resources/study-guides/pl-600',
      ],
      ['Documentación de Power Platform', L + 'en-us/power-platform/'],
      [
        'Planificar un proyecto de Power Apps',
        L + 'en-us/power-apps/guidance/planning/introduction',
      ],
    ],
    p: 'Toma un proceso real de tu área y redacta 5 requisitos funcionales, 5 no funcionales (rendimiento, seguridad, disponibilidad) y 3 riesgos.',
    q: [
      '«Debe responder en menos de 2 segundos» es un requisito…',
      ['no funcional', 'funcional', 'de licencias'],
      0,
    ],
  },
  {
    t: 'Fit/gap y selección de componentes',
    l: 'Básico',
    o: 'Decidir qué se resuelve con producto estándar y qué necesita alternativas.',
    k: [
      'Identificar componentes de Power Platform y de terceros (AppSource, Azure, ISV)',
      'Evaluar la viabilidad de cada requisito',
      'Cubrir brechas con alternativas',
      'Acotar el alcance y estimar migración e integración',
    ],
    r: [
      ['Documentación de Power Platform', L + 'en-us/power-platform/'],
      [
        'Ejemplos reales de arquitectura',
        L + 'en-us/power-platform/guidance/architecture/real-world-examples/overview',
      ],
    ],
    p: 'Para los requisitos del módulo anterior, arma una tabla fit/gap con tres columnas: cubre estándar, cubre con configuración, requiere desarrollo o producto externo.',
    q: [
      'El análisis fit/gap sirve para…',
      [
        'saber qué cubre el estándar y qué requiere alternativas',
        'contar licencias consumidas',
        'diseñar la interfaz',
      ],
      0,
    ],
  },
  {
    t: 'Estrategia de entornos y topología',
    l: 'Intermedio',
    o: 'Diseñar cómo se organizan entornos, soluciones y ciclo de vida.',
    k: [
      'Topología de la solución y reutilización de componentes',
      'Entornos de desarrollo, pruebas y producción',
      'Soluciones, variables de entorno y despliegue',
      'Estrategia de automatización y comunicación visual del diseño',
    ],
    r: [
      ['ALM con soluciones', L + 'en-us/power-platform/alm/overview-alm'],
      [
        'Ejemplos reales de arquitectura',
        L + 'en-us/power-platform/guidance/architecture/real-world-examples/overview',
      ],
      [
        'Kit de inicio del CoE',
        L + 'en-us/power-platform/guidance/coe/starter-kit',
      ],
    ],
    p: 'Dibuja la topología de una solución con 3 entornos, indicando qué se despliega en cada uno, quién tiene acceso y cómo se mueven las soluciones.',
    q: [
      'Una estrategia de entornos típica separa…',
      [
        'desarrollo, pruebas y producción',
        'solo usuarios por departamento',
        'solo conectores',
      ],
      0,
    ],
  },
  {
    t: 'Modelo de datos',
    l: 'Intermedio',
    o: 'Diseñar un modelo que soporte requisitos complejos.',
    k: [
      'Tablas, relaciones y comportamiento de las relaciones',
      'Conectar a datos externos o importarlos',
      'Datos de referencia y configuración',
      'Estrategia de migración de datos',
    ],
    r: [
      [
        'Introducción a Dataverse',
        L + 'en-us/power-apps/maker/data-platform/data-platform-intro',
      ],
      [
        'Crear y editar tablas y metadatos',
        L + 'en-us/power-apps/maker/data-platform/create-edit-metadata',
      ],
    ],
    p: 'Diseña el diagrama entidad-relación de tu proceso y justifica para cada fuente si se conecta (virtual o conector) o se importa a Dataverse.',
    q: [
      'Hay que decidir, por fuente de datos, entre…',
      [
        'conectar a datos externos o importarlos',
        'borrar o archivar',
        'Excel o Word',
      ],
      0,
    ],
  },
  {
    t: 'Seguridad y gobernanza',
    l: 'Intermedio',
    o: 'Diseñar el modelo de seguridad y las políticas de la plataforma.',
    k: [
      'Unidades de negocio, equipos y roles de seguridad',
      'Seguridad por columna y por fila',
      'Grupos y registros de aplicaciones en Microsoft Entra ID',
      'Políticas DLP y acceso de usuarios externos',
      'Kit de inicio del CoE',
    ],
    r: [
      [
        'Kit de inicio del CoE',
        L + 'en-us/power-platform/guidance/coe/starter-kit',
      ],
      [
        'Pilar de seguridad (Well-Architected)',
        L + 'en-us/power-platform/well-architected/pillars',
      ],
      [
        'Guía de estudio PL-600: modelo de seguridad',
        L + 'en-us/credentials/certifications/resources/study-guides/pl-600',
      ],
    ],
    p: 'Define la estructura de unidades de negocio y 3 roles de seguridad para tu proceso. Indica qué tablas llevan seguridad por fila y qué políticas DLP aplicarías.',
    q: [
      'Las políticas DLP sirven para…',
      [
        'controlar qué conectores pueden usarse juntos',
        'cifrar el disco duro',
        'acelerar consultas',
      ],
      0,
    ],
  },
  {
    t: 'Integraciones y continuidad',
    l: 'Avanzado',
    o: 'Conectar la solución con el resto de sistemas de forma robusta.',
    k: [
      'Integración con Teams, SharePoint y sistemas existentes',
      'Estrategia de autenticación',
      'Continuidad de negocio',
      'Diseño de RPA y cuándo usarlo',
      'Redes y conectividad privada',
    ],
    r: [
      [
        'Azure ExpressRoute con Power Platform',
        L + 'en-us/power-platform/guidance/expressroute/overview',
      ],
      [
        'Ejemplos reales de arquitectura',
        L + 'en-us/power-platform/guidance/architecture/real-world-examples/overview',
      ],
      [
        'Pilar de fiabilidad (Well-Architected)',
        L + 'en-us/power-platform/well-architected/pillars',
      ],
    ],
    p: 'Documenta 3 integraciones de tu solución: dirección, método de autenticación, qué pasa si el sistema destino no responde y cómo se recupera.',
    q: [
      'Los registros de aplicaciones para autenticación se gestionan en…',
      ['Microsoft Entra ID', 'Power Fx', 'una tabla de Dataverse'],
      0,
    ],
  },
  {
    t: 'Well-Architected, validación y puesta en marcha',
    l: 'Avanzado',
    o: 'Evaluar el diseño, detectar riesgos y llegar a producción.',
    k: [
      'Los cinco pilares y sus compromisos entre sí',
      'Revisión (assessment) de la carga de trabajo',
      'Límites de API, rendimiento e impacto en recursos',
      'Conflictos entre automatizaciones e integraciones',
      'Preparación para el paso a producción',
    ],
    r: [
      [
        'Power Platform Well-Architected',
        L + 'en-us/power-platform/well-architected/',
      ],
      [
        '¿Qué es Well-Architected?',
        L + 'en-gb/power-platform/well-architected/what-is-power-well-architected',
      ],
      [
        'Los cinco pilares',
        L + 'en-us/power-platform/well-architected/pillars',
      ],
      ['Evaluación (assessment)', 'https://aka.ms/powa/assessment'],
    ],
    p: 'Haz la evaluación Well-Architected sobre una solución tuya y elige los 3 riesgos más importantes con una acción para cada uno.',
    q: [
      'Los pilares de Power Platform Well-Architected incluyen…',
      [
        'Experience Optimization',
        'Licensing Optimization',
        'Cost Governance',
      ],
      0,
    ],
  },
] as const

export const COMMUNITY_LINKS: readonly ResourceLinkTuple[] = [
  ['Microsoft Q&A', 'https://learn.microsoft.com/en-us/answers/products/'],
  [
    'Comunidad de Power Apps',
    'https://powerusers.microsoft.com/t5/Power-Apps-Community/ct-p/PowerApps1',
  ],
  [
    'Comunidad de Power Automate',
    'https://powerusers.microsoft.com/t5/Microsoft-Power-Automate/ct-p/MPACommunity',
  ],
] as const
