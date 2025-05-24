import { api } from '@shared/api';
import type { ProfileUserInfo } from '../model';

class UserProfileService {
  async getMeProfile(): Promise<ProfileUserInfo> {
    const res = await api.get<ProfileUserInfo>('/user');
    return res.data;
  }
}

export const userProfileService = new UserProfileService();
