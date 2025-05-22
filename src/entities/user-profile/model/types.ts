export const ProfileLoadStatusValue = {
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  ERROR: 'error',
  LOGGED_OUT: 'logged_out',
} as const;

export type ProfileLoadStatus =
  (typeof ProfileLoadStatusValue)[keyof typeof ProfileLoadStatusValue];

export const UserRolesEnumValue = {
  Admin: 'admin', 
  Participant: 'participant', 
  Speaker: 'speaker',
} as const;

export type UserRolesEnum =
  (typeof UserRolesEnumValue)[keyof typeof UserRolesEnumValue];

export type ProfileUserInfo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: UserRolesEnum;
};
