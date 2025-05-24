import { ProfileLoadStatusValue } from '@entities/user-profile/model';
import { useUserProfileStore } from '@entities/user-profile/store';
import { Preloader } from '@shared/custom-ui';
import { ROUTE_PATHS } from '@shared/utils/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const GuardedRoute = () => {
  const { status } = useUserProfileStore();
  const location = useLocation();

  if (status === ProfileLoadStatusValue.PENDING) {
    return <Preloader />;
  }

  if (status !== ProfileLoadStatusValue.AUTHORIZED) {
    return (
      <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};
