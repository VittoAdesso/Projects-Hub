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
