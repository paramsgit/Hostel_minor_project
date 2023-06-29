const express = require("express");

const User = require('../models/user');
const Feedback = require('../models/feedback');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const fetchadmin = require("../middleware/fetchadmin");
const { request } = require("express");

router.post("/feedback", fetchuser, [
    body("title", "Title is required").exists(),
    body("message", "Feedback is required").exists(),
  
  ],fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()[0].msg,response:false});
    }
  
    const usera = await User.findById(req.user)
   
   
    try{
        const Feedbak = new Feedback({
            user:req.user,name:usera.name,email:usera.email,title:req.body.title,message:req.body.message})
        const new_feedback = await Feedbak.save()
        res.json({response:true,message:"Feedback successfully submitted"})
        
    
      }
      catch(error){
        console.log(error)
        res.status(500).json({message:"server error",response:false})
      }
   
  
  });

  router.get('/feedback',fetchadmin,async (req,res)=>{
    try {
        const feedbacks = await Feedback.find()

  
        res.json({feedbacks:feedbacks,response:true})
    } catch (error) {
      console.log(error)
        res.status(500).json({ message:'server error',response:false})
    }
  })



  module.exports=router