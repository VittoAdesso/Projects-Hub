import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import { resolveLegacyFile } from './setup';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ManualPmView } from '@/features/manual-pm/views/ManualPmView';
import { TEMPLATES } from '@/features/manual-pm/data/templates';
import { SECTIONS } from '@/features/manual-pm/data/sections';
import { AREAS } from '@/features/manual-pm/data/areas';

const renderManualPm = () =>
  render(
    <ThemeProvider>
      <MemoryRouter>
        <ManualPmView />
      </MemoryRouter>
    </ThemeProvider>
  );

describe('Manual PM - Parity & Functionality Tests', () => {
  const writeTextMock = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
      configurable: true,
    });
  });

  // 1. Text parity between legacy HTML templates and modern TEMPLATES data
  it('las 12 plantillas coinciden exactamente con el texto del HTML original', () => {
    const legacyPath = resolveLegacyFile('manual-pm_v5.html');
    const htmlContent = fs
      .readFileSync(legacyPath, 'utf8')
      .replace(/<style[\s\S]*?<\/style>/gi, '');
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');

    expect(TEMPLATES.length).toBe(12);

    for (const tpl of TEMPLATES) {
      const legacyEl = doc.getElementById(tpl.id);
      expect(legacyEl).toBeDefined();
      expect(legacyEl).not.toBeNull();

      const legacyText = (legacyEl?.textContent ?? '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');

      expect(tpl.text).toBe(legacyText);
    }
  });

  // 2. Navigation between all 8 sections via tablist
  it('permite navegar entre las 8 secciones mediante las pestañas principales', () => {
    renderManualPm();

    // Initial section is Inicio
    expect(document.getElementById('inicio')).toBeInTheDocument();

    for (const section of SECTIONS) {
      const tabButton = screen.getByRole('tab', {
        name: new RegExp(`${section.num}\\s+${section.id === 'rut' ? 'Rutina' : section.label}`, 'i'),
      });
      expect(tabButton).toBeInTheDocument();

      fireEvent.click(tabButton);

      // Verify section container is rendered
      const sectionEl = document.getElementById(section.id);
      expect(sectionEl).toBeInTheDocument();
      expect(tabButton).toHaveAttribute('aria-selected', 'true');
    }
  });

  // 3. Internal navigation (data-go links)
  it('funciona la navegación por enlaces internos (data-go) entre secciones', () => {
    renderManualPm();

    // From inicio -> proc via quick router
    const toProc = screen.getByText('Llega una solicitud nueva').closest('button')!;
    fireEvent.click(toProc);
    expect(document.getElementById('proc')).toBeInTheDocument();

    // From proc -> reu
    const toReuFromProc = screen.getByText('Ver cómo llevar esta reunión paso a paso →');
    fireEvent.click(toReuFromProc);
    expect(document.getElementById('reu')).toBeInTheDocument();

    // Tab back to proc
    const procTab = screen.getByRole('tab', { name: /02\s+Procedimiento/i });
    fireEvent.click(procTab);
    expect(document.getElementById('proc')).toBeInTheDocument();

    // From proc -> dec
    const toDecFromProc = screen.getByText('Principio 80/20 y arquitectura recomendada →');
    fireEvent.click(toDecFromProc);
    expect(document.getElementById('dec')).toBeInTheDocument();

    // From dec -> cor
    const toCorFromDec = document.querySelector('#dec [data-go="cor"]')!;
    expect(toCorFromDec).toBeInTheDocument();
    fireEvent.click(toCorFromDec);
    expect(document.getElementById('cor')).toBeInTheDocument();

    // From inicio -> inc via quick router
    const inicioTab = screen.getByRole('tab', { name: /00\s+Inicio/i });
    fireEvent.click(inicioTab);
    const toInc = screen.getByText('Algo se ha roto en producción').closest('button')!;
    fireEvent.click(toInc);
    expect(document.getElementById('inc')).toBeInTheDocument();

    // From proc -> est
    fireEvent.click(procTab);
    const toEstFromProc = screen.getByText('estabilización');
    fireEvent.click(toEstFromProc);
    expect(document.getElementById('est')).toBeInTheDocument();
  });

  // 4. Kit desplegable (toggle, steps, and emergency link)
  it('el kit de emergencia se despliega, muestra sus 4 pasos y permite navegar a incidencias', () => {
    renderManualPm();

    // Initial state: kitBody is closed
    expect(document.getElementById('kitBody')).not.toBeInTheDocument();

    const toggleBtn = document.getElementById('kitToggle')!;
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn.textContent).toBe('Ver los pasos');

    // Click to open
    fireEvent.click(toggleBtn);
    expect(document.getElementById('kitBody')).toBeInTheDocument();
    expect(toggleBtn.textContent).toBe('Ocultar');
    expect(screen.getByText('Confirma el alcance.')).toBeInTheDocument();
    expect(screen.getByText('Comunica ya')).toBeInTheDocument();
    expect(screen.getByText('Aplica el plan de reversión.')).toBeInTheDocument();
    expect(screen.getByText('Solo ahora,')).toBeInTheDocument();

    // Link inside kit to incidencias
    const kitLink = screen.getByText('Abrir sección completa de incidencias →');
    fireEvent.click(kitLink);
    expect(document.getElementById('inc')).toBeInTheDocument();
  });

  // 5. Area tabs in Estabilización
  it('las pestañas de área en estabilización alternan correctamente los paneles', () => {
    renderManualPm();

    const estTab = screen.getByRole('tab', { name: /07\s+Estabilización/i });
    fireEvent.click(estTab);
    expect(document.getElementById('est')).toBeInTheDocument();

    // Default active area is RRHH
    expect(screen.getByText(/RRHH · ejemplo Tipo 2-3/i)).toBeInTheDocument();

    for (const area of AREAS) {
      const areaTab = screen.getByRole('tab', { name: area.label });
      fireEvent.click(areaTab);
      expect(areaTab).toHaveAttribute('aria-selected', 'true');
      expect(document.querySelector(`[data-area="${area.id}"]`)).toBeInTheDocument();
    }
  });

  // 6. Copy button of EACH of the 12 templates copies the exact text
  it('el botón Copiar de CADA una de las 12 plantillas copia el texto exacto', async () => {
    renderManualPm();

    // Test templates in 'inc' (c1, c2a, c2b, c2c)
    const incTab = screen.getByRole('tab', { name: /05\s+Incidencias/i });
    fireEvent.click(incTab);

    const incTemplates = TEMPLATES.filter((t) => t.section === 'inc');
    for (const tpl of incTemplates) {
      const tplBlock = document.querySelector(`[data-template-id="${tpl.id}"]`);
      expect(tplBlock).toBeInTheDocument();

      const copyBtn = tplBlock?.querySelector('[data-testid="copy-button"]');
      expect(copyBtn).toBeDefined();
      expect(copyBtn).not.toBeNull();

      fireEvent.click(copyBtn!);
      await waitFor(() => {
        expect(writeTextMock).toHaveBeenCalledWith(tpl.text);
      });
    }

    // Test templates in 'cor' (c3 to c10)
    const corTab = screen.getByRole('tab', { name: /06\s+Correos/i });
    fireEvent.click(corTab);

    const corTemplates = TEMPLATES.filter((t) => t.section === 'cor');
    for (const tpl of corTemplates) {
      const tplBlock = document.querySelector(`[data-template-id="${tpl.id}"]`);
      expect(tplBlock).toBeInTheDocument();

      const copyBtn = tplBlock?.querySelector('[data-testid="copy-button"]');
      expect(copyBtn).toBeDefined();
      expect(copyBtn).not.toBeNull();

      fireEvent.click(copyBtn!);
      await waitFor(() => {
        expect(writeTextMock).toHaveBeenCalledWith(tpl.text);
      });
    }

    expect(writeTextMock).toHaveBeenCalledTimes(12);
  });
});
