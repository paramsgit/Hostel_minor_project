import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Dismiss } from 'flowbite';
import axios from 'axios'
import face from './static/facemjpg.jpg';
import cal from './static/calender.png';
import upimg from './static/up.png';

export const Attendance = () => {

  const navigate = useNavigate();
    useEffect(() => {
    console.log("useeffect")
    if(localStorage.getItem('token')){
      if(localStorage.getItem('room_no')){
        let newd=new Date();
        let dto=""
        dto=dto+newd;
        dto=dto.slice(4,15)
        setdatetoday(dto)

        getAttendance()

      }
      else{
        navigate("/home")
      }
    }
    else{
     navigate("/signin")
    }
  },[]);
  const [cwidth, setcwidth] =useState(400);
  const [latitude, setlatitude] =useState(0);
  const [longitude, setlongitude] =useState(0);
  const [rmessage, setrmessage] =useState("Start camera and capture");
  const [datetoday,setdatetoday]=useState();
  let attend_data=[]
  const [attendli,setattendli]=useState()

   const getAttendance=async()=>{
    const response=await fetch("http://localhost:5000/api/a/attend",{
      method:'get',
      headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
      },
      
  });
  let json=await response.json();
 console.log(json,json.attenhist.length)
 if(json.response){
  let atten_length=json.attenhist.length
  if(atten_length!=0){
    function convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
  }
  attend_data=[]
    for(let i=0;i<atten_length;i++){
      let attenddate="null",attendtime="null"
      let out_string=convertTZ(json.attenhist[i].date, "Asia/Kolkata").toString()
      attenddate=out_string.slice(4,15)
      attendtime=out_string.slice(16,21)

      if(json.attenhist[i].status=="Present")
      {
        attend_data.push(
          <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
    <div className="flex items-center likadiv" >
    <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75" fdprocessedid="865fo">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
    </svg>
      </button>
    <div className="flex flex-col">
    <h6 className="mb-1 leading-normal text-sm text-slate-700">{json.attenhist[i].status}</h6>
    <span className="leading-tight text-xs">{attenddate} at {attendtime}</span>
    </div>
    </div>
    
    </li>
          )
      }
      else{
        attend_data.push(
          <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
    <div className="flex items-center likadiv" >
    <button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-500 transition-all hover:opacity-75" fdprocessedid="865fo"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
  <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
</svg></button>
    <div className="flex flex-col">
    <h6 className="mb-1 leading-normal text-sm text-slate-700">{json.attenhist[i].status}</h6>
    <span className="leading-tight text-xs" style={{color:"gray"}}>{attenddate} at {attendtime}</span>
    </div>
    </div>
    
    </li>
          )
      }



    }
    
  }
  else{
     // in els ediv
  console.log("in else dov")
  attend_data.push(
    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl" style={{justifyContent:"center"}}>
  <div className="flex" style={{justifyContent:"center"}}>
  No record found</div>
</li>
  )
  }
 }
 else{
  // in els ediv
  console.log("in else dov")
  attend_data.push(
    <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl" style={{justifyContent:"center"}}>
  <div className="flex" style={{justifyContent:"center"}}>
  Some error occured</div>
</li>
  )
 }

 setattendli(attend_data)

   }

    const stopcvfunc=async(e)=>{
      console.log("stopcvfunxton started")
      setrmessage("Wait...") 

      // get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.")
       }

      //  get photo of user
        const canvas=document.getElementById('canvas')
        var videoEl = document.getElementById('video');
        setcwidth(videoEl.offsetWidth)
        console.log("che",canvas.height)
        canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.width);
     	let image_data_url = canvas.toDataURL('image/jpeg');
        // data url of the image
      	console.log(typeof(canvas));

        // stpping the camera
       let stream = videoEl.srcObject;
       let tracks = stream.getTracks();
       tracks.forEach(function(track) {
          track.stop();
        });
        videoEl.srcObject = null;  

        videoEl.style.backgroundImage=`url('${image_data_url}')`
        document.getElementById('scanner').style.display='block'

        function base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}
