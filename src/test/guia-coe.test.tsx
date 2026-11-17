import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import vm from 'vm';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { GuiaCoeView } from '@/features/guia-coe/views/GuiaCoeView';
import {
  CO,
  ER,
  ES,
  FS,
  LD,
  MD,
  MO,
  Q,
  RC,
  TP,
} from '@/features/guia-coe/data/coeData';
import { buildRecommendationHtml } from '@/features/guia-coe/hooks/useGuiaCoe';
import type { AdvisorAnswers } from '@/features/guia-coe/types';

interface LegacyCoeSandbox {
  CO: unknown;
  MO: unknown;
  Q: unknown;
  MD: unknown;
  FS: unknown;
  ES: string;
  RC: unknown;
  runRec: (a0: number, a1: number, a2: number, a3: number) => string;
}

const renderTool = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <GuiaCoeView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Guía del CoE Integrado - Parity, Advisor Combinations & UI Tests', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.print = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });
  });

  // 1. Static Data & 256 Advisor Combinations Parity against Legacy Script (10.a)
  it('los datos (CO, MO, Q, MD, FS, ES, RC) y las 256 combinaciones del asistente coinciden 100% con el original', () => {
    const legacyPath = resolveLegacyFile('guia-coe-integrado-varias-areas.html');
    const htmlContent = fs.readFileSync(legacyPath, 'utf8');
    const scriptMatches = [...htmlContent.matchAll(/<script>([\s\S]*?)<\/script>/g)];
    const inlineScript = scriptMatches[scriptMatches.length - 1]?.[1];
    expect(inlineScript).toBeDefined();

    // Extraer las constantes y la función rec() del script original en un entorno aislado
    const wrappedScript = `(function() {
      const elements = {
        '#con': { innerHTML: '' },
        '#mod': { innerHTML: '' },
        '#qs': { innerHTML: '', addEventListener: () => {} },
        '#res': { innerHTML: '' },
        '#ph': { innerHTML: '', addEventListener: () => {} },
        '#fp': { innerHTML: '' },
        '#ar': { innerHTML: '' },
        '#rc': { innerHTML: '' },
        '#ld': { innerHTML: '' },
        '#tp': { innerHTML: '' },
        '#er': { innerHTML: '' },
        '#msg': { textContent: '' },
        '#bi': {},
        '#bp': {},
        '#bx': {},
        '#sheet': {}
      };
      const document = {
        querySelector: (s) => elements[s] || { innerHTML: '', addEventListener: () => {} },
        querySelectorAll: () => []
      };
      const window = { print: () => {} };
      ${inlineScript}
      return {
        CO, MO, Q, MD, FS, ES, RC,
        runRec: (a0, a1, a2, a3) => {
          A[0] = a0; A[1] = a1; A[2] = a2; A[3] = a3;
          rec();
          return elements['#res'].innerHTML;
        }
      };
    })()`;

    const legacy = vm.runInNewContext(wrappedScript) as LegacyCoeSandbox;

    // Paridad exacta de estructuras de datos
    expect(CO).toEqual(legacy.CO);
    expect(MO).toEqual(legacy.MO);
    expect(Q).toEqual(legacy.Q);
    expect(MD).toEqual(legacy.MD);
    expect(FS).toEqual(legacy.FS);
    expect(ES).toBe(legacy.ES);
    expect(RC).toEqual(legacy.RC);

    // Paridad exacta de las 256 combinaciones (81 completas + 175 incompletas con -1)
    const possibleValues = [-1, 0, 1, 2];
    for (const a0 of possibleValues) {
      for (const a1 of possibleValues) {
        for (const a2 of possibleValues) {
          for (const a3 of possibleValues) {
            const tuple: AdvisorAnswers = [a0, a1, a2, a3];
            const legacyHtml = legacy.runRec(a0, a1, a2, a3);
            const modernHtml = buildRecommendationHtml(tuple);
            expect(modernHtml).toBe(legacyHtml);
          }
        }
      }
    }
  });

  // 2. Renderizado completo de las 8 secciones y contenido estático (10.b)
  it('renderiza las 8 secciones, 9 conceptos, 3 modelos, 4 áreas, tabla RACI, 5 niveles y listas', () => {
    renderTool();

    // 8 cabeceras de sección
    for (const id of ['c', 'm', 'a', 'f', 'i', 'r', 'n', 't']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }

    // 9 conceptos y 3 modelos
    expect(document.querySelectorAll('#con .card').length).toBe(9);
    expect(document.querySelectorAll('#mod .card').length).toBe(3);

    // 4 áreas en el diagrama integrado
    expect(document.querySelectorAll('#ar .card').length).toBe(4);

    // Tabla RACI (8 filas de datos) y resaltado de celdas A y R
    const raciRows = document.querySelectorAll('#rc tbody tr');
    expect(raciRows.length).toBe(8);
    expect(document.querySelectorAll('#rc td.A').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('#rc td.R').length).toBeGreaterThan(0);

    // 5 niveles de madurez, 8 consejos y 6 errores
    expect(document.querySelectorAll('#ld > div').length).toBe(LD.length);
    expect(document.querySelectorAll('#tp > li').length).toBe(TP.length);
    expect(document.querySelectorAll('#er > li').length).toBe(ER.length);
  });

  // 3. Interacción con el asistente de recomendación (10.b)
  it('actualiza la recomendación y las alertas (.warn) al responder las 4 preguntas en la interfaz', () => {
    renderTool();

    const resEl = document.getElementById('res')!;
    expect(resEl.textContent).toContain(
      'Responde las cuatro preguntas para ver la recomendación.'
    );

    // Seleccionar: 1 o 2 personas (0), Muy distintas (2), Nada escrito (0), Ninguno apoyo (2)
    fireEvent.click(
      document.querySelector('#qs button[data-i="0"][data-j="0"]')!
    );
    fireEvent.click(
      document.querySelector('#qs button[data-i="1"][data-j="2"]')!
    );
    fireEvent.click(
      document.querySelector('#qs button[data-i="2"][data-j="0"]')!
    );
    fireEvent.click(
      document.querySelector('#qs button[data-i="3"][data-j="2"]')!
    );

    expect(
      document.querySelector('#qs button[data-i="0"][data-j="0"]')
    ).toHaveAttribute('aria-pressed', 'true');

    // Debe recomendar Centralizado con 3 avisos .warn
    expect(resEl.textContent).toContain(
      'Centralizado con una persona de enlace por área'
    );
    expect(resEl.querySelectorAll('.warn').length).toBe(3);
  });

  // 4. Interacción con las 6 fases, plantilla de cierre y botón Imprimir (10.b)
  it('navega por las 6 fases, muestra y copia la plantilla de cierre en la fase 5 e invoca window.print', async () => {
    renderTool();

    // Inicialmente fase 0 activa
    const fpEl = document.getElementById('fp')!;
    expect(fpEl.textContent).toContain('0 · Diagnóstico');

    // Recorrer las 6 fases
    FS.forEach((phase, idx) => {
      const btn = document.querySelector(`#ph button[data-k="${idx}"]`)!;
      fireEvent.click(btn);
      expect(btn).toHaveAttribute('aria-pressed', 'true');
      expect(fpEl.textContent).toContain(phase[0]);
      expect(fpEl.textContent).toContain(phase[3]);
    });

    // En la fase 5 (Cierre) aparece el bloque <pre> con la plantilla ES y el botón de copiar
    const preEl = fpEl.querySelector('pre');
    expect(preEl).not.toBeNull();
    expect(preEl?.textContent).toBe(ES);

    const copyBtn = screen.getByTestId('copy-button');
    fireEvent.click(copyBtn);
    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(ES);
    });

    // Probar botón Imprimir (#bx)
    const printBtn = document.getElementById('bx')!;
    fireEvent.click(printBtn);
    expect(window.print).toHaveBeenCalledTimes(1);
  });
});
