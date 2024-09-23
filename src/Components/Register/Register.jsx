// import React, { useState } from 'react';
// import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa'; 
// import { Link, useNavigate } from 'react-router-dom'; 
// import Background from '../Background/Background';
// import './Register.css';
// import axios from 'axios';

// const Register = () => {
//   const [heroCount, setHero] = useState(4);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '', // Added confirmPassword field
//     role: 'User', // Default value
//     status: 'Active', // Default value
//     licenseNumber: '' // Added licenseNumber field
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const url = "http://localhost:8080/api/users";
//       const { data: res } = await axios.post(url, {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//         status: formData.status,
//         licenseNumber: formData.role === 'BoatOwner' ? formData.licenseNumber : undefined // Send licenseNumber only if role is BoatOwner
//       });
//       navigate("/login"); // Use navigate hook for redirect
//       console.log(res.message);
//     } catch (error) {
//       if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//         setError(error.response.data.message || 'Registration failed');
//       } else {
//         setError('An unexpected error occurred');
//       }
//     }
//   };

//   return (
//     <div>
//       <Background heroCount={heroCount} />
//       <div className="register-wrapper">
//         <form className="register-form" onSubmit={handleSubmit}>
//           <h1>Register</h1>
//           {error && <p className="error">{error}</p>} {/* Display error message if any */}
//           <div className="input-box">
//             <input 
//               type="text" 
//               placeholder="Name" 
//               name="name"
//               value={formData.name} 
//               onChange={handleChange} 
//               required 
//             />
//             <FaUser className="icon" />
//           </div>
//           <div className="input-box">
//             <input 
//               type="email" 
//               placeholder="Email" 
//               name="email"
//               value={formData.email} 
//               onChange={handleChange} 
//               required 
//             />
//             <FaEnvelope className="icon" />
//           </div>
//           <div className="input-box">
//             <input 
//               type="password" 
//               placeholder="Password" 
//               name="password"
//               value={formData.password} 
//               onChange={handleChange} 
//               required 
//             />
//             <FaLock className="icon" />
//           </div>
//           <div className="input-box">
//             <input 
//               type="password" 
//               placeholder="Confirm Password" 
//               name="confirmPassword"
//               value={formData.confirmPassword} 
//               onChange={handleChange} 
//               required 
//             />
//             <FaLock className="icon" />
//           </div>
//           <div className="input-box">
//             <select 
//               name="role"
//               value={formData.role} 
//               onChange={handleChange} 
//               required
//             >
//               <option value="User">User</option>
//               <option value="BoatOwner">BoatOwner</option>
//             </select>
//           </div>
//           {formData.role === 'BoatOwner' && (
//             <div className="input-box">
//               <input 
//                 type="text" 
//                 placeholder="License Number" 
//                 name="licenseNumber"
//                 value={formData.licenseNumber} 
//                 onChange={handleChange} 
//                 required 
//               />
//               <FaIdCard className="icon" />
//             </div>
//           )}
//           <button type="submit" className="register-button">Register</button>
//           <div className="login-link">
//             <p>Already have an account? <Link to="/login">Login here</Link></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Background from '../Background/Background';
import './Register.css';
import axios from 'axios';

const Register = () => {
  const [heroCount, setHero] = useState(4);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    status: 'Active',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status,
        licenseNumber: formData.role === 'BoatOwner' ? formData.licenseNumber : undefined
      });
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message || 'Registration failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <Background heroCount={heroCount} />
      <div className="register-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          {error && <p className="error">{error}</p>}
          
          <div className="input-box">
            <select 
              name="role"
              value={formData.role} 
              onChange={handleChange} 
              required
            >
              <option value="User">User</option>
              <option value="BoatOwner">BoatOwner</option>
            </select>
          </div>

          {formData.role === 'BoatOwner' && (
            <div className="input-box">
              <input 
                type="text" 
                placeholder="License Number" 
                name="licenseNumber"
                value={formData.licenseNumber} 
                onChange={handleChange} 
                required 
              />
              <FaIdCard className="icon" />
            </div>
          )}

          <div className="input-box">
            <input 
              type="text" 
              placeholder="Name" 
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input 
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
            <FaLock className="icon" />
          </div>

          <button type="submit" className="register-button">Register</button>

          {formData.role !== 'BoatOwner' && (
            <button type="button" className="google-signup-button">
              Sign Up With Google
            </button>
          )}

          <div className="login-link">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
