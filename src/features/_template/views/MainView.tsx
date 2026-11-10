import React, { useState } from 'react';
import { ToolShell } from '@/shared/components/ToolShell';
import { CopyButton } from '@/shared/components/CopyButton';
import { SegmentedControl } from '@/shared/components/SegmentedControl';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { DEFAULT_TOOL_CONFIG } from '../data/sampleData';

/**
 * Vista principal de la plantilla.
 * TODO: Modifica el ID 'template-tool', los textos y el layout según la necesidad de la herramienta.
 */
export const MainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [inputText, setInputText] = useState<string>('');

  const tabs = [
    { value: 'editor' as const, label: 'Editor' },
    { value: 'preview' as const, label: 'Vista previa' },
  ];

  return (
    <ToolShell
      toolId="template-tool" // TODO: Cambia este ID al de tu herramienta para heredar su clase .tool-<id>
      title="Plantilla de Herramienta"
      description="Esta es una plantilla con archivos por rellenar para nuevas herramientas estáticas."
      category="Plantilla"
      actions={
        <CopyButton
          text={inputText}
          label="Copiar contenido"
          disabled={!inputText}
        />
      }
    >
      <div className="flex justify-between items-center">
        <SegmentedControl
          options={tabs}
          value={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === 'editor' ? (
        <Card>
          <CardHeader>
            <CardTitle>Entrada de datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="w-full min-h-[140px] rounded-[var(--radius)] border border-surface-border bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder={DEFAULT_TOOL_CONFIG.placeholderText}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputText('')}
                disabled={!inputText}
              >
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            {inputText ? (
              <pre className="p-4 rounded-[var(--radius)] bg-muted font-mono text-xs overflow-x-auto">
                {inputText}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No hay contenido para previsualizar.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </ToolShell>
  );
};
