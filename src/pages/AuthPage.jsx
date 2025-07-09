import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import '../index.css'
import Feed from './Feed';
import { Analytics } from '@vercel/analytics/react'

function setLoginStat(){
  localStorage.setItem('token', 'true');
}




function Login({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 

const isLoggedIn = localStorage.getItem('token') !== null

let userInfo;
  const navigate = useNavigate()

  const localURL = 'http://localhost:5000'
  const backendURL = 'https://backend-closedconnections-tq1k.onrender.com'

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${backendURL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => { 
        alert(data.message);
        if(data.message === 'Login successful') {
          userInfo = { email }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          navigate('/Home')
        }
        setLoginStat()
      })
      .catch(err => alert( err.message))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow w-full max-w-sm border-dotted border-2 border-gray-300"
    >
      <Analytics />
      <h2 className="text-4xl font-extrabold mb-5 text-gray-500 text-center">Login</h2>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border-2 border-gray-300 border-dotted rounded focus:outline-none focus:ring focus:border-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="text-xl mb-1 text-black">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full border-2 border-dotted border-purple-700 text-gray-500 py-2 rounded hover:border-purple-900 hover:bg-purple-400 hover:text-amber-50 transition"
      >
        Login
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={onSwitch}
        >
          Sign Up
        </button>
      </p>
    </form>
  )
}

function Signup({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const localURL = 'http://localhost:5000'
  const backendURL = 'https://backend-closedconnections-tq1k.onrender.com'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    fetch(`${backendURL}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => { 
        alert(data.message) 
        if(data.message === 'Signup successful') {
          //return <Feed />
          let userInfo = { email }
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          navigate('/Home')
        }
        setLoginStat()
      })
      .catch(err => alert(err.message))
  }

  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow w-full max-w-sm border-dotted border-2 border-gray-300"
    >
      <h2 className="text-4xl font-extrabold mb-5 text-gray-500 text-center">Sign Up</h2>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border-2 border-gray-300 border-dotted rounded focus:outline-none focus:ring focus:border-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="text-xl mb-1 text-black">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="text-xl mb-1 text-black">Confirm Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded border-dotted focus:outline-none focus:ring focus:border-blue-400"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full border-2 border-dotted border-purple-700 text-gray-500 py-2 rounded hover:border-purple-900 hover:bg-purple-400 hover:text-amber-50 transition"
      >
        Sign Up
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={onSwitch}
        >
          Login
        </button>
      </p>
    </form>
  )
}

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {showLogin ? (
        <Login onSwitch={() => setShowLogin(false)} />
      ) : (
        <Signup onSwitch={() => setShowLogin(true)} />
      )}
    </div>
  )
}