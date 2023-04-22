import React,{useContext,useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'
export const Temp = () => {

   

    const { state, dispatch } = useContext(noteContext);
    const [messg,setmessg]=useState()
    const navigate = useNavigate();
    useEffect(() => {
     console.log(`${state.port}`)
      if(localStorage.getItem('token')){
        if(localStorage.getItem('room_no')){
         
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
    function dothis(){
      dispatch({ type: 'UPDATE_VALUE', payload: true });
      dispatch({ type: 'UPDATE_AVALUE', payload: false });
     }

     const submitfeedback=async(e)=>{
      e.preventDefault()
      setmessg()
      const title=document.getElementById('email').value
      const message=document.getElementById('message').value
      console.log(message,title)
      const response=await fetch(`http://${state.backend}:${state.port}/api/f/feedback`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
              'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title:title,message:message})
  
  
      });
      let json=await response.json();
      console.log(json)
      if(json.response){
        setmessg(
          <div className="p-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
   {json.message}
</div>
        )

      }else{
        
        setmessg(
          <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
   {json.message}
</div>
        )
      }
     }

  return (
<>
<div className="fmdiv">
<div className="feedbackform">
  <div className="feedtitle">
    <h4>Feedback</h4>
  </div>
<form onSubmit={submitfeedback}>
   
    <div className="mb-6">
        <label htmlFor='email' className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject Here" required />
    </div> 
    <label for="message" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
<textarea id="message" rows="4" className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." required></textarea>

{messg}

    <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 feedsub">Submit</button>
</form>
</div>




</div>
</>
  )
}
