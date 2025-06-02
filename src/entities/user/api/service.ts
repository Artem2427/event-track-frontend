import { api } from '@shared/api';
import type { UserInfo } from '../model';

class UserService {
  async getMeProfile(): Promise<UserInfo> {
    const res = await api.get<UserInfo>('/user');
    return res.data;
  }

  async getUserById(userId: string): Promise<UserInfo> {
    const res = await api.get<UserInfo>(`/user/${userId}`);
    return res.data;
  }

  async getAllUsers(): Promise<UserInfo[]> {
    const res = await api.get<UserInfo[]>('/user/all');
    return res.data;
  }
}

export const userService = new UserService();
