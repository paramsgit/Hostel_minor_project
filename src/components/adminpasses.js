import React,{useState,useEffect,useContext} from 'react'
import noteContext from '../context/noteContext'
import qrcode from "qrcode";
import { Link, useNavigate } from "react-router-dom";
import QrReader  from 'react-qr-reader';

export const Adminpasses = () => {
  const { state, dispatch } = useContext(noteContext);
  const navigate = useNavigate();
  useEffect(() => {
  
  if(localStorage.getItem('admintoken')){
    dothis()
   }else{
    dothis()
    navigate("/adminsignin")
}
  },[]);

function dothis(){
  dispatch({ type: 'UPDATE_VALUE', payload: false });
dispatch({ type: 'UPDATE_AVALUE', payload: true });
 }
    const gethistory=async (e)=>{
        const response=await fetch("http://localhost:5000/api/g/gatetoken",{
            method:'get',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            
        });
        let json=await response.json();
        console.log(json.history[0])
    
        let tbody=document.getElementById('tbody')
        tbody.innerHTML=""
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
        }
        for(let i=parseInt(json.history_lenght)-1;i>=0;i--){
        
        
            let g1="xxxxxx",g2="--.--",n1="xxxxxx", n2="--.--"
            
        if(json.history[i].out_time){
            let out_string=convertTZ(json.history[i].out_time, "Asia/Kolkata").toString()
             g1=out_string.slice(4,15)
             g2=out_string.slice(16,21)
        }
        if(json.history[i].in_time){
            let in_string=convertTZ(json.history[i].in_time, "Asia/Kolkata").toString()
             n1=in_string.slice(4,15)
             n2=in_string.slice(16,21)
        }
           tbody.innerHTML=tbody.innerHTML+`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
           <th class="px-6 py-4">
           <button class="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
       </th>
           <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
               ${g1}
           </td>
           <td class="px-6 py-4">
               ${g2}
           </td>
           <td class="px-6 py-4">
               ${json.history[i].Subject}
           </td>
           <td class="px-6 py-4 whitespace-nowrap">
           ${n1}
           </td>
           <td class="px-6 py-4">
              ${n2}
           </td>
         
       </tr>`
            
        }
    }

    const [webcamResult, setWebcamResult] = useState("xyz");
    const [rdata, setrdata] = useState(1);
    const [mirrorv, setmirrorv] = useState(0);
    const [whatid, setwhatid] = useState();
    const [usname, setusname] = useState("");
    const [usmsg, setusmsg] = useState("");
    const [faxn, setfaxn] = useState("");


    const [webScan, setWebScan] = useState();
    const [wr, setwr] = useState(0);
    const camError = (error) => {
      if (error) {
        console.info(error);
      }
    };
    const camScan = (result) => {
      if (result) {
        setWebScan(result);
        setwr(1)
        stopcv()
        sendrq(result)
        console.log(result)
      }
    };

  const stopcv=async()=>{
    const videoEl = document.getElementsByTagName('video')[1]
 
    let v2=   document.querySelector('video');
    console.log(videoEl,v2)
        let stream = videoEl.srcObject;
    let tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
       track.stop();
     });
     videoEl.srcObject = null;  
  
  }

  function miroor(){
    const video = document.getElementsByTagName('video')[1]
    if(mirrorv){
        video.style.transform="scale(1,1)";
        setmirrorv(0)
    }
    else{
        video.style.transform="scale(-1,1)";
        setmirrorv(1)
    }
  
  }
  const opencv=async(e)=>{
    console.log("openedc")
    setusname("")
    setrdata(1)
    setwr(0)
    const video = document.getElementsByTagName('video')[1]
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
         
      };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); })
      
       
      }
       startVideo()
     }

const sendrq=async(props)=>{
  let idate=new Date();
  let idatemonth=idate.getMonth()
  if(idatemonth<=9){
    idatemonth=`0${idatemonth}`
  }
  let idateday=idate.getDay()
  if(idateday<=9){
    idateday=`0${idateday}`
  }
  let idatehours=idate.getDay()
  if(idatehours<=9){
    idatehours=`0${idatehours}`
  }
  let idatemin=idate.getDay()
  if(idatemin<=9){
    idatemin=`0${idatemin}`
  }
  let fdatet=`${idate.getFullYear()}-${idatemonth}-${idateday}T${idatehours}:${idatemin}`
  console.log(fdatet,props)
  if(whatid==0){
    const response=await fetch("http://localhost:5000/api/ud/updateintime",{
      method:'POST',
      headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('admintoken')
      },
      body: JSON.stringify({t_id:props,in_time:fdatet})


  });
  let json=await response.json();
  console.log(json)
  if(json.response){
    setusmsg(`${json.message}`)
    setusname("Success, In Time updated ")
    document.getElementById('usmessage').style.color="green";
  }else{
    setusmsg(`${json.message}`)
    document.getElementById('usmessage').style.color="red";
  }
  }
  else{
  const response=await fetch("http://localhost:5000/api/ud/updateouttime",{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'auth-token':localStorage.getItem('admintoken')
          },
          body: JSON.stringify({t_id:props,out_time:fdatet})
  
  
      });
      let json=await response.json();
      console.log(json)
      if(json.response){
        setusmsg(`${json.message}`)
        setusname("Success, Out Time updated ")
        document.getElementById('usmessage').style.color="green";
      }else{
        setusmsg(`${json.message}`)
        document.getElementById('usmessage').style.color="red";
      }


 }
}

