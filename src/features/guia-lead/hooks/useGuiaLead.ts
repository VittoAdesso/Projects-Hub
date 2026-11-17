import { useCallback, useMemo, useState } from 'react';
import {
  LB,
  PL,
  STORAGE_KEY_M,
  STORAGE_KEY_R,
  T,
} from '../data/leadData';
import type { MaturityTuple } from '../types';

export function calcTrackMasteredCount(
  trackIndex: number,
  masteredIds: readonly string[]
): number {
  const track = T[trackIndex];
  if (!track) return 0;
  const nodes = track[3];
  return nodes.filter((_, j) => masteredIds.includes(`${trackIndex}-${j}`))
    .length;
}

export function calcTrackPercentage(
  trackIndex: number,
  masteredIds: readonly string[]
): number {
  const track = T[trackIndex];
  if (!track || track[3].length === 0) return 0;
  const count = calcTrackMasteredCount(trackIndex, masteredIds);
  return Math.round((count / track[3].length) * 100);
}

export interface DirectionSummaryData {
  readonly globalLevel: number;
  readonly diagnosticMessage: string;
  readonly trackPercentages: readonly [number, number, number, number];
}

export function evaluateDirectionSummary(
  maturityLevels: MaturityTuple,
  masteredIds: readonly string[]
): DirectionSummaryData {
  const g = Math.min(...maturityLevels);
  const idx = maturityLevels
    .map((v, i) => (v === g ? i : -1))
    .filter((i): i is number => i >= 0);
  const w = idx[0] ?? 0;
  const names = idx.map((i) => PL[i]?.[0] ?? '').join(', ');

  const nx =
    g < 5
      ? idx.length > 1
        ? idx
            .map((i) => `${PL[i]?.[0] ?? ''}: ${PL[i]?.[2]?.[g] ?? ''}`)
            .join('; ')
        : (PL[w]?.[2]?.[g] ?? '')
      : 'mantener el nivel y revisarlo con regularidad';

  const diagnosticMessage = maturityLevels.every((v) => v === 0)
    ? 'Aún no has puntuado ningún pilar. Marca el nivel de cada uno en el apartado 2 para generar este resumen.'
    : `El CoE está en el nivel N${g}. ${
        idx.length > 1
          ? 'Los pilares que lo limitan son'
          : 'El pilar que lo limita es'
      } ${names}. La prioridad es subir ${
        idx.length > 1 ? 'esos pilares' : 'ese pilar'
      } de N${g} a N${Math.min(g + 1, 5)}: ${nx}.`;

  const trackPercentages: [number, number, number, number] = [
    calcTrackPercentage(0, masteredIds),
    calcTrackPercentage(1, masteredIds),
    calcTrackPercentage(2, masteredIds),
    calcTrackPercentage(3, masteredIds),
  ];

  return {
    globalLevel: g,
    diagnosticMessage,
    trackPercentages,
  };
}

export interface LegacyLeadOutputs {
  tracks: string;
  pls: string;
  sum: string;
}

