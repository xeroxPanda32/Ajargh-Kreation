const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport-jwtStrategy');
const User = require('../model/user');

// Route for user login

router.post('/register',async(req,res)=>{
    const { name, email, password ,role } = req.body;
    try{
        const newUser = new User({
            name,
            email,
            password,
            role
        })
        await newUser.save();
        const token = jwt.sign({ email: newUser.email }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token: token });
    }catch(err){
        return res.status(401).json({ error: err.message});
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Protected route example
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
