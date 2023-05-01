import axios from "axios";
import { ethers } from 'ethers';
import { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";

function ViewProperties({propertyNft,properties,provider}) { //properties contains an array of metadata of nfts (NOT token URIs)
  console.log(propertyNft)                         // https://gateway.pinata.cloud/ipfs/QmXsC9BvuSTkzBp5R2SRzpa3udHURqsAC8BiD9b5zJTEBB
  console.log(properties)
  const [tempData, setTempData] = useState([]);
  // const fetchData=async()=>{
  //   const response=await fetch("https://gateway.pinata.cloud/ipfs/QmXsC9BvuSTkzBp5R2SRzpa3udHURqsAC8BiD9b5zJTEBB")
  //   const res=await response.json()
  //   setTempData([res]) //transforming it to an array to use map fn //for ease of replacing 
  //   console.log(tempData)
  // }
  //fetchData();
  
  const [data, setData] = useState([]);
  useEffect(() => {
    //fetchData();
    axios
      .get("http://localhost:5000/viewproperties")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  },[]);
  const rentProperty=async(obj)=>{
    console.log(obj)
    console.log(obj.tokenid)
    const signer = provider.getSigner();
    console.log(signer)
    const Amount= Number(obj.price)+Number(obj.securityDeposit) //typeof(Amount) is Number
    const tx= await propertyNft.connect(signer).rent(obj.tokenid,{value: ethers.utils.parseUnits(`${Amount}`)}) //{value: ethers.utils.parseEther(obj.price)}
    //securityDeposit and rentAmount are strings in ether unit stored in wei representation in the contract //👆valueString,unit
    //example if securityDeposit==12 then its stored as 12*10^18 wei which is 12 eth ,hence eth unit is used above in parsing
    console.log(tx)
    const ftx= await tx.wait();
    console.log(ftx)
    }   
  return ( 
    <div className="" >
      <h2 style={{backgroundColor: "#1750AC", color:"white",padding: "20px",}}>Homes near you</h2>
      <div className="row ">
        {console.log(data)}
       {properties.map((obj) => {
        
          //console.log(base64String)
          return (
            
             <div className="col">
              <div className="card" style={{ width: "" ,height:"94vh"}}>
                  <img className="card-img-top" src={obj.image} alt="Card image cap" />
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

                  <button className="btn btn-primary" key={obj.tokenId} onClick={()=>rentProperty(obj)}>Rent</button>
                  </div>
                  </div>
                  </div>
              </div>

            
            );
    })} {/*<--- map bracket */}
    </div>
    </div>
  );
}
export default ViewProperties
//<img id='base64image' {`src='data:image/jpeg;base64,${base64String}}/>
//<img key={index} src={`data:image/jpeg;base64,${singleData.img.data.toString('base64')}`}width="300"/>    