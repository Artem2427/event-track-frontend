import { create } from 'zustand';
import {
  type ProfileLoadStatus,
  ProfileLoadStatusValue,
  type ProfileUserInfo,
} from '../model';

export type UserProfileStore = {
  user: ProfileUserInfo | null;
  status: ProfileLoadStatus;
  setUser: (user: ProfileUserInfo) => void;
  setStatus: (status: ProfileLoadStatus) => void;
  reset: () => void;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  user: null,
  status: ProfileLoadStatusValue.AUTHORIZED,
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  reset: () =>
    set({
      user: null,
      status: ProfileLoadStatusValue.PENDING,
    }),
}));
