//require('dotenv').config();
const mongoose = require('mongoose');
mongoUri="mongodb+srv://Genesis:Genesisjanuary1@cluster0.mnpxzze.mongodb.net/users"
//console.log(mongoUri) 
const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;