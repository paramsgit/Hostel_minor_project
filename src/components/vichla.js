import React,{ useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import qrcode from "qrcode";
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
// import { display } from '@mui/system';

export const Vichla = () => {

    const navigate = useNavigate();
    useEffect(() => {
    console.log("useeffect")
    if(localStorage.getItem('token')){
        if(localStorage.getItem('room_no')){
            reloadhistory()
        }
        else{
          navigate("/home")
        }
    }
    else{
      
      navigate("/signin")
    }
  },[]);
    const [divstatus, setdivstatus] = useState(1);
    const [divgreen, setdivgreen] = useState(0);
    const [divred, setdivred] = useState(0);
    const [otit, setotit] = useState("");
    const [tr, settr] = useState();
    const [loaderdownload, setloaderdownload] = useState(0);
    
    
    // for gtoken
    const [gname, setgname] = useState("");
    const [groom, setgroom] = useState("");
    const [gphon, setgphon] = useState("");
    const [gdate, setgdate] = useState("");
    const [gtime, setgtime] = useState("");
    const [gtoken, setgtoken] = useState("");
    const [qrimage, setqrimage] = useState();
    // preventing claender and getting last token status
const mind=async (e,a)=>{
    
    setdivgreen(0)
    setdivred(0)
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/g/fetchlasttoken",{
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        
    });
    let json=await response.json();
    console.log(json)
    if(json.status){
        setdivstatus(0)
        setotit("")
    }else{
        setdivstatus(1)
        setdivred(1)
        if(!json.ot){
            setotit("You already have an active gate pass.") 
        }else{
            setotit("A gate pass has already been generated.") 
        }
        setgname(json.last_data.name)
        setgroom(json.last_data.room_no)
        setgphon('6232322422')
        setgdate(json.last_data.g1)
        setgtime(json.last_data.g2)
        setgtoken(json.last_data.token_no)
        const image = await qrcode.toDataURL(json.last_data.token_no);
        setqrimage(image);

    }

    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var maxDate = year + '-' + month + '-' + day;
    document.getElementById('date').setAttribute('min',maxDate)
}

// sending token request
const handle=async (e)=>{
   let Purpose=document.getElementById('purpose').value
   let idate=document.getElementById('date').value
   let itime=document.getElementById('inTime').value
   let It=`${idate}T${itime}`
   console.log(It)
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/g/gatetoken",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({Subject:Purpose,It:It})


    });
    let json=await response.json();
    
    if(json.response){
       setdivstatus(1)
       setdivgreen(1)
    }
}
const newdownload2=async (e)=>{
    const response=await fetch("http://localhost:5000/api/g/fetchlasttoken",{
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        
    });

    let json=await response.json();
    setgname(json.last_data.name)
    setgroom(json.last_data.room_no)
    setgphon('6232322422')
    setgdate(json.last_data.g1)
    setgtime(json.last_data.g2)
    setgtoken(json.last_data.token_no)
    const image = await qrcode.toDataURL(json.last_data.token_no);
        setqrimage(image);

}
const newdownload=async (e)=>{
    const newd = await newdownload2();
    console.log(newd)
    setTimeout(downloadtoken, 1000);
}

