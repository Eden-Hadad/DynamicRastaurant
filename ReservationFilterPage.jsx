import React, { useState, useEffect } from 'react';

function ReservationFilterPage() {
  const [reservations, setReservations] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState(null); // Week will be an object with startDate and endDate

  useEffect(() => {
    fetchReservations();
  }, [year, month, week]);

  const fetchReservations = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(year && { year }),
        ...(month && { month }),
        ...(week && { startDate: week?.startDate, endDate: week?.endDate }), // Send startDate and endDate if a week is selected
      }).toString();

      const response = await fetch(`http://localhost:5000/tables/reservations?${queryParams}`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // Generate years from 2020 to 2069 with "All Years" option
  const getYears = () => {
    const years = [{ value: '', label: 'All Years' }];
    for (let i = 2020; i <= 2069; i++) {
      years.push({ value: i.toString(), label: i.toString() });
    }
    return years;
  };

  // Generate months (1-12) with "All Months" option
  const getMonths = () => {
    return [
      { value: '', label: 'All Months' },
      { value: '1', label: 'January' },
      { value: '2', label: 'February' },
      { value: '3', label: 'March' },
      { value: '4', label: 'April' },
      { value: '5', label: 'May' },
      { value: '6', label: 'June' },
      { value: '7', label: 'July' },
      { value: '8', label: 'August' },
      { value: '9', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' },
    ];
  };

  // Calculate the number of weeks in a given month and year
  const getWeeksInMonth = (year, month) => {
    if (!year || !month) return []; // No weeks if year or month is "All"

    const weeks = [];
    const firstDay = new Date(year, month - 1, 1); // First day of the month
    const lastDay = new Date(year, month, 0); // Last day of the month

    let currentDay = firstDay;
    
    while (currentDay <= lastDay) {
      // Get the first day of the current week (Sunday)
      const weekStart = new Date(currentDay);
      weekStart.setDate(currentDay.getDate() - currentDay.getDay()); // Set to the start of the week (Sunday)

      // Get the last day of the current week
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // End of the week (Saturday)

      // Add week to the list if it's within the current month
      if (weekStart.getMonth() === firstDay.getMonth() || weekEnd.getMonth() === firstDay.getMonth()) {
        weeks.push({ start: weekStart, end: weekEnd });
      }

      // Move to the next week
      currentDay = new Date(weekEnd);
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return weeks.map((week, index) => ({
      label: `Week ${index + 1} (${week.start.toLocaleDateString()} - ${week.end.toLocaleDateString()})`,
      value: JSON.stringify({ startDate: week.start.toISOString(), endDate: week.end.toISOString() }),
    }));
  };

  return (
    <div className="reservation-filter-page">
      <h1>Reservation Filter</h1>

      <div className="filters">
        {/* Year Filter */}
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {getYears().map((yearOption) => (
            <option key={yearOption.value} value={yearOption.value}>
              {yearOption.label}
            </option>
          ))}
        </select>

        {/* Month Filter */}
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {getMonths().map((monthOption) => (
            <option key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </option>
          ))}
        </select>

        {/* Week Filter */}
        <select
          value={week ? JSON.stringify(week) : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              setWeek(JSON.parse(value));
            } else {
              setWeek(null); // Set to null if "All Weeks" is selected
            }
          }}
          disabled={!year || !month}
        >
          <option value="">All Weeks</option>
          {getWeeksInMonth(year, month).map((weekOption) => (
            <option key={weekOption.value} value={weekOption.value}>
              {weekOption.label}
            </option>
          ))}
        </select>
      </div>

      <div className="reservations-list">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.reservationId} className="reservation-item">
              <p>Table Size: {reservation.size}</p>
              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
              <p>Time: {new Date(reservation.date).toLocaleTimeString()}</p>
              <p>Guests: {reservation.how_many}</p>
              <p>Location: {reservation.location}</p>
              <p>User: {reservation.userEmail}</p>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
}

export default ReservationFilterPage;
