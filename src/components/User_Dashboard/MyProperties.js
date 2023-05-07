import React,{useState,useEffect} from 'react'
import { ethers } from 'ethers';
import './Transactions.css'//////////////////// ⭐⭐CSS IS IMPORTED HERE
import UserDashboard from '../UserDashboard'
function MyProperties({propertyNft,provider}) {
  useEffect(() => {
    getMyproperties()
  }, [])

  const signer = provider.getSigner();
  console.log(signer)
  const getMyproperties=async()=>{
  const rentedProperties = await propertyNft.getPropertiesRentedBy("0x90F79bf6EB2c4f870365E785982E1f101E93b906")
  console.log(rentedProperties[0]._hex.toNumber())
   
    
    //const uri = await propertyNft.tokenURI(i)
    // await propertyNft.connect()
    // for(var i=0;;){

    // }
  }
  return (
    <>
    <UserDashboard/>
   <div style={{marginLeft:"250px"}}>
   <h1>My properties page</h1>

   
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
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td><button type="button" className="btn btn-primary" onClick="">Pay now</button></td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
 

   </div>
   </>
  )
}

export default MyProperties
