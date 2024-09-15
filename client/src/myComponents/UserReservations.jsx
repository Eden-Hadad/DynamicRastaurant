import React, { useEffect, useState } from 'react';

const UserReservations = ({ userId }) => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const url = `/tables/user-reservations/${userId}`;
                console.log('Fetching reservations from:', url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch reservations');
                }
                const data = await response.json();
                console.log('Fetched reservations:', data);
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, [userId]);

    const handleCancelReservation = async (reservationId) => {
        try {
            const response = await fetch(`/tables/reservation/${reservationId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
            } else {
                alert('Failed to cancel reservation.');
            }
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    return (
        <div>
            <h2>My Reservations</h2>
            {reservations.length > 0 ? (
                <div>
                    {reservations.map(reservation => (
                        <div key={reservation.reservationId} className="reservation-item">
                            <p>Table {reservation.size} | Date: {reservation.date} | How Many: {reservation.how_many}</p>
                            <button onClick={() => handleCancelReservation(reservation.reservationId)}>Cancel Reservation</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no reservations.</p>
            )}
        </div>
    );
};

export default UserReservations;
