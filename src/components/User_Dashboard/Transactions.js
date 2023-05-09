import React from 'react'
import UserDashboard from '../UserDashboard'
import './Transactions.css'
function Transactions() {
  return (<>
    <UserDashboard/>
    <div className='Transactions'>
    <h4 style={{backgroundColor: "Grey", color:"white",padding: "5px",fontSize:"25px",marginLeft:"0px",textAlign:"center"}}> Transaction page</h4>
    </div>
    </>
  )
}

export default Transactions
