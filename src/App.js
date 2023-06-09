import { useEffect, useState,createContext } from 'react';
import { ethers } from 'ethers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//import VerifyState from './context/verificationData/verifyState';


// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';
import Register from './components/Register';
import ListProperty from './components/ListProperty';
import ViewProperties from './components/ViewProperties';
import LandInspector from './components/LandInspector';
import UserDashboard from './components/UserDashboard';
import Transactions from './components/User_Dashboard/Transactions';
import VerifiedRequests from './components/User_Dashboard/VerifiedRequests';
import MyProperties from './components/User_Dashboard/MyProperties';
// ABIs
//import RealEstate from './abis/RealEstate.json'
//import Escrow from './abis/Escrow.json'
import PropertyNft from './abi/PropertyNft.json'
// Config
import config from './config.json';
import getUserInfo from './Database/getUserInfo';

import AppContext from './context/AppContext';

function App() {
  //getUserInfo();
    ///////////////My states///////////////////
  const[propertyOwner,setPropertyOwner]=useState(false);
  const [propertyNft,setPropertyNft]=useState({});
  const [properties,setProperties]=useState([])

    ///////////////My states///////////////////
    const [provider, setProvider] = useState(null)
    const [escrow, setEscrow] = useState(null)

    const [account, setAccount] = useState(null)

    const [homes, setHomes] = useState([])
    const [home, setHome] = useState({})
    const [toggle, setToggle] = useState(false);

    const loadBlockchainData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
      const network = await provider.getNetwork()
      console.log(network)
      console.log(provider);
      const propertyNft = new ethers.Contract(config[network.chainId].propertyNft.address, PropertyNft, provider)
                                                     //👆contract address,Abi,provider
      setPropertyNft(propertyNft)
      console.log(propertyNft)
      const totalSupply = await propertyNft.totalSupply()
      console.log(`total supply is ${totalSupply}`)
      const properties1=[];
      for(var i=0;i<totalSupply;++i) ////////Metamsk error of invalid token ID
      {
        const uri = await propertyNft.tokenURI(i) ///// initially will give error as no nft is minted yet
        const response = await fetch(uri)
        console.log(response)
        let metadata = await response.json()
        metadata={...metadata, tokenid:i} //appending token ID to the URI response //to be used with View Properties to rent
        console.log(metadata);
        properties1.push(metadata)
      }
      setProperties(properties1)
      console.log(properties)
      //const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
      //const totalSupply = await realEstate.totalSupply()
      //const homes = []

     /* for (var i = 1; i <= totalSupply; i++) {
        const uri = await realEstate.tokenURI(i)   //fetching from nfts👈👈👈⭐⭐⭐⭐⭐
        const response = await fetch(uri)
        const metadata = await response.json()
        homes.push(metadata)               ///////array of metadata⭐⭐⭐⭐⭐
      }

      setHomes(homes)

      const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
      setEscrow(escrow) */

      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
      })
    }

    useEffect(() => {
      loadBlockchainData()
    }, [])

    const togglePop = (home) => {
      setHome(home)
      toggle ? setToggle(false) : setToggle(true);
    }

  return (
    <div> 
    <AppContext.Provider value={{home,account,setAccount,provider,propertyNft,properties,loadBlockchainData,name:"Bhai"}}>
      <Router>
      <Navigation account={account} setAccount={setAccount} />
      <Switch>
      <Route exact path="/" >
            
            <Search />
            
            
<div className='cards__section'>



<hr />

<div className='cards'>
  {homes.map((home, index) => (
    <div className='card' key={index} onClick={() => togglePop(home)}>
      <div className='card__image'>
        <img src={home.image} alt="Home" />
      </div>
      <div className='card__info'>
        <h4>{home.attributes[0].value} ETH</h4>
        <p>
          <strong>{home.attributes[2].value}</strong> bds |
          <strong>{home.attributes[3].value}</strong> ba |
          <strong>{home.attributes[4].value}</strong> sqft
        </p>
        <p>{home.address}</p>
      </div>
    </div>
  ))}
</div> 

   {toggle && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
      )}
      </div>
        </Route>
        <Route exact path= "/register">
        <Register />
        </Route>
        <Route exact path= "/listproperty">
        <ListProperty account={account} />
        </Route>
        <Route exact path= "/viewproperties">
        <ViewProperties propertyNft={propertyNft} provider={provider} properties={properties} loadBlockchainData={loadBlockchainData} />
        </Route>
        <Route exact path= "/landinspector">
        <LandInspector />
        </Route>
        <Route exact path= "/userdashboard">
        <UserDashboard propertyNft={propertyNft} provider={provider}/>
        </Route>
        <Route exact path= "/userdashboard/transactions">
        <Transactions propertyNft={propertyNft} provider={provider}/> { /* no neeed fro prop passing here yet */}
        </Route>
        <Route exact path= "/userdashboard/verified_requests">
        <VerifiedRequests propertyNft={propertyNft} provider={provider} account={account}/> { /* no neeed fro prop passing here yet */}
        </Route>
        <Route exact path= "/userdashboard/my_properties">
        <MyProperties propertyNft={propertyNft} provider={provider} loadBlockchainData={loadBlockchainData} account={account}/> { /* no neeed fro prop passing here yet */}
        </Route>
      </Switch>     
     </Router>
     </AppContext.Provider>
    </div>
  );
}

export default App;

//<h3 style={{backgroundColor: "#1750AC", color:"white",padding: "10px",}}>Homes For You</h3>