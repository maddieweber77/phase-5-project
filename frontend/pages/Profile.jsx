import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUser } from "../UserContext";
import Header from '../components/Header';

const Profile = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Fetch reservations data when component mounts
        fetch('/api/profile/reservations')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch reservations');
                }
            })
            .then(data => {
                setReservations(data);
            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    }, []);

    //!!!!!!!!!!!!!!!!!!!!
    // star rating system
    //!!!!!!!!!!!!!!!!!!!!

    const [selectedRating, setSelectedRating] = useState(0);

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };

    const submitRating = (restaurantId, rating) => {
        // Send the rating to the backend
        fetch(`/api/restaurant/${restaurantId}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Rating submitted successfully.');
                // Update the reservations data to reflect the new rating
                // You may need to fetch the updated data from the server
            } else {
                throw new Error('Failed to submit rating');
            }
        })
        .catch(error => {
            console.error('Error submitting rating:', error);
        });
    };

    const formatBookingTime = (timeStamp) => {
        const formattedTime = new Date(timeStamp).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        }) + ' at ' + new Date(timeStamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return formattedTime;
    };

     // Function to check if reservation is more than 3 hours older than current time
     const isReservationOld = (timeStamp) => {
        const threeHours = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        const reservationTime = new Date(timeStamp).getTime();
        const currentTime = new Date().getTime();
        return currentTime - reservationTime > threeHours;
    };



    return (
        <div>
            <Header />
            <h1>Profile Page</h1>
            <h2>Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <div key={reservation.id}>
                        <h3>{reservation.restaurant_name}</h3>
                        <p>Party Size: {reservation.party_size}</p>
                        <p>Date / Time: {formatBookingTime(reservation.time_stamp)}</p>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                onClick={() => handleStarClick(star)}
                                style={{ cursor: 'pointer', color: star <= selectedRating ? 'gold' : 'gray' }}
                            >
                                &#9733;
                            </span>
                        ))}
                        <button onClick={() => submitRating(reservation.restaurant_id, selectedRating)}>Submit Rating</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
