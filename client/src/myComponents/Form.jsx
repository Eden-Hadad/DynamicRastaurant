import React from 'react';
import '../App.css';

function Form({ userId, onFormSubmit, reservationDetails, setReservationDetails }) {
  const handleChange = (e) => {
    setReservationDetails({
      ...reservationDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationToggle = () => {
    setReservationDetails({
      ...reservationDetails,
      location: reservationDetails.location === 'inside' ? 'outside' : 'inside'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <label className="form-label">
        How many:
        <input type="number" name="quantity" value={reservationDetails.quantity} onChange={handleChange} min="2" required />
      </label>
      <label className="form-label">
        Date:
        <input type="date" name="date" value={reservationDetails.date} onChange={handleChange} required />
      </label>
      <button type="button" onClick={handleLocationToggle} className="location-toggle">
        Location: {reservationDetails.location === 'inside' ? 'Inside' : 'Outside'}
      </button>
      <button type="submit" disabled={!reservationDetails.tableId}>Reserve</button>
    </form>
  );
}

export default Form;
