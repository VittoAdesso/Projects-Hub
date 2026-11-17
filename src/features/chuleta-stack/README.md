# Mi Stack Tecnológico: Chuleta (`chuleta-stack`)

Guía interactiva y visual de referencia rápida dividida en dos fases (**Fase 1 · Power Platform: usar y automatizar** y **Fase 2 · Desarrollo: front, back, API, datos y servidor**) que explica qué hace cada pieza del stack tecnológico, cuándo usarla y qué la limita mediante la analogía de un vehículo.

## Origen

Migrada desde `/legacy/chuleta-stack-tecnologico.html` conservando **100 % de paridad** en textos, colores de capas, etiquetas de licencia, filtrado en tiempo real por palabra clave (`#q`), selector de decisión (`#chips` y `#res`), flujos de arquitectura, ejemplos SQL, glosario y códigos HTTP.

## Estructura

- `types.ts`: Contratos TypeScript estrictos para capas, herramientas, opciones de decisión, flujos, reglas y glosario.
- `data/stackData.ts`: Catálogos tipados (`C`, `C2`, `L`, `D`, `F`, `R`, `G`, `K`, `DV`, `AF`, `R3`, `R2`) y fragmentos de código (`MODULAR_FOLDER_TREE`, `SQL_CHEATSHEET_SNIPPET`).
- `hooks/useChuletaStack.ts`: Funciones puras `filterStackLayers`, `filterDevLayers`, `computeLegacyStackOutputsHtml` y hook de estado React.
- `components/`:
  - `StackToolbarAndLegend.tsx`: Buscador instantáneo (`#q`), botones de exportación (`Descargar imagen`, `Descargar PDF`, `Imprimir`), barra de estado (`#msg`), leyenda de licencias (`.leg`) y enlaces de navegación (`#f1`, `#f2`).
  - `StackTimelineSection.tsx`: Líneas verticales `.stack` y capas `.ly` para la Fase 1 (`#stack`) y Fase 2 (`#stack2`).
  - `NeedDecisionSelector.tsx`: Chips interactivos (`#chips`) con `aria-pressed` y tarjeta de recomendación (`#res`).
  - `FlowsRulesAndGlossary.tsx`: Diagramas de flujo (`#flows`, `#arqflow`), bloques `<pre>`, listas de reglas (`#rules`, `#rules3`, `#rules2`), glosario (`#gl`) y códigos de estado HTTP (`#cod`).
- `views/ChuletaStackView.tsx`: Composición principal del documento `#sheet`.
- `index.tsx`: Punto de entrada envuelto en `ToolShell` y `ScrollToTop`.
