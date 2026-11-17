import type {
  AuditGroupTuple,
  AuditOptionTuple,
  ConceptRefTuple,
  PhaseRefTuple,
} from '../types';

export const STORAGE_KEY = 'supervisor-codigo:state';

export const OP: readonly [
  AuditOptionTuple,
  AuditOptionTuple,
  AuditOptionTuple,
  AuditOptionTuple,
] = [
  ['c', 'Cumple'],
  ['p', 'Parcial'],
  ['n', 'No'],
  ['x', 'No aplica'],
] as const;

export const G: readonly AuditGroupTuple[] = [
  [
    'Arquitectura modular',
    '#2563A8',
    [
      [
        'Cada módulo tiene una sola responsabilidad',
        3,
        '¿Qué hace cada módulo y qué no debe hacer?',
      ],
      [
        'Hay capas separadas: interfaz, lógica y acceso a datos',
        3,
        '¿Dónde está la lógica de negocio? ¿Se mezcla con la interfaz o con SQL?',
      ],
      [
        'Los módulos se comunican por interfaces claras, sin dependencias circulares',
        2,
      ],
      ['Los componentes de interfaz son reutilizables y no duplican código', 2],
      ['La configuración está fuera del código y separada por entornos', 2],
      ['La estructura de carpetas es predecible y está documentada', 1],
    ],
  ],
  [
    'Código limpio',
    '#2E7D52',
    [
      ['Los nombres explican la intención', 2],
      [
        'Las funciones son pequeñas y hacen una sola cosa',
        3,
        '¿Cuál es la función más larga y qué hace en realidad?',
      ],
      ['No hay código duplicado, muerto ni comentado', 2],
      ['Los comentarios explican el porqué, no el qué', 1],
      ['Hay formateador y linter automáticos con reglas comunes', 2],
      [
        'Los errores se tratan de forma consistente, sin tragarlos en silencio',
        3,
        '¿Qué ocurre cuando falla una llamada externa?',
      ],
    ],
  ],
  [
    'API y datos',
    '#6A4BB5',
    [
      [
        'Todos los listados paginan, con un tamaño máximo por página',
        3,
        '¿Qué pasa si la tabla tiene un millón de filas?',
      ],
      [
        'Filtros y ordenación se resuelven en la base de datos, no en memoria',
        2,
      ],
      [
        'La entrada se valida en el servidor',
        3,
        '¿Qué ocurre si alguien llama a la API directamente con datos incorrectos?',
      ],
      ['Los códigos de estado y el formato de error son coherentes', 2],
      [
        'Los cambios de base de datos se hacen con migraciones',
        3,
        '¿Cómo se aplica un cambio de estructura en producción?',
      ],
      ['La API está documentada (OpenAPI) y versionada', 2],
    ],
  ],
  [
    'Pruebas y calidad',
    '#C2561C',
    [
      [
        'Hay pruebas automáticas de la lógica importante',
        3,
        '¿Qué parte crítica no tiene ninguna prueba?',
      ],
      ['Las pruebas se ejecutan solas en cada cambio', 2],
      ['Cada cambio lo revisa otra persona antes de unirse', 3],
      ['Hay entornos separados de desarrollo, pruebas y producción', 2],
      ['Hay registros (logs) útiles para diagnosticar fallos', 2],
    ],
  ],
  [
    'Seguridad',
    '#B83232',
    [
      [
        'Ninguna clave ni contraseña está en el código ni en el repositorio',
        3,
        '¿Dónde se guardan las claves y quién puede verlas?',
      ],
      ['Hay autenticación y permisos mínimos en cada punto de acceso', 3],
      ['Las dependencias están actualizadas y revisadas', 2],
      ['Los datos personales están identificados y tratados con cuidado', 2],
    ],
  ],
  [
    'Proyecto y entrega',
    '#0E7490',
    [
      [
        'El proyecto se divide en fases con criterio de salida claro',
        2,
        '¿Qué tiene que cumplirse para pasar de una fase a la siguiente?',
      ],
      ['El README explica qué hace, cómo se instala y cómo se ejecuta', 2],
      ['Hay control de versiones con cambios pequeños y mensajes claros', 2],
      ['El despliegue es repetible, mejor si está automatizado', 2],
      [
        'Existe un manual de operación para quien lo mantenga',
        2,
        '¿Quién podría mantener esto si el autor no está?',
      ],
    ],
  ],
  [
    'Interfaz y experiencia',
    '#8A5A00',
    [
      [
        'Los listados y tablas cargan por partes en pantalla, no todo de golpe',
        3,
        '¿Qué ve la persona si hay miles de filas?',
      ],
      ['Hay estados visibles de carga, vacío y error', 2],
      ['Los formularios validan y explican el error junto al campo', 2],
      ['La interfaz funciona en móvil y se puede usar con teclado', 2],
      [
        'Textos y estilos salen de un único sitio, no repetidos en cada pantalla',
        1,
      ],
    ],
  ],
  [
    'Rendimiento y operación',
    '#3D4C5B',
    [
      [
        'Se ha probado con un volumen de datos parecido al real',
        3,
        '¿Con cuántos datos se probó?',
      ],
      ['Las consultas pesadas tienen índices y se han revisado', 2],
      [
        'Repetir una operación no duplica datos (idempotencia)',
        3,
        '¿Qué pasa si la misma petición llega dos veces?',
      ],
      [
        'Las llamadas externas tienen tiempo máximo y reintentos controlados',
        2,
      ],
      [
        'Hay alertas o monitorización: los fallos no los descubren los usuarios',
        2,
      ],
      [
        'Existe copia de seguridad y se ha probado a restaurarla',
        3,
        '¿Cuándo se restauró una copia por última vez?',
      ],
    ],
  ],
] as const;

