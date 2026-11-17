# Supervisor de Arquitectura Modular y Código Limpio

> Auditoría interactiva ponderada de 43 criterios en 8 áreas (arquitectura modular, código limpio, API y datos, pruebas y calidad, seguridad, proyecto y entrega, interfaz y experiencia, rendimiento y operación) con cálculo automático de semáforo, puntos urgentes, preguntas para el equipo, plan en 3 pasos y guía de referencia. Reconstruida a partir de `/legacy/supervisor-arquitectura-codigo-limpio.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para respuestas (`AuditValue`, `AuditAnswersMap`), criterios (`AuditItemTuple`), grupos (`AuditGroupTuple`) y evaluación (`AuditEvaluationResult`).
- **`data/supervisorData.ts`**: Los 8 grupos con 43 criterios ponderados (`G`), opciones (`OP`), 4 fases (`FS`), 16 conceptos (`CP`), 10 señales de alerta (`SA`) y fragmentos de referencia.
- **`hooks/useSupervisorCodigo.ts`**:
  - Funciones puras: `evaluateAudit`, `computeLegacySupervisorOutputsHtml`, `loadSupervisorFromStorage`, `saveSupervisorToStorage`.
  - Estado local y persistencia en `localStorage` bajo la clave `"supervisor-codigo:state"`.
- **`components/`**:
  - `SupervisorToolbarAndNav.tsx`: Barra superior (`Descargar imagen`, `Descargar PDF`, `Imprimir`, `Borrar respuestas`), región `#msg` y navegación rápida (`#a`, `#r`, `#c`, `#f`).
  - `AuditGroupsSection.tsx`: Campo de nombre de proyecto (`#pn`) y los 8 bloques de auditoría (`#gps`).
  - `AuditResultsSection.tsx`: Resumen global (`#sm`), *Lo más urgente* (`#ur`), *Preguntas para el equipo* (`#qs`) y *Plan sugerido* (`#plan`).
  - `ReferenceSections.tsx`: Secciones *3 · Conceptos básicos* (`#cp`, `#sa`) y *4 · Referencia rápida* (`#fs`, árbol modular y paginación).
- **`views/SupervisorCodigoView.tsx`**: Vista principal integrada en `ToolShell`.
