# Centro de gobierno de agentes de IA (`gobierno-agentes`)

Herramienta interactiva de gobierno para inventariar agentes de IA, clasificar su nivel de riesgo (Bajo, Medio o Alto), verificar el cumplimiento de sus controles obligatorios (4, 9 o 16 controles), validar su evaluación antes de publicar, controlar su cadencia de revisión periódica y ofrecer un panel ejecutivo para el comité.

## Origen

Migrada desde `/legacy/gobierno-agentes-ia.html` manteniendo **100 % de paridad** en textos, algoritmos de clasificación de riesgo (`eva`), reglas de promoción de nivel, validación de casos de prueba, alertas de revisión vencida y métricas del panel del comité.

## Estructura

- `types.ts`: Contratos TypeScript estrictos para agentes, resultados de evaluación y resumen del comité.
- `data/agentsData.ts`: Catálogos (`PR`, `DA`, `AC`, `AU`, `AL`, `ST`, `CT`, `NC`, `MESES`, `TN`, `TC`), constructores (`createBlankAgent`), agentes iniciales (`DEFAULT_AGENTS`) y datos de supervisión e incidentes.
- `hooks/useGobiernoAgentes.ts`: Motor puro `evaluateAgent`, generador `computeLegacyAgentsOutputsHtml`, persistencia en `localStorage` bajo la clave `gobierno-agentes:agents` y hook de estado React.
- `components/`:
  - `AgentsToolbarAndNav.tsx`: Barra superior de acciones (`Descargar imagen`, `Descargar PDF`, `Imprimir`), barra de estado (`#msg`) y navegación por anclas (`#a`..`#e`).
  - `AgentCardItem.tsx`: Tarjeta interactiva de agente con campos de identificación, 6 selectores de riesgo/estado, métricas de evaluación, barra de progreso SVG y lista de controles obligatorios.
  - `CommitteePanelSection.tsx`: Panel del comité (`#sm`) con 5 KPIs y 4 listas de seguimiento.
  - `StaticGovernanceSections.tsx`: Cuadrícula de los 6 principios de gobierno (`#pr`), tabla de supervisión humana y protocolo de respuesta ante fallos.
- `views/GobiernoAgentesView.tsx`: Composición principal del documento `#sheet`.
- `index.tsx`: Punto de entrada envuelto en `ToolShell` y `ScrollToTop`.
