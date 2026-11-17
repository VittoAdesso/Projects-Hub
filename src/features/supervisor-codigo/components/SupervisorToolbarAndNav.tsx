import React from 'react';

export interface SupervisorToolbarAndNavProps {
  statusMessage: string;
  onDownloadImage: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onClearAnswers: () => void;
}

const NAV_LINKS = [
  { id: 'a', label: '1 · Auditoría' },
  { id: 'r', label: '2 · Resultado' },
  { id: 'c', label: '3 · Conceptos básicos' },
  { id: 'f', label: '4 · Referencia rápida' },
] as const;

export const SupervisorToolbarAndNav: React.FC<
  SupervisorToolbarAndNavProps
> = ({
  statusMessage,
  onDownloadImage,
  onDownloadPdf,
  onPrint,
  onClearAnswers,
}) => {
  return (
    <div className="space-y-2.5 print:hidden">
      <div
        className="bar flex flex-wrap gap-2"
        data-html2canvas-ignore="true"
      >
        <button
          id="bi"
          type="button"
          onClick={onDownloadImage}
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--sc-ink,#16222E)] bg-[var(--sc-ink,#16222E)] text-[var(--sc-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]"
        >
          Descargar imagen
        </button>
        <button
          id="bp"
          type="button"
          onClick={onDownloadPdf}
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--sc-ink,#16222E)] bg-[var(--sc-ink,#16222E)] text-[var(--sc-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]"
        >
          Descargar PDF
        </button>
        <button
          id="bx"
          type="button"
          onClick={onPrint}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--sc-ink,#16222E)] bg-[var(--sc-sf,#ffffff)] text-[var(--sc-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]"
        >
          Imprimir
        </button>
        <button
          id="br"
          type="button"
          onClick={onClearAnswers}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--sc-ink,#16222E)] bg-[var(--sc-sf,#ffffff)] text-[var(--sc-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]"
        >
          Borrar respuestas
        </button>
      </div>

      <div
        id="msg"
        role="status"
        data-html2canvas-ignore="true"
        className="text-[13px] text-[var(--sc-mut,#52616F)] min-h-[20px]"
      >
        {statusMessage}
      </div>

      <nav
        className="nav flex flex-wrap gap-2"
        aria-label="Secciones del supervisor"
        data-html2canvas-ignore="true"
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex items-center min-h-[44px] px-3 rounded-lg border border-[var(--sc-ln,#D7DEE5)] bg-[var(--sc-sf,#ffffff)] text-[var(--sc-ink,#16222E)] text-[13.5px] font-medium no-underline hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sc-bl,#2563A8)]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
