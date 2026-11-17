import React from 'react';
import { RISK_OPTIONS } from '../data/prioritizerConstants';
import type { IdeaFieldKey, IdeaRow } from '../types';

export interface IdeaRowsEditorProps {
  costPerHour: string;
  rows: readonly IdeaRow[];
  onUpdateCostPerHour: (value: string) => void;
  onUpdateRowField: (index: number, key: IdeaFieldKey, value: string) => void;
  onDeleteRow: (index: number) => void;
  onAddRow: () => void;
}

export const IdeaRowsEditor: React.FC<IdeaRowsEditorProps> = ({
  costPerHour,
  rows,
  onUpdateCostPerHour,
  onUpdateRowField,
  onDeleteRow,
  onAddRow,
}) => {
  return (
    <div>
      {/* Coste por hora opcional */}
      <div className="g1 flex flex-wrap gap-2.5 items-end mb-3">
        <div className="w-[220px]">
          <label
            htmlFor="ch"
            className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
          >
            Coste por hora (€), opcional
          </label>
          <input
            id="ch"
            type="text"
            inputMode="decimal"
            placeholder="Para calcular el ahorro en euros"
            value={costPerHour}
            onChange={(e) => onUpdateCostPerHour(e.target.value)}
            className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
          />
        </div>
      </div>

      {/* Lista de ideas (#rows) */}
      <div id="rows" className="space-y-2.5">
        {rows.map((r, i) => (
          <div
            key={i}
            className="row bg-[var(--pr-sf,#ffffff)] border border-[var(--pr-ln,#D7DEE5)] rounded-lg py-3 px-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-end print:break-inside-avoid"
          >
            <div className="w sm:col-span-2">
              <label
                htmlFor={`n${i}`}
                className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
              >
                Idea
              </label>
              <input
                id={`n${i}`}
                type="text"
                data-i={i}
                data-k="n"
                value={r.n}
                onChange={(e) => onUpdateRowField(i, 'n', e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              />
            </div>

            <div>
              <label
                htmlFor={`a${i}`}
                className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
              >
                Área
              </label>
              <input
                id={`a${i}`}
                type="text"
                data-i={i}
                data-k="a"
                value={r.a}
                onChange={(e) => onUpdateRowField(i, 'a', e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              />
            </div>

            <div>
              <label
                htmlFor={`h${i}`}
                className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
              >
                Horas ahorradas al mes
              </label>
              <input
                id={`h${i}`}
                type="text"
                inputMode="decimal"
                data-i={i}
                data-k="h"
                value={String(r.h)}
                onChange={(e) => onUpdateRowField(i, 'h', e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              />
            </div>

            <div>
              <label
                htmlFor={`d${i}`}
                className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
              >
                Esfuerzo (días)
              </label>
              <input
                id={`d${i}`}
                type="text"
                inputMode="decimal"
                data-i={i}
                data-k="d"
                value={String(r.d)}
                onChange={(e) => onUpdateRowField(i, 'd', e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              />
            </div>

            <div>
              <label
                htmlFor={`r${i}`}
                className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
              >
                Riesgo
              </label>
              <select
                id={`r${i}`}
                data-i={i}
                data-k="r"
                value={String(r.r)}
                onChange={(e) => onUpdateRowField(i, 'r', e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              >
                {RISK_OPTIONS.map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor={`x${i}`}
                className="block text-[12.5px] text-[var(--pr-mut,#52616F)] mb-1"
              >
                Coste anual extra (€)
              </label>
              <input
                id={`x${i}`}
                type="text"
                inputMode="decimal"
                data-i={i}
                data-k="x"
                value={String(r.x)}
                onChange={(e) => onUpdateRowField(i, 'x', e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              />
            </div>

            <div className="no print:hidden" data-html2canvas-ignore="true">
              <button
                type="button"
                data-del={i}
                aria-label={`Borrar la idea ${i + 1}`}
                onClick={() => onDeleteRow(i)}
                className="min-h-[44px] px-3.5 rounded-lg border border-[var(--pr-ln,#D7DEE5)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-rd,#B83232)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bar no mt-2.5 print:hidden"
        data-html2canvas-ignore="true"
      >
        <button
          id="ad"
          type="button"
          onClick={onAddRow}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--pr-ink,#16222E)] bg-[var(--pr-sf,#ffffff)] text-[var(--pr-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pr-bl,#2563A8)]"
        >
          Añadir idea
        </button>
      </div>
    </div>
  );
};
