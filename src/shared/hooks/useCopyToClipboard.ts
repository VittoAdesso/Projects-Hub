import { useCallback, useState } from 'react';

export interface UseCopyToClipboardOptions {
  resetTimeout?: number;
}

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: Error | null;
}

export function fallbackCopyText(text: string): boolean {
  if (typeof document === 'undefined') return false;

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  textArea.style.pointerEvents = 'none';
  textArea.setAttribute('aria-hidden', 'true');

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let successful = false;
  try {
    successful = document.execCommand('copy');
  } catch {
    successful = false;
  } finally {
    document.body.removeChild(textArea);
  }

  return successful;
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { resetTimeout = 2000 } = options;
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      setError(null);

      // Intento primario con API moderna
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), resetTimeout);
          return true;
        } catch {
          // Si falla (permiso denegado, HTTP no seguro, iframe restringido), continuar al fallback
        }
      }

      // Respaldo con execCommand
      const success = fallbackCopyText(text);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), resetTimeout);
        return true;
      }

      const copyError = new Error('No se pudo copiar el texto al portapapeles');
      setError(copyError);
      setCopied(false);
      return false;
    },
    [resetTimeout]
  );

  return { copied, copy, error };
}
