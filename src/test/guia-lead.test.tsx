import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import vm from 'vm';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { GuiaLeadView } from '@/features/guia-lead/views/GuiaLeadView';
import {
  LB,
  PL,
  STORAGE_KEY_M,
  STORAGE_KEY_R,
  T,
} from '@/features/guia-lead/data/leadData';
import {
  computeLegacyLeadOutputsHtml,
  type LegacyLeadOutputs,
} from '@/features/guia-lead/hooks/useGuiaLead';
import type { MaturityTuple } from '@/features/guia-lead/types';

interface LegacyLeadSandbox {
  LB: unknown;
  T: unknown;
  PL: unknown;
  runWithState: (
    r: readonly string[],
    m: MaturityTuple
  ) => LegacyLeadOutputs;
}

const renderTool = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <GuiaLeadView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Guía del Lead de IA, Automatización y Desarrollo - Parity, 1296 Combinations & UI Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.print = vi.fn();
  });

  // 1. Static Data & All 1,296 Maturity Combinations + Track Mastery Parity (10.a)
  it('coincide al 100% con el código original en constantes (LB, T, PL) y en las 1.296 combinaciones de madurez y rutas', () => {
    const legacyPath = resolveLegacyFile(
      'guia-lead-ia-automatizacion-desarrollo.html'
    );
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatches = [
      ...htmlContent.matchAll(/<script>([\s\S]*?)<\/script>/g),
    ];
    const inlineScript = scriptMatches[scriptMatches.length - 1]?.[1];
    expect(inlineScript).toBeDefined();

    const wrappedScript = `(function() {
      const elements = {
        '#tracks': { innerHTML: '', addEventListener: () => {} },
        '#pls': { innerHTML: '', addEventListener: () => {} },
        '#sum': { innerHTML: '' },
        '#msg': { textContent: '' },
        '#br': {},
        '#bi': {},
        '#bp': {},
        '#bx': {},
        '#sheet': {}
      };
      const localStorage = { getItem: () => null, setItem: () => {} };
      const document = {
        querySelector: (s) => elements[s] || { innerHTML: '', addEventListener: () => {} }
      };
      const window = { print: () => {} };
      ${inlineScript}
      return {
        LB, T, PL,
        runWithState: (rArr, mArr) => {
          R = [...rArr];
          M = [...mArr];
          drawTracks();
          drawPillars();
          drawSum();
          return {
            tracks: elements['#tracks'].innerHTML,
            pls: elements['#pls'].innerHTML,
            sum: elements['#sum'].innerHTML
          };
        }
      };
    })()`;

    const legacy = vm.runInNewContext(wrappedScript) as LegacyLeadSandbox;

    // Verificar constantes estáticas
    expect(LB).toEqual(legacy.LB);
    expect(T).toEqual(legacy.T);
    expect(PL).toEqual(legacy.PL);

    // Probar las 6^4 = 1.296 combinaciones posibles de niveles de los 4 pilares (0 a 5)
    const sampleR = ['0-0', '0-1', '1-0', '2-0', '2-1', '2-2', '3-5'];
    for (let m0 = 0; m0 <= 5; m0++) {
      for (let m1 = 0; m1 <= 5; m1++) {
        for (let m2 = 0; m2 <= 5; m2++) {
          for (let m3 = 0; m3 <= 5; m3++) {
            const mTuple: MaturityTuple = [m0, m1, m2, m3];
            const legOut = legacy.runWithState(sampleR, mTuple);
            const modOut = computeLegacyLeadOutputsHtml(sampleR, mTuple);
            expect(modOut.sum).toBe(legOut.sum);
            expect(modOut.pls).toBe(legOut.pls);
          }
        }
      }
    }

    // Probar todos los conteos posibles de dominio en las rutas (0 a 6 nodos por ruta)
    for (let count = 0; count <= 6; count++) {
      const rSelection: string[] = [];
      for (let tIdx = 0; tIdx < 4; tIdx++) {
        for (let nIdx = 0; nIdx < count; nIdx++) {
          rSelection.push(`${tIdx}-${nIdx}`);
        }
      }
      const mTuple: MaturityTuple = [1, 2, 3, 4];
      const legOut = legacy.runWithState(rSelection, mTuple);
      const modOut = computeLegacyLeadOutputsHtml(rSelection, mTuple);
      expect(modOut).toEqual(legOut);
    }
  });

  // 2. Interactive UI & Persistence (10.b)
  it('renderiza las 4 rutas y 4 pilares, actualiza el avance y el resumen al interactuar y persiste en localStorage', () => {
    const { unmount } = renderTool();

    // Inicialmente: 4 rutas, 24 botones de competencia, 4 pilares en N0
    expect(document.querySelectorAll('#tracks .trk').length).toBe(4);
    expect(document.querySelectorAll('#tracks button.n').length).toBe(24);
    expect(document.querySelectorAll('#pls .pl').length).toBe(4);
    expect(document.getElementById('sum')?.textContent).toContain('N0');
    expect(document.getElementById('sum')?.textContent).toContain(
      'Aún no has puntuado ningún pilar.'
    );

    // Marcar 2 competencias de la primera ruta (Inteligencia artificial: 2/6 = 33%)
    const node00 = document.querySelector<HTMLButtonElement>(
      'button.n[data-id="0-0"]'
    )!;
    const node01 = document.querySelector<HTMLButtonElement>(
      'button.n[data-id="0-1"]'
    )!;
    fireEvent.click(node00);
    fireEvent.click(node01);

    expect(node00).toHaveAttribute('aria-pressed', 'true');
    expect(node01).toHaveAttribute('aria-pressed', 'true');
    expect(document.getElementById('tracks')?.textContent).toContain(
      '2 de 6 dominados'
    );
    expect(document.getElementById('sum')?.textContent).toContain(
      'Inteligencia artificial: 33%'
    );

    // Puntuar los 4 pilares: Gobernanza=N2, Estándares=N3, Operación=N1, Plataforma=N2 -> Nivel global = N1 (limitado por Operación)
    fireEvent.click(
      document.querySelector<HTMLButtonElement>('button[data-p="0"][data-v="2"]')!
    );
    fireEvent.click(
      document.querySelector<HTMLButtonElement>('button[data-p="1"][data-v="3"]')!
    );
    fireEvent.click(
      document.querySelector<HTMLButtonElement>('button[data-p="2"][data-v="1"]')!
    );
    fireEvent.click(
      document.querySelector<HTMLButtonElement>('button[data-p="3"][data-v="2"]')!
    );

    const sumText = document.getElementById('sum')?.textContent ?? '';
    expect(sumText).toContain('El CoE está en el nivel N1.');
    expect(sumText).toContain('El pilar que lo limita es Operación.');

    // Verificar persistencia en localStorage con prefijo 'guia-lead:r' y 'guia-lead:m'
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY_R) || '[]')).toEqual([
      '0-0',
      '0-1',
    ]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY_M) || '[]')).toEqual([
      2, 3, 1, 2,
    ]);

    // Desmontar y volver a montar para comprobar hidratación desde localStorage
    unmount();
    renderTool();
    expect(
      document.querySelector('button.n[data-id="0-0"]')
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      document.querySelector('button[data-p="2"][data-v="1"]')
    ).toHaveAttribute('aria-pressed', 'true');

    // Borrar mis marcas (#br)
    const clearBtn = document.getElementById('br')!;
    fireEvent.click(clearBtn);
    expect(document.getElementById('msg')?.textContent).toBe(
      'Marcas borradas.'
    );
    expect(
      document.querySelector('button.n[data-id="0-0"]')
    ).toHaveAttribute('aria-pressed', 'false');
    expect(document.getElementById('sum')?.textContent).toContain(
      'Aún no has puntuado ningún pilar.'
    );

    // Botón Imprimir (#bx)
    const printBtn = document.getElementById('bx')!;
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
