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

    return (
        <div>
            <Header />
            <h1>Profile Page</h1>
            <h2>Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        Restaurant: {reservation.restaurant_name}, Party Size: {reservation.party_size}, Date: {reservation.time_stamp}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
