import { ethers } from 'ethers';
import { useContext } from 'react';
//import logo from '../assets/logo.png';
import newlogo from '../assets/newlogo.png'
import {
    Link
  } from "react-router-dom";
import AppContext from '../context/AppContext';
  const landInspector="0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
////////////////////////propertyOwner state is passed here//////
const Navigation = () => { 

    const {account, setAccount}=useContext(AppContext)

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <nav>
            <ul className='nav__links'>
                <li><Link to="/register" >Register</Link></li> {/*onClick={() => {window.location.href="/register"}} */}
                {account == ("0x70997970C51812dc3A010C7d01b50e0d17dc79C8" ||"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")&&
                    <li><Link to="/listproperty">List Property</Link></li>}
                <li><Link to="/viewproperties">View Properties</Link></li>
              
                {account== landInspector &&
                    <li><Link to="/landinspector">Land Inspector</Link></li>
                    }
                {    account!= landInspector &&
                <li><Link to="/userdashboard">Dashboard</Link></li>
                }

            </ul>

            <div className='nav__brand'>
                
                <Link to="/"><img src={newlogo} alt="Logo" /></Link> 
                {/* onClick={() => {window.location.href="/"}} */}
            </div>

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}
            {console.log(account)}
            
        </nav>
    );
}

export default Navigation;