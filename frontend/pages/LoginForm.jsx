import React, { useState, useEffect } from "react";


function LoginForm() {

    // could be used for Sign up page, include Post request to profile
    // Login needs to be checked against username and password stored in the backend

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault();

        const response = 
            fetch('https//localhost:5555/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(username, password)
            })

            
            if (response.success){
                return "Login Successful"
            } else {
                return Error("Incorrect Login Info")
            }
            
        };

    return(
        <form id='login-form' 
        onSubmit={handleLoginSubmit}
        >
            <label className='login-text'>
            Username:
            </label>
            <input
                type='text'
                placeholder="Enter your username"
                className='login-input'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label className='login-text'>
            Password:
            </label>
            <input
                type='password'
                placeholder="Enter your password"
                className='login-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button id='login-submit-button' type='submit'>Submit</button>
        </form>
    )
    };

export default LoginForm;