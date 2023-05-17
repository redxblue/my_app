import {React,useEffect,useState} from 'react'
import { ethers } from 'ethers';
import axios from 'axios'
import { providers } from 'ethers'
import UserDashboard from '../UserDashboard';
import './Transactions.css' //////////////////// ⭐⭐CSS IS IMPORTED HERE
const FormData = require('form-data')
const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MWU2NjYwMS01NDc2LTQwMDYtOTk2ZS02Mjk2NGE5ZDk2YWQiLCJlbWFpbCI6InNoYXJvbmpvYjQxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWE0OTg5NDUzODYzMmI2OGFlNzUiLCJzY29wZWRLZXlTZWNyZXQiOiI0NmY4ZGUxZWVhZGE3OGM1NWQ1NDg1MGI4Njc1NDZhYTI0ODc5NmU0MmY0NWE1MThlM2Y0NzQzZDVhMGJmOGQxIiwiaWF0IjoxNjgyMDg0NDQ3fQ.bb5-y3RmrZkAryeIzn2zIIl_ztej-TOw7pTPT-jz0cw"
//const fs = require('fs')
//const pinataSDK = require('@pinata/sdk');
//const pinata = new pinataSDK('5a49894538632b68ae75', '46f8de1eeada78c55d54850b867546aa248796e42f45a518e3f4743d5a0bf8d1');

function VerifiedRequests({propertyNft,provider,account}){
 // console.log(MONGODB_URI)
 const propertyNftcontract=propertyNft
const owner=account//const owner="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
console.log(account)
const [data, setData] = useState([]);
useEffect(()=>{ 
    getVerifiedRequest()
    
},[account])
//console.log(propertyNftcontract.address)
const [metaData, setMetaData] = useState("");
const getVerifiedRequest=async()=>{ //fetching verified requesrts from database
    const response = await fetch("http://localhost:5000/userdashboard", { // condition: verified:true ,minted:false
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({owner:owner})   
    });
    const json = await response.json()
    console.log(response)
    setData(json) /////////////⭐⭐⭐⭐⭐
    console.log(json)
  }
  /////////////////////////////////convert base64 back to JS file object////////////////////////
  async function dataUrlToFile(dataUrl, fileName) {

    const res = await fetch(dataUrl);                        //this block here is useless no
    const Blob = await res.blob();
    return new File([Blob], fileName, { type: 'image/jpeg' });
  }
///////////////////////////////////////Minting property NFT/////////////////////////////////////////////////////////
const publishProperty=async(obj)=>{
  alert("Cleared the metamask data?")
  console.log(obj._id)
    const response = await fetch("http://localhost:5000/userdashboard/publishtoblockchain", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({id:obj._id})   
    });
    const json = await response.json() //returns property⭐metadata URI ⭐from IPFS
    console.log(json)
    setMetaData(json)
    console.log(metaData)
    const symbol = await propertyNftcontract.symbol()
    console.log(symbol)
    const signer = provider.getSigner();
    const creator = await signer.getAddress()
    console.log(obj.securityDeposit)
    const mintConfirmation= await propertyNftcontract.connect(signer).mint(creator,json,obj.securityDeposit,obj.price ) //⭐⭐⭐Minting
    console.log(mintConfirmation.hash)
    const receipt = await provider.getTransactionReceipt(mintConfirmation.hash);
    const tokenIdHex=receipt.logs[0].topics[3]
    console.log(tokenIdHex)
    const tokenId=(ethers.utils.formatEther(parseInt(tokenIdHex)))*10**18
    console.log(tokenId)
    //const totalSupply= await propertyNftcontract.totalSupply()
    if(mintConfirmation){
      alert(`your property has been minted to the blockchain with token ID ${tokenId}`)
    }
     
    // mintConfirmation.on('receipt', function(receipt){ //catching transfer event emitted by _mint function
    //   console.log(receipt.logs[0].topics[3]); // this prints the hex value of the tokenId 
    //   // you can use `web3.utils.hexToNumber()` to convert it to decimal
    // });
    const file = await dataUrlToFile(obj.img,obj._id) //convert base64 back to JS file object
    console.log(file)
    console.log(`your property with ID ${obj._id} has been minted`)

}
  return (
    <>
    <UserDashboard/>
      <div className='row' style={{marginLeft: "250px"}}>
      <h2 style={{backgroundColor: "Grey", color:"white",padding: "5px",fontSize:"25px",marginLeft:"0px",textAlign:"center"}}>Verified requests</h2>
      {data.map((obj) => {
        return (
          
          
           <div className="col" key={obj._id}>
            <div className="card"  style={{ width: "",height:"94vh" }}>
                <img className="card-img-top" src={obj.img} alt="Card cap" />
                <div className="card-body">
                <strong className='card-text'>  {obj.price} ETH </strong>
                  <p className='card-text'> <strong>{obj.facilities.beds}</strong> beds |
                  <strong>{obj.facilities.bathrooms} </strong>bathrooms 
                  </p>
               
                  <p className="card-text" style={{fontWeight:"400"}}>{obj.address}</p>           {/*`Price:${obj.price}` */}
                <p></p>
                <p className="card-title" style={{fontSize:"15px",fontWeight:"400"}}>
                  {obj.description}
                  </p>
               
                  <div class=" text-center" >
                <button type="button" key={obj._id}className="btn btn-success my-3" onClick={()=>publishProperty(obj)}>Publish to Blockchain</button>
                </div>
                </div>
                </div>
            </div>

          
        
         
          );
  })}

    </div>
    </>
  )
}

export default VerifiedRequests
