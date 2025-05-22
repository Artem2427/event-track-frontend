import { Suspense } from 'react';
import { Preloader } from '@shared/custom-ui';
import QueryClientProvider from '@shared/providers/query-client.provider';
import '@shared/services/env';
import { Toaster } from '@shared/shadcn-ui';
import { GuardAuthentication } from './GuardAuthentication';
import { Routes } from './Routes';

function App() {
  // useEffect(() => {
  //   void sharedStores.profileBasicInfoStore.fetchBasicData();
  // }, []);

  return (
    <QueryClientProvider>
      <Suspense fallback={<Preloader />}>
        <GuardAuthentication>
          <Routes />
        </GuardAuthentication>
      </Suspense>

      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
