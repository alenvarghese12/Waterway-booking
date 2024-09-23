import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import './Boatowner.css'; // Custom CSS file for styling
import Logoutb from '../Logoutb/Logoutb';

const Boatowner = () => {
  return (
    <div className="boatowner-dashboard">
      <nav className="navbar">
        <ul>
          <li><Link to="boatregister">Register Boat</Link></li>
          {/* <li><Link to="/manage-bookings">Manage Bookings</Link></li> */}
          {/* <li><Link to="/reviews">Reviews</Link></li> */}
          <li><Link to="boatlist">Boat Details</Link></li>
          <li><Logoutb /></li> {/* This could be the logout component */}
        </ul>
      </nav>
     
      <h1>Welcome, Boatowner</h1>
      <div className="boatowner-content">
        <Outlet />
    </div>
 
    </div>
 
  
  );
};

export default Boatowner;
