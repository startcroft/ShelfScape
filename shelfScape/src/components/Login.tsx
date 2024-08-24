import { useState } from 'react';
import './Login.scss';
import { useAuth } from './AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from './constants';
import { AuthResponse, AuthResponseError } from '../types/Types';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    const handleback = () => {
        navigate('../');
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                console.log("Login success");
                const json = (await response.json()) as AuthResponse;
                console.log("AuthResponse:", json);  // Log response for debugging
                auth.saveUser(json);
                navigate("/Interest");
            } else {
                console.log("Something went wrong");
                const json = (await response.json()) as AuthResponseError;
                console.log("AuthResponseError:", json);  // Log error response for debugging
                setErrorResponse(json.body.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/Interest" />;
    }

    return (
        <>
            <main className='mainLogin'>
                <button className='mainLogin__buttonBack' onClick={handleback}>
                    <img src="../src/assets/back.svg" alt="back" />
                </button>
                {errorResponse && <p>{errorResponse}</p>}
                <form className='logForm' onSubmit={handleSubmit}>
                    <input
                        className='logForm__input'
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className='logForm__input'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='logForm__button'>Login</button>
                </form>
            </main>
        </>
    );
};
