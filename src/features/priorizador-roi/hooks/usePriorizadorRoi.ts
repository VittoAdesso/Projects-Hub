import { useCallback, useMemo, useState } from 'react';
import {
  CHART_RISK_COLORS,
  DEFAULT_IDEAS,
  QN,
  STORAGE_KEY,
} from '../data/prioritizerConstants';
import type {
  CalculatedIdeaRow,
  IdeaFieldKey,
  IdeaRow,
  PrioritizerCalculationResult,
  PrioritizerState,
  QuadrantIndex,
} from '../types';

export function escapeHtml(text: unknown): string {
  return String(text ?? '').replace(
    /[&<>"]/g,
    (ch) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
      })[ch] ?? ch
  );
}

export function parsePositiveNumber(val: unknown): number {
  const num = parseFloat(String(val ?? '').replace(',', '.'));
  return Number.isFinite(num) && num > 0 ? num : 0;
}

export function formatEsNumber(val: number, maxDecimals: number = 0): string {
  return val.toLocaleString('es-ES', { maximumFractionDigits: maxDecimals });
}

export function computeMedian(values: readonly number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((x, y) => x - y);
  const mid = sorted.length >> 1;
  return sorted.length % 2
    ? (sorted[mid] ?? 0)
    : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
}

export function calcPrioritizer(
  state: PrioritizerState
): PrioritizerCalculationResult {
  const ch = parsePositiveNumber(state.ch);

  const L: CalculatedIdeaRow[] = state.rows.map((r, i) => {
    const hy = parsePositiveNumber(r.h) * 12;
    const d = parsePositiveNumber(r.d);
    const k = Math.min(3, Math.max(1, parsePositiveNumber(r.r) || 1));
    const sc = d > 0 ? hy / (d * k) : 0;

    let pay: number | null = null;
    let ah = 0;
    if (ch > 0) {
      ah = hy * ch;
      const dev = d * 8 * ch;
      const net = ah - parsePositiveNumber(r.x);
      pay = net > 0 ? dev / (net / 12) : null;
    }

    return {
      ...r,
      i,
      hy,
      d,
      k,
      sc,
      ah,
      pay,
      ok: hy > 0 && d > 0,
      q: 3,
    };
  });

  const V = L.filter((x) => x.ok);
  const mY = computeMedian(V.map((x) => x.hy));
  const mX = computeMedian(V.map((x) => x.d));

  L.forEach((x) => {
    const quadrant: QuadrantIndex = !x.ok
      ? 3
      : x.hy >= mY
        ? x.d <= mX
          ? 0
          : 1
        : x.d <= mX
          ? 2
          : 3;
    x.q = quadrant;
  });

  return { L, V, mY, mX, ch };
}

export interface LegacyPrioritizerOutputs {
  tb: string;
  sv: string;
  sm: string;
}

export function computePrioritizerOutputsHtml(
  state: PrioritizerState
): LegacyPrioritizerOutputs {
  const { V, mY, mX, ch } = calcPrioritizer(state);
  const R = [...V].sort((a, b) => b.sc - a.sc);
  const rk = new Map(R.map((x, j) => [x.i, j + 1]));

  const tb =
    '<tr><th>#</th><th>Idea</th><th>Horas/año</th><th>Esfuerzo</th><th>Puntos</th>' +
    (ch > 0 ? '<th>Ahorro/año</th><th>Amortiza</th>' : '') +
    '<th>Cuadrante</th></tr>' +
    (R.length
      ? R.map(
          (x, j) =>
            `<tr><td>${j + 1}</td><td>${escapeHtml(
              x.n || 'Sin nombre'
            )}</td><td>${formatEsNumber(x.hy)}</td><td>${formatEsNumber(
              x.d
            )} d</td><td>${formatEsNumber(x.sc, 1)}</td>${
              ch > 0
                ? `<td>${formatEsNumber(x.ah)} €</td><td>${
                    x.pay === null ? 'No' : formatEsNumber(x.pay, 1) + ' m'
                  }</td>`
                : ''
            }<td><span class="q q${x.q + 1}">${QN[x.q]}</span></td></tr>`
        ).join('')
      : `<tr><td colspan="${
          ch > 0 ? 8 : 6
        }" style="text-align:left">Rellena horas y días en al menos una idea.</td></tr>`);

  const x0 = 44;
  const x1 = 404;
  const y0 = 18;
  const y1 = 318;
  const mx = Math.max(1, ...V.map((x) => x.d)) * 1.15;
  const my = Math.max(1, ...V.map((x) => x.hy)) * 1.15;
  const px = (v: number) => x0 + (v / mx) * (x1 - x0);
  const py = (v: number) => y1 - (v / my) * (y1 - y0);

  let s = `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${
    y1 - y0
  }" fill="#fff" stroke="#D7DEE5"/>`;
  if (V.length) {
    s += `<line x1="${px(mX)}" y1="${y0}" x2="${px(
      mX
    )}" y2="${y1}" stroke="#52616F" stroke-dasharray="5 4"/><line x1="${x0}" y1="${py(
      mY
    )}" x2="${x1}" y2="${py(mY)}" stroke="#52616F" stroke-dasharray="5 4"/>`;
    s += `<text x="${x0 + 6}" y="${
      y0 + 16
    }" font-size="12" fill="#1F6B3F" font-weight="600">Hazlo ya</text><text x="${
      x1 - 6
    }" y="${
      y0 + 16
    }" font-size="12" fill="#2563A8" font-weight="600" text-anchor="end">Estratégico</text><text x="${
      x0 + 6
    }" y="${
      y1 - 8
    }" font-size="12" fill="#52616F" font-weight="600">Relleno</text><text x="${
      x1 - 6
    }" y="${
      y1 - 8
    }" font-size="12" fill="#B83232" font-weight="600" text-anchor="end">Replantéalo</text>`;
    V.forEach((x) => {
      const fillColor = CHART_RISK_COLORS[x.k - 1] ?? '#2E7D52';
      s += `<circle cx="${px(x.d)}" cy="${py(
        x.hy
      )}" r="12" fill="${fillColor}"/><text x="${px(x.d)}" y="${
        py(x.hy) + 4.5
      }" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">${rk.get(
        x.i
      )}</text>`;
    });
  }
  s += `<text x="${
    (x0 + x1) / 2
  }" y="348" font-size="12.5" fill="#52616F" text-anchor="middle">Esfuerzo en días (más a la derecha, más trabajo)</text><text transform="translate(13 ${
    (y0 + y1) / 2
  }) rotate(-90)" font-size="12.5" fill="#52616F" text-anchor="middle">Horas ahorradas al año</text>`;

  const th = V.reduce((a, x) => a + x.hy, 0);
  const ta = V.reduce((a, x) => a + x.ah, 0);
  const qw = R.filter((x) => x.q === 0);
  const top = R[0];

  const sm = V.length && top
    ? `<div class="kp"><div><b>${V.length}</b><span>ideas valoradas</span></div><div><b>${formatEsNumber(
        th
      )}</b><span>horas ahorradas al año</span></div>${
        ch > 0
          ? `<div><b>${formatEsNumber(ta)} €</b><span>ahorro anual estimado</span></div>`
          : ''
      }</div><p>La primera en el ranking es <b>${escapeHtml(
        top.n || 'Sin nombre'
      )}</b>, con ${formatEsNumber(top.hy)} horas al año y ${formatEsNumber(
        top.d
      )} días de esfuerzo.</p><p>${
        qw.length
          ? `Para empezar ya: ${qw
              .map((x) => escapeHtml(x.n || 'Sin nombre'))
              .join('; ')}.`
          : 'Ninguna idea cae en el cuadrante de empezar ya: conviene dividir las más grandes en partes más pequeñas.'
      }</p>${
        ch > 0
          ? ''
          : '<p>Indica el coste por hora para ver también el ahorro en euros y cuándo se amortiza cada idea.</p>'
      }<p>Estimaciones propias, pendientes de validar con cada área.</p>`
    : '<p>Rellena horas y días en al menos una idea para generar el resumen.</p>';

  return { tb, sv: s, sm };
}

