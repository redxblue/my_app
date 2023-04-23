const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MWU2NjYwMS01NDc2LTQwMDYtOTk2ZS02Mjk2NGE5ZDk2YWQiLCJlbWFpbCI6InNoYXJvbmpvYjQxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDgxYTU2NWVkZWUyNTVmNDNmYjAiLCJzY29wZWRLZXlTZWNyZXQiOiJlOTlmMzBkM2NkYzc2MzRjZGNlMDA2MjUwYzgyZjkyYzE4NjVmZWQzYWY4OTg4Y2FiODE0ODM5MmZmNzViZDQzIiwiaWF0IjoxNjgxNjYyMTQ3fQ.TSgfBTngZLYEyehiFeihrS6Glqe-rx8Yk-sBz3tWnoU"
const data = JSON.stringify({
  "pinataOptions": {
    "cidVersion": 1
  },
  "pinataMetadata": {
    "name": "testing",
    "keyvalues": {
      "customKey": "customValue",
      "customKey2": "customValue2"
    }
  },
  "pinataContent": {
    "owner": "somevalue",
    "address": "somevalue",
    "img": "somevalue",
    "description": "somevalue",
    "price": "somevalue",
    "facilities": {
        "beds":"",
        "bathrooms":""
    },
    "pincode":"",
    "state":""

  }
});

const config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer PINATA JWT'
  },
  data : data
};

const res = await axios(config);

console.log(res.data);