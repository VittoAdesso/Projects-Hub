import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.className = '';
  });

  it('alterna la clase "dark" en el elemento <html> al hacer clic', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const button = screen.getByTestId('theme-toggle-btn');
    expect(button).toHaveAttribute('aria-label', 'Cambiar a tema oscuro');

    // Clic 1: activar modo oscuro
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button).toHaveAttribute('aria-label', 'Cambiar a tema claro');

    // Clic 2: volver a modo claro
    fireEvent.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveAttribute('aria-label', 'Cambiar a tema oscuro');
  });
});
