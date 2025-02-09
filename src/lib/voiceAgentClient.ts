import axios from 'axios'
import { VoiceAgentConfig, VoiceAgentResponse } from '@/types/voiceAgent'

export const voiceClient = axios.create({
  baseURL: import.meta.env.VITE_RETELL_API_BASE || 'https://api.retellai.com/v1',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_RETELL_API_KEY}`,
    'Content-Type': 'application/json'
  }
})

export const fetchActiveAgents = async (): Promise<VoiceAgentConfig[]> => {
  const { data } = await voiceClient.get('/agents')
  return data.map((agent: any) => ({
    id: agent.agent_id,
    llmId: agent.llm_id,
    phoneNumber: agent.phone_number,
    status: agent.status,
    lastCall: agent.last_call_at ? new Date(agent.last_call_at) : undefined
  }))
}

const decryptRecordingUrl = (encryptedUrl: string) => {
  // Implementation using Web Crypto API
  // ...
}

export const getCallAnalysis = async (callId: string): Promise<VoiceAgentResponse> => {
  const { data } = await voiceClient.get(`/calls/${callId}/analysis`)
  return {
    ...data,
    recordingUrl: decryptRecordingUrl(data.encryptedUrl)
  }
}

export const analyzeCall = async (callId: string): Promise<VoiceAgentResponse> => {
  const { data } = await voiceClient.get(`/calls/${callId}/analysis`)
  return {
    transcript: data.transcript,
    sentiment: data.sentiment,
    nextSteps: data.next_steps
  }
}
