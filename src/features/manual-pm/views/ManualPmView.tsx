import React from 'react';
import { useManualPm } from '../hooks/useManualPm';
import { ManualHeader } from '../components/ManualHeader';
import { ManualNav } from '../components/ManualNav';
import { InicioView } from './InicioView';
import { RutinaView } from './RutinaView';
import { ProcedimientoView } from './ProcedimientoView';
import { DecisionView } from './DecisionView';
import { ReunionesView } from './ReunionesView';
import { IncidenciasView } from './IncidenciasView';
import { CorreosView } from './CorreosView';
import { EstabilizacionView } from './EstabilizacionView';
import { ToolShell } from '@/shared/components/ToolShell';
import { ScrollToTop } from '@/shared/components/ScrollToTop';

export const ManualPmView: React.FC = () => {
  const {
    activeSection,
    goToSection,
    activeArea,
    setActiveArea,
    isKitOpen,
    toggleKit,
  } = useManualPm();

  return (
    <ToolShell
      toolId="manual-pm"
      title="Manual PM"
      category="Metodología & Operaciones"
      description="Primero integra, luego evoluciona. Manual operativo del gestor de proyectos."
      hidePageHeader
      className="pb-16"
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 w-full space-y-6">
        {/* Brand Header */}
        <ManualHeader />

        {/* Navigation tabs */}
        <div className="sticky top-14 z-10 bg-[var(--pm-topbar-bg,rgba(250,248,245,0.85))] backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6">
          <ManualNav activeSection={activeSection} onSelectSection={goToSection} />
        </div>

        {/* Active Section Content */}
        <main id="manual-content" className="pt-2">
          {activeSection === 'inicio' && (
            <InicioView
              onNavigate={goToSection}
              isKitOpen={isKitOpen}
              onToggleKit={toggleKit}
            />
          )}
          {activeSection === 'rut' && <RutinaView />}
          {activeSection === 'proc' && <ProcedimientoView onNavigate={goToSection} />}
          {activeSection === 'dec' && <DecisionView onNavigate={goToSection} />}
          {activeSection === 'reu' && <ReunionesView />}
          {activeSection === 'inc' && <IncidenciasView />}
          {activeSection === 'cor' && <CorreosView />}
          {activeSection === 'est' && (
            <EstabilizacionView
              activeArea={activeArea}
              onAreaChange={setActiveArea}
            />
          )}
        </main>
      </div>

      {/* Floating Scroll to Top button */}
      <ScrollToTop threshold={200} />
    </ToolShell>
  );
};

export default ManualPmView;
