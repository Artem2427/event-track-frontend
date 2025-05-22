import { StrictMode } from 'react';
import '@shared/utils/i18n.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