const downloadtoken=async (e)=>{
    setloaderdownload(1)
    const element = document.getElementById('token_template')
    element.style.display='flex'
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
    element.style.display='none'
    setloaderdownload(0)
}
let rott=360
const reloadhistory=async(e)=>{
    console.log("not hapeening")
    let elly=document.getElementById('tero')
    
    elly.style.transform = `rotate(${rott}deg)`;
    rott=rott+360
    const tempv= await gethistory();
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
       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           ${g1}
       </th>
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
       <td class="px-6 py-4">
           <button class="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
       </td>
   </tr>`
        
    }
}

  return (
    <>

    
   <div className="one two threegp">
   <div className="flex flex-wrap mt-6 -mx-3 billoone" style={{width:"100%"}} >
<div className="w-half px-3 mb-6 lg:mb-0 lg:flex-none ww50" >
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100" id="fb50">
<div className="flex-auto p-4">
<div className="flex flex-wrap -mx-3 twrem tw2">
<div className="max-w-full px-3 w62 lg:flex-none">
<div className="flex flex-col h-full">
<p className="pt-2 mb-1 font-semibold" style={{color:"white"}}>____</p>
<h5 className="font-bold">Gate Pass Rules</h5>
<ul className="mb-2 grules">
 <li className='m-2 daj'><ArrowRightRoundedIcon className='mbb5'/>A gate pass can only be used once</li>
 <li className='m-2 daj'> <ArrowRightRoundedIcon className='mbb5'/>No gate pass will generated after 8PM</li>
 
 <li className='m-2 daj'><ArrowRightRoundedIcon className='mbb5'/>Students on leave are can't mark their attendance</li>
 <li className='m-2 daj'><ArrowRightRoundedIcon className='mbb5'/>You have return to hostel before 8PM otherwise fill leave form</li>
   
</ul>
<p className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500">
Good Bye!

</p>
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
<button className=" btn btn-outline-success text-white bg-green-700 focus:ring-green-300 focus:ring-2 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={mind}>Apply New</button>
<button className=" btn btn-outline-success text-white focus:ring-green-300 focus:ring-2 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700" >History</button>

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
   
  <div className="one two fourth justify-content-center calcby">

    
  <div className='relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100 p-4'>


<div className="relative overflow-x-auto sm:rounded-lg">
    <div className='reloadhistorydiv'>
<p className="p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            History
           
        </p>
        <div>
        <button className="text-black bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:focus:ring-gray-500"  onClick={reloadhistory}>
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
                   Out Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Out Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Purpose
                </th>
                <th scope="col" className="px-6 py-3">
                    In Date
                </th>
                <th scope="col" className="px-6 py-3">
                    In time
                </th>
                <th scope="col" className="px-6 py-3">
                   Pass
                </th>
            </tr>
        </thead>
        <tbody id='tbody'>
           
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    25-02-2023
                </th>
                <td className="px-6 py-4">
                    12:23
                </td>
                <td className="px-6 py-4">
                    Shopping
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                25-02-2023
                </td>
                <td className="px-6 py-4">
                   14:33
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    12-02-2023
                </th>
                <td className="px-6 py-4">
                    10:23
                </td>
                <td className="px-6 py-4">
                    Movie
                </td>
                <td className="px-6 py-4">
                12-02-2023
                </td>
                <td className="px-6 py-4">
                   12:10
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    26-01-2023
                </th>
                <td className="px-6 py-4">
                   08:00
                </td>
                <td className="px-6 py-4">
                    Hospital
                </td>
                <td className="px-6 py-4">
                26-01-2023
                </td>
                <td className="px-6 py-4">
                  16:08
                </td>
                <td className="px-6 py-4">
                    <button  className="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
                </td>
            </tr>
          
        </tbody>
    </table>
</div>

</div>
  </div>

{/* G-token */}
  <div id='token_template' style={{display:"none",height: '500px', width: '400px', justifyContent: 'center', background: 'radial-gradient(ellipse farthest-corner at center top, #ECECEC, #999)', color: '#363c44', fontSize: '14px', fontFamily: 'sans-serif'}}>
        <div style={{position: 'relative', width: '350px', height: '442px', background: 'white', borderRadius: '12px', boxShadow: '0 5px 30px rgba(0, 0, 0, 0.2)', margin: '30px'}}>
          <header style={{background: 'linear-gradient(to bottom, #36475f, #2c394f)', padding: '1px 20px 0 12px', height: '45px', borderRadius: '12px 12px 0 0'}}>
            <p style={{color: 'white', margin: '4px', fontSize: 'large', fontWeight: 600, fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif'}}>GATE PASS</p>
          </header>
          <section  style={{marginLeft: '15px'}}>
            <h4 style={{textTransform: 'uppercase', marginBottom: '10px', marginLeft: '10px',width:"fit-content"}}>{gname} </h4>
          
            <div style={{display: 'flex', opacity: '0.9'}}>
              <div style={{display: 'flex', alignItems: 'center', margin: '0 10px'}}><p style={{margin: 0, marginBottom: '2px', fontWeight: 600, color: '#3b3f45'}}>Room: {groom}</p></div>
              {/* <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}> <p style={{margin: 0, marginBottom: '2px', fontWeight: 600, color: '#3b3f45'}}>ID: {groll}</p></div> */}
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', marginBottom: '5px', opacity: '0.9'}}> <p style={{margin: 0, marginBottom: '2px', fontWeight: 600, color: '#3b3f45'}}> Mob: {gphon}</p></div>
          </section>
          <hr style={{opacity: '0.2', color: 'black', width: '90%'}} />
          <section className="mid">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', flexDirection: 'column'}}>
              <div  style={{width: '130px', height: '130px', backgroundColor: 'green'}} >
                <img src={qrimage} alt="" style={{width:"100%",height:"100%"}} />
              </div>
              <div style={{marginTop: '10px'}}>
                <p style={{fontSize: '115%', fontWeight: 600}}>{gtoken}</p>
              </div>
            </div>
            <hr style={{opacity: '0.2', color: 'black', width: '90%'}} />
          </section>
          <section  style={{display: 'flex', justifyContent: 'center'}}>
            <p style={{opacity: '0.6',}}>Genrated on {gdate} at {gtime}</p>
          </section>
        </div>
      </div>
{/* gtoken ends */}

   <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Gate Pass</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       
<form onSubmit={handle}>
    <div className={`grid gap-6 mb-6 md:grid-cols-2  ${divstatus === 1 && "divdisable"} `}>
        <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expected In Date</label>
            <input type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div>
            <label htmlFor="Time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Expected In Time</label>
            <input type="time" id="inTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe"  required/>
        </div>
        <div>
            <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purpose</label>
            <input type="text" id="purpose" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Shopping" required/>
        </div>
        <div>
            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
            <input type="tel" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9876543210" required/>
        </div>
        {/* <div>
            <label htmlFor="leave" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">leave</label>
            <input type="checkbox" id="leave" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9876543210" required/>
        </div>
        <div>
            <label htmlFor="messoff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turn off Mess</label>
            <input type="checkbox" id="messoff" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9876543210" required/>
        </div> */}
         
    </div>
  
  
  
    <div className={`p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 donone ${divred === 1 && "dblock"}`} role="alert">
  <span className="font-medium"></span> {otit}
  <div className='mt-3'>
  <button type='button' className={`text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 bg-red-800 dbtnred ${loaderdownload === 1 && "divdisable"} `} onClick={downloadtoken}>Download
</button>
</div>
</div>

<div className={`p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 donone ${divgreen === 1 && "dblock"}`} role="alert">
  <span className="font-medium">Success!</span> You can download gate pass by clicking below button.
  <div className='mt-3'>
  <button className={`text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${loaderdownload === 1 && "divdisable"} `} onClick={newdownload}>Download
</button>
  </div>
</div>

    <div className="modal-footer" >
   
        <button type="button" className="btn btn-secondary grcolor font-medium rounded-lg text-sm sm:w-auto px-4 py-2.5" data-bs-dismiss="modal">Close</button>
        <button type="submit" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 extrablue ${divstatus === 1 && "divdisable"} `} >Submit</button>
      </div>
