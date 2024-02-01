import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import LoginForm from "../components/LoginForm";


function Login(){

    return (
        <div className="login-page-div">
            {/* <h1 id='app-title'>BATTLEMEMES</h1> */}
            <LoginForm/>
        </div>
        )
};


export default Login;