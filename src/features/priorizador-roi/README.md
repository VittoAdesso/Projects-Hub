# Priorizador de Demanda y ROI del CoE

> Calculadora interactiva de priorización de demanda y retorno de inversión (ROI) para el CoE: puntúa iniciativas según horas ahorradas, esfuerzo y riesgo, proyecta su ubicación en una matriz SVG de 4 cuadrantes basada en medianas y genera un resumen ejecutivo para dirección. Reconstruida a partir de `/legacy/priorizador-demanda-roi-coe.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para ideas (`IdeaRow`, `CalculatedIdeaRow`), cuadrantes (`QuadrantIndex`) y estado (`PrioritizerState`).
- **`data/prioritizerConstants.ts`**: Las 3 ideas de ejemplo iniciales (`DEFAULT_IDEAS`), nombres de cuadrantes (`QN`), opciones de riesgo y colores.
- **`hooks/usePriorizadorRoi.ts`**:
  - Funciones puras: `parsePositiveNumber`, `formatEsNumber`, `computeMedian`, `calcPrioritizer`, `computePrioritizerOutputsHtml`.
  - Estado local y persistencia en `localStorage` bajo la clave `"priorizador-roi:state"`.
- **`components/`**:
  - `PrioritizerToolbar.tsx`: Barra superior de acciones (`Descargar imagen`, `Descargar PDF`, `Imprimir`, `Borrar todo`) y estado `#msg`.
  - `IdeaRowsEditor.tsx`: Campo de coste por hora (`#ch`), editor dinámico de ideas (`#rows`) y botón `Añadir idea` (`#ad`).
  - `RankingTable.tsx`: Tabla de ranking (`#tb`) con columnas condicionales de ahorro anual y plazo de amortización.
  - `ValueEffortChart.tsx`: Matriz SVG (`#sv`) de valor frente a esfuerzo con líneas de mediana y leyenda de riesgo.
  - `ExecutiveSummaryBox.tsx`: Resumen ejecutivo para dirección (`#sm`) con KPIs y recomendaciones.
- **`views/PriorizadorRoiView.tsx`**: Vista principal integrada en `ToolShell`.
