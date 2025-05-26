import { Suspense, useEffect } from 'react';
import { userProfileHooks } from '@entities/user-profile/hooks';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useUserProfileStore } from '@entities/user-profile/store';
import { Preloader } from '@shared/custom-ui';
import { ThemeProvider } from '@shared/providers/theme.provider';
import '@shared/services/env';
import { Toaster } from '@shared/shadcn-ui';
import { Routes } from './Routes';

function App() {
  const { setUser, setStatus } = useUserProfileStore();

  const { data, isSuccess, isError } = userProfileHooks.useMeProfileQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      setStatus(ProfileLoadStatusValue.AUTHORIZED);
    }

    if (isError) {
      setStatus(ProfileLoadStatusValue.ERROR);
    }
  }, [isSuccess, data, isError, setUser, setStatus]);

  return (
    <ThemeProvider>
      <Suspense fallback={<Preloader />}>
        <Routes />
      </Suspense>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
