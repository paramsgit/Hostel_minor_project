import React, { useState,useEffect,useContext } from 'react'
import noteContext from '../context/noteContext'
import { useNavigate } from "react-router-dom";
import { Dismiss } from 'flowbite';
let varia=1
let rott=360
export const Complains = () => {

  const navigate = useNavigate();
    useEffect(() => {
    console.log("useeffect")
    if(localStorage.getItem('token')){
      if(localStorage.getItem('room_no')){
        getallcomps()
        dothis()
      }
      else{
        navigate("/home")
      }
    }
    else{
      
      navigate("/signin")
    }
  },[]);

    let bodykadata=[]
    const [submitresponse,setsubmitresponse]=useState("")
    const [newds,setnewds]=useState()
    const { state, dispatch } = useContext(noteContext);

    function dothis(){
      dispatch({ type: 'UPDATE_VALUE', payload: true });
      dispatch({ type: 'UPDATE_AVALUE', payload: false });
     }

    const getallcomps=async (e)=>{
        const response=await fetch(`http://${state.backend}:${state.port}/api/c/newcomplain`,{
            method:'get',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            
        });
        let json=await response.json();
        console.log(json)
        function convertTZ(date, tzString) {
            return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
        }
        let elly=document.getElementById('tbody')
        
    
        for(let i=parseInt(json.history_lenght)-1;i>=0;i--){
          let cdate=convertTZ(json.allcomps[i].date, "Asia/Kolkata").toString()
          let g1=cdate.slice(4,15)
          let ccatagory=json.allcomps[i].catagory
          let cdescription=json.allcomps[i].description
          let dessignal=true
          if(parseInt(cdescription.length)>50)
         { dessignal=false}
          let cstatus=json.allcomps[i].status
          let mid=`mid${i}`
          let did=`d${json.allcomps[i]._id}`
          let delclose=`delclose${json.allcomps[i]._id}`
          let smid=`smid${i}`
          let hmid=`#mid${i}`
         
          bodykadata.push(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {g1}
          </th>
          <td className="px-6 py-4">
             {ccatagory}
          </td>
          <td className="px-6 py-4">
          {dessignal?cdescription:cdescription.slice(0,46)+"...."}
          </td>
          <td className={cstatus==="Pending"?"px-6 py-4 whitespace-nowrap yelpending":cstatus==="Solved"?" px-6 py-4 whitespace-nowrap solgreen":"px-6 py-4 whitespace-nowrap"}>
          {cstatus}
          </td>
         
          <td className="px-6 py-4 d-flex">
             <button className='pview' data-bs-toggle="modal" data-bs-target={hmid}>View</button>
          </td>
          <td>
          <div className="modal fade" id={mid} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
<div className="modal-content">
<div className="modal-header">
 <h1 className="modal-title fs-5">Problem</h1>
 <button className="btn-close" id={delclose} data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div className="modal-body">
{cdescription}
</div>
<div className="modal-footer">
 
 <button className={cstatus==="Solved"?"focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 m-2 divdisable":"focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 m-2"} id={json.allcomps[i]._id} onClick={solvedreq}>Solved</button>
              <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 m-2" id={did} onClick={deletereq}>Delete</button>
</div>
</div>
</div>
</div></td>
      </tr>)
      
        }
        setnewds(bodykadata)
    
    }
    
    const handle=async (e)=>{
      let descc=document.getElementById('descc').value
      let Catagoryid=document.getElementById('Catagoryid').value
     
       e.preventDefault();
       if(Catagoryid==='null'){
        document.getElementById('Catagoryid').classList.add('laalc')
        console.log("first")
        setTimeout(
          
          function() {
            console.log("first")
            document.getElementById('Catagoryid').classList.remove('laalc')
          }, 3000);

       }
       else{
        const response=await fetch(`http://${state.backend}:${state.port}/api/c/newcomplain`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({description:descc,catagory:Catagoryid})
  
  
      });
      let json=await response.json();
      console.log(json)
      if(json.response){
        getallcomps()
        setsubmitresponse(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert" id='csubmittedalert'>
        <span class="font-medium">Success !</span> Your complain has been submitted successfully and we will get back to you as soon as we can.
      </div>)
      }else{
        getallcomps()
        setsubmitresponse(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span class="font-medium">Error!</span> Some error Occured.
      </div>)
      }
       }
       
   }
   const plusclicked=()=>{
    setsubmitresponse("")
   }

 
  
   const reloadhistory=async(e)=>{
    console.log("not hapeening")
    let elly=document.getElementById('tero')
    
    elly.style.transform = `rotate(${rott}deg)`;
    rott=rott+360
    const tempv= await getallcomps();
   }
 
  
 const solvedreq=async(e)=>{
  console.log(e.target.id)

  const response=await fetch(`http://${state.backend}:${state.port}/api/c/newcomplain`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
    },  body: JSON.stringify({id:e.target.id})
    
});
let json=await response.json();
console.log(json)

