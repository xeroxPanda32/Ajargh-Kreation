const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.urlencoded({ extended: true}));



mongoose.connect('mongodb://127.0.0.1:27017/ajargh').then(()=>{
    app.listen(3000, ()=>{
        console.log("connected to Server");
        console.log("db connected")
    })
}).catch((err)=>{
    console.log(err);
})
