import React from 'react';
import type { RefactoringModule } from '../types';
import { RichInlineText } from './RichInlineText';
import { ModuleQuiz } from './ModuleQuiz';
import { cn } from '@/shared/lib/utils';

export interface ModuleAccordionCardProps {
  index: number;
  module: RefactoringModule;
  isCompleted: boolean;
  isVisible: boolean;
  selectedQuizOptions: readonly number[];
  onToggleCompleted: (moduleIndex: number, checked: boolean) => void;
  onSelectQuizOption: (moduleIndex: number, optionIndex: number) => void;
}

export const ModuleAccordionCard: React.FC<ModuleAccordionCardProps> = ({
  index,
  module,
  isCompleted,
  isVisible,
  selectedQuizOptions,
  onToggleCompleted,
  onSelectQuizOption,
}) => {
  return (
    <details
      data-l={module.l}
      hidden={!isVisible}
      className={cn(
        'bg-surface border border-surface-border rounded-[10px] my-3 shadow-xs transition-shadow open:shadow-sm',
        !isVisible && 'hidden'
      )}
    >
      <summary className="cursor-pointer py-3.5 px-4 font-semibold flex items-center gap-2.5 text-foreground select-none rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <span
          id={`c${index}`}
          className={cn(
            'inline-flex items-center justify-center w-5 text-sm font-mono shrink-0',
            isCompleted
              ? 'text-[var(--rg-ok,#0e8a6b)] font-bold'
              : 'text-muted-foreground'
          )}
        >
          {isCompleted ? '✔' : '○'}
        </span>
        <span className="text-base leading-snug">
          {index}. {module.t}
        </span>
        <span className="lv font-normal text-[0.85rem] text-muted-foreground ml-auto pl-2 shrink-0">
          {module.l}
        </span>
      </summary>

      <div className="body px-4 sm:px-[18px] pb-[18px] pt-1 border-t border-surface-border text-[15px] leading-relaxed">
        <h3 className="text-base font-semibold text-foreground mt-4 mb-1.5">
          Objetivo
        </h3>
        <p className="text-foreground m-0">{module.o}</p>

        <h3 className="text-base font-semibold text-foreground mt-4 mb-1.5">
          Temas
        </h3>
        <ul className="list-disc pl-5 m-0 space-y-1 text-foreground">
          {module.k.map((topic, idx) => (
            <li key={idx}>
              <RichInlineText text={topic} />
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-foreground mt-4 mb-1.5">
          Páginas de Refactoring.Guru
        </h3>
        <ul className="list-disc pl-5 m-0 space-y-1">
          {module.r.map(([label, url], idx) => (
            <li key={idx}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:opacity-80 font-medium transition-opacity"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-foreground mt-4 mb-1.5">
          Práctica
        </h3>
        <p className="text-foreground m-0">
          <RichInlineText text={module.p} />
        </p>

        <ModuleQuiz
          moduleIndex={index}
          quiz={module.q}
          selectedOptions={selectedQuizOptions}
          onSelectOption={onSelectQuizOption}
        />

        <label className="d flex items-center gap-2 mt-4 pt-3 border-t border-surface-border/60 font-semibold text-foreground cursor-pointer select-none w-fit">
          <input
            type="checkbox"
            data-d={index}
            checked={isCompleted}
            onChange={(e) => onToggleCompleted(index, e.target.checked)}
            className="h-4 w-4 rounded border-surface-border accent-accent cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
          />
          <span>Módulo completado</span>
        </label>
      </div>
    </details>
  );
};
