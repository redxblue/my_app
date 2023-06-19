import { ethers } from 'ethers';
// let a = ethers.BigNumber.from(13)
// let b = ethers.BigNumber.from(1000000000000000000)
// let prod= a.mul(b)
// console.log(prod.toString());
const ethValue =ethers.BigNumber.from(`${0.13*10**18}`).toString();  //10**18
console.log(ethValue)