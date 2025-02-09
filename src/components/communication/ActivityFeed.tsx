import { useVoiceAgents } from '@/providers/VoiceAgentProvider'
import { AnimatePresence, motion } from 'framer-motion'

export default function ActivityFeed() {
  const { agents } = useVoiceAgents()

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-navy mb-4">Real-Time Activity</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {agents.map(agent => (
            agent.activeCalls > 0 && (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 p-2 bg-gray-lighter rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-navy">
                  Active call on {agent.phoneNumber}
                </span>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
