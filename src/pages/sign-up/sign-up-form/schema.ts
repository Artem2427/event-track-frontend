import { UserRolesEnumValue } from '@entities/user-profile/model';
import { type TFunction } from 'i18next';
import z from 'zod';

export const getSignUpSchema = (t: TFunction<'translations'>) =>
  z.object({
    firstName: z
      .string()
      .min(1, { message: t('validation.firstName.required') })
      .max(200, { message: t('validation.firstName.max') }),

    lastName: z
      .string()
      .min(1, { message: t('validation.lastName.required') })
      .max(200, { message: t('validation.lastName.max') }),

    email: z
      .string()
      .min(1, { message: t('validation.email.required') })
      .max(256, { message: t('validation.email.max') })
      .email({ message: t('validation.email.invalid') }),

    password: z
      .string()
      .min(5, { message: t('validation.password.min') })
      .max(4000, { message: t('validation.password.max') }),

    role: z.nativeEnum(UserRolesEnumValue).optional(),
  });

export type SignUpFormSchema = z.infer<ReturnType<typeof getSignUpSchema>>;
