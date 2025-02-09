import axios from 'axios'

type BeehiivSubscriber = {
  id: string
  email: string
  status: 'active' | 'unsubscribed'
  created_at: string
}

export const beehiivClient = axios.create({
  baseURL: 'https://api.beehiiv.com/v2',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_BEEHIIV_API_KEY}`,
    'Content-Type': 'application/json'
  }
})

beehiivClient.interceptors.response.use(
  response => response.data,
  error => {
    throw new Error(`Beehiiv API error: ${error.response?.data?.errors?.join(', ') || error.message}`)
  }
)

export const getSubscribers = async (): Promise<BeehiivSubscriber[]> => {
  return beehiivClient.get(`/publications/${import.meta.env.VITE_BEEHIIV_PUBLICATION_ID}/subscriptions`)
}
