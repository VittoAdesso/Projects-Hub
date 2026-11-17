# Refactorización y Patrones de Diseño (Refactoring.Guru)

> Ruta guiada interactiva sobre los contenidos públicos de Refactoring.Guru: deuda técnica, malos olores de código, técnicas de refactorización y patrones de diseño (creacionales, estructurales y de comportamiento). Reconstruida a partir de `/legacy/refactoring-guru-ruta.html`.

---

## 🏛️ Estructura del Módulo

- **`types.ts`**: Tipos estrictos para niveles de dificultad (`DifficultyLevel`), filtros (`FilterLevel`), módulos (`RefactoringModule`), quizzes y progreso.
- **`data/modules.ts`**: Los 8 módulos de aprendizaje con textos, enlaces a Refactoring.Guru, ejercicios prácticos y preguntas de autoevaluación idénticos al original.
- **`hooks/useRefactoringGuru.ts`**:
  - Funciones puras: `calculateProgressPercentage`, `isModuleVisible`, `isQuizOptionCorrect`, `loadProgressFromStorage`, `saveProgressToStorage`.
  - Estado local y persistencia en `localStorage` bajo la clave `"refactoring-guru:progress"`.
- **`components/`**:
  - `ProgressHeaderBar.tsx`: Barra superior fija con porcentaje (`0 %` – `100 %`), barra visual y filtro por nivel (`Todos`, `Básico`, `Intermedio`, `Avanzado`).
  - `ModuleAccordionCard.tsx`: Tarjeta desplegable (`<details>`) de cada módulo con indicador `✔` / `○`, temas, lecturas, práctica, quiz y casilla de completado.
  - `ModuleQuiz.tsx`: Bloque interactivo *"Comprueba lo aprendido"* con retroalimentación `.ok` / `.no` y bloqueo de opciones tras acertar.
  - `RichInlineText.tsx`: Renderizador seguro sin `dangerouslySetInnerHTML` para enlaces inline y etiquetas `<code>`.
- **`views/RefactoringGuruView.tsx`**: Vista principal integrada en `ToolShell` con notas editoriales y `ScrollToTop`.

---

## 🎨 Identidad Visual

Definida mediante tokens en `src/shared/styles/tokens.css` bajo la clase `.tool-refactoring-guru`:
- Modo claro: fondo `#f2f5f9`, superficie `#ffffff`, tinta `#16202e`, acento `#5b34c7`, éxito `#0e8a6b`, error `#b3261e`.
- Modo oscuro: fondo `#10151d`, superficie `#18202b`, tinta `#e8edf4`, acento `#a98bff`, éxito `#3dd0a6`, error `#ff8a80`.
