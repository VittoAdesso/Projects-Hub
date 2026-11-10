# Dispaccio — Bollettino AI

> Herramienta editorial para la generación y personalización de prompts de análisis de inteligencia artificial, modelos, robótica, automatización y ecosistemas regionales en 3 idiomas (IT, EN, ES).

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Definición estricta de idiomas (`Lang`), temas (`TopicId`), grupos, ventanas temporales y estados.
- **`data/`**:
  - `constants.ts`: Versión (`v2.2`), ventanas en días (`[1, 3, 7, 14]`), departamentos (`GROUPS`), emojis y familias especiales (`KIND`).
  - `translations.ts`: Diccionario `TR` con títulos y descripciones exactas en italiano, inglés y español.
  - `uiStrings.ts`: Diccionarios `UI`, `PREV` y directivas `RESP`.
- **`prompts/`**:
  - `formatters.ts`: Funciones puras `win(n, lang)` y `hor(horizonIdx, lang)`.
  - `builders.ts`: Constructores puros de prompts (`pEsteso`, `pRapido`, `pCop`, `pStud`, `pCowork`, `pComb`, `buildPrompt`).
- **`hooks/`**:
  - `useDispaccio.ts`: Hook de estado local que gestiona idioma, dial temporal, horizonte, selección múltiple y edición en línea.
- **`components/`**:
  - `DispaccioHeader.tsx`: Cabecera editorial con titular periodístico, lema y selector de idioma.
  - `TimeWindowControl.tsx`: Control de ventana temporal de 4 posiciones con control deslizante y horizonte de síntesis.
  - `TopicCard.tsx`: Tarjeta interactiva por tema con copiado extenso/rápido, vista previa y editor con restauración.
  - `CombinedReportBar.tsx`: Barra fija inferior para copiado del informe unificado.
  - `DispaccioFooter.tsx`: Pie de página editorial con metadatos.
- **`views/DispaccioView.tsx`**: Vista principal ensamblada dentro de `ToolShell`.

---

## 🎨 Acento Visual

Dispaccio utiliza el color de acento granate/oxblood definido en `src/shared/styles/tokens.css` bajo la clase `.tool-dispaccio`:
- Modo claro: `--accent: #8b2332;`
- Modo oscuro: `--accent: #c44a57;`
