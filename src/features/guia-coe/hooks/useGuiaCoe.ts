import { useCallback, useMemo, useState } from 'react';
import { MD } from '../data/coeData';
import type { AdvisorAnswers, AdvisorEvaluationResult } from '../types';

export function evaluateCoeRecommendation(
  answers: AdvisorAnswers
): AdvisorEvaluationResult {
  if (answers.includes(-1)) {
    return {
      isComplete: false,
      warnings: [],
    };
  }

  const [a0, a1, a2, a3] = answers;
  const modelIndex: 0 | 1 | 2 =
    a0 === 0 ? 0 : a0 === 2 && a1 === 2 ? 1 : 2;
  const model = MD[modelIndex];

  const warnings: string[] = [];
  if (a0 === 0 && a1 !== 0) {
    warnings.push(
      'Aunque las herramientas sean distintas, con una o dos personas un modelo federado no se sostiene. Centraliza lo importante y reparte solo lo mínimo.'
    );
  }
  if (a3 === 2) {
    warnings.push(
      'Sin apoyo de dirección, un CoE no escala. Consíguelo antes de formalizar nada: es la primera tarea.'
    );
  }
  if (a3 === 1) {
    warnings.push(
      'El apoyo es parcial: busca un patrocinador concreto que pueda desbloquear decisiones entre áreas.'
    );
  }
  if (a2 === 0) {
    warnings.push(
      'No hay nada escrito: el objetivo realista es llegar a N1, con lo mínimo documentado, antes de pensar en métricas.'
    );
  }

  return {
    isComplete: true,
    modelIndex,
    model,
    warnings,
  };
}

export function buildRecommendationHtml(answers: AdvisorAnswers): string {
  const result = evaluateCoeRecommendation(answers);
  if (!result.isComplete || !result.model) {
    return '<p>Responde las cuatro preguntas para ver la recomendación.</p>';
  }
  const d = result.model;
  const w = result.warnings
    .map((msg) => `<div class="warn">${msg}</div>`)
    .join('');
  return `<h3>${d[0]}</h3><p>${d[1]}</p>${w}<h4>Primeros pasos</h4><ul class="t">${d[2].map((x) => `<li>${x}</li>`).join('')}</ul>`;
}

export function getRaciCellClass(cellValue: string): 'A' | 'R' | '' {
  if (cellValue[0] === 'A') return 'A';
  if (cellValue[0] === 'R') return 'R';
  return '';
}

export function useGuiaCoe() {
  const [answers, setAnswers] = useState<AdvisorAnswers>([-1, -1, -1, -1]);
  const [activePhase, setActivePhase] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const selectAnswer = useCallback(
    (questionIndex: 0 | 1 | 2 | 3, optionIndex: number) => {
      setAnswers((prev) => {
        const next: [number, number, number, number] = [
          prev[0],
          prev[1],
          prev[2],
          prev[3],
        ];
        next[questionIndex] = optionIndex;
        return next;
      });
    },
    []
  );

  const evaluation = useMemo(
    () => evaluateCoeRecommendation(answers),
    [answers]
  );

  return {
    answers,
    selectAnswer,
    evaluation,
    activePhase,
    setActivePhase,
    statusMessage,
    setStatusMessage,
  };
}
