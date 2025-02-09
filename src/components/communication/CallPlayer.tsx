import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useVoiceAgents } from '@/providers/VoiceAgentProvider'

type CallPlayerProps = {
  callId: string
  agentId: string
}

export default function CallPlayer({ callId, agentId }: CallPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null)
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const { getCallAnalysis } = useVoiceAgents()
  const [analysis, setAnalysis] = useState<VoiceAgentResponse | null>(null)

  useEffect(() => {
    if (!waveformRef.current) return

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#1B2B5B',
      progressColor: '#C5A572',
      cursorColor: '#4BC5BD',
      height: 100,
      normalize: true,
    })

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [])

  useEffect(() => {
    if (!wavesurfer) return

    const loadRecording = async () => {
      try {
        // Fetch call recording URL from your backend
        const analysis = await getCallAnalysis(callId)
        setAnalysis(analysis)
        
        wavesurfer.load(analysis.recordingUrl)
      } catch (error) {
        console.error('Error loading recording:', error)
      }
    }

    loadRecording()
  }, [wavesurfer, callId, getCallAnalysis])

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <div ref={waveformRef} />
      
      {analysis && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-sm ${
              analysis.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
              analysis.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {analysis.sentiment}
            </span>
          </div>
          
          <div className="text-sm text-gray-darker">
            <p className="font-medium">Suggested next steps:</p>
            <ul className="list-disc pl-4">
              {analysis.nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
