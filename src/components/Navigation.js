import { ethers } from 'ethers';
//import logo from '../assets/logo.png';
import newlogo from '../assets/newlogo.png'
import {
    Link
  } from "react-router-dom";
////////////////////////propertyOwner state is passed here//////
const Navigation = ({ account, setAccount,formData,setFormData}) => { 
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <nav>
            <ul className='nav__links'>
                <li><Link to="/register" >Register</Link></li> {/*onClick={() => {window.location.href="/register"}} */}
                <li><Link to="/listproperty">List property</Link></li>
                <li><Link to="/viewproperties">view properties</Link></li>
                <li><Link to="/landinspector">Land Inspector</Link></li>
                <li><Link to="/userdashboard">User Dashboard</Link></li>
                

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