import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './UserNavbar.css';
import Logoutb from '../Logoutb/Logoutb';

const UserInt = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="user-navbar">
      {/* Top Navbar */}
      <div className="top-navbar">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="navbar-title">Waterway</h1>
        <div className="nav-links">
          <Link to="userboatl" className="nav-link">Boats</Link>
        </div>
      </div>

      {/* Toggleable Side Navbar */}
      <div className={`side-navbar ${isSidebarOpen ? 'open' : ''}`}>
       <Logoutb/>
      </div>
      <Outlet/>
    </div>
  );
};

export default UserInt;
