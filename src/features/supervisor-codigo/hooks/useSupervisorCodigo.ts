import { useCallback, useMemo, useState } from 'react';
import { G, STORAGE_KEY } from '../data/supervisorData';
import type {
  AuditAnswersMap,
  AuditEvaluationResult,
  AuditFinding,
  AuditValue,
  GroupScoreTuple,
  SupervisorStorageState,
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

export function scoreValue(v: AuditValue): number {
  return v === 'c' ? 1 : v === 'p' ? 0.5 : 0;
}

export function getTrafficLightHex(p: number): string {
  return p >= 75 ? '#2E7D52' : p >= 50 ? '#B7791F' : '#B83232';
}

export function evaluateAudit(answers: AuditAnswersMap): AuditEvaluationResult {
  let tw = 0;
  let ts = 0;
  let n = 0;
  let all = 0;
  const rows: GroupScoreTuple[] = [];
  const bad: AuditFinding[] = [];

  G.forEach(([name, , it], g) => {
    let w = 0;
    let s = 0;
    let k = 0;

    it.forEach((item, i) => {
      const [t, wt, q] = item;
      all++;
      const v = answers[`${g}-${i}`];
      if (!v || v === 'x') return;
      k++;
      n++;
      w += wt;
      s += wt * scoreValue(v);
      if (v === 'n' || v === 'p') {
        bad.push({ g: name, t, wt, v, q });
      }
    });

    tw += w;
    ts += s;
    rows.push([name, w ? Math.round((s / w) * 100) : null, k, it.length]);
  });

  const gp = tw ? Math.round((ts / tw) * 100) : null;

  bad.sort(
    (a, b) =>
      b.wt * (b.v === 'n' ? 2 : 1) - a.wt * (a.v === 'n' ? 2 : 1)
  );

  const c1 = bad.filter((b) => b.v === 'n' && b.wt === 3);
  const c2 = bad.filter((b) => !(b.v === 'n' && b.wt === 3) && b.wt >= 2);

  return {
    globalPercentage: gp,
    evaluatedCount: n,
    totalItemsCount: all,
    groupRows: rows,
    findings: bad,
    criticalNoItems: c1,
    importantPendingItems: c2,
  };
}

export interface LegacySupervisorOutputs {
  smBorderColor: string;
  sm: string;
  ur: string;
  qs: string;
  plan: string;
}

export function computeLegacySupervisorOutputsHtml(
  answers: AuditAnswersMap,
  projectName: string
): LegacySupervisorOutputs {
  const {
    globalPercentage: gp,
    evaluatedCount: n,
    totalItemsCount: all,
    groupRows: rows,
    findings: bad,
    criticalNoItems: c1,
    importantPendingItems: c2,
  } = evaluateAudit(answers);

  const smBorderColor = gp === null ? '#16222E' : getTrafficLightHex(gp);

  const sm =
    gp === null
      ? '<p>Marca los puntos de la auditoría para ver el resultado.</p>'
      : `<div class="row"><p class="big" style="color:${getTrafficLightHex(
          gp
        )}">${gp}%</p><span>puntuación global${
          projectName ? '<br>' + escapeHtml(projectName) : ''
        }<br>${n} de ${all} puntos evaluados</span></div><div class="bars">${rows
          .map(
            ([nme, p, k, t]) =>
              `<div><span>${nme}</span><span class="pg"><i style="width:${
                p || 0
              }%;background:${
                p === null ? '#D7DEE5' : getTrafficLightHex(p)
              }"></i></span><span>${
                p === null ? 'sin datos' : p + '% · ' + k + '/' + t
              }</span></div>`
          )
          .join(
            ''
          )}</div><p style="margin-top:10px;font-size:13.5px;color:#52616F">Verde desde 75%, ámbar desde 50% y rojo por debajo. Es una guía para priorizar, no una certificación.</p>`;

  const ur = bad.length
    ? `<ul class="t">${bad
        .slice(0, 6)
        .map(
          (b) =>
            `<li><b>${b.v === 'n' ? 'No' : 'Parcial'}</b> · ${escapeHtml(
              b.t
            )} <span style="color:#52616F">(${b.g})</span></li>`
        )
        .join('')}</ul>`
    : '<p>Nada urgente con las respuestas actuales.</p>';

  const qs = bad.length
    ? `<ul class="t">${bad
        .slice(0, 6)
        .map(
          (b) =>
            `<li>${escapeHtml(
              b.q || '¿Cómo se cumple esto y qué falta? «' + b.t + '»'
            )}</li>`
        )
        .join('')}</ul>`
    : '<p>Sin preguntas pendientes.</p>';

  const lst = (x: readonly AuditFinding[]) =>
    x
      .slice(0, 5)
      .map((b) => escapeHtml(b.t))
      .join('; ');

  const plan =
    n === 0
      ? '<p>Cuando marques puntos aparecerá aquí un plan en tres pasos.</p>'
      : `<ul class="t"><li><b>Primero:</b> ${
          c1.length ? lst(c1) + '.' : 'no hay puntos críticos marcados como No.'
        }</li><li><b>Después:</b> ${
          c2.length ? lst(c2) + '.' : 'no hay nada importante pendiente.'
        }</li><li><b>Siempre:</b> repetir esta revisión al cerrar cada fase del proyecto.</li></ul>`;

  return { smBorderColor, sm, ur, qs, plan };
}

export function loadSupervisorFromStorage(
  key: string = STORAGE_KEY
): SupervisorStorageState {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { s: {}, n: '' };
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      const obj = parsed as { s?: unknown; n?: unknown };
      const cleanS: AuditAnswersMap = {};
      if (obj.s && typeof obj.s === 'object' && !Array.isArray(obj.s)) {
        for (const [k, v] of Object.entries(obj.s)) {
          if (v === 'c' || v === 'p' || v === 'n' || v === 'x') {
            cleanS[k] = v;
          }
        }
      }
      return {
        s: cleanS,
        n: typeof obj.n === 'string' ? obj.n : '',
      };
    }
  } catch {
    // Ignore storage read errors
  }
  return { s: {}, n: '' };
}

export function saveSupervisorToStorage(
  state: SupervisorStorageState,
  key: string = STORAGE_KEY
): void {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage write errors
  }
}

export function useSupervisorCodigo() {
  const [state, setState] = useState<SupervisorStorageState>(() =>
    loadSupervisorFromStorage()
  );
  const [statusMessage, setStatusMessage] = useState<string>('');

  const updateProjectName = useCallback((projectName: string) => {
    setState((prev) => {
      const next: SupervisorStorageState = { ...prev, n: projectName };
      saveSupervisorToStorage(next);
      return next;
    });
  }, []);

  const toggleAnswer = useCallback((itemKey: string, value: AuditValue) => {
    setState((prev) => {
      const nextS: AuditAnswersMap = { ...prev.s };
      if (nextS[itemKey] === value) {
        delete nextS[itemKey];
      } else {
        nextS[itemKey] = value;
      }
      const next: SupervisorStorageState = { ...prev, s: nextS };
      saveSupervisorToStorage(next);
      return next;
    });
  }, []);

  const clearAnswers = useCallback(() => {
    const empty: SupervisorStorageState = { s: {}, n: '' };
    setState(empty);
    saveSupervisorToStorage(empty);
    setStatusMessage('Respuestas borradas.');
  }, []);

  const evaluation = useMemo(() => evaluateAudit(state.s), [state.s]);

  return {
    answers: state.s,
    projectName: state.n,
    evaluation,
    statusMessage,
    setStatusMessage,
    updateProjectName,
    toggleAnswer,
    clearAnswers,
  };
}
