import {React,useState} from 'react'
import VerifiedRequests from './User_Dashboard/VerifiedRequests'
import Transactions from './User_Dashboard/Transactions'
import {BrowserRouter as Router,
  Switch,
  Route,Link} from 'react-router-dom'
import {SidebarData} from './SideBarData'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './SideBar.css'
function UserDashboard({propertyNft,provider}) {
  const [temp,setTemp]=useState(false);
  const show=()=>{
    setTemp(!temp)
  }
  
  return (
    <>
   
    <h1 onClick={show} style={{backgroundColor: "#1750AC", color:"white",padding: "15px", fontsize:"20",cursor: "pointer",margin:"0px",height:"60px"}}>This is user Dashboard</h1>

{/* temp?<VerifiedRequests propertyNft={propertyNft} provider={provider} />:"" */}
   
  


   <div className='navbar'>
          {/* {<Link to='#' className='menu-bars'>
            <FaIcons.FaBars />
          </Link>} */}
        </div>
        <nav className='nav-menu active'>
          <ul className='nav-menu-items'>
           {/* { <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>} */}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
       
   </>
  )
}

export default UserDashboard
