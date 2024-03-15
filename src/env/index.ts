import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
})

const { success, error, data } = envSchema.safeParse(process.env)

if (!success) {
  console.error('Invalid environment variables', error.format())
  throw new Error('Invalid environment variables')
}

export const env = data
