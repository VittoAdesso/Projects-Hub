export interface AgentsToolbarAndNavProps {
  statusMessage: string
  onExportImage: () => void
  onExportPdf: () => void
  onPrint: () => void
}

export function AgentsToolbarAndNav({
  statusMessage,
  onExportImage,
  onExportPdf,
  onPrint,
}: AgentsToolbarAndNavProps) {
  return (
    <>
      <div
        className="bar mb-1.5 flex flex-wrap gap-2 print:hidden"
        data-html2canvas-ignore="true"
      >
        <button
          id="bi"
          type="button"
          onClick={onExportImage}
          className="cursor-pointer rounded-md border border-transparent bg-primary px-3.5 py-2 font-sans text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Descargar imagen
        </button>
        <button
          id="bp"
          type="button"
          onClick={onExportPdf}
          className="cursor-pointer rounded-md border border-transparent bg-primary px-3.5 py-2 font-sans text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Descargar PDF
        </button>
        <button
          id="bx"
          type="button"
          onClick={onPrint}
          className="g cursor-pointer rounded-md border border-border bg-card px-3.5 py-2 font-sans text-[13px] font-semibold text-foreground transition-colors hover:bg-muted/60"
        >
          Imprimir
        </button>
      </div>

      <div
        id="msg"
        role="status"
        data-html2canvas-ignore="true"
        className="min-h-[18px] text-[13px] text-muted-foreground print:hidden"
      >
        {statusMessage}
      </div>

      <nav
        className="nav my-2.5 flex flex-wrap gap-1.5 border-y border-border py-2.5 print:hidden"
        data-html2canvas-ignore="true"
      >
        <a
          href="#a"
          className="rounded border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-primary no-underline transition-colors hover:bg-muted/60"
        >
          1 · Principios
        </a>
        <a
          href="#b"
          className="rounded border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-primary no-underline transition-colors hover:bg-muted/60"
        >
          2 · Inventario
        </a>
        <a
          href="#c"
          className="rounded border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-primary no-underline transition-colors hover:bg-muted/60"
        >
          3 · Panel del comité
        </a>
        <a
          href="#d"
          className="rounded border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-primary no-underline transition-colors hover:bg-muted/60"
        >
          4 · Supervisión humana
        </a>
        <a
          href="#e"
          className="rounded border border-border bg-card px-2.5 py-1 text-[13px] font-medium text-primary no-underline transition-colors hover:bg-muted/60"
        >
          5 · Si un agente falla
        </a>
      </nav>
    </>
  )
}
