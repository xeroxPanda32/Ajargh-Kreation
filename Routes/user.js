const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin } = require('../middleware/middleware');
const passport = require('../config/passport-jwtStrategy');

// Route to fetch all users
router.get('/', userController.getUsers);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, userController.deleteUser);

module.exports = router;
