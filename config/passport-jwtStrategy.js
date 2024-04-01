const passport = require('passport');
const passportJWT = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJWT;
const User = require('../model/user');
require('dotenv').config();

// JWT authentication options
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY, // Replace with your actual secret key
};

// Configure Passport to use the JWT strategy
passport.use(new Strategy(opts, async (jwtPayload, done) => {
    try {
        // Find user based on the email extracted from JWT payload
        const user = await User.findOne({ email: jwtPayload.email }).select('-password');
        if (!user) {
            // If user not found, authentication fails
            return done(null, false);
        }
        // If user found, authentication succeeds
        return done(null, user);
    } catch (err) {
        // Handle errors during authentication process
        return done(err, false);
    }
}));

module.exports = passport;

