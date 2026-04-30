require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = Number(process.env.PORT) || 5000
const { MONGO_URI } = process.env

if (!MONGO_URI) {
  console.error('Missing MONGO_URI. Set it in backend/.env as MONGO_URI=<your mongodb uri>')
  process.exit(1)
}

if (MONGO_URI.includes('<db_password>')) {
  console.error('Your MONGO_URI still contains <db_password>. Replace it with your real MongoDB password in backend/.env.')
  process.exit(1)
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err?.message ?? err)
    process.exit(1)
  })

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))