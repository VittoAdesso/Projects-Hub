import React from 'react';
import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard';
import { Button, type ButtonProps } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

export interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  disabled?: boolean;
  onCopySuccess?: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  copiedLabel = '¡Copiado!',
  variant = 'outline',
  size = label ? 'sm' : 'icon',
  className,
  disabled = false,
  onCopySuccess,
}) => {
  const { copied, copy } = useCopyToClipboard({ resetTimeout: 2000 });

  const handleCopy = async () => {
    if (disabled || !text) return;
    const success = await copy(text);
    if (success && onCopySuccess) {
      onCopySuccess();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      disabled={disabled || !text}
      className={cn(
        'transition-all duration-150',
        copied && 'border-success text-success bg-muted',
        className
      )}
      aria-label={copied ? copiedLabel : (label ?? 'Copiar al portapapeles')}
      title={copied ? copiedLabel : (label ?? 'Copiar al portapapeles')}
      data-testid="copy-button"
    >
      {copied ? (
        <Check className="h-4 w-4 text-success animate-in fade-in" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {label && <span>{copied ? copiedLabel : label}</span>}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Texto copiado con éxito' : ''}
      </span>
    </Button>
  );
};
