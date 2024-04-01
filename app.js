const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('./config/passport-jwtStrategy');
const listingRoutes = require('./routes/listing');
const authRoutes = require('./routes/auth');
const reviewsRoutes = require('./routes/review');
const userRoutes = require('./routes/user')
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Initialize Passport for authentication
app.use(passport.initialize());

// Routes
app.use('/listings', listingRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to Server");
            console.log("Database connected");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Comment: Make sure to handle other routes or errors if needed

