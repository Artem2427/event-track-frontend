import { useGetAllUsersQuery } from './useGetAllUsersQuery';
import { useGetUserByIdQuery } from './useGetUserByIdQuery';
import { useHasRole } from './useHasRole';
import { useMeProfileQuery } from './useMeProfileQuery';

export * from './withRole';

export const userHooks = {
  useHasRole,
  useMeProfileQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
};
