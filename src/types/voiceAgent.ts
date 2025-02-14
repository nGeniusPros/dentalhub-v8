export type VoiceAgentConfig = {
  id: string
  llmId: string
  phoneNumber: string
  status: 'active' | 'maintenance'
  lastCall?: Date
}

export type VoiceAgentResponse = {
  transcript: string
  sentiment: 'positive' | 'neutral' | 'negative'
  nextSteps: string[]
}

export interface CallAnalysis {
  id: string
  duration: number
  sentimentScore: number
  keywords: string[]
  participantCount: number
  callQuality: {
    jitter: number
    packetLoss: number
    latency: number
  }
}
