import { create } from 'zustand';
import {
  type ProfileLoadStatus,
  ProfileLoadStatusValue,
  type UserInfo,
} from '../model';

export type UserProfileStore = {
  user: UserInfo | null;
  status: ProfileLoadStatus;
  setUser: (user: UserInfo) => void;
  setStatus: (status: ProfileLoadStatus) => void;
  reset: () => void;
  registrationEventIds: string[];
  setRegistrationEventIds: (eventIds: string[]) => void;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  user: null,
  status: ProfileLoadStatusValue.PENDING,
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  reset: () =>
    set({
      user: null,
      status: ProfileLoadStatusValue.PENDING,
    }),
  registrationEventIds: [],
  setRegistrationEventIds: (eventIds) =>
    set({ registrationEventIds: eventIds }),
}));
