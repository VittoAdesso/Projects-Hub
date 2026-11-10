import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyButton } from '@/shared/components/CopyButton';

describe('CopyButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('copia texto usando navigator.clipboard cuando está disponible', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });

    render(<CopyButton text="Texto de prueba" label="Copiar texto" />);

    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Copiar texto')).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('Texto de prueba');
    });

    await waitFor(() => {
      expect(screen.getByText('¡Copiado!')).toBeInTheDocument();
    });
  });

  it('usa fallback con execCommand si navigator.clipboard falla', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('Permission denied')),
      },
      writable: true,
      configurable: true,
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    render(<CopyButton text="Texto con fallback" label="Copiar con fallback" />);

    const button = screen.getByTestId('copy-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(execCommandMock).toHaveBeenCalledWith('copy');
      expect(screen.getByText('¡Copiado!')).toBeInTheDocument();
    });
  });

  it('no ejecuta la copia si el botón está deshabilitado', () => {
    const writeTextMock = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });

    render(<CopyButton text="Texto inactivo" disabled label="Inactivo" />);
    const button = screen.getByTestId('copy-button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(writeTextMock).not.toHaveBeenCalled();
  });
});
