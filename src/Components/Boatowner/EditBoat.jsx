import React, { useState } from 'react';
import axios from 'axios';

const EditBoat = ({ boat, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...boat });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/boats/boatsd/${boat._id}`, formData);
      onUpdate(response.data);
      onClose(); // Close the edit form
    } catch (error) {
      console.error('Error updating boat:', error);
    }
  };

  return (
    <div>
      <h2>Edit Boat</h2>
      <form onSubmit={handleSubmit}>
        <label>Boat Name:</label>
        <input type="text" name="boatName" value={formData.boatName} onChange={handleChange} required />

        <label>Boat Type:</label>
        <input type="text" name="boatType" value={formData.boatType} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Capacity:</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />

        <button type="submit">Update Boat</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBoat;
