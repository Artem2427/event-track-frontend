import { useCreateEventMutation } from './useCreateEventMutation';
import { useGetAllEventsQuery } from './useGetAllEventsQuery';
import { useGetEventParticipantsQuery } from './useGetEventParticipants';
import { useGetRegistrationOnEventsQuery } from './useGetRegistrationOnEventsQuery';
import { useRegisterToEventMutation } from './useRegisterToEventMutation';
import { useUpdateEventMutation } from './useUpdateEventMutation';

export const eventHooks = {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useGetEventParticipantsQuery,
  useGetRegistrationOnEventsQuery,
  useRegisterToEventMutation,
};
