import React from 'react';
import { UI } from '../data/uiStrings';
import { CopyButton } from '@/shared/components/CopyButton';
import type { Lang } from '../types';

export interface CombinedReportBarProps {
  lang: Lang;
  selectedCount: number;
  combinedPrompt: string;
}

export const CombinedReportBar: React.FC<CombinedReportBarProps> = ({
  lang,
  selectedCount,
  combinedPrompt,
}) => {
  const u = UI[lang];

  return (
    <div
      className="sticky bottom-0 z-10 border-t-2 border-foreground/80 bg-surface/95 backdrop-blur-md py-4 px-4 sm:px-6 shadow-lg -mx-4 sm:-mx-6 transition-colors"
      data-testid="combined-report-bar"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-accent text-accent-foreground font-mono font-bold text-base shadow-sm">
            {selectedCount}
          </div>
          <div>
            <div className="font-sans text-xs font-semibold text-foreground">
              <span>{u.comboPre}</span>
            </div>
            <p className="font-serif text-xs text-muted-foreground hidden sm:block">
              {u.comboSpan}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <CopyButton
            text={combinedPrompt}
            label={u.comboBtn}
            disabled={selectedCount === 0}
            variant="accent"
            size="lg"
            className="w-full sm:w-auto font-semibold gap-2 shadow-sm text-sm"
          />
        </div>
      </div>
    </div>
  );
};
