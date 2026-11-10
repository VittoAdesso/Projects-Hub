import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/600.css';
import '@fontsource/newsreader/700.css';
import '@/shared/styles/globals.css';
import { App } from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz con id "root".');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
