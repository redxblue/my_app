/////////////////////////////used to get account type from database////////////
const getUserInfo=async(account)=>{
const response = await fetch("http://localhost:5000/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({Wallet:account})   
    });
    const json = await response.json() //returns property⭐metadata URI ⭐from IPFS
    console.log(json)
    return json
  }
export default getUserInfo












// const mongoose = require('mongoose');

// const mongoURI ="mongodb+srv://Genesis:Genesisjanuary1@cluster0.mnpxzze.mongodb.net/users?retryWrites=true&w=majority"
// const connectDB = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     })
// }
// connectDB();
// module.exports = connectDB;
