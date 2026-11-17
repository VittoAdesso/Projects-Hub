import { type ComponentType, lazy, type LazyExoticComponent } from 'react';

export interface ToolDefinition {
  readonly id: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly route: string;
  readonly category?: string;
  readonly badge?: string;
  readonly component: LazyExoticComponent<ComponentType<Record<string, never>>>;
}

export const toolsRegistry: readonly ToolDefinition[] = [
  {
    id: 'dispaccio',
    name: 'Dispaccio',
    shortDescription:
      'Boletín y generador de prompts de análisis de IA y tecnología en 3 idiomas con 21 temas en 4 áreas clave.',
    route: '/dispaccio',
    category: 'IA & Análisis',
    badge: 'v2.2',
    component: lazy(() => import('./dispaccio')),
  },
  {
    id: 'manual-pm',
    name: 'Manual PM',
    shortDescription:
      'Manual operativo del gestor de proyectos: 9 fases obligatorias, toma de decisiones, protocolo de incidencias y 12 plantillas.',
    route: '/manual-pm',
    category: 'Metodología & Operaciones',
    badge: 'Manual v5',
    component: lazy(() => import('./manual-pm')),
  },
  {
    id: 'refactoring-guru',
    name: 'Refactorización y Patrones de Diseño',
    shortDescription:
      'Ruta guiada interactiva sobre Refactoring.Guru: deuda técnica, malos olores, técnicas de refactorización y patrones de diseño con seguimiento de progreso.',
    route: '/refactoring-guru',
    category: 'Arquitectura & Código Limpio',
    badge: 'Ruta Guiada',
    component: lazy(() => import('./refactoring-guru')),
  },
  {
    id: 'guia-coe',
    name: 'Guía del CoE Integrado',
    shortDescription:
      'Guía operativa y asistente interactivo para diseñar un Centro de Excelencia integrado entre varias áreas: modelos, método en 6 fases, matriz RACI y madurez.',
    route: '/guia-coe',
    category: 'Gobernanza & Operaciones',
    badge: 'Guía CoE',
    component: lazy(() => import('./guia-coe')),
  },
  {
    id: 'mapa-riesgo',
    name: 'Mapa de Riesgo de Continuidad del CoE',
    shortDescription:
      'Calculadora y mapa de calor de continuidad operativa (bus factor): detecta procesos frágiles o dependientes de una sola persona y prioriza acciones.',
    route: '/mapa-riesgo',
    category: 'Gobernanza & Operaciones',
    badge: 'Continuidad',
    component: lazy(() => import('./mapa-riesgo')),
  },
  {
    id: 'priorizador-roi',
    name: 'Priorizador de Demanda y ROI del CoE',
    shortDescription:
      'Priorizador cuantitativo de iniciativas con cálculo de ahorro anual, amortización, matriz SVG de valor frente a esfuerzo y resumen para dirección.',
    route: '/priorizador-roi',
    category: 'Gobernanza & Operaciones',
    badge: 'Priorización & ROI',
    component: lazy(() => import('./priorizador-roi')),
  },
  {
    id: 'guia-lead',
    name: 'Guía del Lead de IA, Automatización y Desarrollo',
    shortDescription:
      'Mapa interactivo de 24 competencias en 4 rutas, autoevaluación de madurez en 4 pilares (N0–N5) y resumen automático para dirección.',
    route: '/guia-lead',
    category: 'Gobernanza & Operaciones',
    badge: 'Mapa del Lead',
    component: lazy(() => import('./guia-lead')),
  },
  {
    id: 'supervisor-codigo',
    name: 'Supervisor de Arquitectura Modular y Código Limpio',
    shortDescription:
      'Auditoría interactiva ponderada de 43 criterios en 8 áreas con semáforo de salud, puntos urgentes, preguntas para el equipo y guía de referencia.',
    route: '/supervisor-codigo',
    category: 'Arquitectura & Código Limpio',
    badge: 'Auditoría',
    component: lazy(() => import('./supervisor-codigo')),
  },
  {
    id: 'gobierno-agentes',
    name: 'Centro de Gobierno de Agentes de IA',
    shortDescription:
      'Inventario de agentes de IA, clasificación automática de riesgo, controles obligatorios por nivel, evaluación antes de publicar y panel del comité.',
    route: '/gobierno-agentes',
    category: 'Gobernanza & Operaciones',
    badge: 'Gobierno IA',
    component: lazy(() => import('./gobierno-agentes')),
  },
  {
    id: 'chuleta-stack',
    name: 'Mi Stack Tecnológico: Chuleta',
    shortDescription:
      'Chuleta interactiva de Power Platform, RPA y desarrollo full-stack: capas del vehículo, selector según necesidad, flujos, SQL y glosario.',
    route: '/chuleta-stack',
    category: 'Arquitectura & Código Limpio',
    badge: 'Chuleta Stack',
    component: lazy(() => import('./chuleta-stack')),
  },
  {
    id: 'arquitecto-power-platform',
    name: 'Arquitectura de Soluciones en Power Platform',
    shortDescription:
      'Ruta guiada de 7 módulos para arquitectos en Power Platform: requisitos, fit/gap, entornos ALM, Dataverse, seguridad, integraciones y Well-Architected.',
    route: '/arquitecto-power-platform',
    category: 'Arquitectura & Código Limpio',
    badge: 'Ruta PL-600',
    component: lazy(() => import('./arquitecto-power-platform')),
  },
  {
    id: 'ejemplo',
    name: 'Herramienta de Ejemplo',
    shortDescription:
      'Demostración interactiva del ToolShell, sistema de tokens editoriales, copiado con fallback y acento independiente.',
    route: '/ejemplo',
    category: 'Demostración',
    badge: 'Ejemplo',
    component: lazy(() => import('./ejemplo')),
  },
] as const;

export function getToolById(id: string): ToolDefinition | undefined {
  return toolsRegistry.find((tool) => tool.id === id);
}

export function getAllTools(): readonly ToolDefinition[] {
  return toolsRegistry;
}
