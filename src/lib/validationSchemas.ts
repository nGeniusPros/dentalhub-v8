import { z } from 'zod';

export const llmInputSchema = z.object({
  prompt: z.string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(2000, 'Prompt cannot exceed 2000 characters')
    .regex(/^[a-zA-Z0-9 .,?!-]+$/, 'Invalid characters in prompt')
});

export function validateLLMInput(input: string): string {
  const result = llmInputSchema.safeParse({ prompt: input });
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data.prompt;
}
