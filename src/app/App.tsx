import { Suspense } from 'react';
import { Preloader } from '@shared/custom-ui';
import QueryClientProvider from '@shared/providers/query-client.provider';
import '@shared/services/env';
import { Toaster } from '@shared/shadcn-ui';
import { GuardAuthentication } from './GuardAuthentication';
import { Routes } from './Routes';
import { ThemeProvider } from '@shared/providers/theme.provider';

function App() {
  // useEffect(() => {
  //   void sharedStores.profileBasicInfoStore.fetchBasicData();
  // }, []);

  return (
    <QueryClientProvider>
      <ThemeProvider>
        <Suspense fallback={<Preloader />}>
          <GuardAuthentication>
            <Routes />
          </GuardAuthentication>
        </Suspense>

        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
