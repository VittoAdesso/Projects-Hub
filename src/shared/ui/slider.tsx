import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface SliderTick {
  value: number;
  label: string;
  sublabel?: string;
}

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  ticks?: readonly SliderTick[] | SliderTick[];
  className?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      ticks,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0;

    return (
      <div className={cn('w-full flex flex-col gap-2', className)}>
        <div className="relative flex items-center select-none touch-none py-1">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-surface-border focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 transition-all accent-accent"
            style={{
              background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percentage}%, var(--surface-border) ${percentage}%, var(--surface-border) 100%)`,
            }}
            {...props}
          />
        </div>

        {ticks && ticks.length > 0 && (
          <div className="flex justify-between items-start px-0.5 select-none">
            {ticks.map((tick) => {
              const isSelected = tick.value === value;
              return (
                <button
                  key={tick.value}
                  type="button"
                  onClick={() => onChange(tick.value)}
                  className={cn(
                    'flex flex-col items-center text-xs font-mono transition-colors cursor-pointer py-1 px-1.5 rounded-[var(--radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
                    isSelected
                      ? 'text-accent font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span>{tick.label}</span>
                  {tick.sublabel && (
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground/80 mt-0.5 font-sans">
                      {tick.sublabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
