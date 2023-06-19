import axios from "axios";
import { ethers } from 'ethers';
import { useState, useEffect,useContext } from "react";
import AppContext from "../context/AppContext";

function ViewProperties() { //properties contains an array of metadata of nfts (NOT token URIs)
  const {name,propertyNft,properties,provider,loadBlockchainData}=useContext(AppContext)
  console.log(name)
  console.log(propertyNft)                         // https://gateway.pinata.cloud/ipfs/QmXsC9BvuSTkzBp5R2SRzpa3udHURqsAC8BiD9b5zJTEBB
  console.log(properties)
  const [toggle, setToggle] = useState(true);
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
    if(ftx){
        setToggle(false) //this makes the toggle part of the component re render
       }
       await loadBlockchainData();
      }   


  return ( 
    <div className="" >
      <h2 style={{ color:"white",padding: "20px",}}>Homes </h2>
      <div className="row ">
        {console.log(`properties from blockchain=> ${properties}`)}
       {properties.map((obj) => {
        
          //console.log(base64String)
          return (
            
             <div className="col">
              <div className="card" style={{ width: "" ,height:"auto"}}>
                  <img className="card-img-top" src={obj.image} alt="Card image cap" />
                  <div className="card-body">
                  <strong className='card-text'>Price : {obj.price} ETH </strong>
                  <br></br>
                  <strong className='card-text'> Security Deposit : {obj.securityDeposit} ETH </strong>
                  <p className='card-text'> <strong>{obj.facilities.beds}</strong> beds |
                  <strong>{obj.facilities.bathrooms} </strong>bathrooms 
                  </p>
               
                  <p className="card-text" style={{fontWeight:"400"}}>{obj.address},{obj.state}</p>           {/*`Price:${obj.price}` */}
                <p></p>
                <p className="card-title" style={{fontSize:"15px",fontWeight:"400"}}>
                  {obj.description}
                  </p>
               
                  
                  
                  <div class=" text-center" >
                 { toggle&&!obj.isRented?<button className="btn btn-primary" key={obj.tokenId} onClick={()=>rentProperty(obj)}>Rent</button>
                  : <button className="btn btn-secondary disabled" key={obj.tokenId} onClick={()=>rentProperty(obj)}>Tenanted</button>}
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