export const FS: readonly PhaseRefTuple[] = [
  [
    'Diseño',
    'Alcance claro, módulos definidos, contrato de la API y modelo de datos.',
  ],
  [
    'Desarrollo',
    'Capas, nombres, funciones pequeñas, pruebas y revisión de cada cambio.',
  ],
  [
    'Pruebas y QA',
    'Cobertura de lo crítico, manejo de errores, rendimiento con volumen y seguridad.',
  ],
  [
    'Entrega',
    'README, despliegue repetible, manual de operación y plan de vuelta atrás.',
  ],
] as const;

export const CP: readonly ConceptRefTuple[] = [
  [
    'Módulo',
    'Unidad de código con una responsabilidad concreta.',
    'Un módulo "utilidades" que lo hace todo.',
  ],
  [
    'Componente',
    'Pieza reutilizable de la interfaz, como una tabla o un botón.',
    'El mismo bloque copiado en varias pantallas.',
  ],
  [
    'Capa',
    'Nivel con un papel propio: presentación, lógica o datos.',
    'SQL escrito dentro de la interfaz.',
  ],
  [
    'Cohesión',
    'Cuánto encaja entre sí lo que hay dentro de un módulo. Alta es buena.',
    'Funciones sin relación en el mismo archivo.',
  ],
  [
    'Acoplamiento',
    'Cuánto depende un módulo de otros. Bajo es bueno.',
    'Cambiar una cosa obliga a tocar cinco.',
  ],
  [
    'API',
    'Contrato con el que unas piezas se hablan.',
    'Cambios que rompen a quien la usa sin avisar.',
  ],
  [
    'Endpoint',
    'Dirección concreta de la API que hace una acción.',
    'Un endpoint que hace cosas distintas según un parámetro.',
  ],
  [
    'Paginación',
    'Devolver los datos por partes, con un tamaño máximo.',
    'Un listado que carga toda la tabla.',
  ],
  [
    'Migración',
    'Script versionado que cambia la estructura de la base de datos.',
    'Cambios hechos a mano en producción.',
  ],
  [
    'Refactorización',
    'Mejorar el código sin cambiar lo que hace.',
    'Refactorizar sin pruebas que lo respalden.',
  ],
  [
    'Deuda técnica',
    'Atajos que ahorran tiempo hoy y cuestan mantenimiento mañana.',
    'Un "lo arreglamos luego" sin fecha.',
  ],
  [
    'Integración continua',
    'Ejecutar pruebas y comprobaciones automáticamente en cada cambio.',
    'Pruebas que solo se lanzan a mano.',
  ],
  [
    'Revisión de código',
    'Otra persona revisa el cambio antes de unirlo.',
    'Aprobar sin haberlo leído.',
  ],
  [
    'DRY y KISS',
    'No repetir lógica y mantener la solución simple.',
    'Abstracciones complejas para un único caso.',
  ],
  [
    'Observabilidad',
    'Registros, métricas y trazas para entender qué está pasando.',
    'Enterarse de un fallo por un usuario.',
  ],
  [
    'Idempotencia',
    'Repetir una operación da el mismo resultado que hacerla una vez.',
    'Reintentos que duplican registros.',
  ],
] as const;

export const SA: readonly string[] = [
  'Archivos y funciones enormes que nadie quiere tocar.',
  'Código copiado y pegado en varios sitios.',
  'Nombres como data, temp o x2 que no dicen nada.',
  'Lógica de negocio dentro de la interfaz.',
  'SQL construido uniendo texto, con riesgo de inyección.',
  'Claves o contraseñas escritas en el código.',
  'Listados sin paginar.',
  'Errores capturados y ocultados sin registrar nada.',
  'Falta de pruebas y miedo a modificar el código.',
  'Dependencias sin versión fija.',
] as const;

export const CLEAN_CODE_CRITERIA: readonly string[] = [
  'Una función hace una sola cosa y se lee de una vez.',
  'Pocos parámetros: si pasan de tres o cuatro, conviene agruparlos.',
  'Evita anidar muchos niveles de condiciones: sal pronto con una guarda.',
  'Un archivo o módulo, una responsabilidad.',
  'Nombres con intención: verbos para acciones, sustantivos para datos.',
  'Si necesitas un comentario para explicar qué hace, mejor renombra.',
] as const;

export const MODULAR_STRUCTURE_SNIPPET = `proyecto/
  frontend/
    components/     piezas reutilizables
    pages/          pantallas
    services/       llamadas a la API
  backend/
    routes/         reciben la petición
    services/       lógica de negocio
    repositories/   acceso a datos
    models/         forma de los datos
    config/         ajustes por entorno
  database/         migraciones
  tests/
  docs/             README y OpenAPI`;

export const PAGINATION_RESPONSE_SNIPPET = `// offset
{ "datos": [...], "pagina": 2, "tamano": 20, "total": 341 }

// cursor
{ "datos": [...], "siguiente": "eyJpZCI6NDB9" }`;
