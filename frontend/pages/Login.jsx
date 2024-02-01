import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import LoginForm from "/Users/maddieweber/Development/code/phase-5/phase-5-project/frontend/pages/LoginForm.jsx";


function Login(){

    return (
        <div className="login-page-div">
            {/* <h1 id='app-title'>BATTLEMEMES</h1> */}
            <LoginForm/>
        </div>
        )
};


export default Login;