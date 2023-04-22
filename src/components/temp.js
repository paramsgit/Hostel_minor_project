import React,{useContext} from 'react'
import noteContext from '../context/noteContext'
export const Temp = () => {

    const handle=async (e)=>{
        let iemail=document.getElementById('email').value
        let ipassword=document.getElementById('password').value
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:iemail,password:ipassword})


        });
        const json=await response.json();
        console.log(json)
        if(json.response){
            localStorage.setItem('token',json.jwtData)
        }else{
            console.log("flase")
        }
    }

    const { state, dispatch } = useContext(noteContext);
  function handleClick() {
    dispatch({ type: 'UPDATE_VALUE', payload: true });
  }
  function fandleClick() {
    dispatch({ type: 'UPDATE_VALUE', payload: false });
  }
  return (
<>
//Feedback section updating soon
</>
  )
}
