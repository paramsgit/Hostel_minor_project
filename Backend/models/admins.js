const mongoose = require('mongoose')
// import mongoose from 'mongoose';
const { Schema } = mongoose;
const AdminSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  }
  ,password:{
    type:String,
    required:true
  },date:{
    type:Date,
    default:Date.now
  }
  ,role:{
    type:String,
    required:true
  }
});
mongoose.pluralize(null);
module.exports = mongoose.models.Admins || mongoose.model('Admins', AdminSchema);