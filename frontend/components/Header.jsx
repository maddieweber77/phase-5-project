import React, {useState} from "react";
import { NavLink } from "react-router-dom";



function Header(){

    return (
        <div className="header-container">
            <div className="logo-container">
                <img
                    src="/assets/BiteBid.png"
                    width="100%"
                    alt="Bite Bid"
                />
            </div>
            <div className="button-container">
                <NavLink to='/MapList'>
                    <button>Find a Table</button>
                </NavLink>
                <NavLink to='/Profile'>
                    <button>Profile</button>
                </NavLink>
                <NavLink to='/Login'>
                    <button>Logout</button>
                </NavLink>
            </div>
        </div>
    );
};


export default Header;

