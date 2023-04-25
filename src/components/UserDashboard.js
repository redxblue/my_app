import React from 'react'
import VerifiedRequests from './User_Dashboard/VerifiedRequests'
function UserDashboard({propertyNft,provider}) {
  
  return (
   <><h1 style={{backgroundColor: "#1750AC", color:"white",padding: "15px", fontsize:"20"}}>This is user Dashboard</h1>
   <VerifiedRequests propertyNft={propertyNft} provider={provider} />
   </>
  )
}

export default UserDashboard
