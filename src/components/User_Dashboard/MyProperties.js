import React,{useState,useEffect,useContext} from 'react'
import { Contract, ethers } from 'ethers';
import './Transactions.css'//////////////////// ⭐⭐CSS IS IMPORTED HERE
import UserDashboard from '../UserDashboard'
import AppContext from '../../context/AppContext';
//import { set } from 'mongoose';

function MyProperties() {
  
  const {user,propertyNft,provider,loadBlockchainData,account}=useContext(AppContext)

  const [myProperties,setMyProperties]=useState([])
  const [isPropertyOwner,setIsPropertyOwner]=useState()
  const [toggle,setToggle]=useState(true)
  useEffect(() => {
    loadBlockchainData()
    getMyproperties()
  },[]) 
  var i=0;
  const tempProperties=[]
  const togglePop = () => {
    toggle ? setToggle(false) : setToggle(true);
  }
  const getMyproperties=async()=>{
     
     if(account){ //////////////////////if statement
      console.log(`Account address from getMyproperties : ${account}`)
      console.log(user)
      const ifPropertyOwner=user[0].property_owner;
      console.log(ifPropertyOwner)
     setIsPropertyOwner(ifPropertyOwner)
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
          const propertyInfo=await propertyNft.propertyInfo(i);
          console.log(`Property info that contain latest Transaction Time${propertyInfo[2]}`)
          let latestTransactionTime=propertyInfo[2];//2 is the array index of latest transaction time in smart  contract
          latestTransactionTime=ethers.BigNumber.from(latestTransactionTime).toString();
          metadata={...metadata, latestTransactionTime:latestTransactionTime} //adding latest transaction time
          tempProperties.push(metadata)
        }
        console.log(tempProperties)
        setMyProperties(tempProperties);
        console.log(`array from tenent if clause${myProperties}`)
        console.log(rentedProperties[0].toNumber())
        const tokens=rentedProperties[0].toNumber();
          }
          else if(isPropertyOwner){ //stores the properties owned by the owner into myProperties if the connected user is a property owner
            const ownedProperties=await propertyNft.getPropertiesOwnedBy(account)// to be filled
            console.log(ownedProperties)
            for(var i=0;i<ownedProperties.length;++i)
                {
                  
                  console.log(ownedProperties[i].toNumber())
                  const num=ownedProperties[i].toNumber() //to get token ID of properties owned by this account          
                  const uri = await propertyNft.tokenURI(num) // just a note Zero address = ethers.constants.AddressZero
                  const response = await fetch(uri)
                  let metadata = await response.json()
                  metadata={...metadata, tokenid:num}
                  const propertyInfo=await propertyNft.propertyInfo(i);
                  let latestTransactionTime=propertyInfo[2];
                  latestTransactionTime=ethers.BigNumber.from(latestTransactionTime).toString();
                  metadata={...metadata, latestTransactionTime:latestTransactionTime}//adding latest transaction time
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
        console.log(`array from property owner if clause${myProperties}`)
          }
        }
      else{
     console.log('please connect your wallet')
      } ///////////////if statement end
    
    }
  const payment=async(obj)=>{
  
    //check last paid date here


    const Amount= Number(obj.price)
    const signer = await provider.getSigner(); // signer
    console.log(signer)
    const tx= await propertyNft.connect(signer).payRent(obj.tokenid,{value: ethers.utils.parseUnits(`${Amount}`)})
    console.log(tx)
    const ftx= await tx.wait();
    console.log(ftx)
         if(ftx){
          setToggle(false) //to disable pay button
         }                    //if payment succesfull update the last payment date for the token id
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
    if(tx){
   // await getMyproperties() //to get updated rental information and update the status in table i.e disable end contract button
    await loadBlockchainData(); //to refresh properties state array to reflect in View properties-Market Place
     }
  }
  return (
    <>
    <UserDashboard/>
   <div style={{marginLeft:"250px"}}>
   <h1 onClick={getMyproperties} style={{color:"white",padding: "5px",fontSize:"25px",marginLeft:"0px",textAlign:"center"}}>View my properties </h1>
{
console.log(myProperties)}
   
  <table className="table table-bordered"style={{color:"white"}}>
    <thead className="thead-light">
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
        let currentDate=new Date()
        currentDate=currentDate.getTime()/1000
        console.log(`Current Date => ${currentDate}`)
        {++i}
        console.log(obj)
        //Number(obj.latestTransactionTime)+60<Number(currentDate)?setToggle(true):setToggle(false);
        return(
          <tr>
          <th scope="row">{i}</th>
          <td>{obj.address}</td>
          <td>{`${obj.price} ETH`}</td>{isPropertyOwner==true ? //maybe i shoud use isPropertyOwner==true //if property owner show end contract
                  (obj.isRented?
                  <td><button type="button" className="btn btn-danger" key={obj.tokenId}  onClick={()=>endContract(obj)}>End contract</button></td> //if it is rented show this button
                  : "yet to be rented"        //<td><button type="button" className="btn btn-danger" key={obj.tokenId} disabled onClick={()=>endContract(obj)}>End contract</button></td>//if it is not rented then disable this button
                  )
/*if tenent*/ :
                <td>{//toggle to immediately diasble button after succesfulll payment and latest transaction time to diasble buttons of properties if payment not due 
                  toggle&&Number(obj.latestTransactionTime)+60<Number(currentDate) //checking for due date
                  ?<button type="button" className="btn btn-light"key={obj.tokenId} onClick={()=>payment(obj)}>Pay now</button>
                  :<button type="button" className="btn btn-outline-secondary disabled"key={obj.tokenId} >Not Due</button>
                  }
                  </td>
          }
          {console.log(Number(obj.latestTransactionTime)+60<Number(currentDate)?true:false)}
          {console.log(ethers.BigNumber.from(obj.latestTransactionTime).toString())}
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
//Number(obj.latestTransactionTime)+60<Number(currentDate)
//?<button type="button" className="btn btn-success"key={obj.tokenId} onClick={()=>payment(obj)}>Pay now</button>
//:<button type="button" className="btn btn-secondary disabled"key={obj.tokenId} onClick={()=>payment(obj)}>Not Due</button>