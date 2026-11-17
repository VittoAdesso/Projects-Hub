# Guía del Lead de IA, Automatización y Desarrollo

> Mapa interactivo de competencias por ruta técnica/gestión y autoevaluación de madurez del CoE con generación automática de resumen ejecutivo para dirección. Reconstruida a partir de `/legacy/guia-lead-ia-automatizacion-desarrollo.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para rutas (`TrackTuple`), competencias (`TrackNodeTuple`), pilares (`PillarTuple`) y niveles de madurez (`MaturityTuple`).
- **`data/leadData.ts`**: Niveles (`LB`), las 4 rutas con sus 24 competencias (`T`), los 4 pilares con sus 5 hitos (`PL`) y claves de almacenamiento.
- **`hooks/useGuiaLead.ts`**:
  - Funciones puras: `calcTrackMasteredCount`, `calcTrackPercentage`, `evaluateDirectionSummary`, `computeLegacyLeadOutputsHtml`.
  - Estado local y persistencia en `localStorage` bajo las claves `"guia-lead:r"` y `"guia-lead:m"`.
- **`components/`**:
  - `LeadToolbarAndNav.tsx`: Barra de acciones (`Descargar imagen`, `Descargar PDF`, `Imprimir`, `Borrar mis marcas`), región `#msg` y navegación rápida (`#m1`, `#m2`, `#m3`).
  - `RoleTracksSection.tsx`: Cuadrícula de las 4 rutas formativas (`#tracks`) con barra de progreso y botones seleccionables.
  - `MaturityPillarsSection.tsx`: Los 4 pilares de madurez (`#pls`) con selectores `N0`–`N5` y textos dinámicos de estado actual y siguiente paso.
  - `DirectionSummarySection.tsx`: Resumen ejecutivo para dirección (`#sum`) con nivel global `N{g}`, diagnóstico, barras por pilar y porcentajes por ruta.
- **`views/GuiaLeadView.tsx`**: Vista principal integrada en `ToolShell`.
