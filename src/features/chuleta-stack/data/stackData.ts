import type {
  ArchitectureFlowTuple,
  DecisionOptionTuple,
  DevLayerKey,
  DevLayerTuple,
  FlowStepTuple,
  GlossaryTermTuple,
  HttpStatusCodeTuple,
  LicenseCategoryKey,
  RuleTuple,
  StackLayerKey,
  StackLayerTuple,
} from '../types'

export const C: Record<StackLayerKey, string> = {
  ui: '#2563A8',
  or: '#2E7D52',
  ex: '#C2561C',
  co: '#6A4BB5',
  da: '#0E7490',
  le: '#8A5A00',
}

export const C2: Record<DevLayerKey, string> = {
  fe: '#2563A8',
  be: '#6A4BB5',
  db: '#0E7490',
  sv: '#3D4C5B',
  qa: '#2E7D52',
}

export const TAG: Record<LicenseCategoryKey, LicenseCategoryKey> = {
  ok: 'ok',
  mx: 'mx',
  pr: 'pr',
  ow: 'ow',
}

export const L: readonly StackLayerTuple[] = [
  [
    'ui',
    'Salpicadero y volante',
    'interfaz: lo que se ve y se toca',
    [
      [
        'Power Apps',
        'Pantallas y formularios',
        'Que alguien rellene o consulte datos, en web o móvil.',
        'No guarda datos: necesita una fuente.',
        'mx',
        'Mixta',
      ],
      [
        'Copilot Studio',
        'Agente conversacional',
        'Responder en lenguaje natural con tus fuentes o lanzar flujos.',
        'Consumo y licencia aparte.',
        'ow',
        'Aparte',
      ],
      [
        'M365 Copilot',
        'Asistente dentro de Office',
        'Redactar, resumir y buscar en tu contenido de M365.',
        'No automatiza procesos por sí solo.',
        'ow',
        'Add-on',
      ],
    ],
  ],
  [
    'or',
    'Sistema nervioso',
    'orquestación: conecta y reacciona',
    [
      [
        'Power Automate Cloud',
        'Flujos con disparador',
        'Eventos, aprobaciones, avisos, llamadas a API y lanzar PAD.',
        'HTTP y varios conectores son premium.',
        'mx',
        'Mixta',
      ],
    ],
  ],
  [
    'ex',
    'Brazos y herramientas',
    'ejecución: hace el trabajo',
    [
      [
        'PAD',
        'Manos sobre la pantalla',
        'SAP GUI, AS400 y apps de escritorio que no tienen API.',
        'Se rompe si cambia la interfaz. Lanzarlo desde Cloud es premium.',
        'mx',
        'Mixta',
      ],
      [
        'UiPath',
        'RPA a mayor escala',
        'Procesos con Orchestrator, colas y registro centralizado.',
        'Licencia y mantenimiento propios.',
        'ow',
        'Propia',
      ],
      [
        'VBA',
        'Macros dentro de Office',
        'Informes y documentos masivos desde Excel, Word u Outlook.',
        'Solo donde esté Office de escritorio.',
        'ok',
        'Incluida',
      ],
    ],
  ],
  [
    'co',
    'Enchufes y tuberías',
    'conexión: cómo hablan los sistemas',
    [
      [
        'Conector',
        'Conexión ya preparada',
        'SharePoint, Outlook, Teams, SQL... sin escribir código.',
        'Algunos son premium.',
        'mx',
        'Mixta',
      ],
      [
        'API REST (HTTP)',
        'Pedir o enviar datos',
        'Servicios sin conector. Responden en JSON.',
        'Pide autenticación y tiene límite de llamadas. HTTP es premium.',
        'pr',
        'Premium',
      ],
      [
        'Webhook',
        'Aviso del otro sistema',
        'Reaccionar al instante cuando algo ocurre allí.',
        'Necesita una dirección que reciba el aviso.',
        'mx',
        'Depende',
      ],
    ],
  ],
  [
    'da',
    'Depósito',
    'datos: dónde se guarda todo',
    [
      [
        'SharePoint Lists',
        'Tablas sencillas',
        'Datos de apps, formularios y tableros Kanban.',
        'La vista se limita a 5.000 elementos sin índices ni filtros.',
        'ok',
        'Incluida',
      ],
      [
        'Excel',
        'Hoja de cálculo',
        'Volúmenes pequeños y cargas puntuales.',
        'No es una base de datos: sin control de acceso simultáneo.',
        'ok',
        'Incluida',
      ],
      [
        'Dataverse',
        'Base de datos completa',
        'Relaciones entre tablas y seguridad por registro.',
        'Suele requerir licencia premium.',
        'pr',
        'Premium',
      ],
      [
        'SQL',
        'Base de datos corporativa',
        'Gran volumen e integración con otros sistemas.',
        'Conector premium y gateway si el servidor es local.',
        'pr',
        'Premium',
      ],
    ],
  ],
  [
    'le',
    'Cuadro de instrumentos',
    'lectura: ver el estado de todo',
    [
      [
        'Power BI',
        'Informes y análisis',
        'Cifras, tendencias e indicadores.',
        'Lee datos, no los captura. Compartir requiere licencia Pro.',
        'mx',
        'Mixta',
      ],
    ],
  ],
] as const

