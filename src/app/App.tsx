import { Suspense, useEffect } from 'react';
import { userProfileService } from '@entities/user-profile/api/service';
import { userProfileHooks } from '@entities/user-profile/hooks';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useUserProfileStore } from '@entities/user-profile/store';
import { Preloader } from '@shared/custom-ui';
import QueryClientProvider from '@shared/providers/query-client.provider';
import { ThemeProvider } from '@shared/providers/theme.provider';
import '@shared/services/env';
import { Toaster } from '@shared/shadcn-ui';
import { Routes } from './Routes';

function App() {
  const { hasFetched, setUser, setStatus, markFetched } = useUserProfileStore();

  // useEffect(() => {
  //   if (hasFetched) return;

  //   const loadUser = async () => {
  //     try {
  //       const user = await userProfileService.getMeProfile();
  //       setUser(user);
  //       setStatus(ProfileLoadStatusValue.AUTHORIZED);
  //     } catch {
  //       markFetched();
  //       setStatus(ProfileLoadStatusValue.ERROR);
  //     } finally {
  //       markFetched();
  //     }
  //   };

  //   loadUser();
  // }, [hasFetched, setUser, setStatus, markFetched]);

  const { data, isLoading, isSuccess, isError } =
    userProfileHooks.useMeProfileQuery();

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
