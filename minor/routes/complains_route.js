const express = require("express");

const Room = require("../models/room");
const User = require('../models/user');
const Complain = require('../models/complains_model');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { request } = require("express");

router.post("/newcomplain", fetchuser, [
    body("catagory", "catagory is required").exists(),
    body("description", "Description is required").exists(),
  
  ],fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
  
    const usera = await User.findById(req.user)
    const room = await Room.find({ user: req.user })
   
    try{
        const newcomplain = new Complain({
            user:req.user,name:usera.name,room_no:room[0].room_no,catagory:req.body.catagory,description:req.body.description
        })
        const new_complain = await newcomplain.save()
        res.json({new_complain:new_complain,response:true})
        
    
      }
      catch(error){
        console.log(error)
        res.status(500).send('please try again latter')
      }
   
  
  });

  router.get('/newcomplain',fetchuser,async (req,res)=>{
    try {
        const allcomps = await Complain.find({ user: req.user })

  
        res.json({allcomps:allcomps,history_lenght:allcomps.length,response:true})
    } catch (error) {
      console.log(error)
        res.status(500).json({ errors:'server error',response:false})
    }
  })


  router.patch("/newcomplain", fetchuser, [
    body("id", "id is required").exists(),
  ],fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array(),response:false});
    }
 
   try{

    const fuser = await Complain.find({ _id: req.body.id })
    if(fuser.length && fuser[0].user==req.user){
    let ugatet = await Complain.updateOne({_id:req.body.id},{$set: {status: "Solved"}});
     res.json({message:"Status updated ",response:true})
      }
      else{
        res.json({message:"Not found!",response:false})
      }
    }

      catch(error){
        console.log(error)
        res.status(500).json({message:'please try again latter',response:false})
      }
   
  
  });

  router.delete("/newcomplain", fetchuser, [
    body("id", "id is required").exists(),
  ],fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array(),response:false});
    }
 
   try{
    // games.deleteOne({name:"Snake"})
    const fuser = await Complain.find({ _id: req.body.id })
    if(fuser.length && fuser[0].user==req.user){
    let ugatet = await Complain.deleteOne({_id:req.body.id});
     res.json({message:"Deleted ",response:true})
      }
      else{
        res.json({message:"Not found!",response:false})
      }
    }

      catch(error){
        console.log(error)
        res.status(500).json({message:'please try again latter',response:false})
      }
   
  
  });


  module.exports=router