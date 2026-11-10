import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { HomePage } from '@/features/home/HomePage';
import { toolsRegistry } from '@/features/registry';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      ...toolsRegistry.map((tool) => {
        const ToolComponent = tool.component;
        return {
          path: tool.route,
          element: (
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-background">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
              }
            >
              <ToolComponent />
            </Suspense>
          ),
        };
      }),
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
