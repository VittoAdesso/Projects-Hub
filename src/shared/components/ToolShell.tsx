import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PageHeader } from './PageHeader';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export interface ToolShellProps {
  toolId: string;
  title: string;
  description?: string;
  category?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hidePageHeader?: boolean;
}

export const ToolShell: React.FC<ToolShellProps> = ({
  toolId,
  title,
  description,
  category,
  actions,
  children,
  className,
  hidePageHeader = false,
}) => {
  return (
    <div
      className={cn(
        `tool-${toolId}`,
        'min-h-screen flex flex-col bg-background text-foreground transition-colors'
      )}
      data-testid={`tool-shell-${toolId}`}
    >
      {/* Barra superior de navegación unificada */}
      <nav className="border-b border-surface-border bg-surface/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Catálogo</span>
              </Button>
            </Link>
            <div className="h-4 w-px bg-surface-border hidden sm:block" />
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline-block">
              tool / {toolId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {actions}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Contenido principal de la herramienta */}
      <main className={cn('flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8', className)}>
        {!hidePageHeader && (
          <PageHeader
            eyebrow={category ?? 'Herramienta'}
            title={title}
            description={description}
          />
        )}

        <div className="space-y-6">{children}</div>
      </main>

      {/* Pie sutil */}
      <footer className="border-t border-surface-border py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Project Hub &copy; {new Date().getFullYear()}</span>
          <span className="font-mono text-[11px]">ID: {toolId}</span>
        </div>
      </footer>
    </div>
  );
};
