import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import vm from 'vm';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { PriorizadorRoiView } from '@/features/priorizador-roi/views/PriorizadorRoiView';
import {
  DEFAULT_IDEAS,
  QN,
  STORAGE_KEY,
} from '@/features/priorizador-roi/data/prioritizerConstants';
import {
  calcPrioritizer,
  computePrioritizerOutputsHtml,
  type LegacyPrioritizerOutputs,
} from '@/features/priorizador-roi/hooks/usePriorizadorRoi';
import type {
  PrioritizerCalculationResult,
  PrioritizerState,
} from '@/features/priorizador-roi/types';

interface LegacyPrioSandbox {
  defaultState: PrioritizerState;
  QN: readonly string[];
  runWithState: (state: PrioritizerState) => {
    calcResult: PrioritizerCalculationResult;
    outputs: LegacyPrioritizerOutputs;
  };
}

const renderTool = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <PriorizadorRoiView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Priorizador de Demanda y ROI - Parity, Calculations & UI Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.print = vi.fn();
  });

  // 1. Exact Mathematical & HTML Output Parity against Legacy Script (10.a)
  it('coincide al 100% con el código original en constantes, cálculos (mediana, ROI, amortización, cuadrantes) y salidas HTML/SVG', () => {
    const legacyPath = resolveLegacyFile('priorizador-demanda-roi-coe.html');
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatches = [
      ...htmlContent.matchAll(/<script>([\s\S]*?)<\/script>/g),
    ];
    const inlineScript = scriptMatches[scriptMatches.length - 1]?.[1];
    expect(inlineScript).toBeDefined();

    const wrappedScript = `(function() {
      const elements = {
        '#rows': { innerHTML: '', addEventListener: () => {} },
        '#ch': { value: '', addEventListener: () => {} },
        '#tb': { innerHTML: '' },
        '#sv': { innerHTML: '' },
        '#sm': { innerHTML: '' },
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
      const defaultState = JSON.parse(JSON.stringify(S));
      return {
        defaultState,
        QN,
        runWithState: (st) => {
          S = JSON.parse(JSON.stringify(st));
          const calcResult = calc();
          out();
          return {
            calcResult,
            outputs: {
              tb: elements['#tb'].innerHTML,
              sv: elements['#sv'].innerHTML,
              sm: elements['#sm'].innerHTML
            }
          };
        }
      };
    })()`;

    const legacy = vm.runInNewContext(wrappedScript) as LegacyPrioSandbox;

    // Verificar constantes iniciales
    expect(DEFAULT_IDEAS).toEqual(legacy.defaultState.rows);
    expect(QN).toEqual(legacy.QN);

    // Casos exhaustivos: sin coste/hora, con coste entero y con coma decimal, número par e impar de ideas, cuadrantes, net <= 0, vacíos
    const testStates: PrioritizerState[] = [
      { ch: '', rows: [...DEFAULT_IDEAS] },
      { ch: '35', rows: [...DEFAULT_IDEAS] },
      { ch: '42,5', rows: [...DEFAULT_IDEAS] },
      // Número par de ideas (4 ideas válidas para probar mediana par) + 1 incompleta + 1 con coste extra alto (pay = null)
      {
        ch: '30',
        rows: [
          { n: 'Idea A', a: 'RRHH', h: 10, d: 2, r: 1, x: 0 },
          { n: 'Idea B', a: 'Finanzas', h: 50, d: 20, r: 2, x: 500 },
          { n: 'Idea C', a: 'IT', h: 8, d: 25, r: 3, x: 100000 },
          { n: 'Idea D', a: 'Ops', h: 60, d: 4, r: 1, x: 0 },
          { n: 'Incompleta', a: 'Legal', h: 0, d: 10, r: 2, x: 0 },
        ],
      },
      // Caso donde ninguna idea cae en el cuadrante 0 ("Hazlo ya"): h y d correlacionados positivamente
      {
        ch: '25',
        rows: [
          { n: 'Pequeña poca hora', a: 'A1', h: 5, d: 2, r: 1, x: 0 },
          { n: 'Grande mucha hora', a: 'A2', h: 50, d: 30, r: 2, x: 0 },
        ],
      },
      // Estado vacío sin y con coste por hora
      { ch: '', rows: [] },
      { ch: '40', rows: [] },
    ];

    for (const st of testStates) {
      const leg = legacy.runWithState(st);
      const modCalc = calcPrioritizer(st);
      const modOut = computePrioritizerOutputsHtml(st);

      expect(modCalc).toEqual(leg.calcResult);
      expect(modOut).toEqual(leg.outputs);
    }
  });

  // 2. Interacción en UI, columnas condicionales de ROI, edición, borrado y persistencia (10.b)
  it('renderiza las 3 ideas iniciales, muestra ahorro y amortización al indicar coste/hora y persiste en localStorage', () => {
    const { unmount } = renderTool();

    // Inicialmente: 3 filas, 6 columnas en la tabla (sin coste por hora) y 3 círculos en el SVG
    expect(document.querySelectorAll('#rows .row').length).toBe(3);
    expect(document.querySelectorAll('#tb thead th').length).toBe(6);
    expect(document.querySelectorAll('#sv circle').length).toBe(3);
    expect(document.getElementById('sm')?.textContent).toContain(
      'Indica el coste por hora para ver también el ahorro en euros'
    );

    // Introducir coste por hora = 40 €
    const chInput = document.getElementById('ch') as HTMLInputElement;
    fireEvent.change(chInput, { target: { value: '40' } });

    // Ahora la tabla tiene 8 columnas (incluye Ahorro/año y Amortiza) y el resumen muestra el ahorro en €
    expect(document.querySelectorAll('#tb thead th').length).toBe(8);
    expect(document.getElementById('sm')?.textContent).toContain(
      'ahorro anual estimado'
    );

    // Editar título de la primera idea
    const inputN0 = document.getElementById('n0') as HTMLInputElement;
    fireEvent.change(inputN0, { target: { value: 'Cierre automatizado ERP' } });

    // Comprobar persistencia en localStorage con prefijo 'priorizador-roi:state'
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    ) as PrioritizerState;
    expect(stored.ch).toBe('40');
    expect(stored.rows[0]?.n).toBe('Cierre automatizado ERP');

    // Añadir idea (#ad) y borrarla (data-del="3")
    const addBtn = document.getElementById('ad')!;
    fireEvent.click(addBtn);
    expect(document.querySelectorAll('#rows .row').length).toBe(4);

    const delBtn3 = document.querySelector<HTMLButtonElement>(
      'button[data-del="3"]'
    )!;
    fireEvent.click(delBtn3);
    expect(document.querySelectorAll('#rows .row').length).toBe(3);

    // Desmontar y volver a montar para verificar hidratación desde localStorage
    unmount();
    renderTool();
    expect((document.getElementById('ch') as HTMLInputElement).value).toBe(
      '40'
    );
    expect((document.getElementById('n0') as HTMLInputElement).value).toBe(
      'Cierre automatizado ERP'
    );

    // Borrar todo (#br)
    const clearBtn = document.getElementById('br')!;
    fireEvent.click(clearBtn);
    expect(document.querySelectorAll('#rows .row').length).toBe(0);
    expect(document.getElementById('msg')?.textContent).toBe('Todo borrado.');
    expect(document.getElementById('tb')?.textContent).toContain(
      'Rellena horas y días en al menos una idea.'
    );
    expect(document.getElementById('sm')?.textContent).toContain(
      'Rellena horas y días en al menos una idea para generar el resumen.'
    );

    // Botón Imprimir (#bx)
    const printBtn = document.getElementById('bx')!;
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
