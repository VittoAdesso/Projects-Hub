import { ScrollToTop } from '@/shared/components/ScrollToTop'
import { ToolShell } from '@/shared/components/ToolShell'
import { GobiernoAgentesView } from './views/GobiernoAgentesView'

export default function GobiernoAgentesTool() {
  return (
    <ToolShell
      toolId="gobierno-agentes"
      title="Centro de Gobierno de Agentes de IA"
      description="Inventario de agentes, clasificación de riesgo, controles obligatorios según el nivel, evaluación antes de publicar y panel del comité."
      category="Gobernanza & Operaciones"
      hidePageHeader
    >
      <GobiernoAgentesView />
      <ScrollToTop />
    </ToolShell>
  )
}
