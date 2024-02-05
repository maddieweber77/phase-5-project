import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUser } from "../UserContext";
import Header from "../components/Header";


const MapList = () => {

    const [userLocation, setUserLocation] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const {user, setUser} = useUser()
    const [loading, setLoading] = useState(false); // Add loading state
    const [partySize, setPartySize] = useState(1);


    const handleGetLocation = async () => {
        try {
            setLoading(true); // Set loading to true when fetching data
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
                    setLoading(false); // Set loading to false after data is fetched
                }, (error) => {
                    console.error('Error getting location:', error);
                    setLoading(false); // Set loading to false if there's an error
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
                setLoading(false); // Set loading to false if geolocation is not supported
            }
        } catch (error) {
            console.error('Error getting location:', error);
            setLoading(false); // Set loading to false if there's an error
        }
    };
    
    const handlePartySizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10); // Parse the value as an integer
        console.log("party size", newSize);
        setPartySize(newSize);
    };

    const bookRestaurant = async (restaurant, partySize) => {
        const bookingDateTime = new Date();
        console.log("bookRestaurant time stamp:", bookingDateTime)
        try {
            const response = await fetch('/api/book_restaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessId: restaurant.business_id,
                    restaurantName: restaurant.name,
                    party_size: partySize, // Use the partySize parameter here
                    time_stamp: bookingDateTime
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
            <Header/>
            <form id="party-size-form">
                <label htmlFor="party-size">Party Size:</label>
                <input 
                    type="number" 
                    id="party-size" 
                    name="party-size" 
                    min="1" 
                    value={partySize} 
                    onChange={handlePartySizeChange} 
                    required 
                />
                <button id="getLocationBtn" type="button" onClick={handleGetLocation}>See Restaurants with Availability</button>
            </form>

            {loading ? ( // Conditionally render loading message
                <p>Loading...</p>
            ) : (
                <div id="restaurantList">
                    {restaurants.map((restaurant) => (
                    <div key={restaurant.business_id} className="restaurant-container">
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.full_address}</p>
                        <label htmlFor={`bid-${restaurant.business_id}`}>Bid Amount:</label>
                        <input
                            type="number"
                            id={`bid-${restaurant.business_id}`}
                            name={`bid-${restaurant.business_id}`}
                            placeholder="Enter bid amount"
                            min="0"
                        />
                        <button onClick={() => bookRestaurant(restaurant, partySize)}>Book</button>
        </div>
    ))}
                </div>
            )}
        </div>
    );
};

export default MapList;
