import { z } from 'zod'

export const campaignSchema = z.object({
  name: z.string().min(3).max(50),
  subject: z.string().min(5).max(100),
  content: z.string().min(10),
  recipientList: z.array(
    z.string().email().transform(email => email.toLowerCase().trim())
  ).min(1)
})

export const subscriberSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  referralSource: z.enum(['website', 'social', 'direct']).default('website')
})

export const validateRequest = (schema: z.ZodSchema) => {
  return (data: unknown) => {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new Error(
        result.error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
      )
    }
    return result.data
  }
}
