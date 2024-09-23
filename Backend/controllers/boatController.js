const Boatreg = require('../model/boatreg');

const registerBoat = async (req, res) => {
    try {
      const {  boatType, boatName, price, capacity, engineType, description, licenseNumber,speed, status } = req.body;
      const image = req.files?.image?.[0]?.filename;
      const licenseDocument = req.files?.licenseDocument?.[0]?.filename;
  
      // Validation for required fields
    //   if (!name || !type || !price || !capacity || !engineType || !description || !licenseNumber || !status) {
    //     return res.status(400).send({ message: 'All fields are required' });
    //   }
  
      // Create a new boat entry
      const newBoat = new Boatreg({
        boatName,
        boatType,
        price,
        capacity,
        engineType,
        description,
        licenseNumber,
        speed,
        status,
        image,
        licenseDocument,
      });
  
      await newBoat.save();
  
      res.status(201).json({ message: 'Boat registered successfully', boat: newBoat });
    } catch (error) {
      console.error('Error registering boat:', error);
      res.status(500).send({ message: 'Failed to register boat', error: error.message });
    }
  };
  

module.exports = {
  registerBoat
};
