import {React,useEffect,useState} from 'react'  //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 -land Inspector

function LandInspector() {
useEffect(()=>{
getPendingRequests();
});
const [data, setData] = useState([]);

const getPendingRequests=async()=>{
const response = await fetch("http://localhost:5000/landinspector", {
      method: 'GET',    
  });
  const json = await response.json()
  console.log(json)
  setData(json)
}
const authenticateListing=async(id)=>{
  const response = await fetch("http://localhost:5000/landinspector", {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id:id})
  });
  const json = await response.json()
  console.log(json)
}
    
  return (
    <div className='row'>
      <h1>Welcome Mr.LandInspector</h1>
      <h2>Requests awaiting verification...</h2>
      {data.map((obj) => {
        return (
          
          
           <div className="col">
            <div className="card"  style={{ width: "18rem" }}>
                <img className="card-img-top" src={obj.img} alt="Card cap" />
                <div className="card-body">
                <h5 className="card-title">{obj.address}</h5>           {/*`Price:${obj.price}` */}
                <p className="card-text" style={{fontSize:"13px",fontWeight:"600"}}>
                  {obj.description}
                </p>
                <a href="#" className="btn btn-primary">
                View more details
                </a>
                
                <button type="button" key={obj._id}className="btn btn-success my-3" onClick={()=>authenticateListing(obj._id)}>Authenticate listing</button>
                </div>
                </div>
            </div>

          
        
         
          );
  })}

    </div>
  )
}

export default LandInspector
