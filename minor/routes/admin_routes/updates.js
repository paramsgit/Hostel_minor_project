const express = require('express');
const User = require('../../models/user');
const Room = require('../../models/room')
const Admin = require('../../models/admins');
const Token = require('../../models/stoken');
const router = express.Router()
const { body, validationResult } = require("express-validator");
const fetchadmin = require('../../middleware/fetchadmin')

router.post("/updateouttime", fetchadmin, [
    body("t_id", "Token error").isLength(24),
    body("out_time", "Time error").exists(),
  
  ],async (req,res)=>{
    const errors = validationResult(req);
    console.log(req.body.t_id)
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()[0].msg,response:false });
    }
  
  try {
     
    const gatetoken = await Token.find({_id:req.body.t_id});
  if(gatetoken.length==0){
    res.json({message:"token not found",response:false})
  }
  else{
    if(gatetoken[0].out_time){
      
        res.json({message:"Already has out time",response:false})
    }
    else{
      try {
        let ugatet = await Token.updateOne({_id:req.body.t_id},{$set: {out_time: req.body.out_time}});
        res.json({message:`Out time : ${req.body.out_time}`,response:true})
      } catch (error) {
        console.log(error)
          res.status(500).json({ message:'server error',response:false})
      }
  
      
    }
  }
  } catch (error) {
    console.log(error)
          res.status(500).json({ message:'server error',response:false})
  }
    
  });

router.post("/updateintime", fetchadmin, [
    body("t_id", "Token error").isLength(24),
    body("in_time", "Time error").exists(),
  
  ],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()[0].msg,response:false });
    }
  
  try {
     
    const gatetoken = await Token.find({_id:req.body.t_id});
  if(gatetoken.length==0){
    res.json({message:"token not found",response:false})
  }
  else{
    if(gatetoken[0].in_time){
        console.log("first")
        return res.json({message:"Token expired",response:false})
    }
    if(gatetoken[0].out_time){
        try {
            let ugatet = await Token.updateOne({_id:req.body.t_id},{$set: {in_time: req.body.in_time}});
            res.json({message:`In time :  ${req.body.in_time}`,response:true})
          } catch (error) {
            console.log(error)
              res.status(500).json({ message:'server error',response:false})
          }
    }
    else{
    
        res.json({message:"Out time not found",response:false})
      
    }
  }
  } catch (error) {
    console.log(error)
          res.status(500).json({ message:'server error',response:false})
  }
    
  });

    
module.exports=router