import { ScrollToTop } from '@/shared/components/ScrollToTop'
import { ToolShell } from '@/shared/components/ToolShell'
import { ChuletaStackView } from './views/ChuletaStackView'

export default function ChuletaStackTool() {
  return (
    <ToolShell
      toolId="chuleta-stack"
      title="Mi Stack Tecnológico: Chuleta"
      description="Guía interactiva de Power Platform, RPA y desarrollo full-stack con buscador instantáneo, selector de decisiones, flujos y glosario."
      category="Arquitectura & Código Limpio"
      hidePageHeader
    >
      <ChuletaStackView />
      <ScrollToTop />
    </ToolShell>
  )
}