export const D: readonly DecisionOptionTuple[] = [
  [
    'Tengo API o conector',
    'Power Automate Cloud',
    'Reacciona a eventos y habla con los servicios por conector o API.',
    'El conector HTTP y otros son premium.',
  ],
  [
    'Solo hay pantalla (SAP GUI, AS400)',
    'PAD (UiPath si hay que escalar)',
    'Maneja la pantalla como lo haría una persona.',
    'Si cambia la interfaz, se rompe. Mejor por ID de elemento que grabando clics.',
  ],
  [
    'Alguien debe rellenar datos',
    'Power Apps + SharePoint Lists',
    'Formulario en móvil o web y una tabla donde se guarda.',
    'Power Apps no guarda nada por sí sola.',
  ],
  [
    'Ver cifras y tendencias',
    'Power BI',
    'Informes e indicadores sobre los datos ya guardados.',
    'Lee datos, no sirve para capturarlos.',
  ],
  [
    'Preguntar en lenguaje natural',
    'Copilot Studio',
    'Agente que responde con tus fuentes y puede lanzar flujos.',
    'Revisa licencia y consumo antes de prometerlo.',
  ],
  [
    'Automatizar dentro de Excel o Word',
    'VBA',
    'Macros dentro de Office, sin más herramientas.',
    'Solo funciona donde esté Office de escritorio.',
  ],
  [
    'Guardar datos',
    'Lists, Dataverse o SQL',
    'Lists para casos simples, Dataverse con relaciones y seguridad, SQL para gran volumen.',
    'Dataverse y SQL suelen ser premium. Excel solo para volúmenes pequeños.',
  ],
] as const

export const F: readonly ArchitectureFlowTuple[] = [
  [
    'Solicitud desde el móvil',
    [
      ['Power Apps', 'ui'],
      ['SharePoint Lists', 'da'],
      ['Power Automate Cloud', 'or'],
      ['Power BI', 'le'],
    ],
    'La persona rellena el formulario, queda guardado, el flujo avisa y el informe lo cuenta.',
  ],
  [
    'Proceso en SAP sin API',
    [
      ['Cloud programa', 'or'],
      ['PAD maneja SAP GUI', 'ex'],
      ['Excel con OK/KO', 'da'],
      ['Cloud envía resumen', 'or'],
    ],
    'Cloud lanza el robot, PAD hace el trabajo en pantalla y el resultado vuelve por correo.',
  ],
  [
    'Agente que consulta datos',
    [
      ['Copilot Studio', 'ui'],
      ['Power Automate Cloud', 'or'],
      ['API REST', 'co'],
      ['SharePoint Lists', 'da'],
    ],
    'El agente recibe la pregunta, el flujo consulta la fuente y el agente contesta.',
  ],
] as const

export const R: readonly RuleTuple[] = [
  [
    'Si existe conector o API, no uses PAD.',
    'Es más estable, más rápido y más fácil de mantener.',
  ],
  [
    'PAD depende de la pantalla.',
    'Cualquier cambio visual puede romperlo. Usa identificadores de elemento y registra los errores.',
  ],
  [
    'Power Apps no es una base de datos.',
    'Siempre necesita una fuente: Lists, Dataverse, SQL o Excel.',
  ],
  [
    'Excel no es una base de datos.',
    'Tiene tope de 1.048.576 filas y no controla bien el acceso simultáneo.',
  ],
  [
    'En Lists, filtra desde el principio.',
    'Pasados los 5.000 elementos, una vista sin índice o filtro falla.',
  ],
  [
    'Toda API pide credenciales y limita llamadas.',
    'Guarda las claves fuera del flujo y prevé reintentos.',
  ],
  [
    'Webhook avisa; consultar cada cierto tiempo pregunta.',
    'Si el sistema lo permite, el aviso es más rápido y gasta menos.',
  ],
] as const

