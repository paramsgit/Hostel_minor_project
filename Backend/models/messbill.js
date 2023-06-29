const mongoose = require('mongoose')
// import mongoose from 'mongoose';
const { Schema } = mongoose;
const MessSchema = new Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
  name:{
    type:String,
    required:true
  },
  room:{
    type:String,
    required:true,
   
  }
  ,total:{
    type:String,
    required:true,
    default:"0"
  },used:{
    type:String,
    required:true,
    default:"0"
    }
  ,last:{
    type:String,
    
  }
});
mongoose.pluralize(null);
module.exports = mongoose.models.messbill || mongoose.model('messbill', MessSchema);