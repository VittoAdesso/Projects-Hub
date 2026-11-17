import React from 'react';
import type { QuizTuple } from '../types';
import { RichInlineText } from './RichInlineText';
import { cn } from '@/shared/lib/utils';

export interface ModuleQuizProps {
  moduleIndex: number;
  quiz: QuizTuple;
  selectedOptions: readonly number[];
  onSelectOption: (moduleIndex: number, optionIndex: number) => void;
}

export const ModuleQuiz: React.FC<ModuleQuizProps> = ({
  moduleIndex,
  quiz,
  selectedOptions,
  onSelectOption,
}) => {
  const [question, options, correctIndex] = quiz;
  const isSolved = selectedOptions.includes(correctIndex);

  return (
    <div className="q mt-4">
      <h3 className="text-base font-semibold text-foreground mt-4 mb-1.5">
        Comprueba lo aprendido
      </h3>
      <p className="text-[15px] text-foreground mb-2.5">
        <RichInlineText text={question} />
      </p>
      <div className="space-y-1.5">
        {options.map((optionText, optionIndex) => {
          const isClicked = selectedOptions.includes(optionIndex);
          const isCorrectChoice = optionIndex === correctIndex;
          const showOk = isClicked && isCorrectChoice;
          const showNo = isClicked && !isCorrectChoice;

          return (
            <button
              key={optionIndex}
              type="button"
              data-m={moduleIndex}
              data-o={optionIndex}
              disabled={isSolved}
              onClick={() => onSelectOption(moduleIndex, optionIndex)}
              className={cn(
                'block w-full text-left py-2 px-3 border rounded-lg text-[15px] transition-colors cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                !showOk &&
                  !showNo &&
                  'border-surface-border bg-background text-foreground hover:bg-surface-hover',
                showOk &&
                  'ok border-[var(--rg-ok,#0e8a6b)] bg-[var(--rg-ok-bg)] text-foreground font-medium',
                showNo &&
                  'no border-[var(--rg-bad,#b3261e)] bg-[var(--rg-bad-bg)] text-foreground'
              )}
            >
              {optionText}
            </button>
          );
        })}
      </div>
    </div>
  );
};
