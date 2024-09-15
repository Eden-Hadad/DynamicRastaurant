import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import ReservationTableDisplay from './ReservationTableDisplay';

function Reservation({ user }) {
    const [tables, setTables] = useState([]);
    const [reservationDetails, setReservationDetails] = useState({
        quantity: 2,
        date: new Date().toISOString().split('T')[0],
        location: 'inside',
        userId: user.id,
        tableId: null
    });

    const navigate = useNavigate();

    const fetchTables = async () => {
        const response = await fetch(`/tables/available?location=${reservationDetails.location}&date=${reservationDetails.date}`);
        const data = await response.json();
        setTables(data.map(table => ({ ...table, selected: false })));
    };

    useEffect(() => {
        fetchTables();
    }, [reservationDetails.date, reservationDetails.location]);

    const handleTableReservation = (tableId) => {
        setTables(tables.map(table => 
            table.id === tableId ? { ...table, selected: true } : { ...table, selected: false }
        ));
        setReservationDetails({
            ...reservationDetails,
            tableId
        });
    };

    const handleFormSubmit = async () => {
        const response = await fetch('/tables/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationDetails),
        });

        if (response.ok) {
            alert('Reservation successful!');
            setTables(tables.map(table => 
                table.id === reservationDetails.tableId ? { ...table, reserved: true, selected: false } : table
            ));
            setReservationDetails({ ...reservationDetails, tableId: null });
        } else {
            alert('Failed to reserve the table.');
        }
    };

    return (
        <div>
            <h1>Make a Reservation</h1>
            <Form userId={user.id} onFormSubmit={handleFormSubmit} reservationDetails={reservationDetails} setReservationDetails={setReservationDetails} />
            <ReservationTableDisplay tables={tables} onTableReservation={handleTableReservation} />
            <button onClick={() => navigate('/my-reservations')}>My Reservations</button>
        </div>
    );
}

export default Reservation;
