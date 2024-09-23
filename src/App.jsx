import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';  // Import the Home component
import Loginp from './Components/Loginp/Loginp';
import Register from './Components/Register/Register'; 
import Admin from './Components/Admin/Admin';  // Use the AdminDashboard component
import UserInt from './Components/UserInt/UserInt';
import Boatowner from './Components/Boatowner/Boatowner';
import Logoutb from './Components/Logoutb/Logoutb';
import Addboat from './Components/Admin/Addboat';
import Viewusers from './Components/Admin/Viewusers';
import EditUser from './Components/Admin/EditUser';
import BoatRegistration from './Components/Boatowner/BoatRegistration';
import BoatList from './Components/Boatowner/BoatList';
import Boatlist from './Components/Admin/Boatlist';

const AppWrapper = () => {
  const location = useLocation();
  
  // Define paths where Navbar should not be shown
  const noNavbarPaths = [ '/userint', '/admin/*', '/boatowner/*'];  // Updated the admin path

  // Determine if Navbar should be rendered
  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userint" element={<UserInt />} />
        <Route path="/logout" element={<Logoutb />} />
    

        {/* Admin layout with nested routes */}
        <Route path="/admin/*" element={<Admin />}>
          <Route path="addboat" element={<Addboat />} />
          <Route path="viewusers" element={<Viewusers />} />
          <Route path="edituser/:id" element={<EditUser />} /> 
          <Route path="boatl" element={<Boatlist />} />
          {/* Add more admin-related routes here */}
        </Route>

        <Route path="/boatowner/*" element={<Boatowner />}>
          <Route path="boatregister" element={<BoatRegistration />} />
          <Route path="boatlist" element={<BoatList />} />
          
        </Route>
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;


