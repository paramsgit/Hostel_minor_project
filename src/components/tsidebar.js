import React, { useState,useEffect,useContext } from "react";
import noteContext from '../context/noteContext'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import plogo from './static/purplelogo.png';
import vec2 from './static/vec2.jpg';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded';
import { height } from "@mui/system";
import axios from 'axios'

let number=0;
export const HandleClick = (event, param) => {

  let ele=document.getElementById('sideid')
  let hb1=document.getElementById('hb1')
  let hb2=document.getElementById('hb2')
  let hb3=document.getElementById('hb3')
  if(number)
 { number=0;

ele.classList.add('collapsi')
ele.classList.add('kaguya')
hb1.classList.remove('bar-topr')
hb2.classList.remove('bar-middler')
hb3.classList.remove('bar-bottomr')
}
  else{ number =1;
    ele.classList.remove('collapsi')
    ele.classList.remove('kaguya')
    hb1.classList.add('bar-topr')
hb2.classList.add('bar-middler')
hb3.classList.add('bar-bottomr')
  }
  console.log(number)
 
};



export const Vmodalopen=(e)=>{

  document.getElementById('view_profile_button').click()
  document.getElementById('profilealert').style.display='block'
  

}

export const Disableli=(e)=>{
  
  document.getElementById('complainsli').classList.add('divdisable')
  document.getElementById('leavepassli').classList.add('divdisable')
  document.getElementById('feedbackli').classList.add('divdisable')
  document.getElementById('attendanceli').classList.add('divdisable')
}

export const NODisableli=(e)=>{
  
  document.getElementById('complainsli').classList.remove('divdisable')
  document.getElementById('leavepassli').classList.remove('divdisable')
  document.getElementById('feedbackli').classList.remove('divdisable')
  document.getElementById('attendanceli').classList.remove('divdisable')
}

export const Tsidebar = () => {
  const [isact,setact]=useState(1);
  const [crossp,setcrossp]=useState(0);
  const { state, dispatch } = useContext(noteContext);


  const anotherclick=()=>{
    setcrossp((crossp+1)%2)

    HandleClick()
  }
  const navigate = useNavigate();
  const logout=async ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('room_no')
    dispatch({ type: 'UPDATE_VALUE', payload: false });
    navigate("/signin")
 
  }

  const opencv2=async(e)=>{
    console.log("opencvinsidebar")
    document.getElementById('opencv2').disabled=true
    document.getElementById('sloader2').style.opacity=1
    const video = document.getElementById('cvideo')
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
          document.getElementById('sloader2').style.opacity=0
          // setrmessage("Now click on Capture button.")
          document.getElementById('stopcv2').disabled=false
      };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); })
      
       
      }
       startVideo()
     

}
  
