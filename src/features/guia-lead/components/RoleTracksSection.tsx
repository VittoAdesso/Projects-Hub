import React from 'react';
import { LB, T, TRACK_PROGRESS_WIDTH } from '../data/leadData';
import {
  calcTrackMasteredCount,
  calcTrackPercentage,
} from '../hooks/useGuiaLead';
import { cn } from '@/shared/lib/utils';

export interface RoleTracksSectionProps {
  masteredIds: readonly string[];
  onToggleCompetency: (nodeId: string) => void;
}

const TRACK_STYLES = [
  {
    borderTop: 'border-t-[var(--gl-t0,#2563A8)]',
    titleText: 'text-[var(--gl-t0,#2563A8)]',
    barFill: 'bg-[var(--gl-t0,#2563A8)]',
    btnPressedBorder: 'border-[var(--gl-t0,#2563A8)]',
    dotBorder: 'border-[var(--gl-t0,#2563A8)]',
    dotFill: 'bg-[var(--gl-t0,#2563A8)]',
  },
  {
    borderTop: 'border-t-[var(--gl-t1,#C2561C)]',
    titleText: 'text-[var(--gl-t1,#C2561C)]',
    barFill: 'bg-[var(--gl-t1,#C2561C)]',
    btnPressedBorder: 'border-[var(--gl-t1,#C2561C)]',
    dotBorder: 'border-[var(--gl-t1,#C2561C)]',
    dotFill: 'bg-[var(--gl-t1,#C2561C)]',
  },
  {
    borderTop: 'border-t-[var(--gl-t2,#6A4BB5)]',
    titleText: 'text-[var(--gl-t2,#6A4BB5)]',
    barFill: 'bg-[var(--gl-t2,#6A4BB5)]',
    btnPressedBorder: 'border-[var(--gl-t2,#6A4BB5)]',
    dotBorder: 'border-[var(--gl-t2,#6A4BB5)]',
    dotFill: 'bg-[var(--gl-t2,#6A4BB5)]',
  },
  {
    borderTop: 'border-t-[var(--gl-t3,#2E7D52)]',
    titleText: 'text-[var(--gl-t3,#2E7D52)]',
    barFill: 'bg-[var(--gl-t3,#2E7D52)]',
    btnPressedBorder: 'border-[var(--gl-t3,#2E7D52)]',
    dotBorder: 'border-[var(--gl-t3,#2E7D52)]',
    dotFill: 'bg-[var(--gl-t3,#2E7D52)]',
  },
] as const;

export const RoleTracksSection: React.FC<RoleTracksSectionProps> = ({
  masteredIds,
  onToggleCompetency,
}) => {
  return (
    <div
      id="tracks"
      className="tracks grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {T.map(([name, , subtitle, nodes], trackIdx) => {
        const masteredCount = calcTrackMasteredCount(trackIdx, masteredIds);
        const pct = calcTrackPercentage(trackIdx, masteredIds);
        const widthClass = TRACK_PROGRESS_WIDTH[pct] ?? 'w-0';
        const style = TRACK_STYLES[trackIdx] ?? TRACK_STYLES[0];

        return (
          <section
            key={trackIdx}
            className={cn(
              'trk bg-[var(--gl-sf,#ffffff)] border border-[var(--gl-ln,#D7DEE5)] border-t-[3px] rounded-lg py-3 px-3.5 print:break-inside-avoid',
              style.borderTop
            )}
          >
            <h3
              className={cn(
                'font-[var(--font-schibsted)] font-semibold text-base leading-tight m-0',
                style.titleText
              )}
            >
              {name}
            </h3>
            <p className="mt-0.5 mb-0 text-[13px] text-[var(--gl-mut,#52616F)]">
              {subtitle}
            </p>

            <div className="pg h-1.5 bg-[var(--gl-ln,#D7DEE5)] rounded-full my-2.5 overflow-hidden">
              <i
                className={cn(
                  'block h-full transition-all duration-200',
                  style.barFill,
                  widthClass
                )}
              />
            </div>

            <p className="cnt text-[12.5px] text-[var(--gl-mut,#52616F)] mb-2">
              {masteredCount} de {nodes.length} dominados
            </p>

            <div className="space-y-1.5">
              {nodes.map(([text, levelIdx], nodeIdx) => {
                const nodeId = `${trackIdx}-${nodeIdx}`;
                const isPressed = masteredIds.includes(nodeId);

                return (
                  <button
                    key={nodeId}
                    type="button"
                    data-id={nodeId}
                    aria-pressed={isPressed}
                    onClick={() => onToggleCompetency(nodeId)}
                    className={cn(
                      'n relative block w-full text-left rounded-lg border py-2 pr-2.5 pl-[34px] text-[13px] leading-[1.4] font-normal cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]',
                      isPressed
                        ? cn(
                            'bg-[var(--gl-sf,#ffffff)] text-[var(--gl-ink,#16222E)]',
                            style.btnPressedBorder
                          )
                        : 'bg-[var(--gl-bg,#F4F6F8)] text-[var(--gl-ink,#16222E)] border-[var(--gl-ln,#D7DEE5)] hover:bg-surface-hover'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-2.5 top-[13px] w-[14px] h-[14px] rounded-full border-2 transition-colors',
                        style.dotBorder,
                        isPressed
                          ? style.dotFill
                          : 'bg-[var(--gl-sf,#ffffff)]'
                      )}
                    />
                    {text}
                    <small className="block text-[var(--gl-mut,#52616F)] text-[11.5px] mt-0.5">
                      {LB[levelIdx]}
                    </small>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
