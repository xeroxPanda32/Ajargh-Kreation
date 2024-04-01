const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport-jwtStrategy');
const User = require('../model/user');
const { register, login, profile } = require('../controllers/authController');
require('dotenv').config();


// Route to handle user registration
router.post('/register', register)

// Route to handle user login
router.post('/login', login);

// Route to fetch user profile (requires authentication)
router.get('/profile', passport.authenticate('jwt', { session: false }), profile);

module.exports = router;
