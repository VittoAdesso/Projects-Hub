import React, { useRef } from 'react';
import { usePriorizadorRoi } from '../hooks/usePriorizadorRoi';
import { PrioritizerToolbar } from '../components/PrioritizerToolbar';
import { IdeaRowsEditor } from '../components/IdeaRowsEditor';
import { RankingTable } from '../components/RankingTable';
import { ValueEffortChart } from '../components/ValueEffortChart';
import { ExecutiveSummaryBox } from '../components/ExecutiveSummaryBox';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import {
  exportElementAsPdf,
  exportElementAsPng,
} from '@/shared/lib/exportSheet';

export const PriorizadorRoiView: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const {
    state,
    calculation,
    sortedValidRows,
    rankMap,
    statusMessage,
    setStatusMessage,
    updateCostPerHour,
    updateRowField,
    deleteRow,
    addRow,
    clearAll,
  } = usePriorizadorRoi();

  const handleDownloadImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'priorizador-demanda-roi-coe',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handleDownloadPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'priorizador-demanda-roi-coe',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolShell
      toolId="priorizador-roi"
      title="Priorizador de demanda y ROI del CoE"
      category="Gobernanza & Operaciones"
      description="Mete las ideas que llegan al CoE y obtén un ranking, una matriz de valor frente a esfuerzo y un resumen para dirección con los números que tú estimes."
      hidePageHeader
      className="pb-16"
    >
      <div
        id="sheet"
        ref={sheetRef}
        className="max-w-[1040px] mx-auto w-full bg-[var(--pr-bg,#F4F6F8)] text-[var(--pr-ink,#16222E)] text-[15px] leading-[1.55]"
      >
        {/* Hero */}
        <div className="hero bg-[var(--pr-hero-bg,#16222E)] text-[var(--pr-hero-fg,#ffffff)] rounded-xl p-5 sm:p-[22px] mb-4">
          <h1 className="font-[var(--font-schibsted)] font-bold text-[clamp(26px,5vw,38px)] leading-[1.1] tracking-[-0.02em] mb-2">
            Priorizador de demanda y ROI del CoE
          </h1>
          <p className="m-0 text-[var(--pr-hero-sub,#D5DEE7)] max-w-[64ch]">
            Mete las ideas que llegan al CoE y obtén un ranking, una matriz de valor frente a esfuerzo y un resumen para dirección con los números que tú estimes.
          </p>
        </div>

        {/* Barra de acciones */}
        <PrioritizerToolbar
          statusMessage={statusMessage}
          onDownloadImage={handleDownloadImage}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
          onClearAll={clearAll}
        />

        {/* 1 · Las ideas */}
        <h2 className="font-[var(--pr-schibsted)] font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--pr-ink,#16222E)]">
          1 · Las ideas
        </h2>
        <p className="sub text-[var(--pr-mut,#52616F)] mb-3 max-w-[68ch]">
          Los tres primeros son ejemplos inventados para ver cómo funciona: edítalos o bórralos. Todo se guarda en este navegador.
        </p>
        <IdeaRowsEditor
          costPerHour={state.ch}
          rows={state.rows}
          onUpdateCostPerHour={updateCostPerHour}
          onUpdateRowField={updateRowField}
          onDeleteRow={deleteRow}
          onAddRow={addRow}
        />

        {/* 2 · Ranking */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--pr-ink,#16222E)]">
          2 · Ranking
        </h2>
        <p className="sub text-[var(--pr-mut,#52616F)] mb-3 max-w-[68ch]">
          Puntuación = horas ahorradas al año ÷ (días de esfuerzo × riesgo). Cuanto más alta, más rentable.
        </p>
        <RankingTable
          sortedValidRows={sortedValidRows}
          costPerHour={calculation.ch}
        />

        {/* 3 · Matriz valor y esfuerzo */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--pr-ink,#16222E)]">
          3 · Matriz valor y esfuerzo
        </h2>
        <p className="sub text-[var(--pr-mut,#52616F)] mb-3 max-w-[68ch]">
          Las líneas marcan la mediana de tus ideas. Cada número corresponde al ranking.
        </p>
        <ValueEffortChart
          validRows={calculation.V}
          medianX={calculation.mX}
          medianY={calculation.mY}
          rankMap={rankMap}
        />

        {/* 4 · Resumen para dirección */}
        <h2 className="font-[var(--font-schibsted)] font-bold text-[22px] leading-[1.2] mt-9 mb-2.5 pt-3.5 border-t-[3px] border-t-[var(--pr-ink,#16222E)]">
          4 · Resumen para dirección
        </h2>
        <ExecutiveSummaryBox
          validRows={calculation.V}
          sortedValidRows={sortedValidRows}
          costPerHour={calculation.ch}
        />

        {/* Footer */}
        <footer className="mt-8 pt-3 border-t border-[var(--pr-ln,#D7DEE5)] text-[12.5px] text-[var(--pr-mut,#52616F)]">
          Todo parte de estimaciones tuyas: las horas ahorradas, los días de esfuerzo y el coste por hora. El resultado es tan fiable como esos datos, así que conviene revisarlos con cada área antes de presentarlos.
        </footer>
      </div>

      <ScrollToTop threshold={250} />
    </ToolShell>
  );
};

export default PriorizadorRoiView;
