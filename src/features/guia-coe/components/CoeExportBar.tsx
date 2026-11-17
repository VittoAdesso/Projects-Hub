import React from 'react';
import { NAV_ANCHORS } from '../data/coeData';

export interface CoeExportBarProps {
  statusMessage: string;
  onDownloadImage: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
}

export const CoeExportBar: React.FC<CoeExportBarProps> = ({
  statusMessage,
  onDownloadImage,
  onDownloadPdf,
  onPrint,
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
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--coe-ink,#16222E)] bg-[var(--coe-ink,#16222E)] text-[var(--coe-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coe-bl,#2563A8)]"
        >
          Descargar imagen
        </button>
        <button
          id="bp"
          type="button"
          onClick={onDownloadPdf}
          className="min-h-[44px] px-3.5 rounded-lg border border-[var(--coe-ink,#16222E)] bg-[var(--coe-ink,#16222E)] text-[var(--coe-sf,#ffffff)] font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coe-bl,#2563A8)]"
        >
          Descargar PDF
        </button>
        <button
          id="bx"
          type="button"
          onClick={onPrint}
          className="g min-h-[44px] px-3.5 rounded-lg border border-[var(--coe-ink,#16222E)] bg-[var(--coe-sf,#ffffff)] text-[var(--coe-ink,#16222E)] font-medium text-sm cursor-pointer hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coe-bl,#2563A8)]"
        >
          Imprimir
        </button>
      </div>

      <div
        id="msg"
        role="status"
        data-html2canvas-ignore="true"
        className="text-[13px] text-[var(--coe-mut,#52616F)] min-h-[20px]"
      >
        {statusMessage}
      </div>

      <nav
        className="nav flex flex-wrap gap-2"
        aria-label="Secciones de la guía"
        data-html2canvas-ignore="true"
      >
        {NAV_ANCHORS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex items-center min-h-[44px] px-3 rounded-lg border border-[var(--coe-ln,#D7DEE5)] bg-[var(--coe-sf,#ffffff)] text-[var(--coe-ink,#16222E)] text-[13.5px] font-medium no-underline hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coe-bl,#2563A8)]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
