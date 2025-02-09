import { createContext, useContext, useEffect, useState } from 'react'
import { fetchActiveAgents, analyzeCall } from '@/lib/voiceAgentClient'
import { VoiceAgentConfig, VoiceAgentResponse } from '@/types/voiceAgent'
import { RealtimeService } from '@/lib/websocketService'

type VoiceAgentContextType = {
  agents: VoiceAgentConfig[]
  loading: boolean
  refreshAgents: () => Promise<void>
  getCallAnalysis: (callId: string) => Promise<VoiceAgentResponse>
}

const VoiceAgentContext = createContext<VoiceAgentContextType>(null!)

export function VoiceAgentProvider({ children, userToken }: { children: React.ReactNode, userToken: string }) {
  const [agents, setAgents] = useState<VoiceAgentConfig[]>([])
  const [loading, setLoading] = useState(true)

  const refreshAgents = async () => {
    setLoading(true)
    try {
      const data = await fetchActiveAgents()
      setAgents(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAgents()
  }, [])

  useEffect(() => {
    const service = new RealtimeService()
    service.connect(userToken)

    const unsubscribe = service.subscribe('status_update', (agent) => {
      setAgents(prev => prev.map(a => a.id === agent.id ? { ...a, ...agent } : a))
    })

    return () => {
      unsubscribe()
      service.disconnect()
    }
  }, [userToken])

  return (
    <VoiceAgentContext.Provider value={{ agents, loading, refreshAgents, getCallAnalysis: analyzeCall }}>
      {children}
    </VoiceAgentContext.Provider>
  )
}

export function useVoiceAgents() {
  return useContext(VoiceAgentContext)
}
