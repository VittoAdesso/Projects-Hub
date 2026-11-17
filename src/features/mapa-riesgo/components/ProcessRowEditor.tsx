import React from 'react';
import { F } from '../data/riskConstants';
import type { ProcessRow, ProcessSelectKey } from '../types';

export interface ProcessRowEditorProps {
  rows: readonly ProcessRow[];
  onUpdateName: (index: number, name: string) => void;
  onUpdateSelect: (index: number, key: ProcessSelectKey, value: number) => void;
  onDeleteRow: (index: number) => void;
  onAddRow: () => void;
}

export const ProcessRowEditor: React.FC<ProcessRowEditorProps> = ({
  rows,
  onUpdateName,
  onUpdateSelect,
  onDeleteRow,
  onAddRow,
}) => {
  return (
    <div>
      <div id="rows" className="space-y-2.5">
        {rows.map((r, i) => (
          <div
            key={i}
            className="row bg-[var(--mr-sf,#ffffff)] border border-[var(--mr-ln,#D7DEE5)] rounded-lg py-3 px-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-end print:break-inside-avoid"
          >
            <div className="w sm:col-span-2">
              <label
                htmlFor={`n${i}`}
                className="block text-[12.5px] text-[var(--mr-mut,#52616F)] mb-1"
              >
                Proceso
              </label>
              <input
                id={`n${i}`}
                type="text"
                data-i={i}
                data-k="n"
                value={r.n}
                onChange={(e) => onUpdateName(i, e.target.value)}
                className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
              />
            </div>

            {F.map(([key, label, options]) => (
              <div key={key}>
                <label
                  htmlFor={`${key}${i}`}
                  className="block text-[12.5px] text-[var(--mr-mut,#52616F)] mb-1"
                >
                  {label}
                </label>
                <select
                  id={`${key}${i}`}
                  data-i={i}
                  data-k={key}
                  value={Number(r[key])}
                  onChange={(e) =>
                    onUpdateSelect(i, key, Number(e.target.value))
                  }
                  className="w-full min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
                >
                  {options.map(([val, text]) => (
                    <option key={val} value={val}>
                      {text}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div
              className="no print:hidden"
              data-html2canvas-ignore="true"
            >
              <button
                type="button"
                data-del={i}
                aria-label={`Borrar el proceso ${i + 1}`}
                onClick={() => onDeleteRow(i)}
                className="min-h-[44px] px-3.5 rounded-lg border border-[var(--mr-ln,#D7DEE5)] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-rd,#B83232)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
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
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--mr-ink,#16222E)] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
        >
          Añadir proceso
        </button>
      </div>
    </div>
  );
};
