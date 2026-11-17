import { useCallback, useMemo, useState } from 'react';
import { REFACTORING_MODULES, STORAGE_KEY } from '../data/modules';
import type {
  CompletedModulesMap,
  DifficultyLevel,
  FilterLevel,
  QuizSelectionsMap,
  RefactoringModule,
} from '../types';

export function calculateProgressPercentage(
  completedMap: CompletedModulesMap,
  totalModules: number = REFACTORING_MODULES.length
): number {
  if (totalModules <= 0) return 0;
  let completedCount = 0;
  for (let i = 0; i < totalModules; i++) {
    if (completedMap[`d${i}`]) {
      completedCount++;
    }
  }
  return Math.round((completedCount / totalModules) * 100);
}

export function isModuleVisible(
  moduleLevel: DifficultyLevel,
  activeFilter: FilterLevel
): boolean {
  return activeFilter === 'todos' || moduleLevel === activeFilter;
}

export function isQuizOptionCorrect(
  moduleIndex: number,
  optionIndex: number,
  modules: readonly RefactoringModule[] = REFACTORING_MODULES
): boolean {
  const mod = modules[moduleIndex];
  if (!mod) return false;
  return optionIndex === mod.q[2];
}

export function loadProgressFromStorage(
  key: string = STORAGE_KEY
): CompletedModulesMap {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const result: CompletedModulesMap = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'boolean') {
          result[k] = v;
        }
      }
      return result;
    }
  } catch {
    // Ignore storage access or parse errors as in original
  }
  return {};
}

export function saveProgressToStorage(
  state: CompletedModulesMap,
  key: string = STORAGE_KEY
): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage write errors as in original
  }
}

export function useRefactoringGuru() {
  const [completedMap, setCompletedMap] = useState<CompletedModulesMap>(() =>
    loadProgressFromStorage()
  );
  const [activeFilter, setActiveFilter] = useState<FilterLevel>('todos');
  const [quizSelections, setQuizSelections] = useState<QuizSelectionsMap>({});

  const toggleModuleCompleted = useCallback(
    (moduleIndex: number, checked: boolean) => {
      setCompletedMap((prev) => {
        const next: CompletedModulesMap = {
          ...prev,
          [`d${moduleIndex}`]: checked,
        };
        saveProgressToStorage(next);
        return next;
      });
    },
    []
  );

  const selectQuizOption = useCallback(
    (moduleIndex: number, optionIndex: number) => {
      setQuizSelections((prev) => {
        const currentSelected = prev[moduleIndex] ?? [];
        const isAlreadySolved = currentSelected.some((idx) =>
          isQuizOptionCorrect(moduleIndex, idx)
        );
        if (isAlreadySolved || currentSelected.includes(optionIndex)) {
          return prev;
        }
        return {
          ...prev,
          [moduleIndex]: [...currentSelected, optionIndex],
        };
      });
    },
    []
  );

  const progressPercentage = useMemo(
    () =>
      calculateProgressPercentage(completedMap, REFACTORING_MODULES.length),
    [completedMap]
  );

  return {
    completedMap,
    activeFilter,
    setActiveFilter,
    quizSelections,
    toggleModuleCompleted,
    selectQuizOption,
    progressPercentage,
  };
}
