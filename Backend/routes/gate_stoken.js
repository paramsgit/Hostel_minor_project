const express = require("express");
const Token = require("../models/stoken");
const Room = require("../models/room");
const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
// route 1 : to generate the gate token
// middle ware for the gate time and admin permission
router.post("/gatetoken", fetchuser, [
  body("Subject", "Valid Reason").isLength({min:3}),
  body("It", "Expected_in_time required").exists(),

],fetchuser,async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  const usera = await User.findById(req.user)
  const room = await Room.find({ user: req.user })
 
  const lastgatetoken = await Token.find({ user: req.user }).sort({_id:-1}).limit(1);
  if(lastgatetoken.length>0){
    console.log(lastgatetoken[0].in_time)
    if(lastgatetoken[0].in_time){
       
  try{
    console.log(req.body.Subject)
    const newtoken = new Token({
        user:req.user,name:usera.name,room_no:room[0].room_no, Subject:req.body.Subject, expected_in_time:req.body.It,
    })
    const newtoken_request = await newtoken.save()
    res.json({newtoken_request:newtoken_request,response:true})
    

  }
  catch(error){
    console.log(error)
    res.status(500).send('please try again latter')
  }
    }else{
      res.json({message:"you have an already active gate token",response:false})
    }
  }
  else
  {
  
  try{
    const newtoken = new Token({
        user:req.user,name:usera.name,room_no:room[0].room_no, Subject:req.body.Subject, expected_in_time:req.body.It,
    })
    const newtoken_request = await newtoken.save()
    res.json({newtoken_request:newtoken_request,response:true})
    

  }
  catch(error){
    console.log(error)
    res.status(500).send('please try again latter')
  }
}

});

router.get('/gatetoken',fetchuser,async (req,res)=>{
  try {
      const attenhist = await Token.find({ user: req.user })
      // const attenhist = await Token.find({ user: req.user }).sort({_id:-1}).limit(1);

      res.json({history:attenhist,history_lenght:attenhist.length,response:true})
  } catch (error) {
    console.log(error)
      res.status(500).json({ errors:'server error',response:false})
  }
})


router.get('/fetchlasttoken',fetchuser,async (req,res)=>{
  try {
    //   const attenhist = await Token.find({ user: req.user })
      const attenhist = await Token.find({ user: req.user }).sort({_id:-1}).limit(1);
      
      if(attenhist.length==0){
        return res.json({status:true,ot:true,it:true,reponse:true,last_data:0})
      }
      let gdate=attenhist[0].date.toString()
      let g1=gdate.slice(4,15)
      let g2=gdate.slice(16,21)
      
      let last_data={name:attenhist[0].name,room_no:attenhist[0].room_no,token_no:attenhist[0]._id,g1:g1,g2:g2}
      if(attenhist.length){
        if(attenhist[0].out_time==null){
          res.json({status:false,ot:false,it:false,reponse:true,last_data})
        }else if(attenhist[0].in_time==null){
          res.json({status:false,ot:true,it:false,reponse:true,last_data})
        }else{
          res.json({status:true,ot:true,it:true,reponse:true,last_data})
        }
      }else{
          res.json({status:true,ot:true,it:true,reponse:true,last_data})
      }
       
  } catch (error) {
    console.log(error)
      res.status(500).json({ errors:'server error',})
  }
})



router.post("/updateouttime", fetchuser, [
  body("t_id", "Token error").isLength(24),
  body("out_time", "Time error").exists(),

],fetchuser,async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

try {
   
  const gatetoken = await Token.find({_id:req.body.t_id});
if(gatetoken.length==0){
  res.json({message:"token not found",response:false})
}
else{
  if(gatetoken[0].out_time){
    res.send("already out")
  }
  else{
    try {
      let ugatet = await Token.updateOne({_id:req.body.t_id},{$set: {out_time: req.body.out_time}});
      res.send("out_time updated sucessfully")
    } catch (error) {
      console.log(error)
        res.status(500).json({ errors:'server error'})
    }

    
  }
}
} catch (error) {
  console.log(error)
        res.status(500).json({ errors:'server error'})
}
 

 

});

router.post("/updateintime", fetchuser, [
  body("t_id", "Token error").isLength(24),
  body("in_time", "inTime error").exists(),

],fetchuser,async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array(),response:false});
  }

try {
   
  const gatetoken = await Token.find({_id:req.body.t_id});
if(gatetoken.length==0){
  res.json({message:"token not found",response:false})
}
else{
  if(gatetoken[0].out_time){
    try {
      let ugatet = await Token.updateOne({_id:req.body.t_id},{$set: {in_time: req.body.in_time}});
      res.json({message:"in_time updated sucessfully",response:true})
    } catch (error) {
      console.log(error)
        res.status(500).json({ errors:'server error',response:false})
    }

  }
  else{
    res.json({message:"First need out time",response:false})

   
    
  }
}
} catch (error) {
  console.log(error)
        res.status(500).json({ errors:'server error'})
}
 

 

});




module.exports=router