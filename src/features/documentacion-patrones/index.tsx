import { ScrollToTop } from '@/shared/components/ScrollToTop'
import { ToolShell } from '@/shared/components/ToolShell'
import { DocumentacionPatronesView } from './views/DocumentacionPatronesView'

export default function DocumentacionPatronesTool() {
  return (
    <ToolShell
      toolId="documentacion-patrones"
      title="Documentación y Patrones de Diseño"
      description="Ruta interactiva sobre cómo documentar soluciones (ADR, README, diagramas) y aplicar patrones de diseño a Power Platform y automatización."
      category="Arquitectura & Código Limpio"
      hidePageHeader
    >
      <DocumentacionPatronesView />
      <ScrollToTop />
    </ToolShell>
  )
}
