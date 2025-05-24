import { create } from 'zustand';
import {
  type ProfileLoadStatus,
  ProfileLoadStatusValue,
  type ProfileUserInfo,
} from '../model';

export type UserProfileStore = {
  user: ProfileUserInfo | null;
  status: ProfileLoadStatus;
  hasFetched: boolean;
  setUser: (user: ProfileUserInfo) => void;
  setStatus: (status: ProfileLoadStatus) => void;
  markFetched: () => void;
  reset: () => void;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  user: null,
  status: ProfileLoadStatusValue.PENDING,
  hasFetched: false,
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  markFetched: () => set({ hasFetched: true }),
  reset: () =>
    set({
      user: null,
      status: ProfileLoadStatusValue.PENDING,
      hasFetched: false,
    }),
}));
