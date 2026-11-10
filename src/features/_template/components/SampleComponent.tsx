import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

/**
 * Componente modular interno de la herramienta.
 * TODO: Rellena o sustituye este componente con tus piezas específicas.
 */

export interface SampleComponentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const SampleComponent: React.FC<SampleComponentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
