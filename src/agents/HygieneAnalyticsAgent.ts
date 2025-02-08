import { LLMService } from '../utils/LLMService';
import { validateLLMInput } from '../lib/validationSchemas';

type HygieneResponse = {
  agent: string;
  content: string;
  kpis: any;
};

export class HygieneAnalyticsAgent {
  private readonly HYGIENE_GOAL = 2500;

  async processQuery(query: string): Promise<HygieneResponse> {
    const sanitizedQuery = validateLLMInput(query);
    const hygieneData = await this.getHygieneMetrics();

    const prompt = `As Hygiene Agent, analyze:\nQuery: ${sanitizedQuery}\n` +
      `Daily Goal: $${this.HYGIENE_GOAL}\n` +
      `Actual: $${hygieneData.dailyProduction}\n` +
      `Focus on re-care scheduling and hygiene optimization.`;

    return {
      agent: 'Hygiene Optimization Agent',
      content: await LLMService.infer(prompt),
      kpis: hygieneData
    };
  }

  private async getHygieneMetrics() {
    // Mock data - integrate with actual DB later
    return {
      dailyProduction: 2100,
      patientsSeen: 8,
      reappointmentRate: 0.65
    };
  }
}
