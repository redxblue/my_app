import React from 'react'
import './Profile.css'
import UserDashboard from '../UserDashboard'

function Profile () {
	
  return (<>
  <UserDashboard/>
  <h4 style={{backgroundColor: "Grey", color:"white",padding: "5px",fontSize:"25px",marginLeft:"0px",textAlign:""}}>Profile</h4>
	
  <div className="container">
  <div className="main-body">

    {/* /Breadcrumb */}
    <div className="row gutters-sm">
      {/*<div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="rounded-circle"
                width={150}
              />
              
  </div>
  </div>
        </div>
      </div>*/}
      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row ">
              <div className="col-sm-3">
                <h6 className="mb-0">Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">gfdhgj</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Aadhaar Number</h6>
              </div>
              <div className="col-sm-9 text-secondary">122323334434</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Wallet ID</h6>
              </div>
              <div className="col-sm-9 text-secondary">1W234E445566677</div>
            </div>
            <hr />
            {/*<div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Mobile</h6>
              </div>
              <div className="col-sm-9 text-secondary">(320) 380-4539</div>
            </div>
             <hr />*/}
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                Bay Area, San Francisco, CA
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Date Of Birth</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                5-06-1990
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
              
              </div>
            </div>
          </div>
        </div>
        </div>
              </div>
            </div>
          </div>
</>
  )
}

export default Profile