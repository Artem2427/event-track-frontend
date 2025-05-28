import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { eventService } from '../api/service';
import { EVENT_QUERY_KEYS, type EventParticipant } from '../model';

export function useGetEventParticipantsQuery<TData = EventParticipant[]>(
  eventId: string,
  options?: Partial<UseQueryOptions<EventParticipant[], AxiosError, TData>>,
): UseQueryResult<TData, AxiosError> {
  return useQuery<EventParticipant[], AxiosError, TData>({
    queryKey: [EVENT_QUERY_KEYS.GET_EVENT_PARTICIPANTS, eventId],
    queryFn: () => eventService.getEventParticipants(eventId),
    ...options,
  });
}
