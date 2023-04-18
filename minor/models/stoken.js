const mongoose = require("mongoose");
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const TokenSchema = new Schema({
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
  Subject: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  expected_in_time: {
    type: Date,
  
  },
  in_time: {
    type: Date,
   
  },
  out_time: {
    type: Date,
  },

});
mongoose.pluralize(null);
module.exports = mongoose.models.stoken || mongoose.model('stoken', TokenSchema);