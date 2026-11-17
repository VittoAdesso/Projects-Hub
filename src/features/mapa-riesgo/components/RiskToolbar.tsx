import React from 'react';

export interface RiskToolbarProps {
  statusMessage: string;
  onDownloadImage: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onClearAll: () => void;
}

export const RiskToolbar: React.FC<RiskToolbarProps> = ({
  statusMessage,
  onDownloadImage,
  onDownloadPdf,
  onPrint,
  onClearAll,
}) => {
  return (
    <div className="space-y-2 print:hidden">
      <div
        className="bar flex flex-wrap gap-2"
        data-html2canvas-ignore="true"
      >
        <button
          id="bi"
          type="button"
          onClick={onDownloadImage}
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--mr-ink,#16222E)] bg-[var(--mr-ink,#16222E)] text-[var(--mr-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
        >
          Descargar imagen
        </button>
        <button
          id="bp"
          type="button"
          onClick={onDownloadPdf}
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--mr-ink,#16222E)] bg-[var(--mr-ink,#16222E)] text-[var(--mr-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
        >
          Descargar PDF
        </button>
        <button
          id="bx"
          type="button"
          onClick={onPrint}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--mr-ink,#16222E)] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
        >
          Imprimir
        </button>
        <button
          id="br"
          type="button"
          onClick={onClearAll}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--mr-ink,#16222E)] bg-[var(--mr-sf,#ffffff)] text-[var(--mr-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mr-bl,#2563A8)]"
        >
          Borrar todo
        </button>
      </div>

      <div
        id="msg"
        role="status"
        data-html2canvas-ignore="true"
        className="text-[13px] text-[var(--mr-mut,#52616F)] min-h-[20px]"
      >
        {statusMessage}
      </div>
    </div>
  );
};
