import React,{useState,useEffect,useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

export const Adminhome = () => {
    const { state, dispatch } = useContext(noteContext);


  const navigate = useNavigate();
  useEffect(() => {
  
  if(localStorage.getItem('admintoken')){
    dothis()
    getalldata()
}else{
    dothis()
    navigate("/adminsignin")
}
  
},[]);
 function dothis(){
  dispatch({ type: 'UPDATE_VALUE', payload: false });
dispatch({ type: 'UPDATE_AVALUE', payload: true });
 }

 let bodykadata=[]
 const [submitresponse,setsubmitresponse]=useState("")
 const [newds,setnewds]=useState()


 const getalldata=async (e)=>{
  const response=await fetch("http://localhost:5000/api/ad/getallusers",{
      method:'get',
      headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('admintoken')
      },
      
  });
  let json=await response.json();
  let elly=document.getElementById('tbody')
  if(json.response){
  console.log(json)
  for(let i=0;i<parseInt(json.data.length);i++){

    let room_no=json.data[i].room_no
    let sname=json.data[i].name
    let semail=json.data[i].email
    let dessignal=true
  
 
   
    bodykadata.push(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {room_no}
    </th>
    <td className="px-6 py-4">
       {sname}
    </td>
    <td className="px-6 py-4">
    something
    </td>
    <td className="px-6 py-4">
    else
    </td>
    <td className="px-6 py-4">
    Here
    </td>
   
    <td className="px-6 py-4 ">
       <button className='pview' onClick={() => window.location = `mailto:${semail}`}>View</button>
    </td>
   
</tr>)

  }
  setnewds(bodykadata)
 
  }
  else{}


}

 const plusclicked=()=>{
  
 }

 let rott=360
 const reloadhistory=async(e)=>{
  console.log("not hapeening")
  let elly=document.getElementById('tero')
  
  elly.style.transform = `rotate(${rott}deg)`;
  rott=rott+360
  const tempv= await getalldata();
 }
  return (
   <>
   
   <div className="upperw">
   
    <div className="flex flex-wrap -mx-3" style={{margin:"30px",width:"90%"}}>

<div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
<div className="flex-auto p-4">
<div className="flex flex-row -mx-3">
<div className="flex-none w-2/3 max-w-full px-3">
<div>
<p className="mb-0 font-sans font-semibold leading-normal text-sm" style={{color:" #67748e",display: "flex"}}>Rooms</p>
<h5 className="mb-0 font-bold hclass">
200
<span className="leading-normal text-sm font-weight-bolder text-lime-500 lef200">left</span>
</h5>
</div>
</div>
<div className="px-3 text-right basis-1/3">
<div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500  bluegrad albasics">
<MeetingRoomRoundedIcon className='whitess meetrome'/></div>
</div>
</div>
</div>
</div>
</div>

<div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
<div className="flex-auto p-4">
<div className="flex flex-row -mx-3">
<div className="flex-none w-2/3 max-w-full px-3">
<div>
<p className="mb-0 font-sans font-semibold leading-normal text-sm" style={{color:" #67748e",display: "flex"}}>Attendance</p>
<h5 className="mb-0 font-bold hclass">
23
<span className="leading-normal text-sm font-weight-bolder text-lime-500 lef200">left</span>
</h5>
</div>
</div>
<div className="px-3 text-right basis-1/3">
<div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 bluegrad albasics">
<BadgeRoundedIcon className='whitess meetrome'/></div>
</div>
</div>
</div>
</div>
</div>

<div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
<div className="flex-auto p-4">
<div className="flex flex-row -mx-3">
<div className="flex-none w-2/3 max-w-full px-3">
<div>
<p className="mb-0 font-sans font-semibold leading-normal text-sm" style={{color:" #67748e",display: "flex"}}>Gate-pass</p>
<h5 className="mb-0 font-bold hclass">
6
<span className="leading-normal text-red-600 text-sm font-weight-bolder lef200">Today</span>
</h5>
</div>
</div>
<div className="px-3 text-right basis-1/3 ">
<div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 bluegrad albasics">
<QrCode2RoundedIcon className='whitess meetrome'/></div>
</div>
</div>
</div>
</div>
</div>

<div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
<div className="flex-auto p-4">
<div className="flex flex-row -mx-3">
<div className="flex-none w-2/3 max-w-full px-3">
<div>
<p className="mb-0 font-sans font-semibold leading-normal text-sm" style={{color:" #67748e",display: "flex"}}>Complains</p>
<h5 className="mb-0 font-bold hclass">
100
<span className="leading-normal text-sm font-weight-bolder text-lime-500 lef200">left</span>
</h5>
</div>
</div>
<div className="px-3 text-right basis-1/3 ">
<div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 bluegrad albasics">
<WarningRoundedIcon className='whitess meetrome'/></div>
</div>
</div>
</div>
</div>
</div>
</div>
   </div>
   <div className="downward">
   <div className="one two fourth justify-content-center calcby">
 
     
   <div className='relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100 p-4'>
 
 
 <div className="relative overflow-x-auto sm:rounded-lg" style={{maxHeight:"400px"}}>
     <div className='reloadhistorydiv'>
 <p className="p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
             Room Details
            
         </p>
         <div className="sbTnsdiv">
          
         <button className="text-black bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:focus:ring-gray-500" id='addcompid' onClick={plusclicked} data-bs-toggle="modal" data-bs-target="#addnewcompform">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>
 
 </button>
 <button className="text-black bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:focus:ring-gray-500" id='refdiv' onClick={reloadhistory}>
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
         
        
             {bodykadata}
           {newds}
         </tbody>
     </table>
 </div>
 
 </div>
   </div>
   </div>
   </>
  )
}
