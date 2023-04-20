const express = require('express');
const multer = require('multer');

const User = require('../models/user');
const Attend = require('../models/attend');
const Profile_photo = require('../models/profile_photo');
const Room = require('../models/room')
const {body,validationResult} = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const upload = require("../middleware/upload");
const attendance_upload = require("../middleware/attendance_upload");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const connection = require("../db");
const axios=require('axios')

// route 1 : to mark the attendance 
router.post('/attend', fetchuser, attendance_upload.single("file"),async (req,res)=>{
    
    if (req.file === undefined) return res.status(400).json({message:"you must select a file.",response:false});
    // again middle ware to check like attend will be elegible between the fix time
    // 7 to 8 pm
    
    const polygon = [
        {lat: 31.400734, lng: 75.535784},
        {lat: 31.398088, lng: 75.530261},
        {lat: 31.390992, lng: 75.536039},
        {lat: 31.393762, lng: 75.540772}
      ];
     
      function isPointInsidePolygon(point, polygon) {
        const vertices = polygon.length;
        let intersectCount = 0;
      
        for (let i = 0; i < vertices; i++) {
          const vertex1 = polygon[i];
          const vertex2 = polygon[(i + 1) % vertices];
      
          if (((vertex1.lng > point.lng) != (vertex2.lng > point.lng)) &&
              (point.lat < (vertex2.lat - vertex1.lat) * (point.lng - vertex1.lng) / (vertex2.lng - vertex1.lng) + vertex1.lat)) {
            intersectCount++;
          }
        }
      
        return intersectCount % 2 == 1;
      }
  
      let point = {lat: 31.398038, lng: 75.531505};
      point.lat=req.body.latitude
      point.lng=req.body.longitude
      console.log(point.lat,point.lng)
      const isInside = isPointInsidePolygon(point, polygon);
      console.log("location is ",isInside);
      if(!isInside){
        console.log("location outside campus")
      }
    //   return res.json({message:"It looks like your location is currently outside the campus.",response:false})
    //   else{
    try {
        // console.log('before room find')
        const room = await Room.find({ user: req.user })
        // console.log(room)
        // console.log(req.user)
        // console.log('after room find')
        const usera = await User.findById(req.user)
        // console.log(usera)
        // console.log('after user find')
        const rfile=req.file.filename
        let temp_photourl=`http://localhost:5000/api/a/newupload/${rfile}`
        let user_photourl=`http://localhost:5000/api/a/newupload/${usera.photo_url}`
        
        
        let fresult=false,fmessage="",spoof=1
        const options = {
            url: 'http://127.0.0.1:8085/check',
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                url1: temp_photourl,
                url2: user_photourl
            }
          };
          try {
            await axios(options)
          .then(response => {
            fresult=response.data.result
            fmessage=response.data.message
            
            if( response.data.spoof==0){
              fmessage="[Image seems to Fake Face, Try Again ]"
            }else{
// need to change
              const markattend = async()=>{
                try {
                  const usera = await User.findById(req.user)
                  const room = await Room.find({ user: req.user })
                  const Attendance = await Attend.find({ user: req.user })
                  const newattend= new Attend({
                    user:req.user,name:usera.name,room_no:room[0].room_no,location:`${point.lat}${point.lng}`,status:"Present"
                })
                const new_complain = await newattend.save()
            
                  
              } catch (error) {
                console.log(error)
                  res.status(500).json({ message:'server error',response:false})
              }
              }
              markattend()
              
            }
            console.log(response.data.result);
          });
          

        //   delete temp photo
        const file = await gfs.files.findOne({ filename:rfile});
          await gfs.db.collection('photos' + '.chunks').deleteOne({files_id:file._id}, function(err) {
            if(err){
                return res.status(400).json(err)
            }
         })
        await gfs.files.deleteOne({_id:file._id},(err,result)=>{
            if(err){
                return res.status(400).json(err)
            }
        })

          res.json({result:fresult,message:fmessage,rfile:rfile,response:true})
          } catch (error) {
            res.send(error)
          }


        // const attend = new Attend({
        //     status:'ok', user:req.user,name:usera.name,room_no:room[0].room_no
        // })
        // const mark_attend = await attend.save()
        // res.json(mark_attend)
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors:'server error'})
    }

})
// router 2 : to get attendance history
router.get('/attend',fetchuser,async (req,res)=>{
    try {
        const attenhist = await Attend.find({ user: req.user })
        res.json({attenhist:attenhist,response:true,message:"Attendance History"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:'server error',response:false})
    }
})

