var jwt = require('jsonwebtoken');
const User = require('../models/user');
const Room = require("../models/room");
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser = async(req, res, next) => {
    const token2 = req.cookies.access_token;
    console.log(token2)
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Please login",response:false })
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
            const usera = await User.findById(data.id)
            if(!usera.room){
                res.json({ error: "Please book room ",userkaname:usera.name,response:false })
            }else{
                let id=data.id
                req.user = id;
                const room = await Room.find({ user: req.user })
                req.room_no=room.room_no
                next();
            }
           
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "invalid Session",response:false })
    }

}
module.exports = fetchuser;