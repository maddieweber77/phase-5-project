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


    return (
        <div>
            <Header />
            <h1>Profile Page</h1>
            <h2>Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <div>
                        <h3>{reservation.restaurant_name}</h3>
                        <p>Party Size: {reservation.party_size}</p>
                        <p>Date / Time: {formatBookingTime(reservation.time_stamp)}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
