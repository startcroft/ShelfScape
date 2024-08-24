import { useEffect, useState } from 'react'
import { Message } from './Message';
import { messageProps } from '../types/Types';
import './SignUp.scss'
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null | messageProps>(null);
    const navigate = useNavigate();

    useEffect(() => {
      if(!error){
        setMessage(null)
      }
    }, [error])

    const handleback = () => {
      navigate('../')
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
       if(password !== confirmPassword ){
        setError(true);
        setMessage({text: 'Password must match', type:'error'})
       } else {
        setError(false);
       }


       if(!error){
          const newUser = {
            username: username,
            password: password,
            email: email,
          }

          try {
            const response = await fetch(`${API_URL}/signUp`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
            })
            if(response.ok){
               console.log('user created successfully!');
            }

          } catch (error) {
            console.error(error);
          }
       }
    }
    return (
        <main className="mainSignUp">
          <button className='mainSignUp__button' onClick={handleback}>
            <img src="../src/assets/back.svg" alt="back" />
          </button>
            <form className="mainSignUp__form" onSubmit={handleSubmit}>
                <input className='emailInput' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type='submit'>Create User</button>
            </form>
            {message && <Message text={message.text} type={message.type}/>}
        </main>
    )
}