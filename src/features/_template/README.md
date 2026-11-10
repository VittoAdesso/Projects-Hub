# Plantilla para Nuevas Herramientas

Esta carpeta sirve como molde para crear una nueva herramienta en el proyecto. **No se registra ni se compila directamente.**

## Pasos para crear una herramienta nueva

1. **Duplica esta carpeta:**
   Copia `src/features/_template/` a una nueva carpeta con el identificador de tu herramienta:
   ```bash
   cp -r src/features/_template src/features/mi-herramienta
   ```

2. **Rellena los archivos:**
   - `types.ts`: Define las interfaces y estructuras de datos de tu herramienta.
   - `data/`: Añade datos estáticos o diccionarios si los necesitas.
   - `components/`: Componentes específicos de la herramienta.
   - `views/MainView.tsx`: Vista principal que ensambla la herramienta.
   - `index.tsx`: Exporta por defecto la vista principal.

3. **(Opcional) Personaliza el color de acento:**
   En `src/shared/styles/tokens.css`, define las variables para tu herramienta:
   ```css
   .tool-mi-herramienta {
     --accent: #d97706; /* Ámbar, violeta, esmeralda, etc. */
     --accent-foreground: #ffffff;
     --ring: #d97706;
   }
   .dark .tool-mi-herramienta {
     --accent: #f59e0b;
     --accent-foreground: #1c1917;
     --ring: #fbbf24;
   }
   ```

4. **Regístrala en `src/features/registry.ts`:**
   Añade tu herramienta a la lista `toolsRegistry`:
   ```typescript
   {
     id: 'mi-herramienta',
     name: 'Mi Nueva Herramienta',
     shortDescription: 'Descripción breve para la tarjeta del catálogo.',
     route: '/mi-herramienta',
     category: 'Texto',
     component: lazy(() => import('./mi-herramienta')),
   }
   ```

5. **Verifica:**
   ```bash
   npm run typecheck
   npm run test
   ```
