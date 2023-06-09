import {React,useEffect,useState} from 'react'  //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 -land Inspector

function LandInspector() {
    
  useEffect(()=>{
  getPendingRequests();
  },[]);
  const [data, setData] = useState([]);
  const [authenticated,setAuthenticated]=useState(false)
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
    getPendingRequests();
    
  }
    
  return (
    <div className='row'>
      <h1 style={{backgroundColor: "#1750AC", color:"white",padding: "20px",}}>Welcome Mr.LandInspector</h1>
      <h2 style={{backgroundColor: "grey", color:"white",padding: "10px",fontSize:"15px"}}>Requests awaiting verification...</h2>
      {data.map((obj) => {
        return (
          
          
           <div className="col">
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
                <button type="button" key={obj._id}className="btn btn-success my-3" onClick={()=>authenticateListing(obj._id)}>Authenticate listing</button>
               </div>
                </div>
                </div>
            </div>

          
        
         
          );
  })}

    </div>
  )
}

export default LandInspector
