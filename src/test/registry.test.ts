import { describe, it, expect } from 'vitest';
import { toolsRegistry, getToolById } from '@/features/registry';

describe('Tools Registry', () => {
  it('no contiene IDs duplicados', () => {
    const ids = toolsRegistry.map((tool) => tool.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('no contiene rutas duplicadas', () => {
    const routes = toolsRegistry.map((tool) => tool.route);
    const uniqueRoutes = new Set(routes);
    expect(uniqueRoutes.size).toBe(routes.length);
  });

  it('todas las rutas comienzan con "/"', () => {
    for (const tool of toolsRegistry) {
      expect(tool.route.startsWith('/')).toBe(true);
    }
  });

  it('permite buscar una herramienta existente por ID', () => {
    const ejemplo = getToolById('ejemplo');
    expect(ejemplo).toBeDefined();
    expect(ejemplo?.name).toBe('Herramienta de Ejemplo');
  });

  it('devuelve undefined al buscar un ID inexistente', () => {
    const inexistente = getToolById('no-existe');
    expect(inexistente).toBeUndefined();
  });
});
