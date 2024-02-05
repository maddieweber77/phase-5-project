import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUser } from "../UserContext";
import Header from "../components/Header";


const MapList = () => {

    const [userLocation, setUserLocation] = useState(null);
    const [errorMessages, setErrorMessages] = useState({});
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
                    console.log("lat and long")
                    console.log(latitude, longitude)
                    const response = await fetch('/api/get_restaurants', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `latitude=${latitude}&longitude=${longitude}`,
                    });
                    const data = await response.json();
                    setRestaurants(data);
                    setLoading(false); 
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

    if (newSize > 10) {
        setErrorMessages({
            partySize: "Party size cannot be greater than 10"
        });
    } else {
        setPartySize(newSize);
        setErrorMessages({
            partySize: ""
        });
    }
};

    const bookRestaurant = async (restaurant, partySize) => {
        const bidAmount = document.getElementById(`bid-${restaurant.business_id}`).value;
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
                    bid_amount: bidAmount,
                    time_stamp: bookingDateTime,
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

    const handleBookButtonClick = (restaurant, partySize) => {
        const bidInput = document.getElementById(`bid-${restaurant.business_id}`);
        const newBidAmount = parseInt(bidInput.value, 10);
    
        if (isNaN(newBidAmount)) {
            setErrorMessages({
                ...errorMessages,
                [restaurant.business_id]: 'Please enter a valid bid amount.'
            });
            return;
        }
    
        const currentBidPerPerson = restaurant.bid_per_person;
        const minimumBidAmount = currentBidPerPerson * partySize + 10;
    
        if (newBidAmount < minimumBidAmount) {
            setErrorMessages({
                ...errorMessages,
                [restaurant.business_id]: 'Bid amount must be at least $10 more than the current bid amount.'
            });
            return;
        }
    
        // Clear error message if bid amount is valid
        setErrorMessages({
            ...errorMessages,
            [restaurant.business_id]: ""
        });
    
        // Proceed with booking if bid amount is valid
        bookRestaurant(restaurant, partySize, newBidAmount);
    };
    

    return (
        <div>
            <Header/>
            <form id="party-size-form">
                <label htmlFor="party-size">Party Size (&gt;=10): </label>
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
                        <p>Bid amount: ${restaurant.bid_per_person*partySize}, bid per person: ${restaurant.bid_per_person}</p>
                        <label htmlFor={`bid-${restaurant.business_id}`}>Bid Amount:</label>
                        <input
                            type="number"
                            id={`bid-${restaurant.business_id}`}
                            name={`bid-${restaurant.business_id}`}
                            placeholder="Enter bid amount"
                            min={restaurant.bid_per_person * partySize + 10}
                        />
                        <button onClick={() => handleBookButtonClick(restaurant, partySize)}>Book</button>
                        {errorMessages[restaurant.business_id] && <p style={{ color: 'red' }}>{errorMessages[restaurant.business_id]}</p>}

        </div>
    ))}
                </div>
            )}
        </div>
    );
};

export default MapList;
