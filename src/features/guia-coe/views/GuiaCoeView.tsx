import React, { useRef } from 'react';
import { CO, ER, LD, MO, TP } from '../data/coeData';
import { useGuiaCoe } from '../hooks/useGuiaCoe';
import { CoeExportBar } from '../components/CoeExportBar';
import { ColoredBorderCard } from '../components/ColoredBorderCard';
import { CoeAdvisorSection } from '../components/CoeAdvisorSection';
import { CoePhasesSection } from '../components/CoePhasesSection';
import { CoeIntegratedDiagram } from '../components/CoeIntegratedDiagram';
import { CoeRaciTable } from '../components/CoeRaciTable';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';
import {
  exportElementAsPdf,
  exportElementAsPng,
} from '@/shared/lib/exportSheet';

export const GuiaCoeView: React.FC = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const {
    answers,
    selectAnswer,
    evaluation,
    activePhase,
    setActivePhase,
    statusMessage,
    setStatusMessage,
  } = useGuiaCoe();

  const handleDownloadImage = () => {
    void exportElementAsPng({
      element: sheetRef.current,
      filenameBase: 'guia-coe-integrado-varias-areas',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handleDownloadPdf = () => {
    void exportElementAsPdf({
      element: sheetRef.current,
      filenameBase: 'guia-coe-integrado-varias-areas',
      backgroundColor: '#F4F6F8',
      onStatusChange: setStatusMessage,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolShell
      toolId="guia-coe"
      title="Guía del CoE integrado para varias áreas"
      category="Gobernanza & Operaciones"
      description="Conceptos base, modelos posibles, asistente de recomendación por departamento, método fase a fase, matriz RACI, niveles de madurez y consejos."
      hidePageHeader
      className="pb-16"
    >
      <div
        id="sheet"
        ref={sheetRef}
        className="max-w-[1040px] mx-auto w-full bg-[var(--coe-bg,#F4F6F8)] text-[var(--coe-ink,#16222E)] text-[15px] leading-[1.55]"
      >
        {/* Hero */}
        <div className="hero bg-[var(--coe-hero-bg,#16222E)] text-[var(--coe-hero-fg,#ffffff)] rounded-xl p-5 sm:px-[22px] sm:py-[20px] mb-4">
          <h1 className="font-[var(--font-schibsted)] font-bold text-[clamp(27px,5vw,40px)] leading-[1.1] tracking-[-0.02em] mb-2">
            Guía del CoE integrado para varias áreas
          </h1>
          <p className="m-0 text-[var(--coe-hero-sub,#D5DEE7)] max-w-[62ch]">
            Conceptos base, modelos posibles, un asistente para recomendar el modelo a un departamento, el método para ayudarle fase a fase y las herramientas para que funcione: reparto de decisiones, madurez y consejos.
          </p>
        </div>

        {/* Barra de exportación y navegación por anclas */}
        <CoeExportBar
          statusMessage={statusMessage}
          onDownloadImage={handleDownloadImage}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
        />

        {/* 1 · Conceptos base */}
        <h2
          id="c"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          1 · Conceptos base
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          Lo mínimo que hay que tener claro para explicarle un CoE a cualquier departamento.
        </p>
        <div
          id="con"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          {CO.map(([title, desc, purpose, mistake, color], idx) => (
            <ColoredBorderCard
              key={idx}
              as="article"
              title={title}
              colorToken={color}
            >
              <p className="m-0">{desc}</p>
              <p className="m-0">
                <b className="text-[var(--coe-ink,#16222E)] font-semibold">
                  Para qué:
                </b>{' '}
                {purpose}
              </p>
              <p className="m-0">
                <b className="text-[var(--coe-ink,#16222E)] font-semibold">
                  Error típico:
                </b>{' '}
                {mistake}
              </p>
            </ColoredBorderCard>
          ))}
        </div>

        {/* 2 · Tipos de CoE */}
        <h2
          id="m"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          2 · Tipos de CoE
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          Son modelos habituales en el sector; los nombres cambian según el autor. Lo importante es elegir según el tamaño real del equipo.
        </p>
        <div
          id="mod"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          {MO.map(([title, desc, when, advantages, risks, color], idx) => (
            <ColoredBorderCard
              key={idx}
              as="article"
              title={title}
              colorToken={color}
            >
              <p className="m-0">{desc}</p>
              <p className="m-0">
                <b className="text-[var(--coe-ink,#16222E)] font-semibold">
                  Cuándo:
                </b>{' '}
                {when}
              </p>
              <p className="m-0">
                <b className="text-[var(--coe-ink,#16222E)] font-semibold">
                  Ventajas:
                </b>{' '}
                {advantages}
              </p>
              <p className="m-0">
                <b className="text-[var(--coe-ink,#16222E)] font-semibold">
                  Riesgos:
                </b>{' '}
                {risks}
              </p>
            </ColoredBorderCard>
          ))}
        </div>

        {/* 3 · Asistente: qué modelo recomendarle */}
        <h2
          id="a"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          3 · Asistente: qué modelo recomendarle
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          Responde con la situación del departamento que te lo pide.
        </p>
        <CoeAdvisorSection
          answers={answers}
          evaluation={evaluation}
          onSelectAnswer={selectAnswer}
        />

        {/* 4 · Cómo ayudarles, fase a fase */}
        <h2
          id="f"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          4 · Cómo ayudarles, fase a fase
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          Siempre en orden y sin saltar fases: no se pasa a la siguiente hasta cerrar la anterior.
        </p>
        <CoePhasesSection
          activePhase={activePhase}
          onSelectPhase={setActivePhase}
        />

        {/* 5 · Un CoE integrado para 4 áreas */}
        <h2
          id="i"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          5 · Un CoE integrado para 4 áreas
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          En el modelo híbrido, el núcleo define lo común y cada área decide lo suyo.
        </p>
        <CoeIntegratedDiagram />

        {/* 6 · Quién decide qué (RACI) */}
        <h2
          id="r"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          6 · Quién decide qué (RACI)
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          Ejemplo para adaptar. R hace el trabajo, A aprueba, C es consultado e I es informado. Cada decisión tiene un solo A.
        </p>
        <CoeRaciTable />

        {/* 7 · Madurez: cómo saber en qué punto estás */}
        <h2
          id="n"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-1.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          7 · Madurez: cómo saber en qué punto estás
        </h2>
        <p className="sub text-[var(--coe-mut,#52616F)] mb-3.5 max-w-[68ch]">
          El nivel global es el del pilar más débil, no la media. Para subir, refuerza primero ese pilar y sube un nivel cada vez.
        </p>
        <div
          id="ld"
          className="lad grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2"
        >
          {LD.map(([code, name, desc], idx) => (
            <div
              key={idx}
              className="bg-[var(--coe-sf,#ffffff)] border border-[var(--coe-ln,#D7DEE5)] rounded-lg py-2.5 px-3 text-[13.5px] text-[var(--coe-mut,#52616F)]"
            >
              <b className="block font-[var(--font-schibsted)] font-bold text-lg text-[var(--coe-ink,#16222E)]">
                {code}
              </b>
              {name}: {desc}
            </div>
          ))}
        </div>

        {/* 8 · Consejos del lead */}
        <h2
          id="t"
          className="font-[var(--font-schibsted)] font-bold text-[23px] leading-[1.2] mt-10 mb-2.5 pt-3.5 border-t-[3px] border-t-[var(--coe-ink,#16222E)]"
        >
          8 · Consejos del lead
        </h2>
        <div className="two grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <ColoredBorderCard
            as="div"
            title="Qué hacer"
            colorToken="--gr"
          >
            <ul
              id="tp"
              className="t list-disc pl-[18px] mt-1.5 mb-0 space-y-1"
            >
              {TP.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </ColoredBorderCard>

          <ColoredBorderCard
            as="div"
            title="Errores típicos al integrar áreas"
            colorToken="--or"
          >
            <ul
              id="er"
              className="t list-disc pl-[18px] mt-1.5 mb-0 space-y-1"
            >
              {ER.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </ColoredBorderCard>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-3 border-t border-[var(--coe-ln,#D7DEE5)] text-[12.5px] text-[var(--coe-mut,#52616F)]">
          Guía conceptual de apoyo: los modelos y niveles son orientativos y deben adaptarse al tamaño real del equipo y de la organización.
        </footer>
      </div>

      <ScrollToTop threshold={250} />
    </ToolShell>
  );
};

export default GuiaCoeView;
