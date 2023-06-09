import React,{useState,useEffect,useContext} from 'react'
//import axios from 'axios'
import FileUploaded from './FileUploaded'
//import { use } from '../../backend/routes/auth';
import AppContext from '../context/AppContext';

function ListProperty() {
  const {account}=useContext(AppContext)
  let base64Code="";
  const getBase64=(file, cb)=>{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
const[filedata,setFileData]=useState(null)
// useEffect(()=>{
//   getBase64(filedata, (result) => {
//     base64Code = result;
//   });
//   console.log(base64Code)
// },[filedata])



  const [formData, setFormData] =useState({
    address: "",
    price:"",
    securityDeposit:"",
    description:"",
    city:"",
    beds:"",
    bathrooms:"",
    state:"",
    zip:"",
  })
  if(formData.zip.length>6){
    setFormData({
      ...formData,
      ["zip"]: formData.zip.slice(0,6)
    }); 
  }

  const handleOnChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log("form data is being updated ");
    //setAadhar_no(event.target.value)
  }
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    getBase64(filedata, async(result) => {
      base64Code = result;
      console.log(base64Code)
      const response = await fetch("http://localhost:5000/listproperty", {
        method: 'POST', /////////////////////////////Fetching from DB///////////////
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Wallet:account,
          address:formData.address,
          price:formData.price,
          securityDeposit:formData.securityDeposit,
          description:formData.description,
          img:base64Code,
          city:formData.city,
          facilities:{beds:formData.beds,
            bathrooms:formData.bathrooms},
            state:formData.state,
            zip:formData.zip,
                  
        })
    });
    const json = await response.json()
    if(response.status ==200){
      alert("Property  has been submitted for verification")
    }
    if(json.error){
      console.log(json.error)
      alert(json.error)
    }

    });

  };
  return (
    <div className="row my-10" style={{margin:"12px"}}>
      <h3 style={{backgroundColor: "#1750AC", color:"white",padding: "20px",}}>List your property</h3>
      <form action="/listproperty"method="POST" encType="multipart/form-data"> 
        <div className="row ">
          <div className="col-md-4 mb-3 w-50">
            <label htmlFor="validationDefault02">Address</label>
            <input
              type="text"
              className="form-control"
              value={formData.address}
              onChange={handleOnChange}
              id="validationDefault0289"
              name="address"
              placeholder="Address "
              defaultValue=""
              required=""
            />
          </div>
          <div className="col-md-4 mb-3 w-25">
            <label htmlFor="validationDefault02">Price</label>
            <input
              type="number"
              className="form-control"
              value={formData.price}
              onChange={handleOnChange}
              id="validationDefault02"
              name="price"
              placeholder="Rent amount in Ether"
              defaultValue=""
              required=""
            />
          </div>
          <div className="col-md-4 mb-3 w-25">
            <label htmlFor="validationDefault02">Security Deposit</label>
            <input
              type="number"
              className="form-control"
              value={formData.securityDeposit}
              onChange={handleOnChange}
              id="validationDefault02"
              name="securityDeposit"
              placeholder="Security Deposit in Ether"
              defaultValue=""
              required=""
            />
          </div>
          <div className="col-md-4 mb-3 w-25">
            <label htmlFor="validationDefault02">Beds</label>
            <input
              type="number"
              className="form-control"
              value={formData.beds}
              onChange={handleOnChange}
              id="validationDefault02"
              name="beds"
              placeholder="No.of beds"
              defaultValue=""
              required=""
            />
          </div>
          <div className="col-md-4 mb-3 w-25">
            <label htmlFor="validationDefault02">Bathrooms</label>
            <input
              type="number"
              className="form-control"
              value={formData.bathrooms}
              onChange={handleOnChange}
              id="validationDefault02"
              name="bathrooms"
              placeholder="No.of bathrooms"
              defaultValue=""
              required=""
            />
          </div>
          <div className="col-md-4 mb-3 w-50">
            <label htmlFor="validationDefault01">Description</label>
            <textarea
              className="form-control"
              value={formData.description}
              onChange={handleOnChange}
              id="exampleFormControlTextarea1"
              name="description"
              rows={3}
              defaultValue={""}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6 mb-3 w-25">
            <label htmlFor="validationDefault03">City</label>
            <input
              type="text"
              className="form-control"
              value={formData.city}
              onChange={handleOnChange}
              id="validationDefault03"
              name="city"
              placeholder="City"
              required=""
            />
          </div>
         

          <div className="col-md-3 mb-3 w-25">
            <label htmlFor="validationDefault04">State</label>
            <input
              type="text"
              className="form-control"
              value={formData.state}
              onChange={handleOnChange}
              id="validationDefault04"
              name="state"
              placeholder="State"
              required=""
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault05">Zip</label>
            <input
              type="number"
              className="form-control"
              value={formData.zip}
              onChange={handleOnChange}
              id="validationDefault05"
              name="zip"
              placeholder="Zip"
              required=""
            />
          </div>
        </div>

        <div className="col-md-3 mb-3 w-50" style={{margin:"25px"}} >
        <FileUploaded  onFileSelect={(file) => setFileData(file)}></FileUploaded>
        </div>
      <h1></h1>



        <button className="btn btn-primary"  style={{margin:"25px"}} type="submit" onClick={handleOnSubmit}>
          Submit for verification 
        </button>
      </form>
      
    </div>
  );
}

export default ListProperty;
