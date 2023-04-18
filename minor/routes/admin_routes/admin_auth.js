const express = require('express')
const Admin = require('../../models/admins')
const Room = require('../../models/room')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {body,validationResult} = require('express-validator') //this is for the validation
const JWT_SECRET = 'Harryisagoodb$oy';
const router = express.Router()
const fetchadmin = require('../../middleware/fetchadmin')

//Route : 1 create a user using : post  '/api/auth/createuser' does not require auth
router.post('/newadmin',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('role', 'role is required').exists(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
] ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({  message: errors.array()[0].msg,response:false }); //agar empty nahi hain means error hain
    }
    const salt = await bcrypt.genSalt(10);
    scpass = await bcrypt.hash(req.body.password,salt);
    try{
    let user=await Admin.findOne({email:req.body.email}); //mongo db ma search kiya hain ki waha pa phale sa user tho nahi hain
    if (user){
        res.status(400).json({message:'Sorry, User already registered.',response:false})
    }
    else{
    console.log(req.body.mobile)
    const user = await Admin.create({
            name: req.body.name,
            password: scpass,
            email: req.body.email,
            role:req.body.role,
          })
    const data ={
            id:user.id
    }
    const jwtData = jwt.sign(data, JWT_SECRET)
    res.json({jwtData,message:`${req.body.name} Admin created Successfully`})}}
    catch(error){
        console.log(error.message)
        res.status(500).json({message:"Some error oocured",response:false})
    }
})

//Router : 2 end point for the login 
router.post('/adminlogin',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg,response:false }); //agar empty nahi hain means error hain
    }
    else{
    const {email,password}=req.body;
    try{
        let user =await Admin.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password. Please try again.",response:false})
        }
        else{
            const passwordcompare = await bcrypt.compare(password,user.password)
            if (!passwordcompare){
                return res.status(400).json({message:"Invalid email or password. Please try again.",response:false})
            }
            else{
                const data ={id:user.id}
                const jwtData = jwt.sign(data, JWT_SECRET)
                res.cookie("tid",jwtData,{
                    
                    httpOnly:true
                }).status(200)
                res.json({jwtData,succes:`${user.name} This is your jwt token for the today `,message:"Success,Redirecting...",response:true})
           
                
            }
        }
    }
    catch(error){
        console.log(error)
        console.log(error.message)
        res.status(500).send('Internal server error ')
    }
}
})
//Router : 3 end point for the get user details
router.get('/getadmin', fetchadmin,  async (req, res) => {

    try {
      let userId = req.user;
      const user = await Admin.findById(userId).select("-password")
     
      
      res.json({user,response:true})
    } catch (error) {
      console.error(error.message);
      res.status(500).json({error:"Internal Server Error",response:false});
    }
  })


module.exports=router