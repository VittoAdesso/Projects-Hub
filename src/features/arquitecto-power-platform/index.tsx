import { ScrollToTop } from '@/shared/components/ScrollToTop'
import { ToolShell } from '@/shared/components/ToolShell'
import { ArquitectoPowerPlatformView } from './views/ArquitectoPowerPlatformView'

export default function ArquitectoPowerPlatformTool() {
  return (
    <ToolShell
      toolId="arquitecto-power-platform"
      title="Arquitectura de Soluciones en Power Platform"
      description="Ruta guiada interactiva para arquitectos de soluciones en Microsoft Power Platform (PL-600) con seguimiento de progreso y autoevaluación."
      category="Arquitectura & Código Limpio"
      hidePageHeader
    >
      <ArquitectoPowerPlatformView />
      <ScrollToTop />
    </ToolShell>
  )
}
