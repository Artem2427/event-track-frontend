import type { CreateEventSchema } from '@pages/dashboard/create-event/schema';
import type { ApiErrorResponse } from '@shared/types';
import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { eventService } from '../api/service';
import { type EventType } from '../model';

type InputType = {
  input: CreateEventSchema;
  imageFile: File | null;
};

export function useCreateEventMutation(): UseMutationResult<
  EventType,
  AxiosError<ApiErrorResponse>,
  InputType
> {
  return useMutation({
    mutationFn: (input: InputType) =>
      eventService.createEvent(input.input, input.imageFile),
  });
}
