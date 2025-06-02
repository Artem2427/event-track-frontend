import { eventService } from '@entities/event/api/service';
import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { EVENT_QUERY_KEYS } from '../model';

export function useGetRegistrationOnEventsQuery<TData = string[]>(
  options?: Partial<UseQueryOptions<string[], AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<string[], AxiosError, TData>({
    queryKey: [EVENT_QUERY_KEYS.GET_REGISTRATION_ON_EVENTS],
    queryFn: () => eventService.getRegistrationOnEvents(),
    ...options,
  });
}
