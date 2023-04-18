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

let number=1;
export const HandleClick = (event, param) => {

  let ele=document.getElementById('sideid')
  if(number)
 { number=0;

ele.classList.add('collapsi')
ele.classList.add('kaguya')
}
  else{ number =1;
    ele.classList.remove('collapsi')
    ele.classList.remove('kaguya')
  }
  console.log(number)
 
};




export const Adminsidebar = () => {
  const [isact,setact]=useState(1);
  const { state, dispatch } = useContext(noteContext);

  const navigate = useNavigate();
  const logout=async ()=>{
    localStorage.clear()
    dispatch({ type: 'UPDATE_AVALUE', payload: false });
    navigate("/adminsignin")
 
  }

 

  
  return (
   <>
  

   {/* <button className="colbtn" onClick={event => handleClick(event,`${parseInt(number)}` )}>col</button> */}

  
      <div id="sideid" className={`kaguya relly max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent translate-x-0 shadow-soft-xl bckol ps2 ${state.adminsidebar?'flex':'displaynone'}`} style={{position:"relative"}}>
        <div className="h-19.5">
          <i
            className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"
            sidenav-close=""
            aria-hidden="true"
          ></i>
          <Link 
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
            to='#'
          >
            <img  
              src={plogo}
              className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"/>
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
             Admin Dashboard
             
            </span>
          </Link>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full ps2 scrollcs ps--active-y">
          <ul id="udlist" className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
              <Link onClick={() => setact(1)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===1 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/adminhome"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===1 && "bluegrad"}` }>
              
                <HomeRoundedIcon className={`${isact===1?'whitess':'blackss'}`}/>

                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Home
                </span>
              </Link>
            </li>
            <li className="mt-0.5 w-full" id="leavepassli">
              <Link onClick={() => setact(2)}
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 font-semibold text-slate-700 transition-colors ${isact===2 && "shadow-soft-xl rounded-lg bg-white"}`}
                to="/adminpasses"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===2 && "bluegrad"}` }>
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
                to="/admincomplains"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===4 && "bluegrad"}` }>
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
                to="/adminattendance"
              >
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===5 && "bluegrad"}` }>
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
                <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5  ${isact===3 && "bluegrad"}` }>
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
        <div className="mx-4" style={{width:"100%"}}>
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
             
              <div className="transition-all duration-200 ease-nav-brand">
                {/* <div className="d-flex justify-content-center">
                <p className="mt-0 font-semibold leading-tight text-xs">
                 Shaktimaan Singh
                </p></div> */}
               
              </div>
            </div>
          </div>

          <button
            className="inline-block w-full px-6 py-3 my-4 font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro text-xs bg-gradient-to-tl from-purple-700 to-pink-500 hover:shadow-soft-2xl hover:scale-102 bluegrad" onClick={logout}>
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


    
    </>
  );
};
