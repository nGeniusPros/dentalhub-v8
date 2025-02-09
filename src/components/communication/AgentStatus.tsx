import { useVoiceAgents } from '@/providers/VoiceAgentProvider'
import { Badge } from '@/components/ui/badge'
import { Phone, CircleAlert, CircleCheck } from 'lucide-react'

export default function AgentStatus() {
  const { agents } = useVoiceAgents()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {agents.map(agent => (
        <div 
          key={agent.id}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-light"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-navy">
              <Phone className="w-5 h-5" />
              <span className="font-medium">{agent.phoneNumber}</span>
            </div>
            <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
              {agent.status}
            </Badge>
          </div>
          
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-gray-darker">
              <span className="w-20">Last Ping:</span>
              <span className="font-mono text-navy">
                {agent.lastPing ? 
                  new Date(agent.lastPing).toLocaleTimeString() : 
                  'Never'
                }
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-darker">
              <span className="w-20">Active Calls:</span>
              <span className={`font-semibold ${
                agent.activeCalls > 0 ? 'text-green-600' : 'text-gray-darker'
              }`}>
                {agent.activeCalls}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