const stopcvfunc2=async(e)=>{
  console.log("stopcvfunxton started")
  // setrmessage("Wait...") 


  //  get photo of user
    const canvas=document.getElementById('canvas2')
    var videoEl = document.getElementById('cvideo');
    // setcwidth(videoEl.offsetWidth)
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
    // document.getElementById('scanner').style.display='block'

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

const fileInput = document.getElementById('ifile2');

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


axios.post("http://localhost:5000/api/a/newupload", formData, {headers: {
  'auth-token': localStorage.getItem('token')
  }})
.then(res => { 
  console.log(res.data)
  if(res.data.response){
    document.getElementById('profilealert').innerHTML=res.data.message
    document.getElementById('profilealert').style.display='block'
    document.getElementById('opencv2').disabled=false
    document.getElementById('stopcv2').disabled=true
  }
  
  console.log("ended f")
})

 
     }

     const vpclicked=async(e)=>{
      document.getElementById('profilealert').style.display='none'
      document.getElementById('stopcv2').disabled=true
     }
  
  return (
   <>
  
    <div className={`hamdiv ${state.value?' ':'displaynone'}`}>
   <button id="hambutton" className={`colbtn `} onClick={anotherclick}>

   <div id="hb1" className={`bar-top`}></div>
  <div id="hb2" className={`bar-middle `}></div>
  <div id="hb3" className={`bar-bottom `}></div>
   </button>
   </div>
  
      <div id="sideid" className={`kaguya relly max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent translate-x-0 shadow-soft-xl bckol ps2 ${state.value?'flex':'displaynone'}`} style={{position:"relative"}}>
        <div className="h-19.5">
        
          <Link 
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
            to='#'
          >
            <img  
              src={plogo}
              className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"/>
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
             Hostel Dashboard
             <button onClick={Vmodalopen}>
             </button>
            </span>
          </Link>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full ps2 scrollcs ps--active-y">
          <ul id="udlist" className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
              <Link onClick={() => setact(1)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===1 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/home"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===1 && "bg-gradient-to-tl from-purple-700 to-pink-500"}` }>
              
                <HomeRoundedIcon className={`${isact===1?'whitess':'blackss'}`}/>

                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full" id="leavepassli">
              <Link onClick={() => setact(2)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===2 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/vichla"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===2 && "bg-gradient-to-tl from-purple-700 to-pink-500"}` }>
                <QrCodeRoundedIcon className={`${isact===2?'whitess':'blackss'}`}/>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Leave Pass
                </span>
              </Link>
            </li>
           
            <li className="mt-0.5 w-full" id="complainsli">
              <Link onClick={() => setact(4)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===4 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/complains"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===4 && "bg-gradient-to-tl from-purple-700 to-pink-500"}` }>
                <CrisisAlertRoundedIcon className={`${isact===4?'whitess':'blackss'}`}/>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Complains
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full" id="attendanceli">
              <Link onClick={() => setact(5)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===5 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/attendance"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===5 && "bg-gradient-to-tl from-purple-700 to-pink-500"}` }>
                <MoveToInboxRoundedIcon className={`${isact===5?'whitess':'blackss'}`}/>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Attendance
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full" id="feedbackli">
              <Link onClick={() => setact(3)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===3 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/temp"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===3 && "bg-gradient-to-tl from-purple-700 to-pink-500"}` }>
                <CalendarMonthIcon className={`${isact===3?'whitess':'blackss'}`}/>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Feedback
                </span>
              </Link>
            </li>
            {/* <li>
              <Link to="/about">about</Link>
            </li> */}
            
          </ul>
          <div className="ps__rail-x" style={{"fontWeight": "750","left":"0px","bottom":"0px"}}>
          {/* <div className="ps__rail-x" style="left: 0px; bottom: 0px;"> */}
            <div
              className="ps__thumb-x"
              tabIndex="0"
              style={{"left":"0px","width":"0px"}}
            ></div>
          </div>
          <div
            className="ps__rail-y"
            style={{"top": "0px","height":"376px","right":"0px"}}
          >
            <div
              className="ps__thumb-y"
              tabIndex="0"
              style={{"top":"0px","height":"292px"}}
            ></div>
          </div>
        </div>
        <div className="mx-4">
          <p className="invisible hidden text-gray-800 text-red-500 text-red-600 after:bg-gradient-to-tl after:from-gray-900 after:to-slate-800  after:bg-gradient-to-tl after:from-blue-600 after:to-cyan-400 after:bg-gradient-to-tl after:from-red-500 after:to-yellow-400 after:bg-gradient-to-tl after:from-green-600 after:to-lime-400 after:bg-gradient-to-tl after:from-red-600 after:to-rose-400 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 text-lime-500 text-cyan-500 text-slate-400 text-fuchsia-500"></p>
          <div
            className="after:opacity-65 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']"
            sidenav-card=""
          >
            <div
              className="mb-7.5 absolute h-full w-full rounded-2xl bg-cover bg-center"
            //   style=
            style={{"backgroundImage": "url('./static/purplelogo.png')"}}
            ></div>
            <div className="relative z-20 flex-auto w-full p-4 text-left text-white ps2" style={{overflow:"auto",maxHeight:"200px"}}>
              <div className="d-flex">
                
                <div className="vecdiv">
                <img className="vec2" src={state.user_photo_url} alt="" /></div>
                <div className="contentdata">
                  <div className="onee onec">{state.user_name}</div>
                  <div className="tonee onec">F-{state.user_room}</div>
                </div>
              </div>
              <div className="transition-all duration-200 ease-nav-brand">
                {/* <div className="d-flex justify-content-center">
                <p className="mt-0 font-semibold leading-tight text-xs">
                 Shaktimaan Singh
                </p></div> */}
                <Link
                  onClick={vpclicked}
                  id="view_profile_button"
                  className="inline-block w-full px-8 py-2 mb-0 font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro text-xs hover:shadow-soft-2xl hover:scale-102" data-bs-toggle="modal" data-bs-target="#user_profile"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          <button
            className="inline-block w-full px-6 py-3 my-4 font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro text-xs bg-gradient-to-tl from-purple-700 to-pink-500 hover:shadow-soft-2xl hover:scale-102" onClick={logout}>
            Sign Out
          </button>
        </div>
        <div className="ps__rail-x"  style={{"left":"0px","bottom":"0px"}}>
          <div
            className="ps__thumb-x"
            tabIndex="0"
            style={{"left":"0px","width":"0px"}}
          ></div>
        </div>
        <div className="ps__rail-y"  style={{"top":"0px","right":"0px"}}>
          <div
            className="ps__thumb-y"
            tabIndex="0"
            style={{"top":"0px","height":"0px"}}
          ></div>
        </div>
     
    </div>


                

    <div className="modal fade" id="user_profile" data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5">Profile </h1>
        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert" id="profilealert">
      Complete your profile and upload photo.
</div>
        <div className="mbody d-flex">
         <div className="leftp">
         <div className="profile-card">
  <div className="profile-card-header">
    <h2 className="profile-card-title">{state.user_name}</h2>
    <span className="profile-card-email">{state.user_email}</span>
  </div>
  <div className="profile-card-body">
    <ul className="profile-card-details">
    <li className="profile-card-details-item">
        <span className="profile-card-details-label">Hostel :</span>
        <span className="profile-card-details-value">MBH F</span>
      </li>
      <li className="profile-card-details-item">
        <span className="profile-card-details-label">Room :</span>
        <span className="profile-card-details-value">{state.user_room}</span>
      </li>
      <li className="profile-card-details-item">
        <span className="profile-card-details-label">Phone :</span>
        <span className="profile-card-details-value">{state.user_mobile}</span>
      </li>
    
    </ul>
  </div>
</div>
         </div>
         <div className="rightp">
         <input type="file" name="" id="ifile2" style={{display:"none"}} />
         <video id="cvideo" autoPlay muted></video>
                <div className="btnd mx-2">
                <button className='btn btn-secondary opencvbtn' id='opencv2' onClick={opencv2}>
                <div className="" style={{margin:"5px 10px"}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera m-1" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg>Camera
</div>
<div className="loader" id='sloader2'></div>
            </button>
                <button id='stopcv2' className='btn btn-danger' onClick={stopcvfunc2}>Capture</button>
                </div>
                <canvas id="canvas2" width="300px" height="300px" ></canvas>
         </div>
         </div>



      </div>
     
    </div>
  </div>
</div>
    </>
  );
};
