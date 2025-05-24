import type { ApiErrorResponse } from '@shared/types';
import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { authService } from '../api/service';
import { type AuthSuccessResponse, type SignInInput } from '../model';

export function useSignInMutation(): UseMutationResult<
  AuthSuccessResponse,
  AxiosError<ApiErrorResponse>,
  SignInInput
> {
  return useMutation({
    mutationFn: (input: SignInInput) => authService.signIn(input),
  });
}
