import { useCallback, useMemo, useState } from 'react';
import {
  CRITICALITY_LABELS,
  DD,
  DEFAULT_ROWS,
  LV,
  MAXF,
  PP,
  STORAGE_KEY,
  TT,
} from '../data/riskConstants';
import type {
  CalculatedProcessRow,
  PrioritizedAction,
  ProcessRow,
  ProcessSelectKey,
  RiskLevelIndex,
} from '../types';

export function escapeHtml(text: string): string {
  return String(text).replace(
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

export function calcProcessRows(
  rows: readonly ProcessRow[]
): CalculatedProcessRow[] {
  return rows.map((r, i) => {
    const c = Number(r.c);
    const p = Number(r.p);
    const d = Number(r.d);
    const k = Number(r.k);
    const s = Number(r.s);
    const t = Number(r.t);

    const ppVal = PP[p - 1] ?? 0;
    const ddVal = DD[d] ?? 0;
    const ttVal = TT[t] ?? 0;

    const f = ((ppVal + ddVal + (k ? 1.5 : 0) + (s ? 1 : 0) + ttVal) / MAXF) * 10;
    const risk = c * f;
    const lv: RiskLevelIndex = risk >= 15 ? 2 : risk >= 7 ? 1 : 0;

    return {
      n: r.n,
      i,
      c,
      p,
      d,
      k,
      s,
      t,
      f,
      risk,
      lv,
    };
  });
}

export function buildPrioritizedActions(
  sortedRows: readonly CalculatedProcessRow[],
  escapeNames: boolean = false
): PrioritizedAction[] {
  const actions: PrioritizedAction[] = [];

  sortedRows.forEach((x) => {
    const rawName = x.n || 'Sin nombre';
    const displayName = escapeNames ? escapeHtml(rawName) : rawName;
    const quoted = `"${displayName}"`;

    if (x.p === 1 && x.d < 2) {
      actions.push([
        x,
        `Escribe el manual de operación de ${quoted}: qué hace, cómo se lanza y qué hacer si falla.`,
      ]);
    }
    if (x.p === 1) {
      actions.push([x, `Forma a una segunda persona en ${quoted}.`]);
    }
    if (x.k) {
      actions.push([
        x,
        `Deja por escrito dónde están las credenciales de ${quoted} y cómo se renuevan.`,
      ]);
    }
    if (x.t === 0) {
      actions.push([
        x,
        `Haz una prueba de recuperación de ${quoted}: restaurar y ejecutar sin ayuda.`,
      ]);
    }
    if (x.t === 1) {
      actions.push([
        x,
        `Repite la prueba de recuperación de ${quoted}: han pasado más de 6 meses.`,
      ]);
    }
    if (x.s) {
      actions.push([
        x,
        `Anota de qué elementos de la pantalla depende ${quoted}, por si cambia la interfaz.`,
      ]);
    }
  });

  return actions.slice(0, 8);
}

export interface LegacyHtmlOutputs {
  sm: string;
  tb: string;
  hm: string;
  sc2: string;
  ac: string;
}

export function computeOutputsHtml(
  rows: readonly ProcessRow[]
): LegacyHtmlOutputs {
  const L = calcProcessRows(rows);
  const R = [...L].sort((a, b) => b.risk - a.risk);
  const rk = new Map(R.map((x, j) => [x.i, j + 1]));
  const solo = L.filter((x) => x.p === 1);
  const red = L.filter((x) => x.lv === 2);

  const sm = L.length
    ? `<div class="kp"><div><b>${L.length}</b><span>procesos</span></div><div><b>${solo.length}</b><span>dependen de una sola persona</span></div><div><b>${red.length}</b><span>en riesgo alto</span></div></div><p>${
        solo.length
          ? `${solo.length} de ${L.length} procesos dependen de una sola persona.`
          : 'Ningún proceso depende de una sola persona.'
      } ${
        red.length
          ? `El más urgente es <b>${escapeHtml(R[0]?.n || 'Sin nombre')}</b>.`
          : 'Ninguno está en riesgo alto con los datos actuales.'
      }</p>`
    : '<p>Añade al menos un proceso para ver el mapa.</p>';

  const tb = L.length
    ? '<tr><th>#</th><th>Proceso</th><th>Criticidad</th><th>Fragilidad</th><th>Riesgo</th></tr>' +
      R.map(
        (x, j) =>
          `<tr><td>${j + 1}</td><td>${escapeHtml(x.n || 'Sin nombre')}</td><td>${
            CRITICALITY_LABELS[x.c - 1] ?? ''
          }</td><td>${x.f.toFixed(1)} / 10</td><td><span class="p ${LV[x.lv][1]}">${
            LV[x.lv][0]
          } · ${x.risk.toFixed(1)}</span></td></tr>`
      ).join('')
    : '';

  let h =
    '<div></div><div class="x">Fragilidad baja</div><div class="x">Fragilidad media</div><div class="x">Fragilidad alta</div>';
  [3, 2, 1].forEach((c) => {
    h += `<div class="l">Criticidad ${['', 'baja', 'media', 'alta'][c]}</div>`;
    [0, 1, 2].forEach((fi) => {
      const cell = L.filter(
        (x) => x.c === c && Math.min(2, Math.floor(x.f / (10 / 3))) === fi
      );
      const g = Math.min(2, Math.floor((c - 1 + fi) / 1.5));
      h += `<div class="c g${g}">${cell
        .map(
          (x) => `<span class="n" title="${escapeHtml(x.n)}">${rk.get(x.i)}</span>`
        )
        .join('')}</div>`;
    });
  });
  const hm = L.length ? h : '';

  const par = solo.filter((x) => x.d < 2);
  const ok = solo.filter((x) => x.d === 2);
  const cr = par.filter((x) => x.c === 3);
  const pl = (n: number, a: string, b: string) => (n === 1 ? a : b);

  const sc2 = solo.length
    ? (par.length
        ? `<p><b>${par.length}</b> ${pl(
            par.length,
            'proceso se quedaría sin cobertura y sin manual completo',
            'procesos se quedarían sin cobertura y sin manual completo'
          )}: tardarían en recuperarse o se pararían.</p>`
        : '<p>Ningún proceso se quedaría sin cobertura y sin manual completo.</p>') +
      (cr.length
        ? `<p>De ellos, <b>${cr.length}</b> ${pl(
            cr.length,
            'es de criticidad alta',
            'son de criticidad alta'
          )}: ${cr.map((x) => escapeHtml(x.n || 'Sin nombre')).join('; ')}.</p>`
        : '') +
      (ok.length
        ? `<p><b>${ok.length}</b> ${pl(
            ok.length,
            'proceso depende',
            'procesos dependen'
          )} de una sola persona pero ${pl(
            ok.length,
            'tiene manual completo',
            'tienen manual completo'
          )}: otra persona podría continuarlos.</p>`
        : '')
    : '<p>Ningún proceso depende de una sola persona: el escenario no genera paradas por esta causa.</p>';

  const A = buildPrioritizedActions(R, true);
  const ac = A.length
    ? `<ul class="t">${A.map(
        ([x, t]) =>
          `<li><span class="p ${LV[x.lv][1]}">${LV[x.lv][0]}</span> ${t}</li>`
      ).join('')}</ul>`
    : '<p>No hay acciones pendientes con los datos actuales.</p>';

  return { sm, tb, hm, sc2, ac };
}

export function loadRowsFromStorage(
  key: string = STORAGE_KEY
): ProcessRow[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return DEFAULT_ROWS.map((r) => ({ ...r }));
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      'rows' in parsed &&
      Array.isArray((parsed as { rows: unknown }).rows)
    ) {
      return ((parsed as { rows: ProcessRow[] }).rows).map((r) => ({
        n: String(r.n ?? ''),
        c: Number(r.c ?? 2),
        p: Number(r.p ?? 1),
        d: Number(r.d ?? 0),
        k: Number(r.k ?? 0),
        s: Number(r.s ?? 0),
        t: Number(r.t ?? 0),
      }));
    }
  } catch {
    // Ignore storage read errors as in original
  }
  return DEFAULT_ROWS.map((r) => ({ ...r }));
}

