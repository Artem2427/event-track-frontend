import type { ApiErrorResponse } from '@shared/types';
import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { authService } from '../api/service';
import { type AuthSuccessResponse, type SignUpInput } from '../model';

export function useSignUpMutation(): UseMutationResult<
  AuthSuccessResponse,
  AxiosError<ApiErrorResponse>,
  SignUpInput
> {
  return useMutation({
    mutationFn: (input: SignUpInput) => authService.signUp(input),
  });
}
