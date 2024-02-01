import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUser } from "../UserContext";

const MapList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const {user, setUser} = useUser()
    const [partySize, setPartySize] = useState(1);

    const handleGetLocation = async () => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
    
                    const response = await fetch('/api/get_restaurants', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `latitude=${latitude}&longitude=${longitude}`,
                    });
    
                    const data = await response.json();
                    setRestaurants(data);
                }, (error) => {
                    console.error('Error getting location:', error);
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };
    

    const bookRestaurant = async (restaurant) => {
        try {
            const response = await fetch('/api/book_restaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessId: restaurant.business_id,
                    restaurantName: restaurant.name,
                    party_size: partySize,
                }),
            });

            if (response.ok) {
                console.log('Restaurant booked successfully.');
            } else {
                console.error('Error booking restaurant:', response.statusText);
            }
        } catch (error) {
            console.error('Error booking restaurant:', error);
        }
    };

    return (
        <div>
            <h1>Walk In</h1>
            <form id="party-size-form">
                <label htmlFor="party-size">Party Size:</label>
                <input type="number" id="party-size" name="party-size" min="1" value={partySize} onChange={(e) => setPartySize(e.target.value)} required />
                <button id="getLocationBtn" type="button" onClick={handleGetLocation}>See Restaurants with Availability</button>
            </form>

            <ul id="restaurantList">
                {restaurants.map((restaurant) => (
                    <li key={restaurant.business_id}>
                        {restaurant.name} - {restaurant.full_address}
                        <button onClick={() => bookRestaurant(restaurant)}>Book</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MapList;
