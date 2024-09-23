// models/boatreg.js

const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  boatName: { type: String, required: true },
  boatType: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  licenseNumber: { type: String, required: true },
  licenseDocument: { type: String }, // File path for license document
  speed: { type: Number, required: true },
  capacity: { type: Number, required: true },
  engineType: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
  image: { type: String }, // File path for the boat image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Boatreg', boatSchema);
