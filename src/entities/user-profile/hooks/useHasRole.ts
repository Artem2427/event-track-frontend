import type { UserRolesEnum } from '../model';
import { useUserProfileStore } from '../store/useUserProfile.store';

export const useHasRole = (
  allowedRoles: UserRolesEnum[] | UserRolesEnum,
): boolean => {
  const { user } = useUserProfileStore();
  if (!user?.role) return false;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return roles.includes(user.role);
};
