import React from 'react';
import { Q } from '../data/coeData';
import type { AdvisorAnswers, AdvisorEvaluationResult } from '../types';
import { cn } from '@/shared/lib/utils';

export interface CoeAdvisorSectionProps {
  answers: AdvisorAnswers;
  evaluation: AdvisorEvaluationResult;
  onSelectAnswer: (questionIndex: 0 | 1 | 2 | 3, optionIndex: number) => void;
}

export const CoeAdvisorSection: React.FC<CoeAdvisorSectionProps> = ({
  answers,
  evaluation,
  onSelectAnswer,
}) => {
  return (
    <div className="space-y-3">
      <div id="qs" className="space-y-2">
        {Q.map(([questionText, options], qIdx) => {
          const questionIndex = qIdx as 0 | 1 | 2 | 3;
          const currentAnswer = answers[questionIndex];

          return (
            <div
              key={qIdx}
              className="q bg-[var(--coe-sf,#ffffff)] border border-[var(--coe-ln,#D7DEE5)] rounded-lg py-3 px-3.5 print:break-inside-avoid"
            >
              <h4 className="font-[var(--font-schibsted)] font-semibold text-[14.5px] text-[var(--coe-ink,#16222E)] mb-2">
                {questionText}
              </h4>
              <div
                className="opt flex flex-wrap gap-1.5"
                role="group"
                aria-label={questionText}
              >
                {options.map((optLabel, oIdx) => {
                  const isPressed = currentAnswer === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      data-i={qIdx}
                      data-j={oIdx}
                      aria-pressed={isPressed}
                      onClick={() => onSelectAnswer(questionIndex, oIdx)}
                      className={cn(
                        'min-h-[44px] px-3.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coe-bl,#2563A8)]',
                        isPressed
                          ? 'bg-[var(--coe-ink,#16222E)] text-[var(--coe-sf,#ffffff)] border-[var(--coe-ink,#16222E)]'
                          : 'bg-[var(--coe-sf,#ffffff)] text-[var(--coe-ink,#16222E)] border-[var(--coe-ln,#D7DEE5)] hover:bg-surface-hover'
                      )}
                    >
                      {optLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div
        id="res"
        aria-live="polite"
        className="bg-[var(--coe-sf,#ffffff)] border border-[var(--coe-ln,#D7DEE5)] border-l-[6px] border-l-[var(--coe-gr,#2E7D52)] rounded-lg p-4 sm:px-[18px] print:break-inside-avoid"
      >
        {!evaluation.isComplete || !evaluation.model ? (
          <p className="text-[14.5px] text-[var(--coe-ink,#16222E)] m-0">
            Responde las cuatro preguntas para ver la recomendación.
          </p>
        ) : (
          <div>
            <h3 className="font-[var(--font-schibsted)] font-bold text-[22px] text-[var(--coe-ink,#16222E)] mb-1">
              {evaluation.model[0]}
            </h3>
            <p className="text-[14.5px] text-[var(--coe-ink,#16222E)] my-0.5">
              {evaluation.model[1]}
            </p>

            {evaluation.warnings.map((warnText, idx) => (
              <div
                key={idx}
                className="warn border-l-4 border-l-[var(--coe-or,#C2561C)] bg-[var(--coe-warn-bg,#FBEADF)] text-[var(--coe-ink,#16222E)] rounded-md py-2 px-3 my-2 text-sm"
              >
                {warnText}
              </div>
            ))}

            <h4 className="font-[var(--font-schibsted)] font-semibold text-sm text-[var(--coe-ink,#16222E)] mt-3 mb-0.5">
              Primeros pasos
            </h4>
            <ul className="t list-disc pl-[18px] mt-1.5 mb-0 text-[13.5px] text-[var(--coe-mut,#52616F)] space-y-1">
              {evaluation.model[2].map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
