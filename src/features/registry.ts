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
