const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
require('dotenv').config();

const register = async (req, res) => {
    const { name, email, password, authLevel } = req.body;
    try {
        const newUser = new User({
            name,
            email,
            password,
            authLevel
        })
        await newUser.save();
        const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token: token });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

const profile = async (req, res) => {
    res.status(200).json({ user: req.user });
}

module.exports = {register, login, profile}