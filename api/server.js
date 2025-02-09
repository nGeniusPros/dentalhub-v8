const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(express.json())

// Rate limiting middleware
const rateLimit = require('express-rate-limit')
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}))

const { authenticateJWT } = require('./middleware/auth')
app.use(authenticateJWT)

// Function to check user role
async function checkUserRole(userId, requiredRole) {
  // TO DO: implement logic to check user role
  // For now, just return true
  return true;
}

// API endpoints
app.post('/api/campaigns', async (req, res) => {
  if (!(await checkUserRole(req.user.userId, 'marketing'))) {
    return res.status(403).json({ error: 'Insufficient permissions' })
  }
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  try {
    const response = await axios.post(
      'https://api.instantly.ai/api/v1/campaign/create',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.INSTANTLY_API_KEY}`
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/subscribers', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`
        }
      }
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})
