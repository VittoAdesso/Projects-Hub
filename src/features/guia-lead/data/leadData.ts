import type { PillarTuple, TrackTuple } from '../types';

export const STORAGE_KEY_R = 'guia-lead:r';
export const STORAGE_KEY_M = 'guia-lead:m';

export const LB: readonly ['Base', 'Medio', 'Avanzado'] = [
  'Base',
  'Medio',
  'Avanzado',
] as const;

export const T: readonly [TrackTuple, TrackTuple, TrackTuple, TrackTuple] = [
  [
    'Inteligencia artificial',
    '#2563A8',
    'Del prompt al agente evaluado',
    [
      ['Qué es un LLM y sus límites: alucinaciones y contexto', 0],
      ['Prompts con contexto, ejemplos y formato de salida', 0],
      [
        'Asistentes y agentes (Copilot, Copilot Studio): instrucciones, conocimiento y acciones',
        1,
      ],
      [
        'Usar conocimiento propio: documentos, SharePoint y calidad de las fuentes',
        1,
      ],
      ['Evaluar agentes: casos de prueba, errores y mejora continua', 2],
      ['Gobierno de IA: datos, privacidad, licencias y normativa europea', 2],
    ],
  ],
  [
    'Automatización',
    '#C2561C',
    'De la idea al robot operado',
    [
      ['Detectar procesos candidatos: repetitivos, con reglas y volumen', 0],
      ['Flujos con conectores (Power Automate Cloud)', 0],
      ['RPA de escritorio (PAD, UiPath): selectores y SAP GUI scripting', 1],
      ['Control de errores, registro y reintentos', 1],
      [
        'Operación: colas, máquinas virtuales, credenciales y monitorización',
        2,
      ],
      ['Medir el ahorro y el retorno de cada automatización', 2],
    ],
  ],
  [
    'Desarrollo de aplicaciones',
    '#6A4BB5',
    'De los datos a la solución desplegada',
    [
      ['Datos: tablas, claves y SQL básico', 0],
      ['Interfaces y apps de bajo código (Power Apps)', 0],
      ['APIs: REST, JSON, autenticación y OpenAPI', 1],
      ['Arquitectura modular: capas, componentes y entornos', 1],
      ['Despliegue y calidad: Git, pruebas, CI/CD y contenedores', 2],
      ['Seguridad y mantenibilidad: permisos, secretos y documentación', 2],
    ],
  ],
  [
    'Liderazgo y gobierno',
    '#2E7D52',
    'De ordenar el trabajo a demostrar valor',
    [
      ['Intake y priorización: qué entra al CoE y qué no', 0],
      ['Estándares: nombres, carpetas, versionado y plantillas', 0],
      ['Registro maestro y tablero de trabajo (Kanban)', 1],
      [
        'Comunicar a dirección: problema, solución y resultado en una página',
        1,
      ],
      ['Métricas e impacto: indicadores que se revisan con regularidad', 2],
      ['Continuidad: manuales operativos, copias y formación del equipo', 2],
    ],
  ],
] as const;

export const PL: readonly [PillarTuple, PillarTuple, PillarTuple, PillarTuple] =
  [
    [
      'Gobernanza',
      'quién decide qué y con qué reglas',
      [
        'Documento con roles y reglas básicas, aunque no todos lo hayan leído',
        'Las reglas se aplican de forma consistente: los proyectos siguen el ciclo de vida definido',
        'Parte de la aprobación está semi-automatizada, por ejemplo con un formulario',
        'Se mide cuántos proyectos pasan cada puerta y cuánto tarda cada aprobación',
        'Las reglas se ajustan según esas métricas, por ejemplo simplificando un cuello de botella',
      ],
    ],
    [
      'Estándares',
      'cómo se hace y se documenta el trabajo',
      [
        'Plantillas básicas para los documentos más comunes',
        'Los proyectos nuevos usan las plantillas de forma consistente',
        'Parte de la documentación se genera sola desde el registro maestro',
        'Se mide el porcentaje de proyectos con documentación al día',
        'Los estándares se revisan según qué documentación se consulta de verdad',
      ],
    ],
    [
      'Operación',
      'cómo fluye el trabajo día a día',
      [
        'Existe un tablero Kanban o equivalente, aunque no todos lo usen igual',
        'Todo el trabajo pasa por el tablero y hay un registro maestro actualizado',
        'El registro maestro se actualiza solo, con un formulario o una automatización',
        'Hay un panel con indicadores: proyectos en curso, tiempos medios y rendimiento',
        'La priorización y los recursos se ajustan según esos indicadores',
      ],
    ],
    [
      'Plataforma',
      'con qué herramientas y en qué entornos',
      [
        'Inventario básico de herramientas y licencias',
        'Inventario actualizado y consultado antes de adquirir algo nuevo',
        'Altas y bajas de acceso mediante un proceso definido, no ad hoc',
        'Se mide el uso real de las licencias',
        'La plataforma se ajusta: se retiran licencias sin uso y se evalúan herramientas nuevas',
      ],
    ],
  ] as const;

export const TRACK_PROGRESS_WIDTH: Record<number, string> = {
  0: 'w-0',
  17: 'w-[17%]',
  33: 'w-[33%]',
  50: 'w-1/2',
  67: 'w-[67%]',
  83: 'w-[83%]',
  100: 'w-full',
};

export const PILLAR_BAR_WIDTH: Record<number, string> = {
  0: 'w-0',
  1: 'w-[20%]',
  2: 'w-[40%]',
  3: 'w-[60%]',
  4: 'w-[80%]',
  5: 'w-full',
};
