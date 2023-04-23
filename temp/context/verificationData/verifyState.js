//import VerifyContext from "./verifyContext";
import { useState } from "react";

const VerifyState = (props)=>{
    
    const userslist = [
        {
        "Wallet": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "aadhar_no": "540789891548",
        "name": "Jaison Varghese",
        "dob": "12/16/1978",
        "address": {
           "localilty": "Kartikulam - Kurakkanmoola Rd, Kurukkanmoola,Wayanad",
           "State": "Kerala",
           "pincode": "670646"
        },
        "gender": "male",
        "property_owner": "true"
     }
    ]
    const [userList,  setUserList]=useState(userslist);
    return (
        <VerifyContext.Provider value={{userList,setUserList}}>
            {props.children}
        </VerifyContext.Provider>
    )
}

export default VerifyState;