import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import vm from 'vm';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { SupervisorCodigoView } from '@/features/supervisor-codigo/views/SupervisorCodigoView';
import {
  CP,
  FS,
  G,
  OP,
  SA,
  STORAGE_KEY,
} from '@/features/supervisor-codigo/data/supervisorData';
import {
  computeLegacySupervisorOutputsHtml,
  type LegacySupervisorOutputs,
} from '@/features/supervisor-codigo/hooks/useSupervisorCodigo';
import type {
  AuditAnswersMap,
  AuditValue,
  SupervisorStorageState,
} from '@/features/supervisor-codigo/types';

interface LegacySupervisorSandbox {
  G: unknown;
  OP: unknown;
  FS: unknown;
  CP: unknown;
  runWithState: (
    answers: AuditAnswersMap,
    projectName: string
  ) => LegacySupervisorOutputs;
}

const renderTool = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <SupervisorCodigoView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Supervisor de Arquitectura y Código Limpio - Parity, 172 Item Evaluations & UI Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.print = vi.fn();
  });

  // 1. Static Data & Output Parity across 172 individual item evaluations + complex scenarios (10.a)
  it('coincide al 100% con el código original en constantes (G, OP, FS, CP) y resultados para los 43 puntos × 4 estados y escenarios mixtos', () => {
    const legacyPath = resolveLegacyFile(
      'supervisor-arquitectura-codigo-limpio.html'
    );
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatches = [
      ...htmlContent.matchAll(/<script>([\s\S]*?)<\/script>/g),
    ];
    const inlineScript = scriptMatches[scriptMatches.length - 1]?.[1];
    expect(inlineScript).toBeDefined();

    const wrappedScript = `(function() {
      const elements = {
        '#fs': { innerHTML: '' },
        '#cp': { innerHTML: '' },
        '#sa': { innerHTML: '' },
        '#gps': { innerHTML: '', addEventListener: () => {} },
        '#pn': { value: '', addEventListener: () => {} },
        '#sm': { innerHTML: '', style: { borderLeftColor: '' } },
        '#ur': { innerHTML: '' },
        '#qs': { innerHTML: '' },
        '#plan': { innerHTML: '' },
        '#msg': { textContent: '' },
        '#br': {},
        '#bi': {},
        '#bp': {},
        '#bx': {},
        '#sheet': {}
      };
      const localStorage = { getItem: () => null, setItem: () => {} };
      const document = {
        querySelector: (s) => elements[s] || { innerHTML: '', style: {}, addEventListener: () => {} },
        querySelectorAll: () => []
      };
      const window = { print: () => {} };
      ${inlineScript}
      return {
        G, OP, FS, CP,
        runWithState: (sMap, pName) => {
          S = { ...sMap };
          PN = pName;
          out();
          return {
            smBorderColor: elements['#sm'].style.borderLeftColor,
            sm: elements['#sm'].innerHTML,
            ur: elements['#ur'].innerHTML,
            qs: elements['#qs'].innerHTML,
            plan: elements['#plan'].innerHTML
          };
        }
      };
    })()`;

    const legacy = vm.runInNewContext(wrappedScript) as LegacySupervisorSandbox;

    // Verificar constantes estáticas
    expect(G).toEqual(legacy.G);
    expect(OP).toEqual(legacy.OP);
    expect(FS).toEqual(legacy.FS);
    expect(CP).toEqual(legacy.CP);

    // 1.a Probar los 43 puntos × 4 opciones ('c', 'p', 'n', 'x') individualmente (172 evaluaciones)
    const values: AuditValue[] = ['c', 'p', 'n', 'x'];
    G.forEach(([, , items], gIdx) => {
      items.forEach((_, iIdx) => {
        for (const val of values) {
          const singleMap: AuditAnswersMap = { [`${gIdx}-${iIdx}`]: val };
          const legOut = legacy.runWithState(singleMap, 'Mi Proyecto');
          const modOut = computeLegacySupervisorOutputsHtml(
            singleMap,
            'Mi Proyecto'
          );
          expect(modOut).toEqual(legOut);
        }
      });
    });

    // 1.b Probar escenarios complejos: vacío, todos Cumple, todos Parcial, todos No, todos No aplica, mixto con caracteres especiales
    const allC: AuditAnswersMap = {};
    const allP: AuditAnswersMap = {};
    const allN: AuditAnswersMap = {};
    const allX: AuditAnswersMap = {};
    const mixed: AuditAnswersMap = {};

    G.forEach(([, , items], gIdx) => {
      items.forEach((_, iIdx) => {
        const key = `${gIdx}-${iIdx}`;
        allC[key] = 'c';
        allP[key] = 'p';
        allN[key] = 'n';
        allX[key] = 'x';
        mixed[key] = values[(gIdx + iIdx) % 4]!;
      });
    });

    const scenarios: Array<[AuditAnswersMap, string]> = [
      [{}, ''],
      [allC, 'Proyecto Verde'],
      [allP, 'Proyecto Ámbar'],
      [allN, 'Proyecto Rojo & <Crítico>'],
      [allX, 'Solo No Aplica'],
      [mixed, 'Auditoría Mixta'],
    ];

    for (const [sMap, pName] of scenarios) {
      const legOut = legacy.runWithState(sMap, pName);
      const modOut = computeLegacySupervisorOutputsHtml(sMap, pName);
      expect(modOut).toEqual(legOut);
    }
  });

  // 2. Interactive UI, toggle behavior, project name & localStorage persistence (10.b)
  it('renderiza los 8 grupos (43 puntos), permite marcar y desmarcar opciones, calcula el resultado y persiste en localStorage', () => {
    const { unmount } = renderTool();

    // Verificar estructura inicial: 8 grupos, 43 puntos, 16 conceptos, 10 señales, 4 fases
    expect(document.querySelectorAll('#gps .gp').length).toBe(8);
    expect(document.querySelectorAll('#gps .it').length).toBe(43);
    expect(document.querySelectorAll('#cp .box').length).toBe(16);
    expect(document.querySelectorAll('#sa > li').length).toBe(SA.length);
    expect(document.querySelectorAll('#fs .box').length).toBe(4);
    expect(document.getElementById('sm')?.textContent).toContain(
      'Marca los puntos de la auditoría para ver el resultado.'
    );

    // Escribir nombre del proyecto
    const pnInput = document.getElementById('pn') as HTMLInputElement;
    fireEvent.change(pnInput, { target: { value: 'Core Bancario API' } });

    // Marcar 0-0 como Cumple ('c'), 0-1 como No ('n') y 1-1 como Parcial ('p')
    const btn00c = document.querySelector<HTMLButtonElement>(
      '.seg[data-k="0-0"] button[data-v="c"]'
    )!;
    const btn01n = document.querySelector<HTMLButtonElement>(
      '.seg[data-k="0-1"] button[data-v="n"]'
    )!;
    const btn11p = document.querySelector<HTMLButtonElement>(
      '.seg[data-k="1-1"] button[data-v="p"]'
    )!;

    fireEvent.click(btn00c);
    fireEvent.click(btn01n);
    fireEvent.click(btn11p);

    expect(btn00c).toHaveAttribute('aria-pressed', 'true');
    expect(btn01n).toHaveAttribute('aria-pressed', 'true');
    expect(btn11p).toHaveAttribute('aria-pressed', 'true');

    // Verificar resumen (#sm), urgentes (#ur), preguntas (#qs) y plan (#plan)
    const smText = document.getElementById('sm')?.textContent ?? '';
    expect(smText).toContain('Core Bancario API');
    expect(smText).toContain('3 de 43 puntos evaluados');
    expect(document.getElementById('ur')?.textContent).toContain(
      'Hay capas separadas: interfaz, lógica y acceso a datos'
    );
    expect(document.getElementById('qs')?.textContent).toContain(
      '¿Dónde está la lógica de negocio? ¿Se mezcla con la interfaz o con SQL?'
    );
    expect(document.getElementById('plan')?.textContent).toContain(
      'Primero: Hay capas separadas: interfaz, lógica y acceso a datos.'
    );

    // Volver a pulsar 0-1 ('n') para desmarcarlo (toggle)
    fireEvent.click(btn01n);
    expect(btn01n).toHaveAttribute('aria-pressed', 'false');
    expect(document.getElementById('sm')?.textContent).toContain(
      '2 de 43 puntos evaluados'
    );

    // Verificar persistencia en localStorage con prefijo 'supervisor-codigo:state'
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    ) as SupervisorStorageState;
    expect(stored.n).toBe('Core Bancario API');
    expect(stored.s).toEqual({ '0-0': 'c', '1-1': 'p' });

    // Desmontar y volver a montar para comprobar hidratación desde localStorage
    unmount();
    renderTool();
    expect((document.getElementById('pn') as HTMLInputElement).value).toBe(
      'Core Bancario API'
    );
    expect(
      document.querySelector('.seg[data-k="0-0"] button[data-v="c"]')
    ).toHaveAttribute('aria-pressed', 'true');

    // Borrar respuestas (#br)
    const clearBtn = document.getElementById('br')!;
    fireEvent.click(clearBtn);
    expect(document.getElementById('msg')?.textContent).toBe(
      'Respuestas borradas.'
    );
    expect((document.getElementById('pn') as HTMLInputElement).value).toBe('');
    expect(document.getElementById('sm')?.textContent).toContain(
      'Marca los puntos de la auditoría para ver el resultado.'
    );

    // Botón Imprimir (#bx)
    const printBtn = document.getElementById('bx')!;
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
