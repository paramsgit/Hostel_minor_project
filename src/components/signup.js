import React,{useEffect,useContext,useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'
export const Signup = () => {
    const { state, dispatch } = useContext(noteContext);
    const [alertstate, setalertstate] = useState("secondary");
    const [email_input, setemail_input] = useState("");
    const [name_input, setname_input] = useState("");
    const [password_input, setpassword_input] = useState("");
    const [mobile_input, setmobile_input] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
  
  if(localStorage.getItem('token')){navigate("/home")}
  
});

// const handlesubmit =async (e)=>{
//     let alertt = document.getElementById('loginalert')
//     alertt.style.display='none'
//     const email=document.getElementById('email').value
//     const name=document.getElementById('name').value
//     const password=document.getElementById('password').value
//     const mobile=document.getElementById('mobile').value
//     console.log(name,email,password,mobile)
//     e.preventDefault();
//     const response=await fetch(`http://${state.backend}:${state.port}/api/auth/createuser`,{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({email:email,password:password,mobile:mobile,name:name})


//     });
//     const json=await response.json();
//     console.log(json)
//     if(json.response){
       
//         setalertstate('success')
//         alertt.innerHTML=json.message
//         alertt.style.display='block'
//     }else{
        
//         alertt.innerHTML=json.message
//         alertt.style.display='block'
//         setalertstate('danger')
//     }
// }



  return (
   <>
   <div className="container signinbox">
   <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 sectonexdiv">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Mega Boys Hostel    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>

              <div className={`alert alert-${alertstate}`} id='loginalert' style={{ outline:'none',border:'none',borderRadius:'10px',display:'none'}} role="alert">
                
                </div>

              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white dlabel">Full Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name_input} onChange={(e)=>{ setname_input(e.target.value) }} placeholder="Sundar" max={10} required />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white dlabel">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email_input} onChange={(e)=>{ setemail_input(e.target.value) }}  placeholder="name@company.com" required />
                  </div>
                  <div>
                      <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white dlabel">Mobile</label>
                      <input type="mobile" name="mobile" id="mobile" placeholder="9876543210" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={mobile_input} onChange={(e)=>{ setmobile_input(e.target.value) }}  required min={10} max={10}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white dlabel">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password_input} onChange={(e)=>{ setpassword_input(e.target.value) }}  required min={6}/>
                  </div>
                
                 
                  <button onClick={handlesubmit} type="submit" id='signup_submit' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
   </div>
   </>
  )
}
