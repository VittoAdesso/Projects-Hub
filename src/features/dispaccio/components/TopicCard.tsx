import React from 'react';
import { Check, Edit2, RotateCcw } from 'lucide-react';
import { EMO, KIND } from '../data/constants';
import { PREV, UI } from '../data/uiStrings';
import { TR } from '../data/translations';
import { CopyButton } from '@/shared/components/CopyButton';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import type { Lang, TopicId } from '../types';

export interface TopicCardProps {
  id: TopicId;
  lang: Lang;
  isSelected: boolean;
  onToggleSelect: () => void;
  isPreviewOpen: boolean;
  onTogglePreview: () => void;
  isEditorOpen: boolean;
  onToggleEditor: () => void;
  promptEsteso: string;
  promptRapido: string;
  editorValue: string;
  onEditorChange: (value: string) => void;
  onResetEditor: () => void;
  isDirty: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  id,
  lang,
  isSelected,
  onToggleSelect,
  isPreviewOpen,
  onTogglePreview,
  isEditorOpen,
  onToggleEditor,
  promptEsteso,
  promptRapido,
  editorValue,
  onEditorChange,
  onResetEditor,
  isDirty,
}) => {
  const u = UI[lang];
  const [title, desc] = TR[lang][id];
  const emoji = EMO[id];
  const isCopilotFamily = Boolean(KIND[id]);

  return (
    <article
      className={cn(
        'group relative flex flex-col justify-between rounded-[var(--radius)] border border-surface-border bg-surface p-4 shadow-sm transition-all duration-200 hover:shadow-md',
        isSelected && 'border-accent bg-accent-soft/40 ring-1 ring-accent',
        isCopilotFamily && 'border-l-4 border-l-accent'
      )}
      data-testid={`topic-card-${id}`}
    >
      {/* Botón selector de casilla superior derecha */}
      <button
        type="button"
        role="checkbox"
        aria-checked={isSelected}
        aria-label={`Seleccionar ${title}`}
        onClick={onToggleSelect}
        className={cn(
          'absolute top-3.5 right-3.5 flex h-5 w-5 items-center justify-center rounded border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isSelected
            ? 'border-accent bg-accent text-accent-foreground'
            : 'border-surface-border bg-background hover:border-accent/60'
        )}
      >
        {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
      </button>

      {/* Encabezado del tema */}
      <div className="space-y-2 pr-7">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none select-none" aria-hidden="true">
            {emoji}
          </span>
          <h3 className="font-sans text-sm font-bold tracking-tight text-foreground">
            {title}
          </h3>
        </div>
        <p className="font-serif text-xs leading-relaxed text-muted-foreground min-h-[38px]">
          {desc}
        </p>
      </div>

      {/* Botones de acción principales */}
      <div className="mt-4 space-y-3 pt-3 border-t border-surface-border/70">
        <div className="flex items-center gap-2">
          <CopyButton
            text={promptEsteso}
            label={u.esteso}
            variant="accent"
            size="sm"
            className="flex-1 font-semibold text-xs"
          />
          <CopyButton
            text={promptRapido}
            label={u.rapido}
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          />
          <Button
            type="button"
            variant={isEditorOpen ? 'accent' : 'outline'}
            size="icon"
            onClick={onToggleEditor}
            className="h-8 w-8 shrink-0 text-xs"
            title={u.edit}
            aria-label={u.edit}
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Botón de previsualización rápida */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <button
            type="button"
            onClick={onTogglePreview}
            className="text-muted-foreground hover:text-accent underline underline-offset-2 transition-colors cursor-pointer"
          >
            {PREV[lang][isPreviewOpen ? 1 : 0]}
          </button>
        </div>

        {/* Vista previa desplegable */}
        {isPreviewOpen && (
          <pre className="mt-2 max-h-56 overflow-auto rounded-[var(--radius)] border border-surface-border bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground whitespace-pre-wrap break-words">
            {promptEsteso}
          </pre>
        )}

        {/* Editor de prompt en línea */}
        {isEditorOpen && (
          <div className="mt-2 space-y-2 pt-2 border-t border-surface-border">
            <textarea
              value={editorValue}
              onChange={(e) => onEditorChange(e.target.value)}
              rows={6}
              spellCheck={false}
              className="w-full rounded-[var(--radius)] border border-surface-border bg-background p-2.5 font-mono text-[11px] leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Edita el prompt aquí..."
            />
            <div className="flex items-center justify-between gap-2">
              <CopyButton
                text={editorValue}
                label={u.copiaMod}
                variant="accent"
                size="sm"
                className="text-xs"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onResetEditor}
                disabled={!isDirty}
                className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{u.reset}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
