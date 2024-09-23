const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['User', 'BoatOwner','Admin'], default: 'User', required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true },
  licenseNumber: { type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("userw", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().valid('User', 'BoatOwner','Admin').required().label("Role"),
    status: Joi.string().valid('Active', 'Inactive').required().label("Status"),
    licenseNumber: Joi.when('role', {
      is: 'BoatOwner',
      then: Joi.string().required().label("License Number"),
      otherwise: Joi.string().optional()
    }),
  });
  return schema.validate(data);
};

module.exports = { User, validate };





// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String },  // Not required for Google Sign-In
//   googleId: { type: String },  // New field for storing Google ID
//   profilePicture: { type: String },  // New field for storing Google profile picture URL
//   role: { type: String, enum: ['User', 'BoatOwner'], default: 'User', required: true },
//   status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true },
//   licenseNumber: { type: String },
// });

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWTPRIVATEKEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };

// const User = mongoose.model("userw", userSchema);

// const validate = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required().label("Name"),
//     email: Joi.string().email().required().label("Email"),
//     password: Joi.string().optional(),  // Optional for Google Sign-In
//     googleId: Joi.string().optional(),  // Optional field
//     profilePicture: Joi.string().optional(),  // Optional field
//     role: Joi.string().valid('User', 'BoatOwner').required().label("Role"),
//     status: Joi.string().valid('Active', 'Inactive').required().label("Status"),
//     licenseNumber: Joi.when('role', {
//       is: 'BoatOwner',
//       then: Joi.string().required().label("License Number"),
//       otherwise: Joi.string().optional()
//     }),
//   });
//   return schema.validate(data);
// };

// module.exports = { User, validate };


