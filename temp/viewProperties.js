import axios from "axios";
import { useState, useEffect } from "react";

function ViewProperties({propertyNft,properties,loadBlockchainData}) { //properties contains an array of metadata of nfts (NOT token URIs)
  //console.log(propertyNft)                         // https://gateway.pinata.cloud/ipfs/QmXsC9BvuSTkzBp5R2SRzpa3udHURqsAC8BiD9b5zJTEBB
  console.log(properties)
  const [tempData, setTempData] = useState([]);
  const fetchData=async()=>{
    const response=await fetch("https://gateway.pinata.cloud/ipfs/QmXsC9BvuSTkzBp5R2SRzpa3udHURqsAC8BiD9b5zJTEBB")
    const res=await response.json()
    setTempData([res]) //transforming it to an array to use map fn //for ease of replacing 
    console.log(tempData)
  }
  
  
  const [data, setData] = useState([]);
  useEffect(() => {
    loadBlockchainData()
    axios
      .get("http://localhost:5000/viewproperties")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  },[]);
  return (
    <div className="" >
      <h2>Homes near you</h2>
      <div className="row ">
        {console.log(data)}
       {properties.map((obj) => {
        
          //console.log(base64String)
          return (
            
             <div className="col">
              <div className="card" style={{ width: "18rem" }}>
                  <img className="card-img-top" src={obj.img} alt="Card image cap" />
                  <div className="card-body">
                  <h5 className="card-title">{obj.address}</h5>           {/*`Price:${obj.price}` */}
                  <p className="card-text" style={{fontSize:"13px",fontWeight:"600"}}>
                    {obj.description}
                    <strong>{obj.facilities.beds}</strong> bds |
                        <strong>{obj.facilities.bathrooms}</strong> ba |
                        <strong>{obj.price}</strong> ETH
                  </p>
                
                  
                  <a href="#" className="btn btn-primary">
                  Rent
                  </a>
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