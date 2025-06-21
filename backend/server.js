// backend/server.js
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const users = []

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'User already exists' })
    }
    await User.create({ email, password })
    res.json({ message: 'Signup successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

console.log(users)
app.listen(5000, () => console.log('Backend running on http://localhost:5000'))

const mongo = 'mongodb+srv://user:mangomango2233007@cluster0.miuie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongo, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
})

const User = mongoose.model('User', userSchema)