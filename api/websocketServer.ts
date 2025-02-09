import WebSocket from 'ws'
import { verifyJWT } from './auth'

const wss = new WebSocket.Server({ port: 8081 })

const rateLimiter = new Map<string, { tokens: number; last: number }>()

const RATE_LIMIT = {
  CAPACITY: 10,
  REFILL_RATE: 1 // tokens per second
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimiter.get(ip) || { tokens: RATE_LIMIT.CAPACITY, last: now }
  
  const elapsed = (now - entry.last) / 1000
  entry.tokens = Math.min(
    entry.tokens + elapsed * RATE_LIMIT.REFILL_RATE,
    RATE_LIMIT.CAPACITY
  )
  entry.last = now

  if (entry.tokens < 1) return false
  entry.tokens -= 1
  rateLimiter.set(ip, entry)
  return true
}

wss.on('connection', (ws, req) => {
  const token = new URL(req.url!, 'ws://localhost').searchParams.get('token')
  
  try {
    const payload = verifyJWT(token!)
    ws.send(JSON.stringify({ type: 'connection_success' }))

    // Add to agent tracking system
  } catch (error) {
    ws.close(4001, 'Unauthorized')
  }

  ws.on('message', (message) => {
    const ip = req.socket.remoteAddress
    if (!checkRateLimit(ip)) {
      ws.close(4002, 'Rate limit exceeded')
      return
    }
    // Handle incoming messages with schema validation
  })
})
