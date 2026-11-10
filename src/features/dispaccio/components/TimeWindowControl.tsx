import React from 'react';
import { DAYS } from '../data/constants';
import { UI } from '../data/uiStrings';
import { win } from '../prompts/formatters';
import { Slider } from '@/shared/ui/slider';
import { SegmentedControl, type SegmentOption } from '@/shared/components/SegmentedControl';
import type { HorizonIndex, Lang, WindowIndex } from '../types';

export interface TimeWindowControlProps {
  lang: Lang;
  windowIdx: WindowIndex;
  onWindowChange: (index: WindowIndex) => void;
  horizonIdx: HorizonIndex;
  onHorizonChange: (index: HorizonIndex) => void;
}

export const TimeWindowControl: React.FC<TimeWindowControlProps> = ({
  lang,
  windowIdx,
  onWindowChange,
  horizonIdx,
  onHorizonChange,
}) => {
  const u = UI[lang];
  const currentDays = DAYS[windowIdx] ?? 3;

  const dialNum = windowIdx === 0 ? '24' : String(currentDays);
  const dialUnit = windowIdx === 0 ? u.ore : u.giorniU;
  const bakeTxt = '\u00ab' + win(currentDays, lang) + '\u00bb';

  const sliderTicks = [
    { value: 0, label: '24h', sublabel: u.oggi },
    { value: 1, label: '3', sublabel: u.giorni },
    { value: 2, label: '7', sublabel: u.giorni },
    { value: 3, label: '14', sublabel: u.giorni },
  ];

  const horizonOptions: readonly SegmentOption<string>[] = [
    { value: '0', label: u.horOpts[0] },
    { value: '1', label: u.horOpts[1] },
    { value: '2', label: u.horOpts[2] },
  ];

  return (
    <section className="rounded-[var(--radius)] border border-surface-border bg-surface p-6 shadow-sm space-y-6">
      {/* Indicador de sección editorial */}
      <div className="flex items-baseline justify-between border-b-2 border-foreground/70 pb-2">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-accent text-lg">&middot;</span>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-foreground">
            {u.fin}
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {u.finNote}
        </span>
      </div>

      {/* Lectura del dial grande */}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-2 font-mono">
          <span className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            {dialNum}
          </span>
          <span className="font-sans text-sm font-medium text-muted-foreground">
            {dialUnit}
          </span>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          <span>{u.nel} </span>
          <b className="font-semibold text-accent">{bakeTxt}</b>
        </div>
      </div>

      {/* Control deslizante de rango */}
      <div className="pt-2">
        <Slider
          value={windowIdx}
          min={0}
          max={3}
          step={1}
          onChange={(val) => onWindowChange(val as WindowIndex)}
          ticks={sliderTicks}
          aria-label="Ventana temporal"
        />
      </div>

      {/* Selector de horizonte de síntesis */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-border pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {u.hor}
        </span>
        <SegmentedControl
          options={horizonOptions}
          value={String(horizonIdx)}
          onChange={(val) => onHorizonChange(Number(val) as HorizonIndex)}
          ariaLabel={u.hor}
        />
      </div>
    </section>
  );
};
