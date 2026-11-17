export interface ExportSheetOptions {
  element: HTMLElement | null;
  filenameBase: string;
  backgroundColor?: string;
  onStatusChange?: (message: string) => void;
}

export async function exportElementAsPng({
  element,
  filenameBase,
  backgroundColor = '#F4F6F8',
  onStatusChange,
}: ExportSheetOptions): Promise<void> {
  if (!element) return;
  try {
    onStatusChange?.('Generando imagen...');
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default;
    const canvas = await html2canvas(element, {
      scale: 1.5,
      backgroundColor,
      useCORS: true,
    });

    await new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Blob empty'));
          return;
        }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${filenameBase}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        onStatusChange?.('Imagen descargada.');
        resolve();
      });
    });
  } catch {
    onStatusChange?.(
      'No se pudo generar la imagen. Comprueba la conexión o usa Imprimir.'
    );
  }
}

export async function exportElementAsPdf({
  element,
  filenameBase,
  backgroundColor = '#F4F6F8',
  onStatusChange,
}: ExportSheetOptions): Promise<void> {
  if (!element) return;
  try {
    onStatusChange?.('Generando PDF...');
    const [html2canvasModule, jspdfModule] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);
    const html2canvas = html2canvasModule.default;
    const { jsPDF } = jspdfModule;

    const canvas = await html2canvas(element, {
      scale: 1.5,
      backgroundColor,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const renderedHeight = (canvas.height * pageWidth) / canvas.width;

    for (let y = 0; y < renderedHeight; y += pageHeight) {
      if (y > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'JPEG', 0, -y, pageWidth, renderedHeight);
    }

    pdf.save(`${filenameBase}.pdf`);
    onStatusChange?.('PDF descargado.');
  } catch {
    onStatusChange?.(
      'No se pudo generar el PDF. Comprueba la conexión o usa Imprimir.'
    );
  }
}
