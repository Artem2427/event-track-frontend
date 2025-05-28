import { useCreateEventMutation } from './useCreateEventMutation';
import { useGetAllEventsQuery } from './useGetAllEventsQuery';
import { useGetEventParticipantsQuery } from './useGetEventParticipants';
import { useUpdateEventMutation } from './useUpdateEventMutation';

export const eventHooks = {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useGetEventParticipantsQuery,
};
