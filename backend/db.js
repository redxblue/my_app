const path=require('path')
require("dotenv").config({path:path.resolve(__dirname, './.env')});
const mongoose = require('mongoose');
console.log(`this is connect url : ${process.env.MONGO_URL}`)
mongoUri=`${process.env.MONGO_URL}`
//console.log(mongoUri) 
const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;