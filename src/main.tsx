import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

// Self-hosted Fonts
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/500.css';
import '@fontsource/newsreader/400-italic.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';

// Styles
import './styles/globals.css';

const rootEl = document.getElementById('root');
const bootEl = document.getElementById('boot');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

  // Remove sand boot cover once React has rendered
  if (bootEl) {
    bootEl.remove();
  }
}
