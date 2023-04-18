const express = require('express');
const User = require('../../models/user');
const Room = require('../../models/room')
const Admin = require('../../models/admins');
const Complain = require('../../models/complains_model');
const Token = require("../../models/stoken");
const router = express.Router()
const fetchadmin = require('../../middleware/fetchadmin')

router.get('/getallusers', fetchadmin,  async (req, res) => {
    let userId = req.user;
    const admin = await Admin.findById(userId)
    if(admin.role!='admin'){
        return res.status(401).json({message:"Access denied",response:false})
    }else{
        const rooms=await Room.find()
        rooms.sort((a, b) => a.room_no - b.room_no);
        const data=[]
        for(let i=0;i<rooms.length;i++){
            let admin = await User.findById(rooms[i].user)
         
            data.push({room_no:rooms[i].room_no,name:rooms[i].name,email:admin.email})
        }
        
        
        // const users=await User.find().select("-password")
        // console.log(users)
        res.json({response:true,data:data})
    }

  })

router.get('/allcomplains', fetchadmin,  async (req, res) => {
    let userId = req.user;
    const admin = await Admin.findById(userId)
    if(admin.role!='admin'){
        return res.status(401).json({message:"Access denied",response:false})
    }else{
        try {
            const allcomps = await Complain.find({status:"Pending"})
            res.json({allcomps:allcomps,complains_length:allcomps.length,response:true})
        } catch (error) {
          console.log(error)
            res.status(500).json({ message:'server error',response:false})
        }
    }

  })
router.get('/getallpasses', fetchadmin,  async (req, res) => {
  
        try {
            const allpasses = await Token.find()
            
            res.json({allpasses:allpasses,allpasses_length:allpasses.length,response:true})
        } catch (error) {
          console.log(error)
            res.status(500).json({ message:'server error',response:false})
        }
    

  })


module.exports=router