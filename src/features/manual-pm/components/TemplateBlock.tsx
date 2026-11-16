import React from 'react';
import { CopyButton } from '@/shared/components/CopyButton';
import { Slot } from './Slot';
import { cn } from '@/shared/lib/utils';

export interface TemplateBlockProps {
  id: string;
  label: string;
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export const TemplateBlock: React.FC<TemplateBlockProps> = ({
  id,
  label,
  text,
  className,
  children,
}) => {
  // Render text with slots highlighted if no custom children are provided
  const renderFormattedText = () => {
    if (children) return children;

    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return <Slot key={index}>{part}</Slot>;
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div
      className={cn(
        'tpl bg-[var(--pm-bg-2,#f3efe9)] border border-[var(--pm-border,#e9e2d8)] rounded-[var(--radius-xl,16px)] p-4 mt-3.5',
        className
      )}
      data-template-id={id}
    >
      <div className="tpl-h flex justify-between items-center gap-2.5 mb-2.5">
        <span className="font-mono text-[11.5px] uppercase tracking-wider font-semibold text-[var(--pm-ink-3,#928b82)]">
          {label}
        </span>
        <CopyButton
          text={text}
          label="Copiar"
          copiedLabel="¡Copiado!"
          size="sm"
          variant="outline"
          className="h-7 text-xs font-semibold px-2.5 bg-[var(--pm-surface,#ffffff)] border-[var(--pm-border-2,#ddd4c7)] hover:border-[var(--pm-accent,#4f46e5)] text-[var(--pm-ink-2,#5c5650)] hover:text-[var(--pm-accent,#4f46e5)]"
        />
      </div>
      <div
        id={id}
        className="tpl-body bg-[var(--pm-surface,#ffffff)] border border-[var(--pm-border-2,#ddd4c7)] rounded-[var(--radius-md,10px)] text-[var(--pm-ink,#1a1714)] font-mono text-[13.5px] leading-relaxed p-4 whitespace-pre-wrap break-words"
      >
        {renderFormattedText()}
      </div>
    </div>
  );
};
