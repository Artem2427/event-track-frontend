import type { UserRolesEnum } from '@entities/user/model';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRolesEnum;
};

export type AuthSuccessResponse = {
  accessToken: string;
};
