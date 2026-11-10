import React from 'react';
import { VER } from '../data/constants';
import { UI } from '../data/uiStrings';
import { SegmentedControl, type SegmentOption } from '@/shared/components/SegmentedControl';
import type { Lang } from '../types';

export interface DispaccioHeaderProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export const DispaccioHeader: React.FC<DispaccioHeaderProps> = ({
  lang,
  onLangChange,
}) => {
  const u = UI[lang];

  const formattedDate = new Intl.DateTimeFormat(
    lang === 'it' ? 'it-IT' : lang === 'en' ? 'en-GB' : 'es-ES',
    { day: '2-digit', month: 'short', year: 'numeric' }
  )
    .format(new Date())
    .replace('.', '');

  const langOptions: readonly SegmentOption<Lang>[] = [
    { value: 'it', label: 'IT' },
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' },
  ];

  return (
    <header className="border-b-2 border-foreground/80 pb-8 pt-4">
      {/* Línea editorial superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span>
          {u.ed} &middot; {VER} &middot; {formattedDate}
        </span>
        <div className="flex items-center gap-2">
          <SegmentedControl
            options={langOptions}
            value={lang}
            onChange={onLangChange}
            ariaLabel="Seleccionar idioma"
          />
        </div>
      </div>

      {/* Titular periodístico principal */}
      <div className="mt-6 space-y-2">
        <h1 className="font-serif text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          DISPAC<span className="text-accent">CIO</span>
        </h1>
        <p className="font-serif text-lg italic text-accent sm:text-xl">
          {u.motto}
        </p>
        <p className="max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
          {u.lede}
        </p>
      </div>

      {/* Etiquetas editoriales */}
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] tracking-wide text-muted-foreground">
        <span className="rounded-[var(--radius)] border border-surface-border bg-surface px-2.5 py-1">
          {u.tagFree}
        </span>
        <span className="rounded-[var(--radius)] border border-surface-border bg-surface px-2.5 py-1">
          {u.tagSyn}
        </span>
      </div>
    </header>
  );
};
