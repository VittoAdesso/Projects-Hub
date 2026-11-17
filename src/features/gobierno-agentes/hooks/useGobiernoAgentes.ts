import { useCallback, useMemo, useState } from 'react';
import {
  CT,
  DEFAULT_AGENTS,
  MESES,
  NC,
  STORAGE_KEY,
  TC,
  TN,
  createBlankAgent,
} from '../data/agentsData';
import type {
  AgentEvaluation,
  AgentItem,
  AgentSelectKey,
  AgentTextKey,
  RiskTierIndex,
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

export function parseNonNegativeNumber(val: unknown): number {
  const num = parseFloat(String(val ?? '').replace(',', '.'));
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

export function evaluateAgent(
  a: AgentItem,
  hoy: Date = new Date()
): AgentEvaluation {
  const sc = Number(a.d) + Number(a.a) + Number(a.u) + Number(a.s);
  const why: string[] = [];
  let t: RiskTierIndex = sc <= 3 ? 0 : sc <= 7 ? 1 : 2;

  if (a.p) {
    t = 2;
    why.push(
      'Apoya decisiones sobre personas: puede ser de alto riesgo según el Reglamento europeo de IA'
    );
  }
  if (a.a === 3 && a.u >= 2) {
    t = 2;
    why.push('Actúa hacia el exterior con autonomía');
  }
  if (a.d === 3 && t < 1) {
    t = 1;
    why.push('Maneja datos personales o sensibles');
  }

  const nc = NC[t];
  const done = Array.from({ length: nc }, (_, i) => Boolean(a.ck[i])).filter(
    Boolean
  ).length;

  const ec = parseNonNegativeNumber(a.ec);
  const ea = parseNonNegativeNumber(a.ea);
  const ef = parseNonNegativeNumber(a.ef);
  const eo = parseNonNegativeNumber(a.eo);
  const ac = ec > 0 ? (ea / ec) * 100 : 0;

  let ev = '';
  if (ec <= 0) {
    ev = 'Sin evaluación: indica los casos probados.';
  } else if (eo <= 0) {
    ev = 'Define el objetivo de acierto.';
  } else if (ea > ec) {
    ev = 'Los aciertos no pueden superar los casos probados.';
  } else if (ac < eo) {
    ev = `Acierto ${ac.toFixed(0)}% por debajo del objetivo (${eo}%).`;
  } else if (ef > 0) {
    ev = 'Hay fallos de seguridad: deben ser 0.';
  }

  const evOk = ev === '';
  const need = t >= 1;
  const pend = nc - done;

  let vd: string;
  let vc: string;
  if (a.st === 3 && (pend > 0 || (need && !evOk))) {
    vd = `En producción con ${pend} controles pendientes${
      need && !evOk ? ' y evaluación no superada' : ''
    }.`;
    vc = TC[2];
  } else if (pend === 0 && (!need || evOk)) {
    vd =
      a.st === 3
        ? 'En producción y en regla.'
        : 'Listo para pasar a producción.';
    vc = TC[0];
  } else {
    vd = `No está listo: faltan ${pend} controles${
      need && !evOk ? ' y superar la evaluación' : ''
    }.`;
    vc = TC[1];
  }

  let rvs = '';
  if (a.st >= 2) {
    if (!a.rv) {
      rvs = 'Sin revisión registrada.';
    } else {
      const d = new Date(a.rv);
      d.setMonth(d.getMonth() + MESES[t]);
      if (d < hoy) {
        rvs = `Revisión vencida (se sugiere cada ${MESES[t]} meses).`;
      }
    }
  }

  return {
    sc,
    t,
    why,
    nc,
    done,
    pend,
    ev,
    evOk,
    vd,
    vc,
    rvs,
    ac,
  };
}

export interface LegacyAgentsOutputs {
  dyList: string[];
  sm: string;
}

export function computeLegacyAgentsOutputsHtml(
  agents: readonly AgentItem[],
  hoy: Date = new Date()
): LegacyAgentsOutputs {
  const evaluations = agents.map((a) => evaluateAgent(a, hoy));

  const dyList = agents.map((a, i) => {
    const r = evaluations[i]!;
    return `<span class="tier" style="background:${TC[r.t]}">Riesgo ${TN[
      r.t
    ].toLowerCase()}</span> <span style="font-size:13px;color:#52616F">puntuación ${
      r.sc
    } de 12</span>${
      r.why.length
        ? `<ul class="t">${r.why.map((w) => `<li>${w}</li>`).join('')}</ul>`
        : ''
    }<p class="big">Controles obligatorios: ${r.done} de ${
      r.nc
    }</p><div class="pg"><i style="width:${(r.done / r.nc) * 100}%;background:${
      TC[r.t]
    }"></i></div>${CT.slice(0, r.nc)
      .map(
        (c, j) =>
          `<div class="ck"><input type="checkbox" id="c${i}_${j}" data-i="${i}" data-c="${j}"${
            a.ck[j] ? ' checked' : ''
          }><label for="c${i}_${j}">${c}</label></div>`
      )
      .join('')}<div class="vd" style="--c:${r.vc}"><b>${r.vd}</b>${
      r.t >= 1 && r.ev ? `<br>Evaluación: ${r.ev}` : ''
    }${r.rvs ? `<br>${r.rvs}` : ''}</div>`;
  });

  if (!agents.length) {
    return {
      dyList,
      sm: '<p>Añade agentes en el inventario para ver el panel.</p>',
    };
  }

  const nT = [0, 1, 2].map(
    (tier) => evaluations.filter((r) => r.t === tier).length
  );
  const prod = agents.filter((a) => a.st === 3).length;
  const bad = agents.filter(
    (a, i) => a.st === 3 && evaluations[i]?.vc === TC[2]
  );
  const sinR = agents.filter((a) => !a.o.trim());
  const ven = agents.filter((_, i) => Boolean(evaluations[i]?.rvs));
  const lis = agents.filter(
    (a, i) => a.st < 3 && evaluations[i]?.vc === TC[0]
  );
  const L = (list: readonly AgentItem[]) =>
    list.map((a) => escapeHtml(a.n || 'Sin nombre')).join('; ');

  const sm = `<div class="kp"><div><b>${
    agents.length
  }</b><span>agentes</span></div><div><b style="color:${TC[2]}">${
    nT[2]
  }</b><span>riesgo alto</span></div><div><b style="color:${TC[1]}">${
    nT[1]
  }</b><span>riesgo medio</span></div><div><b style="color:${TC[0]}">${
    nT[0]
  }</b><span>riesgo bajo</span></div><div><b>${prod}</b><span>en producción</span></div></div><ul class="t"><li><b>En producción con controles pendientes:</b> ${
    bad.length ? L(bad) : 'ninguno.'
  }</li><li><b>Sin responsable asignado:</b> ${
    sinR.length ? L(sinR) : 'ninguno.'
  }</li><li><b>Con revisión vencida o sin registrar:</b> ${
    ven.length ? L(ven) : 'ninguno.'
  }</li><li><b>Listos para pasar a producción:</b> ${
    lis.length ? L(lis) : 'ninguno.'
  }</li></ul>`;

  return { dyList, sm };
}

export function loadAgentsFromStorage(
  key: string = STORAGE_KEY
): AgentItem[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return DEFAULT_AGENTS.map((a) => ({ ...a, ck: { ...a.ck } }));
    }
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item: Partial<AgentItem>) => ({
        n: String(item.n ?? ''),
        o: String(item.o ?? ''),
        pl: String(item.pl ?? ''),
        d: Number(item.d ?? 1),
        a: Number(item.a ?? 0),
        u: Number(item.u ?? 0),
        s: Number(item.s ?? 0),
        p: Number(item.p ?? 0),
        st: Number(item.st ?? 0),
        rv: String(item.rv ?? ''),
        ec: String(item.ec ?? ''),
        ea: String(item.ea ?? ''),
        ef: String(item.ef ?? ''),
        eo: String(item.eo ?? ''),
        ck:
          item.ck && typeof item.ck === 'object' && !Array.isArray(item.ck)
            ? { ...item.ck }
            : {},
      }));
    }
  } catch {
    // Ignore storage read errors
  }
  return DEFAULT_AGENTS.map((a) => ({ ...a, ck: { ...a.ck } }));
}

