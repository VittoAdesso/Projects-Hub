import React from 'react';

export interface LeadToolbarAndNavProps {
  statusMessage: string;
  onDownloadImage: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onClearMarks: () => void;
}

const NAV_LINKS = [
  { id: 'm1', label: '1 · Mapa del rol' },
  { id: 'm2', label: '2 · Madurez del CoE' },
  { id: 'm3', label: '3 · Resumen para dirección' },
] as const;

export const LeadToolbarAndNav: React.FC<LeadToolbarAndNavProps> = ({
  statusMessage,
  onDownloadImage,
  onDownloadPdf,
  onPrint,
  onClearMarks,
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
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--gl-ink,#16222E)] bg-[var(--gl-ink,#16222E)] text-[var(--gl-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]"
        >
          Descargar imagen
        </button>
        <button
          id="bp"
          type="button"
          onClick={onDownloadPdf}
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--gl-ink,#16222E)] bg-[var(--gl-ink,#16222E)] text-[var(--gl-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]"
        >
          Descargar PDF
        </button>
        <button
          id="bx"
          type="button"
          onClick={onPrint}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--gl-ink,#16222E)] bg-[var(--gl-sf,#ffffff)] text-[var(--gl-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]"
        >
          Imprimir
        </button>
        <button
          id="br"
          type="button"
          onClick={onClearMarks}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--gl-ink,#16222E)] bg-[var(--gl-sf,#ffffff)] text-[var(--gl-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]"
        >
          Borrar mis marcas
        </button>
      </div>

      <div
        id="msg"
        role="status"
        data-html2canvas-ignore="true"
        className="text-[13px] text-[var(--gl-mut,#52616F)] min-h-[20px]"
      >
        {statusMessage}
      </div>

      <nav
        className="nav flex flex-wrap gap-2"
        aria-label="Secciones de la guía"
        data-html2canvas-ignore="true"
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex items-center min-h-[44px] px-3.5 rounded-lg border border-[var(--gl-ln,#D7DEE5)] bg-[var(--gl-sf,#ffffff)] text-[var(--gl-ink,#16222E)] text-sm font-medium no-underline hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gl-t0,#2563A8)]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
