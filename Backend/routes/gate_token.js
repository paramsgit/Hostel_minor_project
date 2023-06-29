const express = require("express");
const Token = require("../models/token");
const Room = require("../models/room");
const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
// route 1 : to generate the gate token
// middle ware for the gate time and admin permission
router.post("/gatetoken", fetchuser, [
  body("Subject", "Valid Reason").isLength({min:3}),

],fetchuser,async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const room = await Room.find({ user: req.user })
  const usera = await User.findById(req.user)
  const pre_token= await Token.findOne({status : { $in: ["Pending", "out of the college"] }})
  try{
    if (pre_token){
      return res.status(400).json({errors:"u are already in the process"});
    }
    else{
      const newtoken = new Token({
        Subject:req.body.Subject,in_time:req.body.in_time,out_time:req.body.out_time, user:req.user,name:usera.name,room_no:room[0].room_no
    })
    const newtoken_request = await newtoken.save()
    res.json(newtoken_request)
    }

  }
  catch(error){
    console.log(error)
    res.status(500).send('please try again latter')
  }

});

router.get('/gatetoken',fetchuser,async (req,res)=>{
  try {
      const attenhist = await Token.find({ user: req.user })
      res.json(attenhist)
  } catch (error) {
    console.log(error)
      res.status(500).json({ errors:'server error'})
  }
})
module.exports=router
