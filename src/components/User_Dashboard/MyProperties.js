import React,{useState,useEffect} from 'react'
import { ethers } from 'ethers';
import './Transactions.css'//////////////////// ⭐⭐CSS IS IMPORTED HERE
import UserDashboard from '../UserDashboard'
function MyProperties({propertyNft,provider}) {
  const [myProperties,setMyProperties]=useState([])
  useEffect(() => {
    getMyproperties()
  }, [])
  var i=0;
  const tempProperties=[]
  const signer = provider.getSigner(); // signer
  console.log(signer)
  const getMyproperties=async()=>{
  const rentedProperties = await propertyNft.getPropertiesRentedBy("0x90F79bf6EB2c4f870365E785982E1f101E93b906") //returns array of token Ids
  console.log(rentedProperties.length)
  for(var i=0;i<rentedProperties.length;++i)
  {
    console.log(rentedProperties[i].toNumber())
    const num=rentedProperties[i].toNumber()
    const uri = await propertyNft.tokenURI(num) 
    const response = await fetch(uri)
    let metadata = await response.json()
    metadata={...metadata, tokenid:num}
    tempProperties.push(metadata)
  }
  console.log(tempProperties)
  setMyProperties(tempProperties);
  console.log(myProperties)
  console.log(rentedProperties[0].toNumber())
  const tokens=rentedProperties[0].toNumber();
  }
  const payment=async(obj)=>{
    const Amount= Number(obj.price)
    const tx= await propertyNft.connect(signer).payRent(obj.tokenid,{value: ethers.utils.parseUnits(`${Amount}`)})
    console.log(tx)
    const ftx= await tx.wait();
    console.log(ftx)
  }
  return (
    <>
    <UserDashboard/>
   <div style={{marginLeft:"250px"}}>
   <h1 onClick={getMyproperties} style={{backgroundColor: "Grey", color:"white",padding: "5px",fontSize:"25px",marginLeft:"0px",textAlign:"center"}}>My properties </h1>
{console.log(myProperties)}
   
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Address</th>
        <th scope="col">Amount</th>
        <th scope="col">Pay</th>
      </tr>
    </thead>
    <tbody>
      {myProperties.map((obj)=>{
        
        {++i}
        console.log(obj)
        return(
          <tr>
          <th scope="row">{i}</th>
          <td>{obj.address}</td>
          <td>{`${obj.price} ETH`}</td>
          <td><button type="button" className="btn btn-primary" key={obj.tokenId} onClick={()=>payment(obj)}>Pay now</button></td>
        </tr> 
        )
        
      })}
 
    </tbody>
  </table>
 

   </div>
   </>
  )
}

export default MyProperties
