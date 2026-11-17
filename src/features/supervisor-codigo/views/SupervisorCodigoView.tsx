import React, { useRef } from 'react';
import { useSupervisorCodigo } from '../hooks/useSupervisorCodigo';
import { SupervisorToolbarAndNav } from '../components/SupervisorToolbarAndNav';
import { AuditGroupsSection } from '../components/AuditGroupsSection';
import { AuditResultsSection } from '../components/AuditResultsSection';
import {
  ConceptsSection,
  QuickReferenceSection,
} from '../components/ReferenceSections';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import {
  exportElementAsPdf,
  exportElementAsPng,
} from '@/shared/lib/exportSheet';

export const SupervisorCodigoView: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const {
    answers,
    projectName,
    evaluation,
    statusMessage,
    setStatusMessage,
    updateProjectName,
    toggleAnswer,
    clearAnswers,
  } = useSupervisorCodigo();

  const handleDownloadImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'supervisor-arquitectura-codigo-limpio',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handleDownloadPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'supervisor-arquitectura-codigo-limpio',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolShell
      toolId="supervisor-codigo"
      title="Supervisor de arquitectura modular y código limpio"
      category="Arquitectura & Código Limpio"
      description="Una revisión guiada para evaluar un proyecto de desarrollo: módulos, componentes, API y paginación, pruebas, seguridad y entrega."
      hidePageHeader
      className="pb-16"
    >
      <div
        id="sheet"
        ref={sheetRef}
        className="max-w-[1040px] mx-auto w-full bg-[var(--sc-bg,#F4F6F8)] text-[var(--sc-ink,#16222E)] text-[15px] leading-[1.55]"
      >
        {/* Hero */}
        <div className="hero bg-[var(--sc-hero-bg,#16222E)] text-[var(--sc-hero-fg,#ffffff)] rounded-xl p-5 sm:p-[22px] mb-4">
          <h1 className="font-[var(--font-schibsted)] font-bold text-[clamp(26px,5vw,38px)] leading-[1.1] tracking-[-0.02em] mb-2">
            Supervisor de arquitectura modular y código limpio
          </h1>
          <p className="m-0 text-[var(--sc-hero-sub,#D5DEE7)] max-w-[66ch]">
            Una revisión guiada para evaluar un proyecto de desarrollo: módulos, componentes, API y paginación, pruebas, seguridad y entrega. Obtienes un semáforo, lo más urgente y las preguntas que hacer al equipo.
          </p>
        </div>

        {/* Barra de acciones y navegación */}
        <SupervisorToolbarAndNav
          statusMessage={statusMessage}
          onDownloadImage={handleDownloadImage}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
          onClearAnswers={clearAnswers}
        />

        {/* 1 · Auditoría del proyecto */}
        <h2
          id="a"
          className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--sc-ink,#16222E)]"
        >
          1 · Auditoría del proyecto
        </h2>
        <p className="sub text-[var(--sc-mut,#52616F)] mb-3 max-w-[68ch]">
          Marca cada punto como Cumple, Parcial, No o No aplica. Lo que dejes sin marcar no cuenta.
        </p>
        <AuditGroupsSection
          projectName={projectName}
          answers={answers}
          onUpdateProjectName={updateProjectName}
          onToggleAnswer={toggleAnswer}
        />

        {/* 2 · Resultado de la revisión */}
        <h2
          id="r"
          className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-2.5 pt-3.5 border-t-[3px] border-t-[var(--sc-ink,#16222E)]"
        >
          2 · Resultado de la revisión
        </h2>
        <AuditResultsSection
          projectName={projectName}
          evaluation={evaluation}
        />

        {/* 3 · Conceptos básicos */}
        <h2
          id="c"
          className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--sc-ink,#16222E)]"
        >
          3 · Conceptos básicos
        </h2>
        <p className="sub text-[var(--sc-mut,#52616F)] mb-3 max-w-[68ch]">
          Lo que hay que tener claro para supervisar con criterio, cada concepto con su señal de alerta.
        </p>
        <ConceptsSection />

        {/* 4 · Referencia rápida */}
        <h2
          id="f"
          className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--sc-ink,#16222E)]"
        >
          4 · Referencia rápida
        </h2>
        <p className="sub text-[var(--sc-mut,#52616F)] mb-3 max-w-[68ch]">
          Lo que conviene revisar en cada fase y criterios orientativos. No son reglas absolutas: se adaptan al tamaño y al tipo de proyecto.
        </p>
        <QuickReferenceSection />

        {/* Footer */}
        <footer className="mt-8 pt-3 border-t border-[var(--sc-ln,#D7DEE5)] text-[12.5px] text-[var(--sc-mut,#52616F)]">
          Las preguntas y los pesos de la auditoría son una propuesta de trabajo, no un estándar. Ajústalos a la realidad del proyecto y del equipo.
        </footer>
      </div>

      <ScrollToTop threshold={250} />
    </ToolShell>
  );
};

export default SupervisorCodigoView;
