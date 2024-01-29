import React, { useState, useEffect } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import RestaurantList from "src/components/RestaurantList.jsx"

function MapList() {

    retun (
        <div>
            <Header/>
            <body>
                <h1>Restaurant Names</h1>
                <ul>
                    {/* {% for restaurant_name in restaurant_names %} */}
                        <li>{{ restaurant_name }}</li>
                </ul>
            </body>
        </div>
    )
}

export default MapList;