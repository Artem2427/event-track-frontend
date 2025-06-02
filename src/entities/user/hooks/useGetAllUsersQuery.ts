import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { userService } from '../api/service';
import { USER_QUERY_KEYS } from '../model';
import { type UserInfo } from '../model/types';

export function useGetAllUsersQuery<TData = UserInfo[]>(
  options?: Partial<UseQueryOptions<UserInfo[], AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<UserInfo[], AxiosError, TData>({
    queryKey: [USER_QUERY_KEYS.GET_ALL_USERS],
    queryFn: () => userService.getAllUsers(),
    ...options,
  });
}
