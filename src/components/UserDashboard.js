import {React,useState,useContext} from 'react'
import VerifiedRequests from './User_Dashboard/VerifiedRequests'
import Transactions from './User_Dashboard/Transactions'
import {BrowserRouter as Router,
  Switch,
  Route,Link} from 'react-router-dom'
import {SidebarData} from './SideBarData'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './SideBar.css'
import AppContext from '../context/AppContext';

function UserDashboard() {
  const {blur,setBlur}=useContext(AppContext)
  const [temp,setTemp]=useState(false);
  const show=()=>{
    setTemp(!temp)
  }
  
  return (
    <>
   
    <h1 onClick={show} style={{color:"white",padding: "8px", fontsize:"16",cursor: "pointer",margin:"0px",height:"60px",textAlign:"left"}}>DASHBOARD</h1>

{/* temp?<VerifiedRequests propertyNft={propertyNft} provider={provider} />:"" */}
   
  


   <div className='navbar'>
          {/* {<Link to='#' className='menu-bars'>
            <FaIcons.FaBars />
          </Link>} */}
        </div>
        <nav className={blur?'nav-menu activeBlur':'nav-menu active'}>
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