export function saveRowsToStorage(
  rows: readonly ProcessRow[],
  key: string = STORAGE_KEY
): void {
  try {
    localStorage.setItem(key, JSON.stringify({ rows }));
  } catch {
    // Ignore storage write errors as in original
  }
}

export function useMapaRiesgo() {
  const [rows, setRows] = useState<ProcessRow[]>(() => loadRowsFromStorage());
  const [statusMessage, setStatusMessage] = useState<string>('');

  const updateRowName = useCallback((index: number, name: string) => {
    setRows((prev) => {
      const next = prev.map((r, i) => (i === index ? { ...r, n: name } : r));
      saveRowsToStorage(next);
      return next;
    });
  }, []);

  const updateRowSelect = useCallback(
    (index: number, key: ProcessSelectKey, value: number) => {
      setRows((prev) => {
        const next = prev.map((r, i) =>
          i === index ? { ...r, [key]: value } : r
        );
        saveRowsToStorage(next);
        return next;
      });
    },
    []
  );

  const deleteRow = useCallback((index: number) => {
    setRows((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveRowsToStorage(next);
      return next;
    });
  }, []);

  const addRow = useCallback(() => {
    setRows((prev) => {
      const next: ProcessRow[] = [
        ...prev,
        { n: '', c: 2, p: 1, d: 0, k: 0, s: 0, t: 0 },
      ];
      saveRowsToStorage(next);
      return next;
    });
  }, []);

  const clearAllRows = useCallback(() => {
    setRows([]);
    saveRowsToStorage([]);
    setStatusMessage('Todo borrado.');
  }, []);

  const calculatedRows = useMemo(() => calcProcessRows(rows), [rows]);

  const sortedByRisk = useMemo(
    () => [...calculatedRows].sort((a, b) => b.risk - a.risk),
    [calculatedRows]
  );

  const rankMap = useMemo(
    () => new Map(sortedByRisk.map((x, j) => [x.i, j + 1])),
    [sortedByRisk]
  );

  const prioritizedActions = useMemo(
    () => buildPrioritizedActions(sortedByRisk, false),
    [sortedByRisk]
  );

  return {
    rows,
    calculatedRows,
    sortedByRisk,
    rankMap,
    prioritizedActions,
    statusMessage,
    setStatusMessage,
    updateRowName,
    updateRowSelect,
    deleteRow,
    addRow,
    clearAllRows,
  };
}
