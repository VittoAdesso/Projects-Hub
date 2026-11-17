export interface StackToolbarAndLegendProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusMessage: string
  onExportImage: () => void
  onExportPdf: () => void
  onPrint: () => void
}

export function StackToolbarAndLegend({
  searchQuery,
  onSearchChange,
  statusMessage,
  onExportImage,
  onExportPdf,
  onPrint,
}: StackToolbarAndLegendProps) {
  return (
    <>
      <div
        className="bar mb-3.5 flex flex-wrap gap-2 print:hidden"
        data-html2canvas-ignore="true"
      >
        <input
          id="q"
          type="search"
          placeholder="Buscar herramienta o palabra (SAP, API, Excel...)"
          aria-label="Buscar en la chuleta"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="min-h-[44px] flex-1 basis-[200px] rounded-lg border border-border bg-card px-3 py-2.5 font-sans text-[15px] text-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8]"
        />
        <button
          id="bi"
          type="button"
          onClick={onExportImage}
          className="min-h-[44px] cursor-pointer rounded-lg border border-foreground bg-foreground px-3.5 py-2.5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8]"
        >
          Descargar imagen
        </button>
        <button
          id="bp"
          type="button"
          onClick={onExportPdf}
          className="min-h-[44px] cursor-pointer rounded-lg border border-foreground bg-foreground px-3.5 py-2.5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8]"
        >
          Descargar PDF
        </button>
        <button
          id="bx"
          type="button"
          onClick={onPrint}
          className="g min-h-[44px] cursor-pointer rounded-lg border border-foreground bg-card px-3.5 py-2.5 font-sans text-[14px] font-medium text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8]"
        >
          Imprimir
        </button>
      </div>

      <div
        id="msg"
        role="status"
        data-html2canvas-ignore="true"
        className="mb-1.5 min-h-[20px] text-[13px] text-muted-foreground print:hidden"
      >
        {statusMessage}
      </div>

      <div className="leg mb-1.5 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[12.5px] text-muted-foreground">
        <span>
          <b className="ok font-semibold text-[#1F6B3F] dark:text-[#4ade80]">
            Incluida
          </b>
          : viene con M365
        </span>
        <span>
          <b className="mx font-semibold text-[#8A5A00] dark:text-[#fbbf24]">
            Mixta
          </b>
          : estándar o premium según el uso
        </span>
        <span>
          <b className="pr font-semibold text-[#9B2C2C] dark:text-[#f87171]">
            Premium
          </b>
          : licencia extra
        </span>
        <span>
          <b className="ow font-semibold text-[#3D4C5B] dark:text-[#94a3b8]">
            Aparte
          </b>
          : licencia propia
        </span>
      </div>

      <div
        className="nav mb-1.5 flex flex-wrap gap-2"
        data-html2canvas-ignore="true"
      >
        <a
          href="#f1"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-border bg-card px-3.5 text-[14px] font-medium text-foreground no-underline transition-colors hover:bg-muted/60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8]"
        >
          Fase 1 · Power Platform
        </a>
        <a
          href="#f2"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-border bg-card px-3.5 text-[14px] font-medium text-foreground no-underline transition-colors hover:bg-muted/60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2563A8]"
        >
          Fase 2 · Desarrollo
        </a>
      </div>
    </>
  )
}
