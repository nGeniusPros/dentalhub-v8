import axios from 'axios'
import { validateRequest, campaignSchema } from './apiValidator'

type InstantlyCampaign = {
  campaign_id: string
  name: string
  status: 'draft' | 'scheduled' | 'sent'
}

const validateCampaign = validateRequest(campaignSchema)

export const instantlyClient = axios.create({
  baseURL: '/api', // Proxy through backend
  headers: {
    'Content-Type': 'application/json'
  }
})

// Error handling interceptor
instantlyClient.interceptors.response.use(
  response => response.data,
  error => {
    throw new Error(`Instantly API error: ${error.response?.data?.message || error.message}`)
  }
)

// Rate limiting setup
const RATE_LIMIT = 5 // Requests per second
let lastRequestTime = 0

instantlyClient.interceptors.request.use(config => {
  const now = Date.now()
  const delay = Math.max(0, 1000/RATE_LIMIT - (now - lastRequestTime))
  lastRequestTime = now + delay
  return new Promise(resolve => 
    setTimeout(() => resolve(config), delay)
  )
})

export const fetchCampaigns = async (): Promise<InstantlyCampaign[]> => {
  return instantlyClient.get('/campaign/list')
}

export const createCampaign = async (campaignData: unknown) => {
  const validated = validateCampaign(campaignData)
  return instantlyClient.post('/campaign/create', validated)
}
