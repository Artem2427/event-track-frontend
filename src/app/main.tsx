import { StrictMode } from 'react';
import QueryClientProvider from '@shared/providers/query-client.provider.tsx';
import '@shared/utils/i18n.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <App />,
    </QueryClientProvider>
  </StrictMode>,
);
