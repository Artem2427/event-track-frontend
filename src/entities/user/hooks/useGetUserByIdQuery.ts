import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { userService } from '../api/service';
import { USER_QUERY_KEYS } from '../model';
import { type UserInfo } from '../model/types';

export function useGetUserByIdQuery<TData = UserInfo>(
  userId: string,
  options?: Partial<UseQueryOptions<UserInfo, AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<UserInfo, AxiosError, TData>({
    queryKey: [USER_QUERY_KEYS.GET_USER_BY_ID],
    queryFn: () => userService.getUserById(userId),
    ...options,
  });
}
