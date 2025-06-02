import { type ReactNode } from 'react';
import type { UserRolesEnum } from '../model';
import { useHasRole } from './useHasRole';

type Props = {
  roles: UserRolesEnum[] | UserRolesEnum;
  fallback?: ReactNode;
  children: ReactNode;
};

export const WithRole = ({ roles, fallback = null, children }: Props) => {
  const hasAccess = useHasRole(roles);
  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
