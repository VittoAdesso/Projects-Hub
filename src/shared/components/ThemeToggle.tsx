import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      data-testid="theme-toggle-btn"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-foreground transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">
        {theme === 'dark' ? 'Tema oscuro activo' : 'Tema claro activo'}
      </span>
    </Button>
  );
};
