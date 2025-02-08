import { LLMService } from '../utils/LLMService';
import { validateLLMInput } from '../lib/validationSchemas';

type DataResponse = {
  agent: string;
  content: string;
  rawData: any;
};

export class DataRetrievalAgent {
  async processQuery(query: string): Promise<DataResponse> {
    const sanitizedQuery = validateLLMInput(query);
    const practiceData = await this.getPracticeData();
    
    const prompt = `As Data Agent, analyze:\nQuery: ${sanitizedQuery}\nData: ${JSON.stringify(practiceData)}\nFocus on production metrics and trends.`;

    return {
      agent: 'Data Analytics Agent',
      content: await LLMService.infer(prompt),
      rawData: practiceData
    };
  }

  private async getPracticeData() {
    // Mock data - integrate with actual DB later
    return {
      dailyProduction: 2850,
      monthlyGoalProgress: 0.82,
      outstandingAR: 4200
    };
  }
}
