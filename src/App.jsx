import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/AuthPage'
import AuthPage from './pages/AuthPage'
import Feed from './pages/Feed'
import AppWrapper from './pages/AppWrapper'

function App() {

  /* const isLoggedIn = localStorage.getItem('token') !== null
  console.log('isLoggedIn:', isLoggedIn) */
  return (
    <BrowserRouter>
      <Routes>
        {/* {
          isLoggedIn
            ? <Route path="/" element={<Feed />} />
            : <Redirect to = {<AuthPage />} />
        } */}
        <Route path="/" element={<AppWrapper />} />
        <Route index path="/Login" element={ <AuthPage/> } />
        <Route path="/Home" element={<Feed />} /> 
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App