if(json.response){
  toastshowing(1)
  document.getElementById('refdiv').click()
  // document.getElementById(e.target.id).classList.add('divdisable')
 

}else{
  toastshowing(0)
}
 }
 const deletereq=async(e)=>{
  const dide=e.target.id
  let delid=dide.slice(1,)
  document.getElementById(`delclose${delid}`).click()
  const response=await fetch(`http://${state.backend}:${state.port}/api/c/newcomplain`,{
    method:'DELETE',
    headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
    },  body: JSON.stringify({id:delid})
    
});
let json=await response.json();
console.log(json)
if(json.response){
  // document.getElementById(dide).classList.add('divdisable')
  deltoastshowing(1)
  document.getElementById('refdiv').click()
}else{
  deltoastshowing(0)
}
 }

 const toastshowing=(val)=>{
   const targetEl = document.getElementById('toast-success');
  if(parseInt(val)==0)
  {const targetEl = document.getElementById('toast-fail');}
  
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
 const deltoastshowing=(val)=>{
 

  const targetEl = document.getElementById('deltoast-success');
  if(parseInt(val)==0)
  {const targetEl = document.getElementById('toast-fail');}
  
  targetEl.classList.remove('hidden')
  targetEl.classList.remove('opacity-0')

  setTimeout(
   function() {
    deltoastdismiss();
    }, 5000);

}

 const deltoastdismiss=()=>{
 
  const $targetEl = document.getElementById('deltoast-success');
  const dismiss = new Dismiss($targetEl);
  dismiss.hide();
}

  return (
    <>
  
  <div className="one two fourth justify-content-center calcby">
 
     
   <div className='relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100 p-4'>
 
 
 <div className="relative overflow-x-auto sm:rounded-lg">
     <div className='reloadhistorydiv'>
 <p className="p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
             Complains
            
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
                    Date
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Catagory
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Description
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Status
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Action
                 </th>
                 
             </tr>
         </thead>
         <tbody id='tbody'>
            
             {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     25-02-2023
                 </th>
                 <td className="px-6 py-4">
                    Network
                 </td>
                 <td className="px-6 py-4" id='probdesc'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, quod sit doloribus, accusamus ipsam modi velit, officia pariatur quas alias nulla repellendus rerum adipisci voluptatum ut aut harum accusantium ipsa.
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                 Pending
                 </td>
                
                 <td className="px-6 py-4 d-flex">
                    <button className='pview' data-bs-toggle="modal" data-bs-target="#probdescmodal">View</button>
                 </td>
                 <td>
                 <div className="modal fade" id="probdescmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Problem</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla nam molestiae asperiores omnis laudantium inventore odit, porro amet eveniet consequuntur dignissimos natus, unde iusto deleniti temporibus. Fuga, rerum quod?
      </div>


      <div className="modal-footer">
        
        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 m-2">Solved</button>
                     <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 m-2">Delete</button>
      </div>
    </div>
  </div>
</div></td>
             </tr> */}
        
             {bodykadata}
           {newds}
         </tbody>
     </table>
 </div>
 
 </div>
   </div>
 
{/* toasts */}
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

<div id="deltoast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute right-5 top-5 hidden opacity-0" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
        {/* <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
</svg>
        <span className="sr-only">Del icon</span>
    </div>
    <div className="ml-3 text-sm font-normal">Complain Deleted successfully.</div>
    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={deltoastdismiss}>
        <span className="sr-only">Close</span>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"  data-dismiss-target="#toast-success"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
</div>
   <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 absolute right-5 top-5 hidden opacity-0" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Warning icon</span>
    </div>
    <div className="ml-3 text-sm font-normal">Some error occured.</div>
    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close" onClick={toastdismiss}>
        <span className="sr-only">Close</span>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"  data-dismiss-target="#toast-success"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
</div>







{/* Modal for veiwing prbolem */}

 <div className="modal fade" id="probdescmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Problem</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nulla nam molestiae asperiores omnis laudantium inventore odit, porro amet eveniet consequuntur dignissimos natus, unde iusto deleniti temporibus. Fuga, rerum quod?
      </div>
      <div className="modal-footer">
        
        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 m-2">Solved</button>
                     <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 m-2">Delete</button>
      </div>
    </div>
  </div>
</div>

{/* Modal for adding new prbolem */}
 <div className="modal fade" id="addnewcompform" data-bs-backdrop="static" data-bs-keyboard="false"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog  modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5">New Complain</h1>
        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
    
         
<form onSubmit={handle}>
    <div className="grid gap-6 mb-6 md:grid-cols-2 d-flex flex-column">
    <div className="mb-6">
    <label htmlFor="Catagoryid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catagory</label>
<select id="Catagoryid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
  <option selected disabled value="null">Choose an option</option>
  <option value="Electrical">Electrical</option>
  <option value="Water">Water</option>
  <option value="Network">Network</option>
  <option value="Mess">Mess</option>
  <option value="Cleanliness">Cleanliness</option>
  <option value="Other">Other</option>

</select>
      </div>
   
    <div className="mb-6">
        <input type="text" id="descc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required/>
    </div> 
        </div>
       
    
   
 
        <div className="modal-footer" >
        {submitresponse}
     
   <button type="button" className="btn btn-secondary grcolor font-medium rounded-lg text-sm sm:w-auto px-4 py-2.5" data-bs-dismiss="modal">Close</button>
   <button type="submit" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 extrablue`} >Submit</button>
 </div>
</form>



      </div>
     
    </div>
  </div>
</div>



     </>
  )
}
