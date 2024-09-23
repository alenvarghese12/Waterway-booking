import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoatList = () => {
  const [boats, setBoats] = useState([]);
  const [editBoat, setEditBoat] = useState(null);
  const [formData, setFormData] = useState({
    boatName: '',
    boatType: '',
    description: '',
    price: '',
    capacity: ''
  });

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/boats/boatsd'); // Update with your endpoint
        setBoats(response.data); // Adjust based on your response structure
      } catch (error) {
        console.error('Error fetching boats:', error);
      }
    };

    fetchBoats();
  }, []);

  const handleDelete = async (boatId) => {
    try {
      await axios.delete(`http://localhost:8080/api/boats/boatsd/${boatId}`);
      setBoats(boats.filter(boat => boat._id !== boatId)); // Update state to remove deleted boat
    } catch (error) {
      console.error('Error deleting boat:', error);
    }
  };

  const handleEditClick = (boat) => {
    setEditBoat(boat);
    setFormData({
      boatName: boat.boatName,
      boatType: boat.boatType,
      description: boat.description,
      price: boat.price,
      capacity: boat.capacity
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/boats/boatsd/${editBoat._id}`, formData);
      setBoats(boats.map(boat => (boat._id === editBoat._id ? response.data : boat)));
      setEditBoat(null);
      setFormData({
        boatName: '',
        boatType: '',
        description: '',
        price: '',
        capacity: ''
      });
    } catch (error) {
      console.error('Error updating boat:', error);
    }
  };

  return (
    <div>
      <style>{`
        .boat-list-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .boat-list-container h2 {
          text-align: center;
          color: #333;
        }

        .boat-list {
          list-style-type: none;
          padding: 0;
        }

        .boat-list li {
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          background-color: #fff;
          transition: box-shadow 0.3s ease;
        }

        .boat-list li:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .boat-list h3 {
          margin: 0;
          font-size: 1.5em;
          color: #2c3e50;
        }

        .boat-list p {
          margin: 5px 0;
          color: #555;
        }

        .button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-right: 10px;
        }

        .button:hover {
          background-color: #2980b9;
        }

        .button.delete {
          background-color: #e74c3c;
        }

        .button.delete:hover {
          background-color: #c0392b;
        }

        .button.edit {
          background-color: #f39c12;
        }

        .button.edit:hover {
          background-color: #e67e22;
        }

        .edit-form {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f1f1f1;
        }

        .edit-form input {
          margin-bottom: 10px;
          padding: 10px;
          width: calc(100% - 22px);
        }
      `}</style>

      <div className="boat-list-container">
        <h2>Registered Boats</h2>
        {boats.length === 0 ? (
          <p>No registered boats found.</p>
        ) : (
          <ul className="boat-list">
            {boats.map(boat => (
              <li key={boat._id}>
                <h3>{boat.boatName} ({boat.boatType})</h3>
                <p>Description: {boat.description}</p>
                <p>Price: {boat.price}</p>
                <p>Capacity: {boat.capacity}</p>
                <button className="button edit" onClick={() => handleEditClick(boat)}>Edit</button>
                <button className="button delete" onClick={() => handleDelete(boat._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}

        {editBoat && (
          <div className="edit-form">
            <h3>Edit Boat</h3>
            <input
              type="text"
              name="boatName"
              placeholder="Boat Name"
              value={formData.boatName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="boatType"
              placeholder="Boat Type"
              value={formData.boatType}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
            <button className="button" onClick={handleUpdate}>Update Boat</button>
            <button className="button" onClick={() => setEditBoat(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoatList;

