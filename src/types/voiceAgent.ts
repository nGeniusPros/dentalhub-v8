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
