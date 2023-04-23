const mongoose = require('mongoose');
const propertyList = new mongoose.Schema({
    owner:{
        type: String,
        default:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
    address:{
        type:String
    },
    img:{
        type:String                                //9.2 keys
    },
    description:{
        type:String
    },
    price:{
        type:String       //may want to include security deposit amount here
    },
    area:{
        type:String
    },
    facilities:{
        beds :{
            type: String },
        bathrooms:{
            type: String
        }     
    },
    pincode:{
        type: String
    },
    state:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    }

})
let Properties =mongoose.model("properties", propertyList);
module.exports =Properties;