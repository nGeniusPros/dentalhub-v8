import { useVoiceAgents } from '@/providers/VoiceAgentProvider'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CallPlayer } from '@/components/ui/call-player'
import AgentStatus from '@/components/communication/AgentStatus'
import ActivityFeed from '@/components/communication/ActivityFeed'

export default function CommunicationDashboard() {
  const { agents, loading } = useVoiceAgents()

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-navy">Voice Communications</h1>
        <p className="text-gray-darker">
          Real-time monitoring of voice agent performance
        </p>
      </div>
      
      <AgentStatus />
      <ActivityFeed />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))
        ) : (
          agents.map(agent => {
            const recentCallId = agent.calls[0]?.id // Assuming the recent call ID is the first call in the agent's calls array

            return (
              <Card key={agent.id} className="hover:shadow-glow transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{agent.phoneNumber}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-darker">
                    Last call: {agent.lastCall ? agent.lastCall.toLocaleString() : 'No calls yet'}
                  </p>
                  <div className="text-sm text-navy">
                    Agent ID: {agent.id}
                  </div>
                  <CallPlayer callId={recentCallId} agentId={agent.id} />
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
