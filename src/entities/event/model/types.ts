import type { ProfileUserInfo } from '@entities/user-profile/model';

export type EventsQueryParams = {
  startDate: string;
  endDate: string;
  search: string;
};

export type EventType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  maxParticipants: number;
  minParticipants: number;
  isOffline: boolean;
  price: string;
  admin: ProfileUserInfo;
  adminId: string;
  deletedAt: string | null;
  image: string | null;
  registeredCount: number;
};
