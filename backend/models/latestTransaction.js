const mongoose = require('mongoose');
const latestTransaction = new mongoose.Schema({
    tokenId:{
        type: String,
    },
    latest:{
         type:Date   //latest transaction date
    }
    

})
let lastTransaction =mongoose.model("latestTransaction", latestTransaction);
module.exports =lastTransaction;