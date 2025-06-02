import { Suspense, useEffect } from 'react';
import { eventHooks } from '@entities/event/hooks';
import { userHooks } from '@entities/user/hooks';
import { ProfileLoadStatusValue } from '@entities/user/model';
import { useUserProfileStore } from '@entities/user/store';
import { Preloader } from '@shared/custom-ui';
import { ThemeProvider } from '@shared/providers/theme.provider';
import '@shared/services/env';
import { Toaster } from '@shared/shadcn-ui';
import { Routes } from './Routes';

function App() {
  const { setUser, setStatus, setRegistrationEventIds } = useUserProfileStore();

  const {
    data: userProfile,
    isSuccess,
    isError,
  } = userHooks.useMeProfileQuery();
  const {
    data: registrationEventIds,
    isPending,
    refetch: refetchRegistrationEventIds,
  } = eventHooks.useGetRegistrationOnEventsQuery({ enabled: false });

  useEffect(() => {
    if (isSuccess && userProfile) {
      setUser(userProfile);
      setStatus(ProfileLoadStatusValue.AUTHORIZED);
      refetchRegistrationEventIds();
    }

    if (isError) {
      setStatus(ProfileLoadStatusValue.ERROR);
    }
  }, [isSuccess, userProfile, isError, setUser, setStatus]);

  useEffect(() => {
    if (registrationEventIds && !isPending) {
      setRegistrationEventIds(registrationEventIds);
    }
  }, [registrationEventIds, isPending]);

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