export function computeLegacyLeadOutputsHtml(
  masteredIds: readonly string[],
  maturityLevels: MaturityTuple
): LegacyLeadOutputs {
  const pct = (i: number) => calcTrackPercentage(i, masteredIds);

  const tracks = T.map(([n, c, d, nd], i) => {
    const k = nd.filter((_, j) => masteredIds.includes(`${i}-${j}`)).length;
    return `<section class="trk" style="--c:${c}"><h3>${n}</h3><p>${d}</p><div class="pg"><i style="width:${pct(
      i
    )}%"></i></div><p class="cnt">${k} de ${
      nd.length
    } dominados</p>${nd
      .map(
        ([t, l], j) =>
          `<button class="n" data-id="${i}-${j}" aria-pressed="${masteredIds.includes(
            `${i}-${j}`
          )}">${t}<small>${LB[l]}</small></button>`
      )
      .join('')}</section>`;
  }).join('');

  const pls = PL.map(([n, s, d], i) => {
    const l = maturityLevels[i] ?? 0;
    const now = l
      ? `<b>Hoy, N${l}:</b> ${d[l - 1] ?? ''}`
      : '<b>Hoy:</b> todavía no hay nada escrito sobre este pilar.';
    const nx =
      l < 5
        ? `<p><b>Para llegar a N${l + 1}:</b> ${d[l] ?? ''}</p>`
        : '<p><b>Siguiente paso:</b> mantener el nivel y revisarlo con regularidad.</p>';
    return `<section class="pl"><h3>${n}<small>${s}</small></h3><div class="lv" role="group" aria-label="Nivel de ${n}">${[
      0, 1, 2, 3, 4, 5,
    ]
      .map(
        (v) =>
          `<button data-p="${i}" data-v="${v}" aria-pressed="${
            l === v
          }">N${v}</button>`
      )
      .join('')}</div><p>${now}</p>${nx}</section>`;
  }).join('');

  const { globalLevel: g, diagnosticMessage: msg } = evaluateDirectionSummary(
    maturityLevels,
    masteredIds
  );
  const bars = PL.map(
    ([n], i) =>
      `<div><span>${n}</span><span class="pg" style="--c:#16222E"><i style="width:${
        ((maturityLevels[i] ?? 0) / 5) * 100
      }%"></i></span><span>N${maturityLevels[i] ?? 0}</span></div>`
  ).join('');
  const rm = T.map(([n], i) => `<li>${n}: ${pct(i)}%</li>`).join('');
  const sum = `<div class="row"><p class="big">N${g}</p><span>nivel global<br>(el del pilar más débil)</span></div><p>${msg}</p><h4>Nivel por pilar</h4><div class="bars">${bars}</div><h4>Dominio del rol por ruta</h4><ul>${rm}</ul><h4>Cómo leerlo</h4><p>Un pilar muy débil limita a todo el conjunto. Se recomienda subir un solo nivel a la vez y empezar por el más bajo, antes que seguir mejorando el que ya va bien.</p>`;

  return { tracks, pls, sum };
}

export function loadMasteredFromStorage(key: string = STORAGE_KEY_R): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((x): x is string => typeof x === 'string');
    }
  } catch {
    // Ignore storage read errors
  }
  return [];
}

export function loadMaturityFromStorage(
  key: string = STORAGE_KEY_M
): MaturityTuple {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [0, 0, 0, 0];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 4) {
      return [
        Number(parsed[0] ?? 0),
        Number(parsed[1] ?? 0),
        Number(parsed[2] ?? 0),
        Number(parsed[3] ?? 0),
      ];
    }
  } catch {
    // Ignore storage read errors
  }
  return [0, 0, 0, 0];
}

export function saveLeadStorage(
  masteredIds: readonly string[],
  maturityLevels: MaturityTuple
): void {
  try {
    localStorage.setItem(STORAGE_KEY_R, JSON.stringify(masteredIds));
    localStorage.setItem(STORAGE_KEY_M, JSON.stringify(maturityLevels));
  } catch {
    // Ignore storage write errors
  }
}

export function useGuiaLead() {
  const [masteredIds, setMasteredIds] = useState<string[]>(() =>
    loadMasteredFromStorage()
  );
  const [maturityLevels, setMaturityLevels] = useState<MaturityTuple>(() =>
    loadMaturityFromStorage()
  );
  const [statusMessage, setStatusMessage] = useState<string>('');

  const toggleCompetency = useCallback(
    (nodeId: string) => {
      setMasteredIds((prev) => {
        const next = prev.includes(nodeId)
          ? prev.filter((x) => x !== nodeId)
          : [...prev, nodeId];
        saveLeadStorage(next, maturityLevels);
        return next;
      });
    },
    [maturityLevels]
  );

  const selectPillarLevel = useCallback(
    (pillarIndex: 0 | 1 | 2 | 3, level: number) => {
      setMaturityLevels((prev) => {
        const next: [number, number, number, number] = [
          prev[0],
          prev[1],
          prev[2],
          prev[3],
        ];
        next[pillarIndex] = level;
        saveLeadStorage(masteredIds, next);
        return next;
      });
    },
    [masteredIds]
  );

  const clearMarks = useCallback(() => {
    const emptyR: string[] = [];
    const emptyM: MaturityTuple = [0, 0, 0, 0];
    setMasteredIds(emptyR);
    setMaturityLevels(emptyM);
    saveLeadStorage(emptyR, emptyM);
    setStatusMessage('Marcas borradas.');
  }, []);

  const summaryData = useMemo(
    () => evaluateDirectionSummary(maturityLevels, masteredIds),
    [maturityLevels, masteredIds]
  );

  return {
    masteredIds,
    maturityLevels,
    summaryData,
    statusMessage,
    setStatusMessage,
    toggleCompetency,
    selectPillarLevel,
    clearMarks,
  };
}
