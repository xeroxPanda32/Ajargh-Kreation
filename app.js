const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')
const adminRoutes = require('./routes/listing');
const passport = require('./config/passport-jwtStrategy');
const authRoutes = require('./routes/auth')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(passport.initialize());
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/ajargh').then(()=>{
    app.listen(3000, ()=>{
        console.log("connected to Server");
        console.log("db connected")
    })
}).catch((err)=>{
    console.log(err);
})
