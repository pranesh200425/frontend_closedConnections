import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { Context } from '../Context'

function AppWrapper() {

    const navigate = useNavigate()

    const session = useContext(Context)
    console.log('session at wrapper:', session);
    
    if(session != null){
        return (
            navigate('/Home')
        )
    } else {
        return (
            navigate('/Login')
        )
    }
  
}

export default AppWrapper