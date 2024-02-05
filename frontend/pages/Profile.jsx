import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUser } from "../UserContext";

const Profile = () => {
    return (
        <div>
            <h1>Walk In Profile Page</h1>
            <p>This is a dummy profile page.</p>
        </div>
    );
};

export default Profile;
