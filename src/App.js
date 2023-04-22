import logo from './logo.svg';
import './App.css';
import './sidebar.css';
import './tsidebar.css';
import './gp.css';
import './acp.css';
import './index.css';
import React, { useState,useEffect } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import {About} from './components/about'
import {Home} from './components/home'
import {Vichla} from './components/vichla'
import {Signup} from './components/signup'
import {Signin} from './components/signin'
import {Adminsignin} from './components/adminsignin'
import {Adminhome} from './components/adminhome'
import {Adminattendance} from './components/adminattendance'
import {Admincomplains} from './components/admincomplains'
import {Adminpasses} from './components/adminpasses'
import {Adminsidebar} from './components/adminsidebar'
import {Temp} from './components/temp'
import {Complains} from './components/complains'
import {Attendance} from './components/attendance'

import { Tsidebar } from './components/tsidebar';
import {HandleClick} from './components/tsidebar'
import NoteState from './context/noteState'

function App() {
  const [have,sethave]=useState(0)
  const [admintoken,setadmintoken]=useState(0)
 
  useEffect(() => {
    if(localStorage.getItem('token')){
      sethave(1)
    }
    else{
      sethave(0)
    }
    if(localStorage.getItem('admintoken')){

      setadmintoken(1)
    }
    else{
      setadmintoken(0)
    }
    


  },[]);

  let number=1;
  console.log(number)

if(admintoken){
 
}

  return (
    <div className="App">
<NoteState>

  <Router>

 
   <div className='d-flex justify-content-center'>


          <Tsidebar/>
          <Adminsidebar/>
           

            <div className='appkiauto' style={{overflow:"auto"}}>
          {/* <button className="colbtn btn btn-success" onClick={event => HandleClick(event,`${parseInt(number)}` )}>Col</button> */}

      <Routes>
     
      <Route exact path="/" element={<Home/>}/>
      
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/vichla" element={<Vichla/>}/>
      <Route exact path="/complains" element={<Complains/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/temp" element={<Temp/>}/>
      <Route path="/attendance" element={<Attendance/>}/>

      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/signin" element={<Signin/>}/>
      <Route exact path="/adminhome" element={<Adminhome/>}/>
      <Route exact path="/adminsignin" element={<Adminsignin/>}/>
      <Route exact path="/adminattendance" element={<Adminattendance/>}/>
      <Route exact path="/admincomplains" element={<Admincomplains/>}/>
      <Route exact path="/adminpasses" element={<Adminpasses/>}/>
    </Routes>
      </div>
          </div>
          
          
        
        </Router>

        </NoteState>

    </div>

  );



}

export default App;
