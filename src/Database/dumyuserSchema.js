import Users from "./userSchema";
import connectDB from "./dbConnection.mjs";
await connectDB();
const mongoUser= await Users.findOne({aadhar_no:aadhar_no});
console.log(mongoUser);
if(mongoUser){
    console.log("User is valid")
}