import { z } from 'zod'

export const AgentStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['active', 'maintenance', 'offline']),
  lastPing: z.number().int().positive(),
  activeCalls: z.number().int().nonnegative()
})

export const CallUpdateSchema = z.object({
  callId: z.string().uuid(),
  agentId: z.string().uuid(),
  encryptedTranscript: z.string(),
  iv: z.string().length(24)
})

export const AuthChallengeSchema = z.object({
  nonce: z.string().length(16),
  timestamp: z.number().int().positive()
})
