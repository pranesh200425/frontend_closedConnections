// backend/server.js
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const users = []

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }
  users.push({ email, password })
  res.json({ message: 'Signup successful' })
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  res.json({ message: 'Login successful' })
})

app.listen(5000, () => console.log('Backend running on http://localhost:5000'))