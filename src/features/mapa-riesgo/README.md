# Mapa de Riesgo de Continuidad del CoE

> Calculadora y mapa interactivo de riesgo de continuidad operativa del CoE: identifica qué procesos dependen de una sola persona (*bus factor*), calcula su fragilidad y nivel de riesgo, proyecta el escenario de ausencia de la persona clave y genera hasta 8 acciones priorizadas. Reconstruida a partir de `/legacy/mapa-riesgo-continuidad-coe.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para filas de proceso (`ProcessRow`, `CalculatedProcessRow`), factores (`ProcessSelectKey`), niveles de riesgo (`RiskLevelIndex`, `RiskLevelClass`) y acciones priorizadas.
- **`data/riskConstants.ts`**: Los 3 procesos de ejemplo iniciales (`DEFAULT_ROWS`), los 6 selectores (`F`), pesos de fragilidad (`PP`, `DD`, `TT`, `MAXF`) y niveles (`LV`).
- **`hooks/useMapaRiesgo.ts`**:
  - Funciones puras: `calcProcessRows`, `buildPrioritizedActions`, `computeOutputsHtml`, `loadRowsFromStorage`, `saveRowsToStorage`.
  - Estado local y persistencia en `localStorage` bajo la clave `"mapa-riesgo:rows"`.
- **`components/`**:
  - `RiskToolbar.tsx`: Barra superior de acciones (`Descargar imagen`, `Descargar PDF`, `Imprimir`, `Borrar todo`) y región de estado `#msg`.
  - `ProcessRowEditor.tsx`: Editor dinámico de filas (`#rows`) y botón `Añadir proceso` (`#ad`).
  - `RiskSummaryAndTable.tsx`: Resumen de KPIs (`#sm`) y tabla ordenada por riesgo (`#tb`).
  - `RiskHeatmap.tsx`: Mapa de calor 3×3 (`#hm`) de criticidad frente a fragilidad.
  - `RiskScenarioAndActions.tsx`: Simulación del escenario de ausencia (`#sc2`) y acciones recomendadas (`#ac`).
- **`views/MapaRiesgoView.tsx`**: Vista principal integrada en `ToolShell`.
