import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { eventService } from '../api/service';
import {
  EVENT_QUERY_KEYS,
  type EventType,
  type EventsQueryParams,
} from '../model';

export function useGetAllEventsQuery<TData = EventType[]>(
  queryParams: EventsQueryParams,
  options?: Partial<UseQueryOptions<EventType[], AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<EventType[], AxiosError, TData>({
    queryKey: [EVENT_QUERY_KEYS.GET_ALL_EVENTS, queryParams],
    queryFn: () => eventService.getAllEvents(queryParams),
    ...options,
  });
}
