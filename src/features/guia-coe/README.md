# Guía del CoE integrado para varias áreas

> Guía conceptual e interactiva para estructurar un Centro de Excelencia (CoE) entre múltiples departamentos: conceptos base, modelos de gobierno, asistente de recomendación de modelo, método de implantación en 6 fases, diagrama de áreas, matriz RACI, escalera de madurez y consejos del lead. Reconstruida a partir de `/legacy/guia-coe-integrado-varias-areas.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para colores semánticos (`CoeColorToken`), conceptos, modelos, preguntas del asistente, fases, filas RACI y niveles de madurez.
- **`data/coeData.ts`**: Todos los datos tipados (`CO`, `MO`, `Q`, `MD`, `FS`, `ES`, `RC`, `LD`, `TP`, `ER`) idénticos al original.
- **`hooks/useGuiaCoe.ts`**:
  - Funciones puras: `evaluateCoeRecommendation`, `buildRecommendationHtml`, `getRaciCellClass`.
  - Estado local del asistente (4 respuestas), fase activa (`0` a `5`) y mensajes de estado de exportación.
- **`components/`**:
  - `CoeExportBar.tsx`: Barra de acciones (`Descargar imagen`, `Descargar PDF`, `Imprimir`), línea de estado accesible y navegación por anclas.
  - `ColoredBorderCard.tsx`: Tarjeta con borde superior semántico (`--bl`, `--pu`, `--gr`, `--or`).
  - `CoeAdvisorSection.tsx`: Asistente interactivo de 4 preguntas y panel de recomendación (`#res`).
  - `CoePhasesSection.tsx`: Selector de las 6 fases operativas y panel de detalle (`#fp`) con plantilla de cierre copiable.
  - `CoeIntegratedDiagram.tsx`: Esquema del Núcleo del CoE conectado a las 4 áreas y comparativa *Lo común* vs *Lo propio*.
  - `CoeRaciTable.tsx`: Tabla RACI con resaltado semántico para `A` y `R`.
- **`views/GuiaCoeView.tsx`**: Vista principal integrada en `ToolShell`.