export const G: readonly GlossaryTermTuple[] = [
  ['API', 'Puerta por la que un programa pide o envía datos a otro.'],
  [
    'REST',
    'Estilo habitual de API que usa direcciones web y verbos como GET o POST.',
  ],
  [
    'JSON',
    'Formato de texto con pares campo y valor. Lo que devuelven casi todas las API.',
  ],
  ['Endpoint', 'La dirección concreta de una API a la que se llama.'],
  ['Webhook', 'Aviso que envía un sistema a otro cuando ocurre algo.'],
  ['Disparador', 'Lo que inicia un flujo: un evento, una hora o un botón.'],
  [
    'CRUD',
    'Crear, leer, actualizar y borrar: las cuatro operaciones básicas sobre datos.',
  ],
  ['Clave primaria', 'Campo que identifica de forma única cada registro.'],
  [
    'SQL',
    'Lenguaje para consultar y modificar bases de datos relacionales.',
  ],
  ['Conector', 'API ya empaquetada para usarla sin escribir código.'],
  [
    'Front-end',
    'La parte que ve y toca la persona: páginas, formularios y botones.',
  ],
  [
    'Back-end',
    'La parte que corre en el servidor: lógica, API y acceso a datos.',
  ],
  [
    'Servidor',
    'Equipo, local o en la nube, donde se ejecutan la API y la base de datos.',
  ],
  [
    'Módulo',
    'Pieza de código con una sola responsabilidad, que se puede cambiar sin tocar el resto.',
  ],
  [
    'Componente',
    'Elemento reutilizable de la interfaz, como un botón o una tabla.',
  ],
  [
    'Migración',
    'Script que cambia la estructura de la base de datos y queda guardado en el historial.',
  ],
  [
    'Contenedor',
    'Paquete (Docker) con el código y lo que necesita, que funciona igual en cualquier servidor.',
  ],
  ['Índice', 'Estructura que hace más rápidas las búsquedas en una tabla.'],
] as const

export const K: readonly HttpStatusCodeTuple[] = [
  ['200', 'todo correcto'],
  ['400', 'petición mal formada'],
  ['401', 'falta autenticación'],
  ['403', 'sin permiso'],
  ['404', 'no existe'],
  ['429', 'demasiadas llamadas'],
  ['500', 'fallo del servidor'],
] as const

export const DV: readonly DevLayerTuple[] = [
  [
    'fe',
    'Front-end',
    'la cabina: lo que ve y toca la persona',
    [
      [
        'Páginas y componentes',
        'Interfaz web o móvil',
        'Interfaz',
        [
          'HTML, CSS y JavaScript: la base de cualquier web',
          'Componentes reutilizables (botón, tabla, formulario), a mano o con React o Vue',
          'Llama a la API con fetch y muestra el JSON',
          'Debe verse bien en móvil y ser accesible',
        ],
      ],
    ],
  ],
  [
    'be',
    'Back-end y API',
    'el taller: la lógica y las reglas',
    [
      [
        'Construir una API',
        'Endpoints y lógica',
        'Código',
        [
          'Un endpoint por acción: GET lee, POST crea, PUT o PATCH cambia, DELETE borra',
          'Responde en JSON con un código de estado (200, 401, 404...)',
          'Lenguajes habituales: Python (FastAPI, Flask), JavaScript (Node, Express), C# (ASP.NET)',
          'Valida los datos de entrada y registra los errores',
        ],
      ],
      [
        'Seguridad y acceso',
        'Quién entra y a qué',
        'Obligatorio',
        [
          'Autenticación: clave de API u OAuth 2.0 con Microsoft Entra ID',
          'Permisos mínimos: cada cliente accede solo a lo que necesita',
          'Claves en un almacén seguro (Azure Key Vault), nunca dentro del código',
          'Siempre por HTTPS y con límite de llamadas',
        ],
      ],
      [
        'Conectar con Power Platform',
        'Enchufes a medida',
        'Premium',
        [
          'Conector personalizado, creado a partir de la definición OpenAPI',
          'Cloud llama a la API con HTTP y trata el JSON',
          'Power Apps la usa a través del conector o de un flujo',
          'Microsoft Graph: la API de SharePoint, Teams y Outlook',
        ],
      ],
    ],
  ],
  [
    'db',
    'Base de datos y SQL',
    'el archivador: donde se guarda todo',
    [
      [
        'Bases de datos',
        'Dónde viven los datos',
        'Datos',
        [
          'SQL (Azure SQL, SQL Server, PostgreSQL): tablas relacionadas y consultas',
          'NoSQL (Cosmos DB, MongoDB): documentos flexibles tipo JSON',
          'Dataverse y SharePoint Lists: dentro de Microsoft 365',
          'La API es la puerta; la base de datos es lo que hay detrás',
        ],
      ],
      [
        'SQL y diseño de tablas',
        'Consultar y modelar',
        'Datos',
        [
          'Clave primaria en cada tabla y clave foránea para relacionarlas',
          'Normalizar: cada dato en un solo sitio',
          'Índices en las columnas que se buscan a menudo',
          'Migraciones para cambiar la estructura con historial',
        ],
      ],
    ],
  ],
  [
    'sv',
    'Servidor y despliegue',
    'el garaje: dónde vive todo',
    [
      [
        'Dónde se ejecuta',
        'Servidor y nube',
        'Nube',
        [
          'Azure Functions: código que corre solo cuando lo llaman',
          'Azure App Service: una API siempre encendida',
          'Azure API Management: publicar, proteger y controlar APIs',
          'Vercel: webs y funciones, fáciles de publicar',
        ],
      ],
      [
        'Contenedores y entornos',
        'Que funcione igual en todas partes',
        'Despliegue',
        [
          'Docker: el código y lo que necesita en un solo paquete',
          'Entornos separados: desarrollo, pruebas y producción',
          'Variables de entorno para claves y direcciones',
          'Despliegue automático al publicar (GitHub Actions)',
        ],
      ],
    ],
  ],
  [
    'qa',
    'Calidad y apoyo',
    'la revisión y el taller de ayuda',
    [
      [
        'Probar y documentar',
        'Que funcione y se entienda',
        'Calidad',
        [
          'Postman: probar cada llamada y guardar colecciones',
          'OpenAPI (Swagger): describir la API y generar su documentación',
          'Pruebas automáticas antes de publicar',
          'README claro: qué hace, cómo se instala y cómo se usa',
        ],
      ],
      [
        'Código y versiones',
        'El cuaderno de obra',
        'Control',
        [
          'Git y GitHub: historial de cambios, ramas y revisiones',
          'Cada cambio en una rama y revisado antes de unirlo',
          'Commits pequeños con un mensaje claro',
          'Nada de claves ni datos reales en el repositorio',
        ],
      ],
      [
        'IA para desarrollar',
        'El copiloto de taller',
        'Apoyo',
        [
          'Claude, ChatGPT, Gemini y Google AI Studio: escribir, explicar y revisar código',
          'LM Studio: modelos en local, sin enviar datos fuera',
          'Pedir con contexto: qué tengo, qué quiero y cómo hacerlo',
          'Revisar siempre lo que genera: puede equivocarse',
        ],
      ],
    ],
  ],
] as const

