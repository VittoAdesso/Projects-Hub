import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="flex flex-col items-center gap-3">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      <span className="font-mono text-xs text-muted-foreground">Cargando herramienta...</span>
    </div>
  </div>
);

export const RootLayout: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
};
