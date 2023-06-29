var jwt = require('jsonwebtoken');
const Admin = require('../models/admins');
const Room = require("../models/room");
const JWT_SECRET = 'Th!siskeyfor@dm1s';

const fetchadmin = async(req, res, next) => {
    // const token = req.cookies.tid;
    // console.log(token)
    const token = req.header('auth-token');
    if (!token) {
       return res.status(401).json({ error: "Please login",response:false })
    }
    try {const data =  jwt.verify(token, JWT_SECRET);
        
        // if (data.id && !data.room){
        //     const usera = await User.findById(data.id)
        //     console.log(usera.room)
        //     res.json({ error: "Please book room ",userkaname:usera.name,response:false })
        // }
        if(!data.id){
            res.json({ error: "invalid Session",response:false})
        }
        else{
            const usera = await Admin.findById(data.id)
            let id=data.id
                req.user = id;
               
                next();
           
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "invalid Session",response:false })
    }

}
module.exports = fetchadmin;