export const AF: readonly FlowStepTuple[] = [
  ['Navegador o app', 'fe'],
  ['API (back-end)', 'be'],
  ['Servicios (lógica)', 'be'],
  ['Acceso a datos', 'db'],
  ['Base de datos', 'db'],
] as const

export const R3: readonly RuleTuple[] = [
  [
    'Separa responsabilidades.',
    'Cada módulo hace una sola cosa: así se prueba y se cambia sin romper el resto.',
  ],
  [
    'Piensa en capas.',
    'Presentación, lógica y acceso a datos no se mezclan.',
  ],
  [
    'Reutiliza componentes.',
    'Un botón o una tabla se escribe una vez y se usa en todas las pantallas.',
  ],
  [
    'La API es el contrato.',
    'Front y back solo se hablan por ella; documentarla con OpenAPI evita malentendidos.',
  ],
] as const

export const R2: readonly RuleTuple[] = [
  [
    'Valida siempre en el servidor.',
    'Validar solo en la pantalla no protege: cualquiera puede llamar a la API directamente.',
  ],
  [
    'Ninguna clave en el código ni en el front-end.',
    'Van en variables de entorno o en un almacén seguro.',
  ],
  [
    'Los cambios de base de datos van en migraciones.',
    'Nunca a mano en producción: dejan historial y se pueden repetir.',
  ],
  [
    'Prueba en desarrollo antes de producción.',
    'Con datos de prueba, nunca con los reales.',
  ],
  [
    'Haz copia de seguridad y sabe restaurarla.',
    'Una copia que nunca se ha restaurado no es una garantía.',
  ],
] as const

export const MODULAR_FOLDER_TREE = `proyecto/
  frontend/         páginas, componentes y llamadas a la API
  backend/
    routes/         endpoints: reciben la petición
    services/       lógica de negocio
    repositories/   acceso a datos (SQL)
    models/         forma de los datos
    config/         variables por entorno
  database/         migraciones y scripts SQL
  tests/            pruebas automáticas
  docs/             OpenAPI y README`

export const SQL_CHEATSHEET_SNIPPET = `SELECT * FROM clientes WHERE ciudad = 'Madrid';
INSERT INTO clientes (nombre, ciudad) VALUES ('Ana', 'Madrid');
UPDATE clientes SET ciudad = 'Sevilla' WHERE id = 7;
DELETE FROM clientes WHERE id = 7;

SELECT c.nombre, COUNT(*) AS pedidos
FROM clientes c JOIN pedidos p ON p.cliente_id = c.id
WHERE p.fecha >= '2026-01-01'
GROUP BY c.nombre;`