</form>

      </div>
     
    </div>
  </div>
</div>
   <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel3">History</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Out Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Out Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Purpose
                </th>
                <th scope="col" className="px-6 py-3">
                    In Date
                </th>
                <th scope="col" className="px-6 py-3">
                    In time
                </th>
                <th scope="col" className="px-6 py-3">
                   Pass
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    25-02-2023
                </th>
                <td className="px-6 py-4">
                    12:23
                </td>
                <td className="px-6 py-4">
                    Shopping
                </td>
                <td className="px-6 py-4">
                25-02-2023
                </td>
                <td className="px-6 py-4">
                   14:33
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    12-02-2023
                </th>
                <td className="px-6 py-4">
                    10:23
                </td>
                <td className="px-6 py-4">
                    Movie
                </td>
                <td className="px-6 py-4">
                12-02-2023
                </td>
                <td className="px-6 py-4">
                   12:10
                </td>
                <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    26-01-2023
                </th>
                <td className="px-6 py-4">
                   08:00
                </td>
                <td className="px-6 py-4">
                    Hospital
                </td>
                <td className="px-6 py-4">
                26-01-2023
                </td>
                <td className="px-6 py-4">
                  16:08
                </td>
                <td className="px-6 py-4">
                    <button  className="font-medium text-blue-600 dark:text-blue-500 passdbtn">Download</button>
                </td>
            </tr>
          
        </tbody>
    </table>
</div>

      </div>
     
    </div>
  </div>
</div>
    </>
  )
}
