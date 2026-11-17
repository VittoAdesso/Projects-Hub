import React from 'react';
import { RACI_HEADERS, RC } from '../data/coeData';
import { getRaciCellClass } from '../hooks/useGuiaCoe';
import { cn } from '@/shared/lib/utils';

export const CoeRaciTable: React.FC = () => {
  return (
    <div className="sc overflow-x-auto rounded-lg border border-[var(--coe-ln,#D7DEE5)]">
      <table
        id="rc"
        className="w-full border-collapse text-[13.5px] bg-[var(--coe-sf,#ffffff)] text-[var(--coe-ink,#16222E)]"
      >
        <thead>
          <tr>
            {RACI_HEADERS.map((header, idx) => (
              <th
                key={idx}
                className={cn(
                  'border border-[var(--coe-ln,#D7DEE5)] bg-[var(--coe-bg,#F4F6F8)] py-2 px-2.5 font-semibold',
                  idx === 0 ? 'text-left' : 'text-center'
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RC.map((row, rIdx) => {
            const [decision, ...cells] = row;
            return (
              <tr key={rIdx}>
                <td className="border border-[var(--coe-ln,#D7DEE5)] py-2 px-2.5 text-left">
                  {decision}
                </td>
                {cells.map((cell, cIdx) => {
                  const cellClass = getRaciCellClass(cell);
                  return (
                    <td
                      key={cIdx}
                      className={cn(
                        'border border-[var(--coe-ln,#D7DEE5)] py-2 px-2.5 text-center',
                        cellClass === 'A' &&
                          'A bg-[var(--coe-raci-a,#E3EEF9)] font-semibold',
                        cellClass === 'R' &&
                          'R bg-[var(--coe-raci-r,#E4F3EA)] font-semibold'
                      )}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
