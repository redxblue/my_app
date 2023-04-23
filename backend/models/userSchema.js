const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    Wallet: {
      type: String,
      unique: true,
    },
    name:{
        type:String
    },
    aadhar_no: {
        type: String,
        unique: true
      },
    address:{
        localilty:{
            type: String },
        State:{
            type: String},
        pincode:{
            type: String}, 
    },
    dob: {
      type: Date,
      
    },
    gender: {
        type: String
      },
      property_owner: {
        type: Boolean,
      },
  },
  { timestamps: true }
);

let User =mongoose.model("users", userSchema);

module.exports = User;
