const mongoose = require('mongoose')
const { Schema } = mongoose;

const AttendSchema = new Schema({
  user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
  ,name :{
    type:String,
    required:true
  }
  ,room_no:{
    type:Number,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true
  },date:{
    type:Date,
    default:Date.now
  }
});
mongoose.pluralize(null);
module.exports = mongoose.models.attendance || mongoose.model('attendance', AttendSchema);