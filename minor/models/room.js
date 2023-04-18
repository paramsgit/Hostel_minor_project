const mongoose = require('mongoose')
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoomSchema = new Schema({
  user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
  ,name :{
    type:String,
    required:true
  },
  room_no:{
    type:Number,
    required:true,
    unique:true
  },date:{
    type:Date,
    default:Date.now
  }
});
mongoose.pluralize(null);
module.exports = mongoose.models.room || mongoose.model('room', RoomSchema);