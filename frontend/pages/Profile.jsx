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

    // State to store ratings for each reservation
    const [ratings, setRatings] = useState({});

    const handleStarClick = (reservationId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [reservationId]: rating
        }));
    };

    const submitRating = (reservationId, business_id) => {
        const rating = ratings[reservationId];
        console.log('rating in submitrating', rating)
        console.log('bus id', business_id)
        fetch(`/api/restaurant/${business_id}/rate`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Rating submitted successfully.');
                // Refresh reservations after submitting rating
                return fetch('/api/profile/reservations');
            } else {
                throw new Error('Failed to submit rating');
            }
        })
        .then(response => response.json())
        .then(data => {
            setReservations(data); // Update reservations data
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
                                onClick={() => handleStarClick(reservation.id, star)}
                                style={{ cursor: 'pointer', color: star <= ratings[reservation.id] ? 'gold' : 'gray' }}
                            >
                                &#9733;
                            </span>
                        ))}
                        <button onClick={() => submitRating(reservation.id, reservation.business_id)}>Submit Rating</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
