import React from 'react';
import { GROUPS } from '../data/constants';
import { UI } from '../data/uiStrings';
import { useDispaccio } from '../hooks/useDispaccio';
import { DispaccioHeader } from '../components/DispaccioHeader';
import { TimeWindowControl } from '../components/TimeWindowControl';
import { TopicCard } from '../components/TopicCard';
import { CombinedReportBar } from '../components/CombinedReportBar';
import { DispaccioFooter } from '../components/DispaccioFooter';
import { ToolShell } from '@/shared/components/ToolShell';

export const DispaccioView: React.FC = () => {
  const {
    lang,
    setLang,
    windowIdx,
    setWindowIdx,
    horizonIdx,
    setHorizonIdx,
    selectedTopics,
    toggleTopic,
    previewsOpen,
    togglePreview,
    editorsOpen,
    toggleEditor,
    getTopicPrompt,
    getEditorValue,
    updateCustomEdit,
    resetCustomEdit,
    combinedPrompt,
    isDirty,
  } = useDispaccio();

  const u = UI[lang];

  return (
    <ToolShell
      toolId="dispaccio"
      title="Dispaccio"
      category="Bollettino AI"
      description={u.lede}
      hidePageHeader
      className="space-y-10 pb-0"
    >
      {/* Cabecera periodística auténtica de Dispaccio */}
      <DispaccioHeader lang={lang} onLangChange={setLang} />

      {/* Controles de ventana temporal y horizonte de síntesis */}
      <TimeWindowControl
        lang={lang}
        windowIdx={windowIdx}
        onWindowChange={setWindowIdx}
        horizonIdx={horizonIdx}
        onHorizonChange={setHorizonIdx}
      />

      {/* Departamentos con sus temas correspondientes */}
      <div className="space-y-10">
        {GROUPS.map((group, groupIndex) => {
          const deptNumber = String(groupIndex + 1).padStart(2, '0');
          const deptName = u.depts[groupIndex] ?? '';

          return (
            <section
              key={group.grid}
              className="space-y-4"
              data-testid={`department-section-${group.grid}`}
            >
              {/* Rótulo de departamento */}
              <div className="flex items-baseline gap-3 border-b-2 border-foreground pb-2">
                <span className="font-mono text-base font-bold text-accent">
                  {deptNumber}
                </span>
                <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-foreground">
                  {deptName}
                </h2>
              </div>

              {/* Cuadrícula de tarjetas de tema */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.ids.map((topicId) => (
                  <TopicCard
                    key={topicId}
                    id={topicId}
                    lang={lang}
                    isSelected={selectedTopics.has(topicId)}
                    onToggleSelect={() => toggleTopic(topicId)}
                    isPreviewOpen={previewsOpen.has(topicId)}
                    onTogglePreview={() => togglePreview(topicId)}
                    isEditorOpen={editorsOpen.has(topicId)}
                    onToggleEditor={() => toggleEditor(topicId)}
                    promptEsteso={getTopicPrompt(topicId, false)}
                    promptRapido={getTopicPrompt(topicId, true)}
                    editorValue={getEditorValue(topicId)}
                    onEditorChange={(val) => updateCustomEdit(topicId, val)}
                    onResetEditor={() => resetCustomEdit(topicId)}
                    isDirty={isDirty(topicId)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Barra fija inferior de informe combinado */}
      <CombinedReportBar
        lang={lang}
        selectedCount={selectedTopics.size}
        combinedPrompt={combinedPrompt}
      />

      {/* Pie de página editorial */}
      <DispaccioFooter lang={lang} />
    </ToolShell>
  );
};
