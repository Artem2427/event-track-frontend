import { type TFunction } from 'i18next';
import z from 'zod';

export const getLogInSchema = (t: TFunction<'translations'>) =>
  z.object({
    email: z
      .string()
      .email(t('validation.email.invalid'))
      .min(1, { message: t('validation.email.required') })
      .max(256, { message: t('validation.email.tooLong') }),
    password: z
      .string()
      .min(1, { message: t('validation.password.required') })
      .max(256, { message: t('validation.password.tooLong') }),
  });

export type LogInFormSchema = z.infer<ReturnType<typeof getLogInSchema>>;