var jpegFile64 = image_data_url.replace(/^data:image\/(png|jpeg);base64,/, "");
var jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg');
console.log(typeof(jpegBlob))

const fileInput = document.getElementById('ifile');
const jpgf=document.getElementById('jpgf')
// Create a new File object
const myFile = new File([jpegBlob], 'myFile.jpg', {
    type: 'image/jpeg',
    lastModified: new Date(),
});
 const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;
      
    console.log("onselect")
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file)
    formData.append('longitude', longitude)
    formData.append('latitude', latitude)
    
    axios.post("http://localhost:5000/api/a/attend", formData, {headers: {
      'auth-token': localStorage.getItem('token')
      }})
    .then(res => { // then print response status
      console.log(res.data)
      document.getElementById('stopcv').disabled=true
      document.getElementById('opencv').disabled=false
      document.getElementById('scanner').style.display='none'
      setrmessage(res.data.message)
      console.log("ended f")
    })

     
         }

         const onSelectImageHandler =async (e) => {
     
 
}
    const opencv=async(e)=>{
        console.log("openedc")
        document.getElementById('opencv').disabled=true
        document.getElementById('sloader').style.opacity=1
        const video = document.getElementById('video')
        var vwidth = video.offsetWidth;
        var vheight = video. offsetHeight;
        let front=false
        function startVideo() {
            console.log("cvstarted")
            var constraints = { video: { facingMode: (front? "user" : "environment"), width: vwidth, height: vheight  } };
            navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
              video.srcObject = mediaStream;
              video.onloadedmetadata = function(e) {
              video.play();
              document.getElementById('sloader').style.opacity=0
              setrmessage("Now click on Capture button.")
              document.getElementById('stopcv').disabled=false
          };
          })
          .catch(function(err) { console.log(err.name + ": " + err.message); })
          
           
          }
           startVideo()
         

    }

    const btnsdiss=async()=>{
      document.getElementById('stopcv').disabled=true
      document.getElementById('opencv').disabled=false
      setrmessage("Start camera and capture")
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition,error2,options);
        } else {
          console.log("Geolocation is not supported by this browser.")
         
        }
        
    }
    function error2(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    function showPosition(position) {
      setlongitude(position.coords.longitude)
      setlatitude(position.coords.latitude)
    
  console.log(position, position.coords.latitude ,position.coords.longitude)
  
     }

    const toastshowing=(val)=>{
      const targetEl = document.getElementById('toast-success');
    
     
     targetEl.classList.remove('hidden')
     targetEl.classList.remove('opacity-0')
   
     setTimeout(
      function() {
       toastdismiss();
       }, 5000);
   
   }
   const toastdismiss=()=>{
    
     const $targetEl = document.getElementById('toast-success');
     const dismiss = new Dismiss($targetEl);
     dismiss.hide();
   }


   const polygon = [
    {lat: 31.400734, lng: 75.535784},
    {lat: 31.398088, lng: 75.530261},
    {lat: 31.390992, lng: 75.536039},
    {lat: 31.393762, lng: 75.540772}
  ];
  let point = {lat: 31.398038, lng: 75.531505};
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


 

  return (
   <>
   <div className="attone">

 
{/* <button type="button" className="btn btn-primary" onClick={btnsdiss} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}
<div className="att">
<div className="attleft">
<div className="w-full max-w-full px-3 mt-6 md:flex-none">
<div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
<div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
<div className="flex flex-wrap -mx-3">
<div className="max-w-full px-3 md:w-1/2 md:flex-none">
<h6 className="mb-0"></h6>
</div>

</div>
</div>
<div className="flex-auto p-4 pt-6 attflex">

<div className="attendance_button">
<button className='buttona'  onClick={btnsdiss} data-bs-toggle="modal" data-bs-target="#exampleModal">
   Attendance
    <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
</button>
</div>
{/* <div className="alert alert-success attendance_alert" role="alert">
  Your attendance has been recorded
</div> */}

<div role="status" className="max-w-sm animate-pulse mt-2">
<div className="flex items-center mt-4 space-x-3">
        <svg className="qmark text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
        <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2 skanm">
              <p className='sknamp' id=''> </p>
            </div>
            
        </div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
<div className="attendance_emojis">

  <img className='calendar' src={cal} alt="" />
</div>
{/* <div className="up_buttons">
<button className='up_arrows_buttons'>
   <div className="up_arrows">
    <img className='upimg upimg1' src={upimg} alt="" />
   
   </div>
    
</button>
</div> */}

</div>
</div>
</div>
</div>
<div className="attright">
<div className="w-full max-w-full px-3 mt-6 md:flex-none">
<div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
<div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
<div className="flex flex-wrap -mx-3">
<div className="max-w-full px-3 md:w-1/2 md:flex-none">
<h6 className="mb-0">History</h6>
</div>
<div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
<i className="mr-2 far fa-calendar-alt" aria-hidden="true"></i>
<small>Upto {datetoday}</small>
</div>
</div>
</div>
<div className="flex-auto p-4 pt-6">

{/* <ul className="flex flex-col pl-0 mb-0 rounded-lg attul">
<li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl" style={{justifyContent:"center"}}>
  <div className="flex" style={{justifyContent:"center"}}>
  No record found</div>
</li>
</ul> */}
<ul className="flex flex-col pl-0 mb-0 rounded-lg attul">
{/* <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
<div className="flex items-center">
<button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75" fdprocessedid="865fo">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg>
  </button>
<div className="flex flex-col">
<h6 className="mb-1 leading-normal text-sm text-slate-700">Marked</h6>
<span className="leading-tight text-xs">26 March 2020, at 13:45 PM</span>
</div>
</div>

</li>
<li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
<div className="flex items-center">
<button className="leading-pro ease-soft-in text-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-500 transition-all hover:opacity-75" fdprocessedid="865fo"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
  <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
</svg></button>
<div className="flex flex-col" style={{width:"100%",justifyContent:"space-between"}}>
<h6 className="mb-1 leading-normal text-sm text-slate-700">Missed</h6>
<span className="leading-tight text-xs">26 March 2020, at 13:45 PM</span>
</div>
</div>

</li> */}
{attendli}


</ul>
</div>
</div>
</div>
</div>

</div>
<div className="modal fade" id="exampleModal"  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg modalkiwidth">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Attendance</h1>
        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='latrat'>

        <div className="lat">
<div className="facephotofuldiv d-flex">
        <div className="card cardka">
  <img id='jpgf' src={face} className="card-img-top" alt="..." />
  <div className="card-body">
    <p className="card-text">Your face will be recorded and verified with your profile for attendance.</p>
  </div>
</div>
<input type="file" name="" id="ifile" style={{display:"none"}} onChange={onSelectImageHandler}/>
<div className="dbnbtns">
            <button className='btn btn-secondary opencvbtn' id='opencv' onClick={opencv}>
              <div className="" style={{margin:"5px 10px"}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera m-1" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg>Camera
</div>
<div className="loader" id='sloader'></div>
            </button>
          
            <button id='stopcv' className='btn btn-danger' onClick={stopcvfunc}>Capture</button>
            <canvas id="canvas" width={cwidth} height={cwidth}></canvas>
            </div>

        </div></div>
        <div className="rat">
            <div className="camerakliye">
              <div className="thirdloander">
              <div className='scanner' id='scanner'></div>
</div>
            <video id="video" autoPlay muted>
        
            </video>
            </div>
        </div>
      </div>
      </div>
      <div className="modal-footer mofooter">
        {/* <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-primary">Save changes</button> */}
        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 rmessage" role="alert" style={{fontSize:"120%"}}>
  {rmessage}
  {/* <div className="wrapper" id='ballloader'>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    
</div> */}
</div>
      </div>
    </div>
  </div>
</div>

<div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute right-5 top-5 hidden opacity-0" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Check icon</span>
    </div>
    <div className="ml-3 text-sm font-normal">Problem Solved successfully.</div>
    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={toastdismiss}>
        <span className="sr-only">Close</span>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"  data-dismiss-target="#toast-success"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
</div>
   </div>
   </>
  )
}