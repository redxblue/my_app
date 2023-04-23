const connectToMongo = require('./db'); //refactoring is required for  image upload and retrive blocks
const express = require('express')
const cors = require("cors");
const Properties = require('./models/propertyList')/////////////image upload///////////
connectToMongo();
const app = express()
const maxRequestBodySize = '4mb';
app.use(express.json({limit: maxRequestBodySize}));
// app.use(express.urlencoded({limit: maxRequestBodySize}));
const port = 5000

app.use(express.json());  
                                                  
app.use(cors());
app.use('/', require('./routes/auth'));

// app.use('/api/notes', require('./routes/notes'))
////////////////////image retrieve//////////////////////
app.get('/viewproperties', async(req, res) => {     //viewproperties
  const allData=await Properties.find()
  console.log(allData)
   res.json(allData)
 })
app.get('/landinspector',async(req,res)=>{
  const pendingRequests=await Properties.find({verified:false})
  res.json(pendingRequests)
})
// app.get('/userdashboard',async(req,res)=>{
//   const verifiedRequests=await Properties.find({owner:req.body.owner,verified:true}) /////Forgot to put Owner in the properties model
//   res.json(verifiedRequests)
// })


app.listen(port, () => {
  console.log(`Weaver backend app listening at http://localhost:${port}`)
})