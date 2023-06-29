const mongoose = require('mongoose')
// import mongoose from 'mongoose';
const { Schema } = mongoose;
const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  }
  ,room:{
   type:Boolean,
   default:false
  }
  ,photo_url:{
    type:String,
  },
   mobile:{
    type:Number
   }
  ,password:{
    type:String,
    required:true
  },date:{
    type:Date,
    default:Date.now
  }
});
mongoose.pluralize(null);
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);