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
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  in_time: {
    type: Date,
    required: true,
  },
  out_time: {
    type: Date,
  },
  history: {
    request_time: {
      time: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        default: "Pending",
      },
    },
    rejected_time: {
      time: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
    approved_time: {
      time: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
    in_time: {
      time: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
    out_time: {
      time: {
        type: Date,
      },
      status: {
        type: String,
      },
    },
  },
});
mongoose.pluralize(null);
module.exports = mongoose.models.token || mongoose.model('token', TokenSchema);