export function loadStateFromStorage(
  key: string = STORAGE_KEY
): PrioritizerState {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return { ch: '', rows: DEFAULT_IDEAS.map((r) => ({ ...r })) };
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      'rows' in parsed &&
      Array.isArray((parsed as { rows: unknown }).rows)
    ) {
      const obj = parsed as { ch?: unknown; rows: IdeaRow[] };
      return {
        ch: String(obj.ch ?? ''),
        rows: obj.rows.map((r) => ({
          n: String(r.n ?? ''),
          a: String(r.a ?? ''),
          h: r.h ?? '',
          d: r.d ?? '',
          r: r.r ?? 1,
          x: r.x ?? 0,
        })),
      };
    }
  } catch {
    // Ignore storage read errors
  }
  return { ch: '', rows: DEFAULT_IDEAS.map((r) => ({ ...r })) };
}

export function saveStateToStorage(
  state: PrioritizerState,
  key: string = STORAGE_KEY
): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage write errors
  }
}

export function usePriorizadorRoi() {
  const [state, setState] = useState<PrioritizerState>(() =>
    loadStateFromStorage()
  );
  const [statusMessage, setStatusMessage] = useState<string>('');

  const updateCostPerHour = useCallback((value: string) => {
    setState((prev) => {
      const next: PrioritizerState = { ...prev, ch: value };
      saveStateToStorage(next);
      return next;
    });
  }, []);

  const updateRowField = useCallback(
    (index: number, key: IdeaFieldKey, value: string) => {
      setState((prev) => {
        const next: PrioritizerState = {
          ...prev,
          rows: prev.rows.map((r, i) =>
            i === index ? { ...r, [key]: value } : r
          ),
        };
        saveStateToStorage(next);
        return next;
      });
    },
    []
  );

  const deleteRow = useCallback((index: number) => {
    setState((prev) => {
      const next: PrioritizerState = {
        ...prev,
        rows: prev.rows.filter((_, i) => i !== index),
      };
      saveStateToStorage(next);
      return next;
    });
  }, []);

  const addRow = useCallback(() => {
    setState((prev) => {
      const next: PrioritizerState = {
        ...prev,
        rows: [
          ...prev.rows,
          { n: '', a: '', h: '', d: '', r: 1, x: 0 },
        ],
      };
      saveStateToStorage(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    const empty: PrioritizerState = { ch: '', rows: [] };
    setState(empty);
    saveStateToStorage(empty);
    setStatusMessage('Todo borrado.');
  }, []);

  const calculation = useMemo(() => calcPrioritizer(state), [state]);

  const sortedValidRows = useMemo(
    () => [...calculation.V].sort((a, b) => b.sc - a.sc),
    [calculation.V]
  );

  const rankMap = useMemo(
    () => new Map(sortedValidRows.map((x, j) => [x.i, j + 1])),
    [sortedValidRows]
  );

  return {
    state,
    calculation,
    sortedValidRows,
    rankMap,
    statusMessage,
    setStatusMessage,
    updateCostPerHour,
    updateRowField,
    deleteRow,
    addRow,
    clearAll,
  };
}
