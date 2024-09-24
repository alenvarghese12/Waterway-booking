import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserBoatList.css';
import { useNavigate } from 'react-router-dom';

const UserBoatList = () => {
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate();

  const handleBookNow = (boat) => {
    navigate('/userint/booking', { state: { boat } }); // Navigating to the booking page with boat data
  };

  // Fetch boats from the backend
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/boats/boatsd');
        setBoats(response.data); // Store boat data in state
      } catch (error) {
        console.error('Failed to fetch boats', error);
      }
    };

    fetchBoats();
  }, []);

  return (
    <div className="boat-list-container">
      <h2>Available Boats for Booking</h2>
      <div className="boat-grid">
        {boats.map((boat) => (
          <div key={boat._id} className="boat-card">
              <img
              src={`http://localhost:8080/uploads/${boat.image}`} // Assuming boat image is saved in an 'uploads' folder on the server
              alt={boat.boatName}
              className="boat-image"
            />
            <h3>{boat.boatName}</h3>
            <p><strong>Type:</strong> {boat.boatType}</p>
            <p><strong>Price:</strong> Rs. {boat.price}</p>
            <p><strong>Description:</strong> {boat.description}</p>
            <p><strong>Capacity:</strong> {boat.capacity} people</p>
            <p><strong>Speed:</strong> {boat.speed} km/h</p>
            <button className="book-button" onClick={() => handleBookNow(boat)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBoatList;
