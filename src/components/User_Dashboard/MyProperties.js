import React,{useState,useEffect,useContext} from 'react'
import { Contract, ethers } from 'ethers';
import './Transactions.css'//////////////////// ⭐⭐CSS IS IMPORTED HERE
import UserDashboard from '../UserDashboard'
import getUserInfo from '../../Database/getUserInfo';
import AppContext from '../../context/AppContext';

function MyProperties() {
  
  const {propertyNft,provider,loadBlockchainData,account}=useContext(AppContext)

  const [myProperties,setMyProperties]=useState([])
  const [isPropertyOwner,setIsPropertyOwner]=useState()
  useEffect(() => {
    loadBlockchainData()
    
  },[])
  useEffect(() => {
    getMyproperties()
    
  },account)
  var i=0;
  const tempProperties=[]
  const getMyproperties=async()=>{
    
     console.log(account)
     
     if(account){ //////////////////////if statement
      const isPropertyOwner=await getUserInfo(account)
      console.log(isPropertyOwner)
     setIsPropertyOwner(isPropertyOwner)
      if(!isPropertyOwner){////stores properties rented by tenent into myProperties if the connected user is a tenent
        const rentedProperties = await propertyNft.getPropertiesRentedBy(account) //returns array of token Ids const rentedProperties = await propertyNft.getPropertiesRentedBy("0x90F79bf6EB2c4f870365E785982E1f101E93b906")

        console.log(rentedProperties.length)
        for(var i=0;i<rentedProperties.length;++i)
        {
          console.log(rentedProperties[i].toNumber())
          const num=rentedProperties[i].toNumber()
          const uri = await propertyNft.tokenURI(num) 
          const response = await fetch(uri)
          let metadata = await response.json()
          metadata={...metadata, tokenid:num}
          tempProperties.push(metadata)
        }
        console.log(tempProperties)
        setMyProperties(tempProperties);
        console.log(myProperties)
        console.log(rentedProperties[0].toNumber())
        const tokens=rentedProperties[0].toNumber();
          }
          else if(isPropertyOwner){ //stores the properties owned by the owner into myProperties if the connected user is a property owner
            const ownedProperties=await propertyNft.getPropertiesOwnedBy(account)// to be filled
            console.log(ownedProperties)
            for(var i=0;i<ownedProperties.length;++i)
                {
                  
                  console.log(ownedProperties[i].toNumber())
                  const num=ownedProperties[i].toNumber()           //Zero address = ethers.constants.AddressZero
                  const uri = await propertyNft.tokenURI(num) 
                  const response = await fetch(uri)
                  let metadata = await response.json()
                  metadata={...metadata, tokenid:num}
                  const tenent=await propertyNft.tenentOf(num)
                  if(tenent!=ethers.constants.AddressZero){
                    metadata={...metadata, isRented:true}
                  }
                  else{
                    metadata={...metadata, isRented:false}
                  }
                  tempProperties.push(metadata)
                  
                }
        console.log(tempProperties)
        setMyProperties(tempProperties);
        console.log(myProperties)
          }
        }
      else{
     console.log('please connect your wallet')
      } ///////////////if statement end
    }
  const payment=async(obj)=>{
    const Amount= Number(obj.price)
    const signer = await provider.getSigner(); // signer
    console.log(signer)
    const tx= await propertyNft.connect(signer).payRent(obj.tokenid,{value: ethers.utils.parseUnits(`${Amount}`)})
    console.log(tx)
    const ftx= await tx.wait();
    console.log(ftx)
  }
  const endContract=async(obj)=>{
    const signer = await provider.getSigner(); // signer
    console.log(signer)
    const response =await propertyNft.connect(signer).endRent(obj.tokenid)
    console.log(response)
    const tx=await response.wait();
    console.log(tx)
    const newTenent= await propertyNft.tenentOf(obj.tokenid) //checking who is tenent now
    console.log(`Tenent of property with token ID ${obj.tokenid} is ${newTenent}`)
    await getMyproperties() //to get updated rental information and update the status in table ie disable end contract button

  }
  return (
    <>
    <UserDashboard/>
   <div style={{marginLeft:"250px"}}>
   <h1 onClick={getMyproperties} style={{backgroundColor: "Grey", color:"white",padding: "5px",fontSize:"25px",marginLeft:"0px",textAlign:"center"}}>My properties </h1>
{console.log(myProperties)}
   
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Address</th>
        <th scope="col">Amount</th>
        { console.log(isPropertyOwner)}
        {isPropertyOwner===null ? "":(isPropertyOwner===true ?<th scope="col">Status</th>:<th scope="col">pay</th>) }
      </tr>
    </thead>
    <tbody>
      {myProperties.map((obj)=>{
        
        {++i}
        console.log(obj)
        return(
          <tr>
          <th scope="row">{i}</th>
          <td>{obj.address}</td>
          <td>{`${obj.price} ETH`}</td>{isPropertyOwner==true ? //maybe i shoud use isPropertyOwner==true
              (obj.isRented?
              <td><button type="button" className="btn btn-danger" key={obj.tokenId}  onClick={()=>endContract(obj)}>End contract</button></td> //if it is rented show this button
              : "yet to be rented"        //<td><button type="button" className="btn btn-danger" key={obj.tokenId} disabled onClick={()=>endContract(obj)}>End contract</button></td>//if it is not rented then disable this button
              )
         :<td><button type="button" className="btn btn-primary" key={obj.tokenId} onClick={()=>payment(obj)}>Pay now</button></td>
          }
          </tr> 
        )
        
      })}
 
    </tbody>
  </table>
 

   </div>
   </>
  )
}

export default MyProperties
