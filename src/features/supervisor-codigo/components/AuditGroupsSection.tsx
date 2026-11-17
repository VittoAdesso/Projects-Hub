import React from 'react';
import { G, OP } from '../data/supervisorData';
import type { AuditAnswersMap, AuditValue } from '../types';
import { cn } from '@/shared/lib/utils';

export interface AuditGroupsSectionProps {
  projectName: string;
  answers: AuditAnswersMap;
  onUpdateProjectName: (name: string) => void;
  onToggleAnswer: (itemKey: string, value: AuditValue) => void;
}

const GROUP_STYLES = [
  {
    borderTop: 'border-t-[var(--sc-g0,#2563A8)]',
    titleText: 'text-[var(--sc-g0,#2563A8)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g1,#2E7D52)]',
    titleText: 'text-[var(--sc-g1,#2E7D52)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g2,#6A4BB5)]',
    titleText: 'text-[var(--sc-g2,#6A4BB5)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g3,#C2561C)]',
    titleText: 'text-[var(--sc-g3,#C2561C)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g4,#B83232)]',
    titleText: 'text-[var(--sc-g4,#B83232)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g5,#0E7490)]',
    titleText: 'text-[var(--sc-g5,#0E7490)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g6,#8A5A00)]',
    titleText: 'text-[var(--sc-g6,#8A5A00)]',
  },
  {
    borderTop: 'border-t-[var(--sc-g7,#3D4C5B)]',
    titleText: 'text-[var(--sc-g7,#3D4C5B)]',
  },
] as const;

const OPTION_PRESSED_BG: Record<AuditValue, string> = {
  c: 'bg-[var(--sc-ok,#2E7D52)] text-white border-transparent',
  p: 'bg-[var(--sc-warn,#B7791F)] text-white border-transparent',
  n: 'bg-[var(--sc-bad,#B83232)] text-white border-transparent',
  x: 'bg-[var(--sc-na,#52616F)] text-white border-transparent',
};

export const AuditGroupsSection: React.FC<AuditGroupsSectionProps> = ({
  projectName,
  answers,
  onUpdateProjectName,
  onToggleAnswer,
}) => {
  return (
    <div>
      <div>
        <label
          htmlFor="pn"
          className="block text-[12.5px] text-[var(--sc-mut,#52616F)] mb-1"
        >
          Proyecto revisado
        </label>
        <input
          id="pn"
          type="text"
          placeholder="Nombre del proyecto"
          value={projectName}
          onChange={(e) => onUpdateProjectName(e.target.value)}
          className="w-full max-w-[420px] min-h-[44px] py-2 px-2.5 rounded-lg border border-[var(--sc-ln,#D7DEE5)] bg-[var(--sc-sf,#ffffff)] text-[var(--sc-ink,#16222E)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]"
        />
      </div>

      <div id="gps" className="mt-3.5 space-y-3">
        {G.map(([groupName, , items], gIdx) => {
          const style = GROUP_STYLES[gIdx] ?? GROUP_STYLES[0];

          return (
            <section
              key={gIdx}
              className={cn(
                'gp bg-[var(--sc-sf,#ffffff)] border border-[var(--sc-ln,#D7DEE5)] border-t-4 rounded-lg py-3 px-3.5 print:break-inside-avoid',
                style.borderTop
              )}
            >
              <h3
                className={cn(
                  'font-[var(--font-schibsted)] font-semibold text-[17px] mb-1.5',
                  style.titleText
                )}
              >
                {groupName}
              </h3>

              <div className="divide-y divide-[var(--sc-ln,#D7DEE5)]">
                {items.map(([itemText], iIdx) => {
                  const itemKey = `${gIdx}-${iIdx}`;
                  const selectedVal = answers[itemKey];

                  return (
                    <div
                      key={itemKey}
                      className="it py-2.5 border-t border-[var(--sc-ln,#D7DEE5)]"
                    >
                      <p className="mt-0 mb-1.5 text-sm text-[var(--sc-ink,#16222E)]">
                        {itemText}
                      </p>
                      <div
                        className="seg flex flex-wrap gap-1.5"
                        role="group"
                        aria-label={itemText}
                        data-k={itemKey}
                      >
                        {OP.map(([val, label]) => {
                          const isPressed = selectedVal === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              data-v={val}
                              aria-pressed={isPressed}
                              onClick={() => onToggleAnswer(itemKey, val)}
                              className={cn(
                                'min-h-[40px] px-3 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]',
                                isPressed
                                  ? OPTION_PRESSED_BG[val]
                                  : 'bg-[var(--sc-sf,#ffffff)] text-[var(--sc-ink,#16222E)] border-[var(--sc-ln,#D7DEE5)] hover:bg-surface-hover'
                              )}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
