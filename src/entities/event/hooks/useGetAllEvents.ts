import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { eventService } from '../api/service';
import { EVENT_QUERY_KEYS, type EventsQueryParams } from '../model';

export function useGetAllEventsQuery<TData = Event[]>(
  queryParams: EventsQueryParams,
  options?: Partial<UseQueryOptions<Event[], AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<Event[], AxiosError, TData>({
    queryKey: [EVENT_QUERY_KEYS.GET_ALL_EVENTS, queryParams],
    queryFn: () => eventService.getAllEvents(queryParams),
    ...options,
  });
}
