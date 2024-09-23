import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoatRegistration.css';

const BoatRegistration = () => {
  const [boatTypes, setBoatTypes] = useState([]);
  const [formData, setFormData] = useState({
    boatName: '',
    boatType: '',
    description: '',
    price: '',
    licenseNumber: '',
    licenseDocument: null,
    speed: '',
    capacity: '',
    engineType: '',
    status: 'active',
    image: null,
  });

  // Fetch available boat types from the backend (boats table)
  useEffect(() => {
    const fetchBoatTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/boats/types');
        console.log('Fetched boat types:', response.data);

        // Filter out invalid or empty boat types
        const validBoatTypes = response.data.filter(
          (type) => type.trim() !== '' && type.length > 2
        );

        setBoatTypes(validBoatTypes);
      } catch (error) {
        console.error('Failed to fetch boat types', error);
      }
    };

    fetchBoatTypes();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads (for image and license document)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Append all necessary fields from formData
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    console.log('Form Data:', Array.from(data.entries()));

    try {
      const response = await axios.post('http://localhost:8080/api/boats/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Boat registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering boat:', error.response.data); // Log the specific error message from the server
    }
  };

  return (
    <div className="boat-registration-container">
      <h2>Boat Registration</h2>
      <form onSubmit={handleSubmit} className="boat-registration-form">
        <label>Boat Name:</label>
        <input
          type="text"
          name="boatName"
          value={formData.boatName}
          onChange={handleChange}
          required
        />

        <label>Boat Type:</label>
        <select
          name="boatType"
          value={formData.boatType}
          onChange={handleChange}
          required
        >
          <option value="">Select a type</option>
          {boatTypes.map((boat, index) => (
            <option key={index} value={boat}>
              {boat}
            </option>
          ))}
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Price (Rs.):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>License Number:</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          required
        />

        <label>Upload License Document:</label>
        <input
          type="file"
          name="licenseDocument"
          onChange={handleFileChange}
          accept="application/pdf, image/*"
          required
        />

        <label>Speed:</label>
        <input
          type="number"
          name="speed"
          value={formData.speed}
          onChange={handleChange}
          required
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <label>Engine Type:</label>
        <input
          type="text"
          name="engineType"
          value={formData.engineType}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Under Maintenance</option>
        </select>

        <label>Boat Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />

        <button type="submit">Register Boat</button>
      </form>
    </div>
  );
};

export default BoatRegistration;
