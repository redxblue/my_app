const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
let data = new FormData();
data.append('address', 'gsrsrg');
data.append('description', 'shgdgh');
data.append('price', '208');
data.append('area', '1665');
data.append('coordinates[latitude]', '656.21');
data.append('pincode', '766555');
data.append('state', 'imagine');
data.append('coordinates[longitude]', '71.0589');
data.append('verified', 'false');
data.append('testImage', fs.createReadStream('/C:/Users/FRIDAY/Desktop/longitude-and-latitude-simple.png'));

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'localhost:5000/listproperty',
  headers: { 
    'Accept': '*/*', 
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
