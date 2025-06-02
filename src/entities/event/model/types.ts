import type { UserInfo } from '@entities/user/model';

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
  admin: UserInfo;
  adminId: string;
  deletedAt: string | null;
  image: string | null;
  registeredCount: number;
};

export const RegistrationStatusValue = {
  REGISTERED: 'registered',
  ATTENDED: 'attended',
  CANCELLED: 'cancelled',
} as const;

export type RegistrationStatus =
  (typeof RegistrationStatusValue)[keyof typeof RegistrationStatusValue];

export const ParticipantRoleValue = {
  SPEAKER: 'speaker',
  ATTENDEE: 'attendee',
} as const;

export type ParticipantRole =
  (typeof ParticipantRoleValue)[keyof typeof ParticipantRoleValue];

export type EventParticipant = {
  id: string;
  user: UserInfo;
  userId: string;
  eventId: string;
  status: RegistrationStatus;
  registrationDate: string;
  role: ParticipantRole;
};

export type RegisterToEventInput = {
  status: RegistrationStatus;
  eventId: string;
  role: ParticipantRole;
};

export type RegisterEvent = {
  id: string;
  userId: string;
  eventId: string;
  status: RegistrationStatus;
  registrationDate: string;
  role: ParticipantRole;
};
