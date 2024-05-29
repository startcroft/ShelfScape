import { useState } from 'react'
import './Login.scss'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to="/Interest" />
    }
    return(
        <>
        <main className='mainLogin'>
        
        <form className='logForm'>
            <input className='logForm__input' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className='logForm__input' type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className='logForm__button'>Login</button>
        </form>

        </main>
        </>
    )
}