import { DecisionSimulatorSection } from '../components/DecisionSimulatorSection'
import { GuideToolbar } from '../components/GuideToolbar'
import {
  MindsetSection,
  PiecesSection,
} from '../components/MindsetAndPiecesSections'
import {
  ConfigTableSection,
  PromptsSection,
} from '../components/PromptsAndConfigSections'
import {
  ExpandGuideSection,
  GlossarySection,
  MeetingAndDelegationSection,
  MyNotesSection,
  StudyRouteSection,
} from '../components/StudyChecklistGlossaryAndNotesSections'
import { useGuiaPowerPlatform } from '../hooks/useGuiaPowerPlatform'

export function GuiaPowerPlatformView() {
  const {
    activeMode,
    setActiveMode,
    searchQuery,
    setSearchQuery,
    simulatorValues,
    updateSimulatorValue,
    simulatorOutputs,
    checksMap,
    toggleCheck,
    resetProjectChecks,
    notes,
    newNoteInput,
    setNewNoteInput,
    addNote,
    deleteNote,
    copiedPromptLabels,
    copyPrompt,
  } = useGuiaPowerPlatform()

  return (
    <div
      data-mode={activeMode}
      className="text-[16px] leading-[1.6] text-foreground"
    >
      <header className="mx-auto max-w-[900px] px-5 pt-6 pb-2">
        <h1 className="m-0 mb-1 text-[1.8rem] leading-[1.2] font-bold">
          Guía maestra: arquitectura Power Platform
        </h1>
        <p className="m-0 mb-2.5 max-w-[64ch] text-muted-foreground">
          Consulta rápida para decidir, advertir y delegar: piezas y límites,
          simulador, prompts, configuraciones, ruta de estudio y listas de
          control. Funciona sin conexión; tus marcas y notas se guardan en este
          navegador.
        </p>
      </header>

      <GuideToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeMode={activeMode}
        onSelectMode={setActiveMode}
      />

      <div className="mx-auto max-w-[900px] px-5 pt-2 pb-[60px]">
        <MindsetSection searchQuery={searchQuery} activeMode={activeMode} />

        <PiecesSection searchQuery={searchQuery} />

        <DecisionSimulatorSection
          activeMode={activeMode}
          values={simulatorValues}
          outputs={simulatorOutputs}
          onChangeValue={updateSimulatorValue}
        />

        <PromptsSection
          searchQuery={searchQuery}
          activeMode={activeMode}
          copiedPromptLabels={copiedPromptLabels}
          onCopyPrompt={(idx, text) => void copyPrompt(idx, text)}
        />

        <ConfigTableSection searchQuery={searchQuery} activeMode={activeMode} />

        <StudyRouteSection
          searchQuery={searchQuery}
          activeMode={activeMode}
          checksMap={checksMap}
          onToggleCheck={toggleCheck}
        />

        <MeetingAndDelegationSection
          searchQuery={searchQuery}
          checksMap={checksMap}
          onToggleCheck={toggleCheck}
          onResetProjectChecks={resetProjectChecks}
        />

        <GlossarySection searchQuery={searchQuery} activeMode={activeMode} />

        <MyNotesSection
          searchQuery={searchQuery}
          notes={notes}
          newNoteInput={newNoteInput}
          onNewNoteInputChange={setNewNoteInput}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
        />

        <ExpandGuideSection activeMode={activeMode} />
      </div>
    </div>
  )
}
