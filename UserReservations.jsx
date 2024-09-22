import React, { useEffect, useState } from "react";
import "../myComponents/UserReservation.css";
const UserReservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const url = `/tables/user-reservations/${userId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(`/tables/reservation/${reservationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReservations(
          reservations.filter(
            (reservation) => reservation.reservationId !== reservationId
          )
        );
      } else {
        alert("Failed to cancel reservation.");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  return (
    <div className="user-reservation-container">
      <div className="user-reservation">
        <h2 className="user-reservation-h1"> My Reservations</h2>
        {reservations.length > 0 ? (
          <div className="user-reservation-item-ontain">
            {reservations.map((reservation) => (
              <div
                key={reservation.reservationId}
                className="user-reservation-item"
              >
                <p className="user-reservation-detail">
                  Table {reservation.size} | Date and Time:{" "}
                  {new Date(reservation.date).toLocaleString()} | How Many:{" "}
                  {reservation.how_many}
                </p>
                <button
                  className="user-reservation-cancel-button"
                  onClick={() =>
                    handleCancelReservation(reservation.reservationId)
                  }
                >
                  Cancel Reservation
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no reservations.</p>
        )}
      </div>
    </div>
  );
};

export default UserReservations;
