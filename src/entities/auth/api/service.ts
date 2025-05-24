import { api } from '@shared/api';
import type { AuthSuccessResponse, SignInInput, SignUpInput } from '../model';

class AuthService {
  async signIn(input: SignInInput): Promise<AuthSuccessResponse> {
    const res = await api.post<AuthSuccessResponse>('/auth/login', input);
    return res.data;
  }

  async signUp(input: SignUpInput): Promise<AuthSuccessResponse> {
    const res = await api.post<AuthSuccessResponse>('/auth/register', input);
    return res.data;
  }
}

export const authService = new AuthService();
