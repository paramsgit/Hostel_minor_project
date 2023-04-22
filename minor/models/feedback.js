const mongoose = require('mongoose')
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
  ,name :{
    type:String,
    required:true
  }
,
  email :{
    type:String,
    required:true
  }
,
  title :{
    type:String,
  
  }
,
message:{
    type:String,
    required:true
  }
  ,date:{
    type:Date,
    default:Date.now
  }
});
mongoose.pluralize(null);
module.exports = mongoose.models.feedback || mongoose.model('feedback', FeedbackSchema);