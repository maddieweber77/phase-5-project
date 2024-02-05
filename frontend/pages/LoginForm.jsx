import React, { useState } from "react";
import Header from "../components/Header";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login Successful:', data);
            } else {
                console.error('Error logging in:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div>
            <Header/>
            <form id='login-form' onSubmit={handleLoginSubmit}>
                <label className='login-text'>Username:</label>
                <input
                    type='text'
                    placeholder="Enter your username"
                    className='login-input'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='login-text'>Password:</label>
                <input
                    type='password'
                    placeholder="Enter your password"
                    className='login-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button id='login-submit-button' type='submit'>Submit</button>
            </form>
        </div>
        
    );
}

export default LoginForm;
