const mongoose = require('mongoose')
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
  ,name :{
    type:String,
   
  },
  room :{
    type:String,
   
  },
 image:{
    data:Buffer,
    contentType:String 
 }
});
mongoose.pluralize(null);
module.exports = mongoose.models.profile_photo || mongoose.model('profile_photo', PhotoSchema);