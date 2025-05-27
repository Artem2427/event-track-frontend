import { AMOUNT_REGEX } from '@shared/utils/constants';
import { type TFunction } from 'i18next';
import z from 'zod';

export const getEventSchema = (t: TFunction<'translations'>) =>
  z.object({
    title: z
      .string()
      .min(1, { message: t('validation.title.required') })
      .max(255, { message: t('validation.title.max') }),

    description: z.string().optional(),

    location: z
      .string()
      .max(255, { message: t('validation.location.max') })
      .optional(),

    startDate: z
      .string()
      .min(1, { message: t('validation.startDate.required') }),

    endDate: z.string().min(1, { message: t('validation.endDate.required') }),

    maxParticipants: z
      .string()
      .min(1, { message: 'Amount is required' })
      .regex(AMOUNT_REGEX, {
        message: 'Not valid format',
      }),

    minParticipants: z
      .string()
      .min(1, { message: 'Amount is required' })
      .regex(AMOUNT_REGEX, {
        message: 'Not valid format',
      }),

    price: z
      .string()
      .min(1, { message: 'Amount is required' })
      .regex(AMOUNT_REGEX, {
        message: 'Not valid format',
      })
      .optional(),

    isPublic: z.boolean().optional(),
    isOffline: z.boolean().optional(),
    image: z.any().optional(),
  });

export type CreateEventSchema = z.infer<ReturnType<typeof getEventSchema>>;
