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
                
                // Navigate to the maplist page
                window.location.href = '/maplist'; // Assuming '/maplist' is the route for the maplist page
            } else {
                console.error('Error logging in:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div>
            <Header />
            <div className="page-container"> {/* Apply container style to center content */}
            <div className="form-container"> {/* Apply form container style */}
                <form id='login-form' onSubmit={handleLoginSubmit}>
                    <input
                        type='text'
                        placeholder="Username"
                        className='login-input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder="Password"
                        className='login-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id='login-submit-button' type='submit'>Log In</button>
                </form>
            </div>
        </div>

        </div>
    );
};

export default LoginForm;
