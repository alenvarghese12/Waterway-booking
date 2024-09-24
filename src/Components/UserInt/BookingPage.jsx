import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const { boat } = location.state; // Receiving the boat data passed from the previous page

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);

  // Calculate the price per head based on the boat type
  const calculatePricePerHead = () => {
    if (peopleCount <= 0) return 0; // Avoid division by zero

    let duration = 1; // Default for speed boats (1 hour booking)
    
    // Calculate duration in days if the boat type is not "speed boat"
    if (boat.boatType !== 'speed boat') {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
        duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Calculate days
      } else {
        return 0; // Invalid or incomplete date input
      }
    }

    // Calculate and return price per head
    return (boat.price / peopleCount / duration).toFixed(2);
  };

  return (
    <div className="booking-page">
      <h2>Booking for {boat.boatName}</h2>
      
      {/* Check if it's not a speed boat to display date inputs */}
      {boat.boatType !== 'speed boat' ? (
        <>
          <label>Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
          <label>End Date:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </>
      ) : (
        <p>This is a 1-hour booking for a speed boat.</p>
      )}
      
      <label>Number of People:</label>
      <input
        type="number"
        value={peopleCount}
        onChange={(e) => setPeopleCount(e.target.value)}
        min="1"
      />
      
      <p>Average Price per Head: Rs. {calculatePricePerHead()}</p>

      <button className="confirm-booking-button">Confirm Booking</button>
    </div>
  );
};

export default BookingPage;
