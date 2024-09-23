import React from 'react';
import './Logoutb.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logoutb = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); // Adjust URL as needed
      localStorage.removeItem('token'); // Optionally clear local storage
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
};

export default Logoutb;