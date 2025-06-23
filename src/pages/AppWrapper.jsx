import React from 'react'
import Feed from './Feed'
import AuthPage from './AuthPage'

function AppWrapper() {

    const isLoggedIn = localStorage.getItem('token') !== null
    console.log('isLoggedIn:', isLoggedIn)

    if(isLoggedIn){
        return (
            <Feed />
        )
    } else {
        return (
            <AuthPage />
        )
    }
  
}

export default AppWrapper