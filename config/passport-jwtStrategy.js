const passport = require('passport');
const passportJWT = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJWT;
const User = require('../model/user');


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_secret_key', // Replace with your actual secret key
};

passport.use(new Strategy(opts, async (jwtPayload, done) => {
    try {
        const user = await User.findOne({email: jwtPayload.email});
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;