// First, get access to the user's camera
// navigator.mediaDevices.getUserMedia({ video: true })
//   .then(function(stream) {
//     // Get the video element and set the stream as its source
//     var video = document.getElementById('video');
//     var video = document.getElementById('video');
//     video.srcObject = stream;
//     video.play();

//     // Add an event listener to switch the camera when the video is clicked
//     video.addEventListener('click', function() {
//       // Get the current camera device ID
//       var currentDeviceId = stream.getVideoTracks()[0].getSettings().deviceId;
//       // Get a list of all available devices
//       navigator.mediaDevices.enumerateDevices()
//         .then(function(devices) {
//           // Find the other camera (front or back)
//           var otherDevice = devices.find(function(device) {
//             return device.kind === 'videoinput' && device.deviceId !== currentDeviceId;
//           });
//           // Use the other camera if found
//           if (otherDevice) {
//             navigator.mediaDevices.getUserMedia({ video: { deviceId: otherDevice.deviceId } })
//               .then(function(newStream) {
//                 // Replace the current stream with the new one
//                 video.srcObject = newStream;
//                 // Stop the old stream
//                 stream.getTracks().forEach(function(track) {
//                   track.stop();
//                 });
//                 // Set the new stream as the current one
//                 stream = newStream;
//               })
//               .catch(function(error) {
//                 console.error(error);
//               });
//           }
//         })
//         .catch(function(error) {
//           console.error(error);
//         });
//     });
//   })
//   .catch(function(error) {
//     console.error(error);
//   });

  

  return (
   <>
    <div className="one two threegp">
   <div className="flex flex-wrap mt-6 -mx-3 billoone" style={{width:"100%"}} >
<div className="w-half px-3 mb-6 lg:mb-0 lg:flex-none ww50" >
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100" id="fb50">
<div className="flex-auto p-4">
<div className="flex flex-wrap -mx-3 twrem tw2">
<div className="max-w-full px-3 w62 lg:flex-none" style={{width:"100%"}}>
<div className="flex flex-col h-full">

<h5 className="font-bold">Select :
<select name="" id="whatsacn"   onChange={e => setwhatid(e.target.value)}> 
<option value="1">Out Time</option>
<option value="0">In Time</option></select>
</h5>
<div className="flexlife flex">
<div className="teenp">
    <div className="teenalert">

    </div>
    <div className="card-body text-center scandiv">
  
    <QrReader
            delay={300}
            onError={camError}
            onScan={camScan}
            style={{ width: "100%" }}
            facingMode={"user"}
          />

</div>
{/* <div className="teenbtns">
<button id='opencv' className='btn btn-primary contb' onClick={opencv}>Start</button>
<button id='stopcv' className='btn btn-danger contb' onClick={stopcv}>Stop</button>
</div> */}
</div>
<div className="teenright">
    <div className="tl1">
        <p style={{color:"gray",fontSize:"80%"}}>Details will shown here</p>
    </div>
    <div className={`tl2 ${wr?"":"divnone"}`}>
 
        <p className='extrasof'> {webScan}</p>
        <p className='extrasof' id='usname' style={{color:'green'}}>{usname}</p>
        <p className='extrasof' id='usmessage'>{usmsg}</p>
    </div>
    <div className="teenbtns">
<button id='opencv' className='btn btn-primary contb' onClick={opencv}>Start</button>
<button id='stopcv' className='btn btn-danger contb' onClick={stopcv}>Stop</button>
<button id='miroor' className='btn btn-success contb' onClick={miroor}>Mirror</button>
</div>
</div>
</div>

</div>
</div>

</div>
</div>
</div>
</div>
<div className="w-half px-3 lg:flex-none belo50">
<div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4" id='underb50'>
<div className="relative h-full overflow-hidden bg-cover rounded-xl bckk2">
<span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
<div className="relative z-10 flex flex-col flex-auto h-full p-4">
<h5 className="pt-2 mb-6 font-bold text-white">Gate Pass</h5>
<div id='' className='flex dsp'>
{/* <button className=" btn btn-outline-success text-white bg-green-700 focus:ring-green-300 focus:ring-2 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700" >Apply New</button>
<button className=" btn btn-outline-success text-white focus:ring-green-300 focus:ring-2 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700" data-bs-toggle="modal" data-bs-target="#exampleModalout" >History</button> */}

{/* <button type="button" className="btn btn-success text-white text-sm bg-green-700" >
  Apply New
</button> */}

 

</div>





</div>
</div>
</div>
</div>
</div>
   </div>
   
   <div className="modal fade" id="exampleModalout" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Gate Pass</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">hello</div>
     
    </div>
  </div>
</div>

<div className="one two fourth justify-content-center calcby">
 
     
   <div className='relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100 p-4'>
 
 
 <div className="relative overflow-x-auto sm:rounded-lg" style={{maxHeight:"400px"}}>
     <div className='reloadhistorydiv'>
 <p className="p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
             Room Details
            
         </p>
         <div className="sbTnsdiv">
          
         <button className="text-black bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:focus:ring-gray-500" id='addcompid'  data-bs-toggle="modal" data-bs-target="#addnewcompform">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>
 
 </button>
 <button className="text-black bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:focus:ring-gray-500" id='refdiv' >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise trotate" id='tero' viewBox="0 0 16 16">
   <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
   <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
 </svg>
 
 </button>
 </div>
         </div>
     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
     
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
             <tr>
                 <th scope="col" className="px-6 py-3">
                    Room number
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Student's name
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Description
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Attendance
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Phone
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Mail
                 </th>
                 
             </tr>
         </thead>
         <tbody id='tbody'>
         
        
           
         </tbody>
     </table>
 </div>
 
 </div>
   </div>
   </>
  )
}
