import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import vm from 'vm';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { RefactoringGuruView } from '@/features/refactoring-guru/views/RefactoringGuruView';
import {
  FILTER_OPTIONS,
  REFACTORING_BASE_URL,
  REFACTORING_MODULES,
  STORAGE_KEY,
} from '@/features/refactoring-guru/data/modules';
import {
  calculateProgressPercentage,
  isModuleVisible,
  isQuizOptionCorrect,
} from '@/features/refactoring-guru/hooks/useRefactoringGuru';
import type { CompletedModulesMap, RefactoringModule } from '@/features/refactoring-guru/types';

interface LegacyData {
  R: string;
  M: RefactoringModule[];
}

const renderTool = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <RefactoringGuruView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Refactoring.Guru - Parity, Pure Logic & UI Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
  });

  // 1. Exact data parity against legacy HTML script
  it('los 8 módulos y la URL base coinciden exactamente con el script del HTML original', () => {
    const legacyPath = resolveLegacyFile('refactoring-guru-ruta.html');
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
    expect(scriptMatch).not.toBeNull();

    const scriptBody = scriptMatch![1]!;
    const dataEndIdx = scriptBody.indexOf('var S={};');
    expect(dataEndIdx).toBeGreaterThan(0);

    const dataScript = scriptBody.slice(0, dataEndIdx);
    const sandboxCode = `(function() {
      ${dataScript}
      return { R: R, M: M };
    })()`;

    const legacyData = vm.runInNewContext(sandboxCode) as LegacyData;

    expect(REFACTORING_BASE_URL).toBe(legacyData.R);
    expect(REFACTORING_MODULES).toEqual(legacyData.M);
  });

  // 2. Pure functions parity (10.a)
  it('calcula el porcentaje exacto para todas las combinaciones posibles de módulos completados (0 a 8)', () => {
    const total = REFACTORING_MODULES.length;
    expect(total).toBe(8);

    for (let count = 0; count <= total; count++) {
      const completedMap: CompletedModulesMap = {};
      for (let i = 0; i < count; i++) {
        completedMap[`d${i}`] = true;
      }
      const expected = Math.round((count / total) * 100);
      expect(calculateProgressPercentage(completedMap, total)).toBe(expected);
    }
  });

  it('filtra los módulos y evalúa las opciones del quiz igual que el original en todas las combinaciones', () => {
    for (const filter of FILTER_OPTIONS) {
      REFACTORING_MODULES.forEach((mod) => {
        const expectedVisible = filter === 'todos' || mod.l === filter;
        expect(isModuleVisible(mod.l, filter)).toBe(expectedVisible);
      });
    }

    REFACTORING_MODULES.forEach((mod, mIdx) => {
      mod.q[1].forEach((_, oIdx) => {
        expect(isQuizOptionCorrect(mIdx, oIdx)).toBe(oIdx === mod.q[2]);
      });
    });
  });

  // 3. Filter buttons interaction (10.b)
  it('filtra los módulos por nivel (Todos, Básico, Intermedio, Avanzado) y actualiza aria-pressed', () => {
    renderTool();

    const getVisibleDetailsCount = () =>
      Array.from(document.querySelectorAll('#m details')).filter(
        (d) => !(d as HTMLElement).hidden
      ).length;

    // Inicialmente: Todos (8 visibles)
    expect(getVisibleDetailsCount()).toBe(8);

    // Básico: 3 módulos (0, 1, 3)
    const btnBasico = document.querySelector('.f button[data-l="Básico"]')!;
    fireEvent.click(btnBasico);
    expect(btnBasico).toHaveAttribute('aria-pressed', 'true');
    expect(getVisibleDetailsCount()).toBe(3);

    // Intermedio: 3 módulos (2, 4, 5)
    const btnIntermedio = document.querySelector(
      '.f button[data-l="Intermedio"]'
    )!;
    fireEvent.click(btnIntermedio);
    expect(btnIntermedio).toHaveAttribute('aria-pressed', 'true');
    expect(btnBasico).toHaveAttribute('aria-pressed', 'false');
    expect(getVisibleDetailsCount()).toBe(3);

    // Avanzado: 2 módulos (6, 7)
    const btnAvanzado = document.querySelector('.f button[data-l="Avanzado"]')!;
    fireEvent.click(btnAvanzado);
    expect(btnAvanzado).toHaveAttribute('aria-pressed', 'true');
    expect(getVisibleDetailsCount()).toBe(2);

    // Volver a Todos: 8 módulos
    const btnTodos = document.querySelector('.f button[data-l="todos"]')!;
    fireEvent.click(btnTodos);
    expect(btnTodos).toHaveAttribute('aria-pressed', 'true');
    expect(getVisibleDetailsCount()).toBe(8);
  });

  // 4. Quiz interaction (wrong vs right answer, disabling buttons)
  it('marca respuestas incorrectas (.no) y al acertar (.ok) deshabilita las opciones del módulo', () => {
    renderTool();

    // Probar en todos los módulos
    REFACTORING_MODULES.forEach((_, mIdx) => {
      const btnWrong = document.querySelector<HTMLButtonElement>(
        `button[data-m="${mIdx}"][data-o="1"]`
      )!;
      const btnRight = document.querySelector<HTMLButtonElement>(
        `button[data-m="${mIdx}"][data-o="0"]`
      )!;
      const btnWrong2 = document.querySelector<HTMLButtonElement>(
        `button[data-m="${mIdx}"][data-o="2"]`
      )!;

      // Pulsar opción incorrecta -> clase 'no', botones siguen habilitados
      fireEvent.click(btnWrong);
      expect(btnWrong.classList.contains('no')).toBe(true);
      expect(btnRight.disabled).toBe(false);

      // Pulsar opción correcta -> clase 'ok', los 3 botones quedan deshabilitados
      fireEvent.click(btnRight);
      expect(btnRight.classList.contains('ok')).toBe(true);
      expect(btnRight.disabled).toBe(true);
      expect(btnWrong.disabled).toBe(true);
      expect(btnWrong2.disabled).toBe(true);
    });
  });

  // 5. Module completion, progress percentage & localStorage persistence
  it('actualiza el icono ✔/○, el porcentaje de progreso y persiste en localStorage con prefijo', () => {
    const { unmount } = renderTool();

    expect(document.getElementById('pct')?.textContent).toBe('0 %');
    expect(document.getElementById('c0')?.textContent).toBe('○');

    const check0 = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"][data-d="0"]'
    )!;
    fireEvent.click(check0);

    expect(document.getElementById('c0')?.textContent).toBe('✔');
    expect(document.getElementById('pct')?.textContent).toBe('13 %');

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    expect(stored).toEqual({ d0: true });

    // Marcar un segundo módulo (2/8 = 25 %)
    const check1 = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"][data-d="1"]'
    )!;
    fireEvent.click(check1);
    expect(document.getElementById('pct')?.textContent).toBe('25 %');

    // Desmontar y volver a montar para comprobar hidratación desde localStorage
    unmount();
    renderTool();

    expect(document.getElementById('pct')?.textContent).toBe('25 %');
    expect(document.getElementById('c0')?.textContent).toBe('✔');
    expect(document.getElementById('c1')?.textContent).toBe('✔');
    expect(document.getElementById('c2')?.textContent).toBe('○');
    expect(
      screen.getByText(/Última verificación: 13 de noviembre de 2026/i)
    ).toBeInTheDocument();
  });
});
