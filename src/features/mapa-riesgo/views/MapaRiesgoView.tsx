import React, { useRef } from 'react';
import { useMapaRiesgo } from '../hooks/useMapaRiesgo';
import { RiskToolbar } from '../components/RiskToolbar';
import { ProcessRowEditor } from '../components/ProcessRowEditor';
import { RiskSummaryAndTable } from '../components/RiskSummaryAndTable';
import { RiskHeatmap } from '../components/RiskHeatmap';
import {
  RiskActionsBox,
  RiskScenarioBox,
} from '../components/RiskScenarioAndActions';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import {
  exportElementAsPdf,
  exportElementAsPng,
} from '@/shared/lib/exportSheet';

export const MapaRiesgoView: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const {
    rows,
    calculatedRows,
    sortedByRisk,
    rankMap,
    prioritizedActions,
    statusMessage,
    setStatusMessage,
    updateRowName,
    updateRowSelect,
    deleteRow,
    addRow,
    clearAllRows,
  } = useMapaRiesgo();

  const handleDownloadImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'mapa-riesgo-continuidad-coe',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handleDownloadPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'mapa-riesgo-continuidad-coe',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolShell
      toolId="mapa-riesgo"
      title="Mapa de riesgo de continuidad del CoE"
      category="Gobernanza & Operaciones"
      description="Descubre qué procesos se pararían si falta la persona que los conoce, cuáles son más frágiles y qué hacer primero para que nada dependa de una sola persona."
      hidePageHeader
      className="pb-16"
    >
      <div
        id="sheet"
        ref={sheetRef}
        className="max-w-[1040px] mx-auto w-full bg-[var(--mr-bg,#F4F6F8)] text-[var(--mr-ink,#16222E)] text-[15px] leading-[1.55]"
      >
        {/* Hero */}
        <div className="hero bg-[var(--mr-hero-bg,#16222E)] text-[var(--mr-hero-fg,#ffffff)] rounded-xl p-5 sm:p-[22px] mb-4">
          <h1 className="font-[var(--font-schibsted)] font-bold text-[clamp(26px,5vw,38px)] leading-[1.1] tracking-[-0.02em] mb-2">
            Mapa de riesgo de continuidad del CoE
          </h1>
          <p className="m-0 text-[var(--mr-hero-sub,#D5DEE7)] max-w-[64ch]">
            Descubre qué procesos se pararían si falta la persona que los conoce, cuáles son más frágiles y qué hacer primero para que nada dependa de una sola persona.
          </p>
        </div>

        {/* Barra de acciones */}
        <RiskToolbar
          statusMessage={statusMessage}
          onDownloadImage={handleDownloadImage}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
          onClearAll={clearAllRows}
        />

        {/* 1 · Tus procesos */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--mr-ink,#16222E)]">
          1 · Tus procesos
        </h2>
        <p className="sub text-[var(--mr-mut,#52616F)] mb-3 max-w-[68ch]">
          Los tres primeros son ejemplos inventados: edítalos o bórralos. Los datos se quedan solo en este navegador.
        </p>
        <ProcessRowEditor
          rows={rows}
          onUpdateName={updateRowName}
          onUpdateSelect={updateRowSelect}
          onDeleteRow={deleteRow}
          onAddRow={addRow}
        />

        {/* 2 · Dónde está el riesgo */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-2.5 pt-3.5 border-t-[3px] border-t-[var(--mr-ink,#16222E)]">
          2 · Dónde está el riesgo
        </h2>
        <RiskSummaryAndTable
          calculatedRows={calculatedRows}
          sortedByRisk={sortedByRisk}
        />
        <RiskHeatmap
          calculatedRows={calculatedRows}
          rankMap={rankMap}
        />

        {/* 3 · Si falta la persona clave */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--mr-ink,#16222E)]">
          3 · Si falta la persona clave
        </h2>
        <p className="sub text-[var(--mr-mut,#52616F)] mb-3 max-w-[68ch]">
          Escenario: la persona que opera los procesos no está disponible durante un tiempo.
        </p>
        <RiskScenarioBox calculatedRows={calculatedRows} />

        {/* 4 · Qué hacer primero */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--mr-ink,#16222E)]">
          4 · Qué hacer primero
        </h2>
        <p className="sub text-[var(--mr-mut,#52616F)] mb-3 max-w-[68ch]">
          Acciones ordenadas por el riesgo del proceso al que afectan.
        </p>
        <RiskActionsBox prioritizedActions={prioritizedActions} />

        {/* Footer */}
        <footer className="mt-8 pt-3 border-t border-[var(--mr-ln,#D7DEE5)] text-[12.5px] text-[var(--mr-mut,#52616F)]">
          La puntuación es una convención sencilla: suma puntos de fragilidad por cada debilidad y los multiplica por la criticidad. Sirve para ordenar prioridades, no para medir riesgo con exactitud, y los datos son una autoevaluación que conviene contrastar.
        </footer>
      </div>

      <ScrollToTop threshold={250} />
    </ToolShell>
  );
};

export default MapaRiesgoView;
