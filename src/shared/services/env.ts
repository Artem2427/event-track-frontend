import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables!', parsedEnv.error.format());
  throw new Error('Environment validation failed');
}

export const env = parsedEnv.data;
