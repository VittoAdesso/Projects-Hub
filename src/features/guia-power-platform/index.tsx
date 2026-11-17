import { ScrollToTop } from '@/shared/components/ScrollToTop'
import { ToolShell } from '@/shared/components/ToolShell'
import { GuiaPowerPlatformView } from './views/GuiaPowerPlatformView'

export default function GuiaPowerPlatformTool() {
  return (
    <ToolShell
      toolId="guia-power-platform"
      title="Guía Maestra: Arquitectura Power Platform"
      description="Consulta rápida para decidir, advertir y delegar en Power Platform: piezas y límites, simulador de decisiones, prompts, configuraciones, ruta de estudio y listas de control."
      category="Arquitectura & Código Limpio"
      hidePageHeader
    >
      <GuiaPowerPlatformView />
      <ScrollToTop />
    </ToolShell>
  )
}
