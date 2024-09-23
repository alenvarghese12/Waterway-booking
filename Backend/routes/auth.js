// const router = require("express").Router();
// const { User } = require("../model/userData");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");

// // Validation schema
// const validate = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required().label("Email"),
//         password: Joi.string().required().label("Password"),
//     });
//     return schema.validate(data);
// };

// // User login route
// router.post("/login", async (req, res) => {
//   try {
//       // Validate the request body
//       const { error } = validate(req.body);
//       if (error) return res.status(400).send({ message: error.details[0].message });

//       // Find user by email
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

//       // Check password
//       const validPassword = await bcrypt.compare(req.body.password, user.password);
//       if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

//       // Store user info in session
//       req.session.user = {
//           id: user._id,
//           role: user.role
//       };

//       console.log('Session:', req.session); // Log session info

//       // Determine redirect URL based on user role
//       let redirectUrl = '/';
//       if (user.role === 'Admin') {
//           redirectUrl = '/admin';
//       } else if (user.role === 'BoatOwner') {
//           redirectUrl = '/boatowner';
//       } else if (user.role === 'User') {
//           redirectUrl = '/userint';
//       }

//       // Send response with redirect URL
//       res.status(200).send({ message: "Logged in successfully", user: req.session.user, redirectUrl });
//   } catch (error) {
//       res.status(500).send({ message: "Internal Server Error" });
//   }
// });


// // Logout endpoint
// router.post('/logout', (req, res) => {
//     // Destroy the session
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).send({ message: "Error logging out" });
//         }
//         res.send({ message: "Logged out successfully" });
//     });
// });

// module.exports = router;
const router = require('express').Router();
const { User } = require('../model/userData');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Validation schema for login
const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required().label("Name"), 
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

// Validation schema for updating user
// Validation schema for updating user
const validateUpdate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required().messages({
            'string.base': `"Name" should be a type of 'text'`,
            'string.empty': `"Name" cannot be an empty field`,
            'string.min': `"Name" should have a minimum length of {#limit}`,
            'any.required': `"Name" is a required field`
        }), 
        email: Joi.string().email().optional()
    });
    return schema.validate(data);
};


// User login route
router.post("/login", async (req, res) => {
    try {
        // const { error } = validate(req.body);
        // if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        req.session.user = {
            id: user._id,
            role: user.role
        };

        console.log('Session:', req.session);

        let redirectUrl = '/';
        if (user.role === 'Admin') {
            redirectUrl = '/admin';
        } else if (user.role === 'BoatOwner') {
            redirectUrl = '/boatowner';
        } else if (user.role === 'User') {
            redirectUrl = '/userint';
        }

        res.status(200).send({ message: "Logged in successfully", user: req.session.user, redirectUrl });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: "Error logging out" });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.send({ message: "Logged out successfully" });
    });
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.params.id;

        // Validate request body
        const { error } = validateUpdate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        // Only check if email is taken if email is being updated
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).send({ message: 'Email is already taken by another user' });
            }
        }

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!updatedUser) return res.status(404).send({ message: 'User not found' });

        res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});



  


module.exports = router;