export function saveAgentsToStorage(
  agents: readonly AgentItem[],
  key: string = STORAGE_KEY
): void {
  try {
    localStorage.setItem(key, JSON.stringify(agents));
  } catch {
    // Ignore storage write errors
  }
}

export function useGobiernoAgentes() {
  const [agents, setAgents] = useState<AgentItem[]>(() =>
    loadAgentsFromStorage()
  );
  const [statusMessage, setStatusMessage] = useState<string>('');

  const updateAgentText = useCallback(
    (index: number, key: AgentTextKey, value: string) => {
      setAgents((prev) => {
        const next = prev.map((a, i) =>
          i === index ? { ...a, [key]: value } : a
        );
        saveAgentsToStorage(next);
        return next;
      });
    },
    []
  );

  const updateAgentSelect = useCallback(
    (index: number, key: AgentSelectKey, value: number) => {
      setAgents((prev) => {
        const next = prev.map((a, i) =>
          i === index ? { ...a, [key]: value } : a
        );
        saveAgentsToStorage(next);
        return next;
      });
    },
    []
  );

  const toggleAgentControl = useCallback(
    (agentIndex: number, controlIndex: number, checked: boolean) => {
      setAgents((prev) => {
        const next = prev.map((a, i) => {
          if (i !== agentIndex) return a;
          const nextCk = { ...a.ck };
          if (checked) {
            nextCk[controlIndex] = true;
          } else {
            delete nextCk[controlIndex];
          }
          return { ...a, ck: nextCk };
        });
        saveAgentsToStorage(next);
        return next;
      });
    },
    []
  );

  const deleteAgent = useCallback((index: number) => {
    setAgents((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveAgentsToStorage(next);
      return next;
    });
  }, []);

  const addAgent = useCallback(() => {
    setAgents((prev) => {
      const next = [...prev, createBlankAgent('')];
      saveAgentsToStorage(next);
      return next;
    });
  }, []);

  const evaluations = useMemo(
    () => agents.map((a) => evaluateAgent(a)),
    [agents]
  );

  return {
    agents,
    evaluations,
    statusMessage,
    setStatusMessage,
    updateAgentText,
    updateAgentSelect,
    toggleAgentControl,
    deleteAgent,
    addAgent,
  };
}
