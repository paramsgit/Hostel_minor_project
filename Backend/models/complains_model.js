const mongoose = require("mongoose");
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const ComplainSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  room_no: {
    type: Number,
    required: true,
  },

  catagory: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default:"Pending",
    required: true,
  },
  description: {
    type: String,
    
  },

  date: {
    type: Date,
    default: Date.now,
  },
 

});
mongoose.pluralize(null);
module.exports = mongoose.models.complains_model || mongoose.model('complains_model', ComplainSchema);