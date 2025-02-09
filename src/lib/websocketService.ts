interface WebSocketMessage {
  type: 'status_update' | 'new_call' | 'call_ended'
  data: any
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

async function encryptPayload(data: any, key: CryptoKey): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(JSON.stringify(data))
  )
  return `${Buffer.from(iv).toString('base64')}:${Buffer.from(encrypted).toString('base64')}`
}

async function decryptPayload(payload: string, key: CryptoKey): Promise<any> {
  const [ivPart, dataPart] = payload.split(':')
  const iv = Buffer.from(ivPart, 'base64')
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    Buffer.from(dataPart, 'base64')
  )
  return JSON.parse(decoder.decode(decrypted))
}

export class RealtimeService {
  private socket: WebSocket | null = null
  private listeners: Map<string, (data: any) => void> = new Map()
  private reconnectAttempts = 0
  private encryptionKey: CryptoKey

  async connect(token: string, encryptionKey: CryptoKey) {
    this.encryptionKey = encryptionKey
    this.socket = new WebSocket(
      `${import.meta.env.VITE_WS_BASE_URL}/realtime?token=${token}`
    )

    this.socket.onmessage = async (event) => {
      const encryptedMessage = JSON.parse(event.data)
      const message = await decryptPayload(encryptedMessage, this.encryptionKey)
      this.listeners.get(message.type)?.(message.data)
    }

    this.socket.onclose = () => {
      if (this.reconnectAttempts < 5) {
        setTimeout(() => this.connect(token, encryptionKey), 1000 * 2 ** this.reconnectAttempts)
        this.reconnectAttempts++
      }
    }
  }

  subscribe(eventType: string, callback: (data: any) => void) {
    this.listeners.set(eventType, callback)
    return () => this.listeners.delete(eventType)
  }

  async sendMessage(message: WebSocketMessage) {
    const encryptedMessage = await encryptPayload(message, this.encryptionKey)
    this.socket?.send(JSON.stringify(encryptedMessage))
  }

  disconnect() {
    this.socket?.close()
    this.reconnectAttempts = 0
  }
}
