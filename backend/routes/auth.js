const express = require('express');
const User = require('../models/userSchema');
const Property = require('../models/propertyList')
const router = express.Router();
const tempo="74078989154";
const fs = require('fs');
/////////////////PINATA SDK///////////////////
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK('5a49894538632b68ae75', '46f8de1eeada78c55d54850b867546aa248796e42f45a518e3f4743d5a0bf8d1');


//////////////////////////////////////////Route #0--checking account type////////////////////////////////
router.post('/', async(req, res)=>{
    try {
        let user = await User.findOne({Wallet:req.body.Wallet}); //checking if user exists
        if (user) {
            console.log(user)
            return res.status(200).json(user.property_owner)
        }
        else{
            return res.status(400).json(null)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
      }
    })

//////////////////////////////////////////Route #1--Register---//////////////////////////////////////////
router.post('/register', async(req, res)=>{
    try {
        let user = await User.findOne({aadhar_no:req.body.aadhar_no}); //checking if user exists
        if (user) {
            console.log(user)
            return res.status(200).json({success: true,
                message: "Yes a user with this Aadhar exists",user})
        }
        else{
            return res.status(400).json({message: "A user with this Aadhar does not exists" })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
      }
    })

    //////////////////////////////////////////Route #2--List Property---//////////////////////////////////////////

    router.post('/listproperty', async(req, res)=>{
        const {Wallet,address,img,description,price,securityDeposit,area,pincode,state }=req.body
        const user=await User.findOne({Wallet})
        if(user.property_owner!=true){
            return res.status(401).json({error:"YOU ARE NOT A PROPERTY OWNER"});
        }
        else{
        try{
            const propertyExists= await Property.findOne({address});
            if(propertyExists){
                return res.status(422).json({error:"Property already exists"});
            }
            else{
                const newProperty =new Property({address,img,description,price,securityDeposit,area,facilities:{
                    beds:req.body.facilities.beds,
                    bathrooms:req.body.facilities.bathrooms
                  },pincode,state })
                await newProperty.save();
                res.status(200).json({message:"new property has successfully been added for verification "})
                }
        }
        catch(error){
            console.log(error);
            res.status(500).send("Some Error occured");
        }
        }
    });

//////////////////////////////////////////Route #3--Land Inspector---//////////////////////////////////////////
router.post('/landinspector', async(req, res)=>{
    const {_id}=req.body
    try{
        const propertyExists= await Property.updateOne({_id:_id},{
            $set:{
                verified:true
            }  
        })
        if(propertyExists){

            return res.status(200).json({message:"Property is authenticated for listing"});
        }
        else{
            res.status(422).json({error:"not authenticated"})
            }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Some Error occured");
    }

});
//////////////////////////////////////////Route #4--User Dashboard verified requests---//////////////////////////////////////////
router.post('/userdashboard', async(req, res)=>{
    const {owner}=req.body
    try{
        const verifiedRequests=await Property.find({owner:owner,minted:false,verified:true})//{owner:req.body.owner,verified:true}
        if(verifiedRequests){

            return res.status(200).json(verifiedRequests);
        }
        else{
            res.status(422).json({error:"You have no verified properties available"})
            }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Some Error occured");
    }

});
//////////////////////////////////////////Route #5--User Dashboard publish to blockchain---//////////////////////////////////////////
router.post('/userdashboard/publishtoblockchain', async(req, res)=>{
    
    try{
        if(req.body.id){
            console.log(req.body.id) //what if another person has this property id and tries to impersonate the owner
            const propToBePublished=await Property.find({_id : req.body.id});
            console.log(propToBePublished[0].facilities);
           let image = propToBePublished[0].img.split("base64,")[1]; //taking out "data:image/jpeg;base64," from the base64 string
           //const myArray = propToBePublished[0].img.split("data:image/png;base64,,"); 
           //console.log(image)
           var d = new Date(Date.now());
           const imageBuffer = Buffer.from(image,'base64');
           fs.writeFileSync('./new-path.jpg', imageBuffer); //`${d.toString()}.jpg` //saving image locally
           
           const pinToIpfs=async()=>{ ////////////Pinning Property to IPFS
           const fileDataDecoded = fs.createReadStream('./new-path.jpg');
           //console.log(fileDataDecoded)
           
           
           const options = {
               pinataMetadata: {
                   name: propToBePublished[0].address, //optional just for ease of recognition
                   keyvalues: {
                       customKey: 'customValue',
                       customKey: d.toString(),
                   }
               },
               pinataOptions: {
                   cidVersion: 0
               }
           };
           const pinFileToIPFS=()=>{
               return pinata.pinFileToIPFS(fileDataDecoded, options).then((result) => {
                   //handle results here
                   console.log(result) ////returns whether image is duplicate
                   return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
               }).catch((err) => {
                   //handle error here
                   console.log(err);
               });
           
           }
           
           const imageUrl= await pinFileToIPFS(); //returns image URI
           console.log(imageUrl)
           
           
           const body = {
               owner:propToBePublished[0].owner, //owner of the property
               address: propToBePublished[0].address,
               price: propToBePublished[0].price,
               securityDeposit: propToBePublished[0].securityDeposit,
               image:imageUrl,
               facilities:{ beds:3,
                            bathrooms:4
               },
               description:propToBePublished[0].description,
               pincode:propToBePublished[0].pincode,
               state:propToBePublished[0].state
           };
           const pinJSONToIPFS=(body)=>{
               return pinata.pinJSONToIPFS(body, options).then((result) => {
                   //handle results here
                   return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
               }).catch((err) => {
                   //handle error here
                   console.log(err);
               });
           }
           const metaData= await pinJSONToIPFS(body); // returns Metadata URI
           //console.log(metaData);
           return metaData
        } //113 line pinIpfs async function
           const metaData=await pinToIpfs();
           console.log(metaData)
           if(metaData){
            await Property.updateOne({_id:req.body.id},{$set:{minted:true}}) //error handling required? 
           }
         return res.status(200).json(metaData); 
        }
        else{
            res.status(422).json({error:"Object did not arrive"})
            }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Some Error occured");
    }

});
//email: req.body.email
module.exports = router
//aadhar_no:tempo