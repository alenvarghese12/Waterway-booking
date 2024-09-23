import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admindash.css';
import { FaBars } from 'react-icons/fa';
import Logoutb from '../Logoutb/Logoutb';

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="admin-dashboard">
      <div className="top-bar">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <h1>Admin</h1>
        {/* <div className="lg"><Logoutb /></div> */}
      </div>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="dashboard-links">
          <Link to="addboat">Add Boat</Link>
          <Link to="viewusers">View Users</Link>
          <Link to="boatl">Registered Boat</Link>
          {/* <Link to="view-reviews">View Reviews</Link> */}
          {/* <Link to="manage-reviews">Manage Reviews</Link> */}
          {/* <Link to="delete-boats">Delete Boats</Link> */}
          {/* <Link to="">Delete Users</Link> */}
          {/* <Link to="manage-boat-owners">Manage Boat Owners</Link> */}
          {/* Add other links as needed */}
          <Logoutb />
        </div>
        
      </div>
      <h1>welcome Admin</h1>
      <div className="admin-content">
      
        {/* Render the nested routes here */}
        <Outlet />
      </div>
      
    </div>

  );
};

export default Admin;
