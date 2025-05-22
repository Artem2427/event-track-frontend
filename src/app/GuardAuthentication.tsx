import { type ReactNode } from 'react';
import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useUserProfileStore } from '@entities/user-profile/store';
import { LoginPageLazy } from '@pages/login/Login.page.lazy';
import { Preloader } from '@shared/custom-ui';

export const GuardAuthentication = ({ children }: { children: ReactNode }) => {
  const { status } = useUserProfileStore();

  if (status === ProfileLoadStatusValue.PENDING) {
    return <Preloader />;
  }

  if (status !== ProfileLoadStatusValue.AUTHORIZED) {
    return <LoginPageLazy />;
  }

  return children;
};
