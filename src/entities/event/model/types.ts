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

export const RegistrationStatus = {
  REGISTERED: 'registered',
  ATTENDED: 'attended',
  CANCELLED: 'cancelled',
} as const;

export type RegistrationStatus =
  (typeof RegistrationStatus)[keyof typeof RegistrationStatus];

export const ParticipantRole = {
  SPEAKER: 'speaker',
  ATTENDEE: 'attendee',
} as const;

export type ParticipantRole =
  (typeof ParticipantRole)[keyof typeof ParticipantRole];

export type EventParticipant = {
  id: string;
  user: ProfileUserInfo;
  userId: string;
  eventId: string;
  status: RegistrationStatus;
  registrationDate: string;
  role: ParticipantRole;
};
