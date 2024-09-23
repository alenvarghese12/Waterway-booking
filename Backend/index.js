require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db/connection"); // Corrected spelling
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const boatRoutes = require('./routes/boats'); 
const path = require('path'); 

connection(); // Call the function using the correct name

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Configure session (move this up before the routes)
app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://reg:reg1@cluster0.3eg1v.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0' }), // Store session in MongoDB
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/boats', boatRoutes);
app.use('/api/auth', userRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/boatRoutes', boatRoutes);
// app.use('/api/auth', require('./routes/auth'));


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}..`));
