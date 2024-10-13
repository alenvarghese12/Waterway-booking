import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserBoatList.css';
import { useNavigate } from 'react-router-dom';

const UserBoatList = () => {
  const [boats, setBoats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleBookNow = (boat) => {
    navigate('/userint/booking', { state: { boat } });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/boats/boatsd');
        setBoats(response.data);
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
              src={`http://localhost:8080/uploads/${boat.image}`}
              alt={boat.boatName}
              className="boat-image"
              onClick={() => handleImageClick(`http://localhost:8080/uploads/${boat.image}`)} // Zoom on image click
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

      {/* Modal for zoomed image */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-image" src={selectedImage} alt="Zoomed" />
        </div>
      )}
    </div>
  );
};

export default UserBoatList;

