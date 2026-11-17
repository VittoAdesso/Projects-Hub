import React, { useRef } from 'react';
import { useGuiaLead } from '../hooks/useGuiaLead';
import { LeadToolbarAndNav } from '../components/LeadToolbarAndNav';
import { RoleTracksSection } from '../components/RoleTracksSection';
import { MaturityPillarsSection } from '../components/MaturityPillarsSection';
import { DirectionSummarySection } from '../components/DirectionSummarySection';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import {
  exportElementAsPdf,
  exportElementAsPng,
} from '@/shared/lib/exportSheet';

export const GuiaLeadView: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const {
    masteredIds,
    maturityLevels,
    summaryData,
    statusMessage,
    setStatusMessage,
    toggleCompetency,
    selectPillarLevel,
    clearMarks,
  } = useGuiaLead();

  const handleDownloadImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'guia-lead-ia-automatizacion-desarrollo',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handleDownloadPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'guia-lead-ia-automatizacion-desarrollo',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolShell
      toolId="guia-lead"
      title="Guía del lead de IA, automatización y desarrollo"
      category="Gobernanza & Operaciones"
      description="Un mapa de lo que hay que dominar, una autoevaluación de la madurez del CoE y un resumen listo para presentar a dirección."
      hidePageHeader
      className="pb-16"
    >
      <div
        id="sheet"
        ref={sheetRef}
        className="max-w-[1040px] mx-auto w-full bg-[var(--gl-bg,#F4F6F8)] text-[var(--gl-ink,#16222E)] text-[15px] leading-[1.55]"
      >
        {/* Cabecera */}
        <h1 className="font-[var(--font-schibsted)] font-bold text-[clamp(26px,5vw,38px)] leading-[1.1] tracking-[-0.02em] mb-1.5">
          Guía del lead de IA, automatización y desarrollo
        </h1>
        <p className="sub text-[var(--gl-mut,#52616F)] mb-3.5 max-w-[66ch]">
          Un mapa de lo que hay que dominar, una autoevaluación de la madurez del CoE y un resumen listo para presentar a dirección.
        </p>

        {/* Barra de acciones y navegación */}
        <LeadToolbarAndNav
          statusMessage={statusMessage}
          onDownloadImage={handleDownloadImage}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
          onClearMarks={clearMarks}
        />

        {/* 1 · Mapa del rol */}
        <h2
          id="m1"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--gl-ink,#16222E)]"
        >
          1 · Mapa del rol
        </h2>
        <p className="sub text-[var(--gl-mut,#52616F)] mb-3.5 max-w-[66ch]">
          Cuatro rutas, de lo básico a lo avanzado. Toca cada punto que ya dominas y verás tu avance.
        </p>
        <RoleTracksSection
          masteredIds={masteredIds}
          onToggleCompetency={toggleCompetency}
        />

        {/* 2 · Madurez del CoE */}
        <h2
          id="m2"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--gl-ink,#16222E)]"
        >
          2 · Madurez del CoE
        </h2>
        <p className="sub text-[var(--gl-mut,#52616F)] mb-2 max-w-[66ch]">
          Puntúa cada pilar con honestidad. El nivel global es el del pilar más débil, no la media: para subir, hay que reforzar primero ese pilar.
        </p>
        <p className="leg text-[12.5px] text-[var(--gl-mut,#52616F)] mb-3">
          N0 sin documentar · N1 básico: existe y está escrito · N2 consistente: se aplica de verdad · N3 automatizado en parte · N4 medido: hay indicadores que se revisan · N5 optimizado: se mejora con esos indicadores
        </p>
        <MaturityPillarsSection
          maturityLevels={maturityLevels}
          onSelectPillarLevel={selectPillarLevel}
        />

        {/* 3 · Resumen para dirección */}
        <h2
          id="m3"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--gl-ink,#16222E)]"
        >
          3 · Resumen para dirección
        </h2>
        <p className="sub text-[var(--gl-mut,#52616F)] mb-3.5 max-w-[66ch]">
          Se genera solo con lo que marques arriba. Es una autoevaluación, no una auditoría.
        </p>
        <DirectionSummarySection
          maturityLevels={maturityLevels}
          summaryData={summaryData}
        />

        {/* Footer */}
        <footer className="mt-8 pt-3 border-t border-[var(--gl-ln,#D7DEE5)] text-[12.5px] text-[var(--gl-mut,#52616F)]">
          Los niveles de madurez son orientativos: importa el progreso relativo, de nada a algo escrito y de ahí a algo medido. Las rutas del mapa son una propuesta de trabajo, no una certificación.
        </footer>
      </div>

      <ScrollToTop threshold={250} />
    </ToolShell>
  );
};

export default GuiaLeadView;
