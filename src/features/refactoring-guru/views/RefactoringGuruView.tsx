import React from 'react';
import { REFACTORING_MODULES } from '../data/modules';
import {
  isModuleVisible,
  useRefactoringGuru,
} from '../hooks/useRefactoringGuru';
import { ProgressHeaderBar } from '../components/ProgressHeaderBar';
import { ModuleAccordionCard } from '../components/ModuleAccordionCard';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import { Callout } from '@/shared/ui/callout';

export const RefactoringGuruView: React.FC = () => {
  const {
    completedMap,
    activeFilter,
    setActiveFilter,
    quizSelections,
    toggleModuleCompleted,
    selectQuizOption,
    progressPercentage,
  } = useRefactoringGuru();

  return (
    <ToolShell
      toolId="refactoring-guru"
      title="Refactorización y patrones de diseño"
      category="Arquitectura & Código Limpio"
      description="Ruta guiada sobre los contenidos de Refactoring.Guru: cómo mejorar código existente sin romperlo, cómo reconocer problemas de diseño y qué patrones los resuelven. Marca cada módulo al terminarlo; el progreso se guarda en tu navegador."
      hidePageHeader
      className="pb-16"
    >
      <div className="max-w-[860px] mx-auto w-full space-y-6">
        {/* Cabecera editorial */}
        <header className="pt-2 pb-1">
          <h1 className="font-sans text-2xl sm:text-[1.9rem] font-bold tracking-tight text-foreground leading-tight mb-2">
            Refactorización y patrones de diseño
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-[62ch] m-0">
            Ruta guiada sobre los contenidos de Refactoring.Guru: cómo mejorar código existente sin romperlo, cómo reconocer problemas de diseño y qué patrones los resuelven. Marca cada módulo al terminarlo; el progreso se guarda en tu navegador.
          </p>
        </header>

        {/* Barra de progreso y filtros */}
        <div className="-mx-4 sm:-mx-6">
          <ProgressHeaderBar
            progressPercentage={progressPercentage}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Lista de módulos */}
        <section id="m" aria-label="Módulos de aprendizaje">
          {REFACTORING_MODULES.map((mod, index) => {
            const isCompleted = Boolean(completedMap[`d${index}`]);
            const isVisible = isModuleVisible(mod.l, activeFilter);
            const selectedOptions = quizSelections[index] ?? [];

            return (
              <ModuleAccordionCard
                key={index}
                index={index}
                module={mod}
                isCompleted={isCompleted}
                isVisible={isVisible}
                selectedQuizOptions={selectedOptions}
                onToggleCompleted={toggleModuleCompleted}
                onSelectQuizOption={selectQuizOption}
              />
            );
          })}
        </section>

        {/* Notas informativas y pie de página */}
        <section className="pt-2 space-y-3.5">
          <Callout
            variant="default"
            className="note border-l-4 border-l-accent bg-surface text-muted-foreground rounded-r-lg p-3.5"
          >
            <b className="text-foreground">Sobre la fuente.</b> Esta página solo enlaza y resume con palabras propias; el contenido pertenece a{' '}
            <a
              href="https://refactoring.guru/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 font-medium hover:opacity-80"
            >
              Refactoring.Guru
            </a>
            . También existe una{' '}
            <a
              href="https://refactoring.guru/es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 font-medium hover:opacity-80"
            >
              versión en español
            </a>{' '}
            del sitio. Tiene contenido premium de pago (
            <a
              href="https://refactoring.guru/design-patterns/book"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 font-medium hover:opacity-80"
            >
              libro de patrones
            </a>{' '}
            y{' '}
            <a
              href="https://refactoring.guru/refactoring/course"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 font-medium hover:opacity-80"
            >
              curso de refactorización
            </a>
            ); esta ruta usa solo las páginas públicas del sitio.
          </Callout>

          <Callout
            variant="default"
            className="note border-l-4 border-l-accent bg-surface text-muted-foreground rounded-r-lg p-3.5"
          >
            <b className="text-foreground">Lenguajes.</b> Los ejemplos de código de los patrones están en C#, C++, Go, Java, PHP, Python, Ruby, Rust, Swift y TypeScript (
            <a
              href="https://refactoring.guru/design-patterns/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 font-medium hover:opacity-80"
            >
              índice de ejemplos
            </a>
            ). Si trabajas en otro lenguaje, usa los diagramas y adapta la idea.
          </Callout>

          <footer className="text-muted-foreground text-[0.88rem] pt-2">
            <p className="m-0">
              Revisa los enlaces cada trimestre. Última verificación: 13 de noviembre de 2026.
            </p>
          </footer>
        </section>
      </div>

      <ScrollToTop threshold={250} />
    </ToolShell>
  );
};

export default RefactoringGuruView;
