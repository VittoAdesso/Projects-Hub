# Manual PM — Primero integra, luego evoluciona

> Manual operativo del gestor de proyectos: sistema de trabajo de 9 fases obligatorias, toma de decisiones, protocolo de crisis e incidencias, y 12 plantillas editables. Reconstruido a partir del original `/legacy/manual-pm_v5.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para las secciones (`SectionId`), áreas funcionales (`AreaId`) y plantillas (`TemplateDefinition`).
- **`data/`**:
  - `sections.ts`: Metadatos de las 8 secciones principales (`inicio`, `rut`, `proc`, `dec`, `reu`, `inc`, `cor`, `est`).
  - `templates.ts`: Definición de las 12 plantillas copiables (`c1` a `c10`, incluyendo `c2a`, `c2b`, `c2c`).
  - `areas.ts`: Datos estructurados de las 4 áreas funcionales en Estabilización (RRHH, Financiero, Operaciones, IT / Sistemas).
- **`hooks/`**:
  - `useManualPm.ts`: Estado local de navegación entre secciones, selección de área y visibilidad del kit de emergencia.
- **`components/`**:
  - `ManualHeader.tsx`: Cabecera editorial con indicador de estado, título "MANUAL PM" y lema de la herramienta.
  - `ManualNav.tsx`: Navegación accesible por pestañas (`role="tablist"` / `role="tab"`).
  - `TemplateBlock.tsx`: Bloque de plantilla copiable con `CopyButton` y resaltado de slots.
  - `Slot.tsx`: Indicador visual de huecos rellenables (`[slot]`).
  - `KitDesplegable.tsx`: Kit de emergencia desplegable ("Romper en caso de incendio") con los 4 pasos y enlace rápido a incidencias.
  - `FlowDiagram.tsx`: Diagrama interactivo del flujo de 9 pasos con estados de diseño, construcción y vida en producción.
  - `AreaTabs.tsx`: Selector por pestañas de ejemplos reales por área funcional.
- **`views/`**:
  - `InicioView.tsx`: Vista de bienvenida, kit de emergencia, selector rápido y resumen del recorrido completo.
  - `RutinaView.tsx`: Rutina semanal, regla diaria de 2 minutos y script anti-presión.
  - `ProcedimientoView.tsx`: Las 9 fases operativas obligatorias y gestión de capacidad.
  - `DecisionView.tsx`: Arquitectura 80/20, validación humana, interlocutor único y semáforo de priorización.
  - `ReunionesView.tsx`: Estructura de las 3 reuniones de análisis y las 10 preguntas obligatorias.
  - `IncidenciasView.tsx`: Protocolo de petición informal, crisis y plantillas de contención.
  - `CorreosView.tsx`: Las 8 plantillas de correos y reportes.
  - `EstabilizacionView.tsx`: Causas, propuesta en 6 fases, plantillas por área, roadmap y casos reales.
  - `ManualPmView.tsx`: Contenedor principal integrado en `ToolShell`.

---

## 🎨 Identidad Visual

Manual PM se estiliza mediante tokens dedicados en `.tool-manual-pm`:
- Fondo cálido/editorial (`--pm-bg`, `--pm-surface`)
- Acento índigo (`--pm-accent: #4f46e5` en claro, `#a5a0ff` en oscuro)
- Tipografía editorial serif (`Fraunces`), legible (`Manrope`) y técnica (`JetBrains Mono`).
