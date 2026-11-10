import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Compass, Sparkles } from 'lucide-react';
import { getAllTools } from '@/features/registry';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Button } from '@/shared/ui/button';

export const HomePage: React.FC = () => {
  const tools = getAllTools();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {/* Barra de cabecera */}
      <header className="border-b border-surface-border bg-surface/70 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-[var(--radius)] bg-foreground text-background flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              P
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-tight">Project Hub</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground ml-2 hidden sm:inline">
                Static Tools
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero editorial */}
      <section className="border-b border-surface-border bg-surface/40 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent font-sans">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Plataforma Unificada</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Herramientas estáticas, diseño editorial.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed pt-1 font-sans">
              Un entorno unificado, rápido y accesible para herramientas web independientes, sin dependencias de backend.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido / Cuadrícula de herramientas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              Catálogo de Herramientas
            </h2>
            <p className="text-sm text-muted-foreground">
              {tools.length === 1
                ? '1 herramienta disponible'
                : `${tools.length} herramientas disponibles`}
            </p>
          </div>
        </div>

        {tools.length === 0 ? (
          <div
            className="rounded-[var(--radius)] border border-dashed border-surface-border bg-surface/50 p-12 text-center"
            data-testid="empty-tools-state"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
              <Box className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">
              No hay herramientas registradas aún
            </h3>
            <p className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
              Para añadir la primera herramienta, duplica la carpeta{' '}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                src/features/_template/
              </code>{' '}
              y regístrala en{' '}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                src/features/registry.ts
              </code>
              .
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground font-mono bg-muted/60 px-3 py-1.5 rounded-[var(--radius)]">
              <Compass className="h-3.5 w-3.5" />
              <span>Consulta el README.md para ver la guía completa</span>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="flex flex-col justify-between group hover:border-foreground/30 transition-all duration-200"
                data-testid={`tool-card-${tool.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      /{tool.id}
                    </span>
                    {tool.badge && (
                      <Badge variant="secondary" className="text-[10px]">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="pt-1.5">
                    {tool.shortDescription}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-0">
                  <Link to={tool.route} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-between group/btn hover:bg-foreground hover:text-background transition-colors"
                    >
                      <span>Abrir herramienta</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Pie de página */}
      <footer className="border-t border-surface-border py-8 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Project Hub &mdash; Colección editorial de herramientas estáticas</p>
          <p className="font-mono text-[11px]">Listo para producción en Vercel</p>
        </div>
      </footer>
    </div>
  );
};
