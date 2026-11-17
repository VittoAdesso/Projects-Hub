import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import vm from 'vm';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { MapaRiesgoView } from '@/features/mapa-riesgo/views/MapaRiesgoView';
import {
  DD,
  DEFAULT_ROWS,
  F,
  LV,
  MAXF,
  PP,
  STORAGE_KEY,
  TT,
} from '@/features/mapa-riesgo/data/riskConstants';
import {
  calcProcessRows,
  computeOutputsHtml,
  type LegacyHtmlOutputs,
} from '@/features/mapa-riesgo/hooks/useMapaRiesgo';
import type { CalculatedProcessRow, ProcessRow } from '@/features/mapa-riesgo/types';

interface LegacyRiskSandbox {
  defaultRows: ProcessRow[];
  F: unknown;
  PP: unknown;
  DD: unknown;
  TT: unknown;
  MAXF: number;
  LV: unknown;
  runWithRows: (rows: ProcessRow[]) => {
    calcResult: CalculatedProcessRow[];
    outputs: LegacyHtmlOutputs;
  };
}

const renderTool = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <MapaRiesgoView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Mapa de Riesgo de Continuidad - Parity, 324 Combinations & UI Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.print = vi.fn();
  });

  // 1. Exact Mathematical & HTML Output Parity across all 324 factor combinations + edge cases (10.a)
  it('coincide al 100% con el código original en constantes, cálculos y salidas para las 324 combinaciones de factores y casos múltiples', () => {
    const legacyPath = resolveLegacyFile('mapa-riesgo-continuidad-coe.html');
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatches = [
      ...htmlContent.matchAll(/<script>([\s\S]*?)<\/script>/g),
    ];
    const inlineScript = scriptMatches[scriptMatches.length - 1]?.[1];
    expect(inlineScript).toBeDefined();

    const wrappedScript = `(function() {
      const elements = {
        '#rows': { innerHTML: '', addEventListener: () => {} },
        '#sm': { innerHTML: '' },
        '#tb': { innerHTML: '' },
        '#hm': { innerHTML: '' },
        '#sc2': { innerHTML: '' },
        '#ac': { innerHTML: '' },
        '#msg': { textContent: '' },
        '#ad': {},
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
      const defaultRows = JSON.parse(JSON.stringify(S.rows));
      return {
        defaultRows, F, PP, DD, TT, MAXF, LV,
        runWithRows: (rows) => {
          S.rows = JSON.parse(JSON.stringify(rows));
          const calcResult = calc();
          out();
          return {
            calcResult,
            outputs: {
              sm: elements['#sm'].innerHTML,
              tb: elements['#tb'].innerHTML,
              hm: elements['#hm'].innerHTML,
              sc2: elements['#sc2'].innerHTML,
              ac: elements['#ac'].innerHTML
            }
          };
        }
      };
    })()`;

    const legacy = vm.runInNewContext(wrappedScript) as LegacyRiskSandbox;

    // Verificar constantes estáticas
    expect(DEFAULT_ROWS).toEqual(legacy.defaultRows);
    expect(F).toEqual(legacy.F);
    expect(PP).toEqual(legacy.PP);
    expect(DD).toEqual(legacy.DD);
    expect(TT).toEqual(legacy.TT);
    expect(MAXF).toBe(legacy.MAXF);
    expect(LV).toEqual(legacy.LV);

    // Probar las 324 combinaciones posibles de (c, p, d, k, s, t)
    for (const c of [1, 2, 3]) {
      for (const p of [1, 2, 3]) {
        for (const d of [0, 1, 2]) {
          for (const k of [0, 1]) {
            for (const s of [0, 1]) {
              for (const t of [0, 1, 2]) {
                const testRows: ProcessRow[] = [
                  { n: `Proc_${c}_${p}_${d}_${k}_${s}_${t}`, c, p, d, k, s, t },
                ];
                const leg = legacy.runWithRows(testRows);
                const modCalc = calcProcessRows(testRows);
                const modOut = computeOutputsHtml(testRows);

                expect(modCalc).toEqual(leg.calcResult);
                expect(modOut).toEqual(leg.outputs);
              }
            }
          }
        }
      }
    }

    // Probar estado inicial (3 filas), estado vacío (0 filas) y estado con nombres vacíos / caracteres especiales
    const multiCases: ProcessRow[][] = [
      [...DEFAULT_ROWS],
      [],
      [
        { n: '', c: 3, p: 1, d: 0, k: 1, s: 1, t: 0 },
        { n: 'A & B <Test> "Quote"', c: 2, p: 1, d: 2, k: 0, s: 1, t: 1 },
        { n: 'C', c: 3, p: 1, d: 1, k: 1, s: 0, t: 0 },
      ],
    ];

    for (const rowsCase of multiCases) {
      const leg = legacy.runWithRows(rowsCase);
      expect(calcProcessRows(rowsCase)).toEqual(leg.calcResult);
      expect(computeOutputsHtml(rowsCase)).toEqual(leg.outputs);
    }
  });

  // 2. Renderizado e interacción de filas, añadir, borrar, borrar todo y persistencia (10.b)
  it('renderiza los 3 procesos iniciales, recalcula al editar/añadir/borrar y persiste en localStorage', () => {
    const { unmount } = renderTool();

    // Inicialmente hay 3 filas
    expect(document.querySelectorAll('#rows .row').length).toBe(3);
    expect(document.getElementById('sm')?.textContent).toContain(
      '2 de 3 procesos dependen de una sola persona.'
    );
    expect(document.getElementById('sm')?.textContent).toContain(
      'El más urgente es Ejemplo: carga de facturas en SAP.'
    );
    expect(document.querySelectorAll('#tb tbody tr').length).toBe(3);
    expect(document.querySelectorAll('#hm .n').length).toBe(3);

    // Editar nombre y criticidad del primer proceso
    const input0 = document.getElementById('n0') as HTMLInputElement;
    fireEvent.change(input0, { target: { value: 'Cierre contable crítico' } });
    const selectC0 = document.getElementById('c0') as HTMLSelectElement;
    fireEvent.change(selectC0, { target: { value: '3' } });

    // Verificar persistencia en localStorage con prefijo 'mapa-riesgo:rows'
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as {
      rows: ProcessRow[];
    };
    expect(stored.rows[0]?.n).toBe('Cierre contable crítico');
    expect(stored.rows[0]?.c).toBe(3);

    // Añadir un cuarto proceso (#ad)
    const addBtn = document.getElementById('ad')!;
    fireEvent.click(addBtn);
    expect(document.querySelectorAll('#rows .row').length).toBe(4);

    // Borrar el cuarto proceso (data-del="3")
    const delBtn3 = document.querySelector('button[data-del="3"]')!;
    fireEvent.click(delBtn3);
    expect(document.querySelectorAll('#rows .row').length).toBe(3);

    // Desmontar y volver a montar para comprobar carga desde localStorage
    unmount();
    renderTool();
    expect((document.getElementById('n0') as HTMLInputElement).value).toBe(
      'Cierre contable crítico'
    );

    // Borrar todo (#br)
    const clearBtn = document.getElementById('br')!;
    fireEvent.click(clearBtn);
    expect(document.querySelectorAll('#rows .row').length).toBe(0);
    expect(document.getElementById('msg')?.textContent).toBe('Todo borrado.');
    expect(document.getElementById('sm')?.textContent).toBe(
      'Añade al menos un proceso para ver el mapa.'
    );
    expect(document.getElementById('ac')?.textContent).toBe(
      'No hay acciones pendientes con los datos actuales.'
    );

    // Botón Imprimir (#bx)
    const printBtn = document.getElementById('bx')!;
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
