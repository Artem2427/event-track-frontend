import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { userProfileService } from '../api/service';
import { USER_PROFILE_QUERY_KEYS } from '../model';
import { type ProfileUserInfo } from '../model/types';

export function useMeProfileQuery<TData = ProfileUserInfo>(
  options?: Partial<UseQueryOptions<ProfileUserInfo, AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<ProfileUserInfo, AxiosError, TData>({
    queryKey: [USER_PROFILE_QUERY_KEYS.GET_ME_PROFILE],
    queryFn: () => userProfileService.getMeProfile(),
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}
