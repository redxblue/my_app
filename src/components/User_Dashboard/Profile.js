import {React,useState,useEffect,useContext} from 'react'
import UserDashboard from '../UserDashboard'
import './Transactions.css'
import AppContext from '../../context/AppContext'
import './Profile.css'
function Profile() {
    
    const {user}=useContext(AppContext)
    console.log(user)
    
  return (
    <>
    <UserDashboard />
    {user.map((obj)=>{
      const addressValues =Object.values(obj.address);
      const addressKeys=Object.keys(obj.address);
        return(
            <div className="card" key={obj.Wallet}>
      <div className="bg uwu" />
      <div className="bg" />
      <div className="content">
        <div className="img">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
        </div>
        <div className="h1">
          {obj.name}
          <br />
       
        </div>
        <div className="p" >
        <b style={{fontSize: "14px"}}>{obj.property_owner?"Property owner":"Tenent"}</b>
        <p style={{fontSize: "15px"}}>Address : {"\n \n"+addressValues+""}
        </p>
        </div>
      </div>
    </div>
        )
})}
    </>
  )
}

export default Profile
