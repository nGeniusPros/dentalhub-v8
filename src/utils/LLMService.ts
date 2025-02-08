import axios from 'axios';
import { validateLLMInput } from '../lib/validationSchemas';

const DEEPSEEK_ENDPOINT = process.env.DEEPSEEK_URL || 'http://localhost:8000/api/infer';

interface LLMResponse {
  text: string;
  tokens_used: number;
  error?: string;
}

export class LLMService {
  static async infer(prompt: string): Promise<string> {
    try {
      const sanitizedPrompt = validateLLMInput(prompt);
      
      const res = await axios.post<LLMResponse>(DEEPSEEK_ENDPOINT, {
        prompt: sanitizedPrompt,
        max_tokens: 500,
        temperature: 0.7
      });

      if (res.data.error) {
        throw new Error(`DeepSeek Error: ${res.data.error}`);
      }

      return res.data.text;
    } catch (error) {
      console.error('LLM Service Error:', error);
      return 'Our AI consultant is currently unavailable. Please try again later.';
    }
  }
}
