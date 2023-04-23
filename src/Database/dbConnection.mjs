import mongoose from "mongoose";
const mongo_uri="mongodb+srv://Genesis:Genesisjanuary1@cluster0.mnpxzze.mongodb.net/users?retryWrites=true&w=majority";
const connectDB = async () => {

    if (mongoose.connections[0].readyState) {
        console.log("Already connected.");
        return;
    }

    mongoose.connect(mongo_uri, {}, (err) => {
        if (err) throw err;
        console.log("Connected to mongodb.");
    });

  
};

export default connectDB;















// const mongoose = require('mongoose');

// const mongoURI ="mongodb+srv://Genesis:Genesisjanuary1@cluster0.mnpxzze.mongodb.net/users?retryWrites=true&w=majority"
// const connectDB = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }
// connectDB();
// module.exports = connectDB;