// // route  : to save profile photo
// router.post('/uploadphoto',fetchuser,async (req,res)=>{
    
//     try {
//         const room = await Room.find({ user: req.user })
//         const usera = await User.findById(req.user)

//         upload(req,res,(err)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 const newimage=new Profile_photo({
//                     user:req.user,
//                     image:{
//                         data:req.file.filename,
//                         contentType:"image/png",
//                     },
//                 });
//                 newimage.save().then(()=>res.json({response:true})).catch(err=>console.log(err))
//             }
//         })
      
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ errors:'server error'})
//     }
// })

// router.get("/uploadphoto",fetchuser, async(req,res)=> {
//       const something= Profile_photo.findOne({ user: req.user}, function(err,champ) {
//         console.log(typeof(champ))
//        res.set("Content-Type", champ.contentType);
//        res.send( champ );
//     });
    
// });

// new profile photo of user
const newve = router.post("/newupload", upload.single("file"), fetchuser,async (req, res) => {
    if (req.file === undefined) return res.json({message:"File not found.",response:false});
    
    // check if user have previous photo or not
    const user_data = await User.findById(req.user)
    if(user_data.photo_url){
        const file = await gfs.files.findOne({ filename:user_data.photo_url});
         await gfs.db.collection('photos' + '.chunks').deleteOne({files_id:file._id}, function(err) {
            if(err){
                return res.status(400).json({err,message:"Bad request",response:false})
            }
         })
        await gfs.files.deleteOne({_id:file._id},(err,result)=>{
            if(err){
                return res.status(400).json({err,message:"Bad request",response:false})
            }
        })

       
    }
       
        let ugatet = await User.updateOne({_id:user_data._id},{$set: {photo_url: req.file.filename}});
        

    const imgUrl = `http://localhost:5000/api/a/newupload/${req.file.filename}`;
  
    return res.status(200).json({message:"Photo uploaded Succesfully",url:imgUrl,response:true})
});

let gfs;
const conn = mongoose.connection;

conn.once("open", function () {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = Grid(conn.db, mongoose.mongo);
  
    gfs.collection("photos");
});

router.get("/newupload/:filename", async (req, res) => {
  
    try {
       
        const file = await gfs.files.findOne({ filename:req.params.filename });
      
        // const fid=file._id

        // const obj_id = new mongoose.Types.ObjectId(fid);
        // console.log(obj_id)

        // await gfs.db.collection('photos' + '.chunks').deleteOne({files_id:file._id}, function(err) {
        //     if(err){
                
        //     }
        //  })
        // await gfs.files.deleteOne({_id:file._id},(err,result)=>{
            
        // })
   
        
        // const readStream = gfs.createReadStream({filename:file.filename});
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);

    } catch (error) {
        console.log("e",error)
        res.json({error:error});
    }
});

router.get("/tempupload/:filename", async (req, res) => {
    try {
       console.log(req.params.filename)
        const file = await gfs.db.collection('photos_temporary' + '.files').findOne({ filename:req.params.filename })
       console.log(file)
    
        
        // const readStream = gfs.createReadStream({filename:file.filename});
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);

    } catch (error) {
        console.log("e",error)
        res.json({error:error});
    }
});

module.exports=router