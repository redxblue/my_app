import React,{useContext, useState} from 'react'
import './Register.css';
import { Link } from 'react-router-dom';
//import verifyContext from "../context/verificationData/verifiyContext"

//import Users from '../../backend/models/userSchema';
//import connectDB from '../Database/dbConnection.mjs';   // -mongo not working

function Register() {
  const userName="John Doe"
  const [formData, setFormData] =useState({
    aadhar_no: "",
    propertyOwner:false,
    otp:""
  })
  const [aadhar_no,setAadhar_no]=useState("");
  const[name,setName]=useState("");
  const[registered,setRegistered]=useState(false);
  const[isValid,setIsValid]=useState(false);
    console.log("you are now in Register Page");

    const handleOnChange=(e)=>{
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      console.log("aadhar number is being entered ");
      //setAadhar_no(event.target.value)
    }
    console.log(formData.aadhar_no.length)
    if(formData.aadhar_no.length>12){
      setFormData({
        ...formData,
        ["aadhar_no"]: formData.aadhar_no.slice(0,12)
      });
      //setAadhar_no(aadhar_no.slice(0,12))
      
    }
    if(formData.otp.length>6){
      setFormData({
        ...formData,
        ["otp"]: formData.otp.slice(0,6)
      });
      
      
    }


/////////////Aadhar Validation ////////////////
  const validation=async(e)=>{
  var regexp=/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  var x=formData.aadhar_no;
  if(regexp.test(x))
     { //alert("Valid Aadhar no.");
      e.preventDefault();

      setIsValid(true); ///////otp befotre this   
     }
  else{ alert("Please enter a valid Aadhar no.");
    }
  if(isValid===true){  //the statements inside this block should be executed by a fuction call defined just befor setisValid(true)
     // await verification(); //verification  // -mongo not working
     const response = await fetch("http://localhost:5000/register", {
      method: 'POST', /////////////////////////////Fetching from DB///////////////
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({aadhar_no:formData.aadhar_no})
  });
  const json = await response.json()
  console.log(json);
    if (json.success){
     console.log("console log from register.js aftewr checking with DB THE USER EXISTS")
     setRegistered(true)

    }
    else{
      alert("Invalid credentials");
      window.location.reload()
    }
    const data=json.user.name
    setName(data)
     console.log("aadhar is of right format")
     console.log(data);
    //  JSON.stringify(json.data)
    }

  }

  return (
    <div>
 {/*//////////////////////////////aadhar check form/////////////// */}
<form>
  <div className="mx-auto w-50" >                              
      <label htmlFor="exampleInputEmail1" className="form-label">
      Aadhar number
    </label>
    <input
      type="number" name="aadhar_no"value={formData.aadhar_no} onChange={handleOnChange} required="required"
      className="form-control" maxlength = "12" 
      id="aadharInput"
      aria-describedby="emailHelp"
    />
    <div id="emailHelp" className="form-text">
      We'll never share your Aadhar number with anyone else.
    </div>
  </div>
{/*/////////////////////////radio check form ////////Property owner state will be passed from app.js////////////*/}
<div class="mx-auto col-10 col-md-8 col-lg-6"> 
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"type="radio"name="propertyOwner" value={true} id="flexRadioDefault1"
      onChange={handleOnChange}/>
    <label className="form-check-label" htmlFor="flexRadioDefault1" > Property Owner</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="propertyOwner" value={false}id="flexRadioDefault2"
     onChange={handleOnChange}
    defaultChecked=""
    />
    <label className="form-check-label" htmlFor="flexRadioDefault2">
      Tenant
    </label>
  </div>
</div>
{/*/////////////////////////radio check form ////////Property owner state will be passed from app.js////////////*/}
  {/*////////OTP////////*/}
  {isValid && <div class="mx-auto col-10 col-md-8 col-lg-6"> 
  <label htmlFor="exampleInputEmail1" className="form-label">
      Enter OTP
    </label>
    <input
      type="number" name="otp"value={formData.otp} onChange={handleOnChange} required="required"
      className="form-control" maxlength = "6" 
      id="otpInput"
      aria-describedby="emailHelp"
    />
    <div id="emailHelp" className="form-text">
     Please enter the one time password.
    </div>
  </div>}





 
  <div class="text-center">
  <button type="submit" className="btn btn-primary my-3"onClick={validation}>
    Submit
  </button>
    </div>
</form>




{registered && 
<div className="alert alert-success my-5" role="alert">
<p class="text-center">
    {`Welcome ${name} you are successfully registered!\n Proceed to `} <Link to="/">Home page</Link></p>
</div>

}

{/* {userList.map((user)=>{
  return user.name;

})} */}


    </div>
  )
  }

export default Register
