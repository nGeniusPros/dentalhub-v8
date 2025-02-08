import { DataRetrievalAgent } from './DataRetrievalAgent';
import { HygieneAnalyticsAgent } from './HygieneAnalyticsAgent';
import { LLMService } from '../utils/LLMService';
import { validateLLMInput } from '../lib/validationSchemas';

type AgentResponse = {
  agent: string;
  content: string;
  rawData?: any;
};

export class HeadBrainConsultant {
  private agents = {
    data: new DataRetrievalAgent(),
    hygiene: new HygieneAnalyticsAgent()
  };

  async handleUserQuery(query: string): Promise<string> {
    try {
      const sanitizedQuery = validateLLMInput(query);
      const agentResponses = await this.routeToAgents(sanitizedQuery);
      return this.synthesizeResponses(sanitizedQuery, agentResponses);
    } catch (error) {
      console.error('Consultation Error:', error);
      return 'Could not process your query. Please try again.';
    }
  }

  private async routeToAgents(query: string): Promise<AgentResponse[]> {
    const responses: AgentResponse[] = [];
    
    // Always include data agent
    responses.push(await this.agents.data.processQuery(query));

    // Route to specialty agents
    if (this.needsHygieneAnalysis(query)) {
      responses.push(await this.agents.hygiene.processQuery(query));
    }

    return responses;
  }

  private needsHygieneAnalysis(query: string): boolean {
    const hygieneKeywords = ['hygiene', 'clean', 'preventative', 'prophylaxis'];
    return hygieneKeywords.some(kw => 
      query.toLowerCase().includes(kw)
    );
  }

  private async synthesizeResponses(
    query: string,
    responses: AgentResponse[]
  ): Promise<string> {
    const context = responses
      .map(r => `${r.agent}:
${r.content}`)
      .join('\n\n');

    return LLMService.infer(
      `As DentalHub's Head Brain, synthesize these insights:\n\n${context}\n\nOriginal query: ${query}`
    );
  }
}
