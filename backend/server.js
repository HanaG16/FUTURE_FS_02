const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const leadRoutes = require('./routes/leads')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/leads', leadRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: '✅ LeadCRM backend is running!' })
})

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB!')
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message)
  })