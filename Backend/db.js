const mongoose = require('mongoose')
const mongouri ="mongodb://127.0.0.1:27017/app"
const connectToMongo =async ()=>{
    mongoose.connect(mongouri,()=>{
     
         console.log('connected to mongose succesfullly')
    })
}
module.exports= connectToMongo;