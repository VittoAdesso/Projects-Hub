import React, { useMemo, useState } from 'react';
import { ToolShell } from '@/shared/components/ToolShell';
import { CopyButton } from '@/shared/components/CopyButton';
import { SegmentedControl, type SegmentOption } from '@/shared/components/SegmentedControl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import type { TextStats, TextTransformation } from '../types';

export const EjemploView: React.FC = () => {
  const [input, setInput] = useState<string>(
    'El diseño editorial no es solo decoración, sino orden y jerarquía del pensamiento.'
  );
  const [transform, setTransform] = useState<TextTransformation>('uppercase');

  const transformOptions: readonly SegmentOption<TextTransformation>[] = [
    { value: 'uppercase', label: 'MAYÚSCULAS' },
    { value: 'lowercase', label: 'minúsculas' },
    { value: 'titlecase', label: 'Título' },
    { value: 'slugify', label: 'slug-url' },
  ];

  const output = useMemo<string>(() => {
    if (!input) return '';
    switch (transform) {
      case 'uppercase':
        return input.toUpperCase();
      case 'lowercase':
        return input.toLowerCase();
      case 'titlecase':
        return input.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
        );
      case 'slugify':
        return input
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      default:
        return input;
    }
  }, [input, transform]);

  const stats = useMemo<TextStats>(() => {
    const trimmed = input.trim();
    return {
      characters: input.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      lines: input ? input.split(/\r\n|\r|\n/).length : 0,
    };
  }, [input]);

  return (
    <ToolShell
      toolId="ejemplo"
      title="Transformador de Texto Editorial"
      description="Herramienta de demostración que ilustra la integración del marco ToolShell, acento de color propio (.tool-ejemplo), control segmentado y botón de copiado con fallback."
      category="Tipografía & Texto"
      actions={
        <CopyButton
          text={output}
          label="Copiar resultado"
          disabled={!output}
        />
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Panel principal de edición */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle>Texto original</CardTitle>
                <CardDescription>Introduce o pega tu contenido</CardDescription>
              </div>
              <SegmentedControl
                options={transformOptions}
                value={transform}
                onChange={setTransform}
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="w-full rounded-[var(--radius)] border border-surface-border bg-background p-3 font-sans text-sm leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                placeholder="Escribe el texto aquí..."
                data-testid="ejemplo-textarea"
              />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span className="font-mono">Modo: {transform}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInput('')}
                  disabled={!input}
                  className="text-xs h-7"
                >
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Resultado procesado</CardTitle>
                <CardDescription>
                  Texto listo para ser copiado al portapapeles
                </CardDescription>
              </div>
              <CopyButton text={output} disabled={!output} />
            </CardHeader>
            <CardContent>
              {output ? (
                <div
                  className="rounded-[var(--radius)] border border-surface-border bg-muted/40 p-4 font-mono text-sm leading-relaxed break-words"
                  data-testid="ejemplo-output"
                >
                  {output}
                </div>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  El texto está vacío. Escribe algo arriba para transformarlo.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral de métricas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métricas</CardTitle>
              <CardDescription>Conteo en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b border-surface-border pb-2 text-sm">
                <span className="text-muted-foreground">Caracteres</span>
                <span className="font-mono font-semibold">{stats.characters}</span>
              </div>
              <div className="flex items-center justify-between border-b border-surface-border pb-2 text-sm">
                <span className="text-muted-foreground">Palabras</span>
                <span className="font-mono font-semibold">{stats.words}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Líneas</span>
                <span className="font-mono font-semibold">{stats.lines}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-accent-soft/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="accent">Acento Propio</Badge>
              </div>
              <CardTitle className="text-base font-sans pt-2">
                Color de acento de la herramienta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Esta herramienta utiliza la clase <code>.tool-ejemplo</code> que sobrescribe el color de acento a una tonalidad esmeralda/teal sin afectar al resto de la aplicación.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolShell>
  );
};
