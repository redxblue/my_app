require('dotenv').config();
const mongoose = require('mongoose');
mongoUri=`${process.env.MONGO_URL}`
//console.log(mongoUri) 
const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;