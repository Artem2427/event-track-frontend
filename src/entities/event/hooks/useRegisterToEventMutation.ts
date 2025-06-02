import type { ApiErrorResponse } from '@shared/types';
import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { eventService } from '../api/service';
import { type RegisterEvent, type RegisterToEventInput } from '../model';

export function useRegisterToEventMutation(): UseMutationResult<
  RegisterEvent,
  AxiosError<ApiErrorResponse>,
  RegisterToEventInput
> {
  return useMutation({
    mutationFn: (input: RegisterToEventInput) =>
      eventService.registerToEvent(input),
  });
}
