const express = require('express');
const router = express.Router();
const multer = require('multer');
const Boat = require('../model/boat');  // Ensure this model is correct
const { registerBoat } = require('../controllers/boatController'); // Add your controllers if applicable
const Boatreg = require('../model/boatreg');


// POST route to add a new boat type
router.post('/', async (req, res) => {
  try {
    const { type } = req.body;

    // Validation: Check if type is provided
    if (!type) {
      return res.status(400).send({ message: 'Boat type is required' });
    }

    // Validation: Check if the boat type already exists
    const existingBoat = await Boat.findOne({ type });
    if (existingBoat) {
      return res.status(400).send({ message: 'Boat type already exists' });
    }

    // Create new boat type
    const newBoat = new Boat({ type });
    await newBoat.save();

    res.status(201).send(newBoat);  // Send back the newly created boat
  } catch (error) {
    console.error('Failed to add boat type', error);
    res.status(500).send({ message: 'Failed to add boat type' });
  }
});

// GET route to fetch all unique boat types
// router.get('/types', async (req, res) => {
//   try {
//     const boats = await Boat.find().select('type -_id');
    
//     // Extract unique types
//     const boatTypes = [...new Set(boats.map(boat => boat.type))];

//     // Return unique boat types as an array of strings
//     res.status(200).json(boatTypes);
//   } catch (error) {
//     console.error('Failed to fetch boat types', error);
//     res.status(500).json({ message: 'Failed to fetch boat types' });
//   }
// });


router.get('/types', async (req, res) => {
  try {
    // Fetch all unique boat types directly
    const boats = await Boat.find().select('type -_id');

    // Return boat types as an array of strings
    res.status(200).json(boats.map(boat => boat.type));
  } catch (error) {
    console.error('Failed to fetch boat types', error);
    res.status(500).json({ message: 'Failed to fetch boat types' });
  }
});

// DELETE a boat type by ID
router.delete('/boatsde/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Deleting boat with ID:', id); // Log the ID
  try {
    const boat = await Boat.findByIdAndDelete(id);
    if (!boat) {
      return res.status(404).json({ message: 'Boat not found' });
    }
    res.status(200).json({ message: 'Boat deleted successfully' });
  } catch (error) {
    console.error('Failed to delete boat:', error); // Log the error
    res.status(500).json({ message: 'Failed to delete boat' });
  }
});



// PUT route to update a boat type by ID
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { type } = req.body;

//   try {
//     const updatedBoat = await Boat.findByIdAndUpdate(id, { type }, { new: true });
//     if (!updatedBoat) {
//       return res.status(404).json({ message: 'Boat not found' });
//     }
//     res.status(200).json(updatedBoat);
//   } catch (error) {
//     console.error('Failed to update boat type', error);
//     res.status(500).json({ message: 'Failed to update boat type' });
//   }
// });

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Ensure 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Unique file name
  }
});
const upload = multer({ storage: storage });

// POST route for registering a boat with file uploads
router.post('/register', upload.fields([{ name: 'image' }, { name: 'licenseDocument' }]), registerBoat);

// GET route for fetching available boat types
// router.get('/boatTypes', getBoatTypes);

// Export router (remove duplicate)

// Define your routes here
router.get('/boatsd', async (req, res) => {
  try {
    const boats = await Boatreg.find();
    res.status(200).json(boats);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch boats', error: error.message });
  }
});

// DELETE Route to Remove a Boat
router.delete('/boatsd/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Boatreg.findByIdAndDelete(id);
    res.status(200).send({ message: 'Boat deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete boat', error: error.message });
  }
});



router.put('/boatsd/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { boatName, boatType, description, price, capacity } = req.body;

    // Find the boat by ID and update it
    const updatedBoat = await Boatreg.findByIdAndUpdate(id, {
      boatName,
      boatType,
      description,
      price,
      capacity
    }, { new: true, runValidators: true });

    if (!updatedBoat) {
      return res.status(404).send({ message: 'Boat not found' });
    }

    res.status(200).json(updatedBoat);
  } catch (error) {
    console.error('Error updating boat:', error);
    res.status(500).send({ message: 'Failed to update boat', error: error.message });
  }
});


module.exports = router;
