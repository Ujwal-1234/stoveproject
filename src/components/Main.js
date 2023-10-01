import React, { useRef, useState } from 'react'
import Maps from './Maps';
import { useEffect } from 'react';
import List from './List';
import { FaMapMarkerAlt, FaThList, FaSistrix } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Search from './Search';
import { BiSolidAddToQueue } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'
import { TbDevicesPlus } from 'react-icons/tb';
import Loading from './Loading';

export default function Main() {
    const [mapView, setMapView] = useState(false)
    const [menuicon, setMenuicon] = useState(true)
    const [search, setSearch] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [device, setDevice] = useState(false)
    const [added, setAdded] = useState(false)
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(true);

    const imei = useRef()
    const serial = useRef()
    const simNumber = useRef()
    const [d_name, setDname] =useState([])
    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log(sessionStorage.getItem('sessionid'))
          const url = 'http://techpradnya.in:3000/getstove'
          const data = {
            sessionid:sessionStorage.getItem('sessionid'),
            admin:sessionStorage.getItem('admin')
          };
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };
          console.log(url)
          fetch(url, options).then((response)=>response.json()).then((actualData)=>{
            console.log(actualData)
            if(!actualData.error)
            {
              console.log(actualData)
              if(actualData.result === 'success')
              {
                let arr = [];
                console.log(actualData)
                for (let loop = 0; loop < actualData.data.length; loop++) {
                  arr.push(actualData.data[loop].device_name);
                  sessionStorage.setItem(
                    actualData.data[loop].device_name,
                    JSON.stringify(actualData.data[loop])
                  );
                }
                setDname(arr);
              }
            }
          }).catch((err)=>{
            console.log(err.message)
          })
          
        } catch (error) {
          console.log(error.message);
        } finally {
          // After the fetchData function has completed (whether success or error), set loading to false.
          setLoading(false);
        }
      };
    
      fetchData(); // Call fetchData directly
    
      // The empty dependency array [] means this effect runs once after the initial render.
    }, []);
    
  
    // console.log(sessionStorage.getItem('sessionid'))
    const user_logout=()=>{
      const url = 'http://techpradnya.in:3000/logout'
      const data = {
        sessionid:sessionStorage.getItem('sessionid')
      };
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      };
      console.log(url)
      fetch(url, options).then((response)=>response.json()).then((actualData)=>{
        console.log(actualData)
        if(!actualData.error)
        {
          console.log(actualData)
          if(actualData.message === 'Logged Out')
          {
            console.log("Logging out ...")
            sessionStorage.clear()
          }
        }
      }).catch((err)=>{
        console.log(err.message)
      })
      
      // window.location.reload()
    }
    const search_box = ()=>{
      setSearch(true)
    }
    useEffect(()=>{
      if(sessionStorage.getItem('sessionid')){
        sessionStorage.getItem('admin')==='1'?setAdmin(true):setAdmin(false)
      }
    }, [])
    const add_device =()=>{
      if(imei.current.value === '' && serial.current.value === '' && simNumber.current.value === '')
      {
        console.log('error')
      }else{
        console.log(serial.current.value, imei.current.value, simNumber.current.value)
        const url = 'http://techpradnya.in:3000/newdevice'
        const data = {
          imei: imei.current.value,
          serial: serial.current.value,
          sim: simNumber.current.value,
          sessionid:sessionStorage.getItem('sessionid'),
          admin:sessionStorage.getItem('admin')
        };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data),
        };
        console.log(url)
        fetch(url, options).then((response)=>response.json()).then((actualData)=>{
          console.log(actualData)
          if(!actualData.error)
          {
            console.log(actualData)
            if(actualData.result && actualData.result === 'success')
            {
              setAdded(true)
              setToken(actualData.token)
              console.log("device added")
            }
          }

        }).catch((err)=>{
          console.log(err.message)
        })
      }
    }
  useEffect(() => {
    const concernedElement = document.getElementById('add-device');
    document.addEventListener('mousedown', (event) => {
      if (concernedElement && concernedElement.contains(event.target)) {
        console.log("Clicked Inside");
      } else {
        if (concernedElement) {
          concernedElement.style.display = 'none';
        }
        console.log("Clicked Outside / Elsewhere");
      }
    });
  }, []);
    
  return (
    <div className='text-white flex flex-wrap min-h-screen w-full items-center justify-center'>
        {loading?<Loading/>:mapView?<List data={d_name}/>:<Maps/>}
        <div className=' hidden w-1/12 right-0 bottom-0 lg:flex lg:flex-wrap items-center justify-center rounded-2xl shadow-inner shadow-black p-5'>
            {mapView?<FaMapMarkerAlt onClick={()=>{setMapView(false)}} className=' text-2xl w-full mt-5 hover:text-4xl hover:cursor-pointer'/>:<FaThList onClick={()=>{setMapView(true)}} className=' text-2xl w-full mt-5 hover:text-4xl hover:cursor-pointer'/>}
            {
              admin
              ?
              <>
                <FaSistrix className=' text-2xl w-full mt-5 hover:text-4xl hover:cursor-pointer' onClick={()=>{search_box()}}/>
                <TbDevicesPlus className=' text-2xl w-full mt-5 hover:text-4xl hover:cursor-pointer' onClick={()=>{setDevice(true)}}/>
              </>
              :
              <></>
            }
            <div className='hidden lg:flex lg:fixed top-10'><input type='submit' onClick={()=>{user_logout()}} className=' border p-5 rounded-2xl hover:shadow-inner hover:shadow-white hover:cursor-pointer' value={'logout'}/></div>
        </div>
        <div className=' lg:hidden fixed bottom-0 right-10 p-5'>{menuicon?<FiMenu className=' text-5xl' onClick={()=>{setMenuicon(false)}}/>:<FiX className=' text-5xl' onClick={()=>{setMenuicon(true)}}/>}</div>
        {
          menuicon?
          <></>
          :
          <div className='lg:hidden bottom-20 bg-black p-2 rounded-xl border-2 right-10 fixed'>
              {mapView?<FaMapMarkerAlt onClick={()=>{setMapView(false)}} className=' text-8xl hover:cursor-pointer'/>:<FaThList onClick={()=>{setMapView(true)}} className=' text-8xl hover:cursor-pointer'/>}
              {
                admin
                ?
                <>
                  <FaSistrix className=' text-8xl hover:cursor-pointer' onClick={()=>{search_box()}}/>
                  <TbDevicesPlus className=' text-8xl hover:cursor-pointer' onClick={()=>{setDevice(true)}}/>
                </>
                :
                <></>
              }
              <div className=' flex flex-wrap items-center justify-center'>
                <input type='submit' className=' flex items-center justify-center text-xl border rounded-sm bg-slate-400 active:bg-slate-900' onClick={()=>{user_logout()}} value={"LOGOUT"}/>
              </div>
          </div>
        }
        {
          admin && device
          ?
            <div className=' fixed bg-slate-700 shadow-2xl flex flex-wrap justify-end shadow-black rounded-md p-10 text-black'>
              <FiX onClick={()=>{setDevice(false); setAdded(false)}} className='text-2xl text-black m-2 hover:text-4xl hover:cursor-pointer rounded-lg shadow-xl shadow-black bg-white'/>
              {
                added
                ?
                <>
                  <div className='w-full flex flex-wrap items-center m-5 justify-center'>
                    <span className='text-white text-2xl'>Device Added Successfully</span>
                    <TiTick className=' w-full  text-8xl text-green-500'/>
                    <p className=' text-white text-xl'>
                      {`Token Generated : ${token}`}
                      <span className='  w-full flex p-4 items-center justify-center'>
                        <input type='button' onClick={()=>{setAdded(false)}} className=' bg-green-500  pr-2 pl-2 hover:text-3xl hover:cursor-pointer shadow-lg shadow-black rounded-lg text-2xl' value={"OK"}/>
                      </span>
                    </p>
                  </div>
                </>
                :
                <>
                  <input type='text' placeholder='IMEI number' ref={imei} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
                  <input type='text' placeholder='Serial number' ref={serial} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
                  <input type='text' placeholder='SIM number' value={93045003050} ref={simNumber} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
                  <BiSolidAddToQueue onClick={()=>{add_device()}} className=' text-white text-5xl inline-block m-4 shadow shadow-black hover:cursor-pointer hover:shadow-white hover:bg-black'/>
                </>
              }
            </div>
          :
          <></>
        }
        {
          search?<div className=' min-h-screen min-w-full flex flex-wrap items-center bg-white justify-center fixed top-0 bg-opacity-25'><div className='lg:w-1/2 fixed w-full flex flex-wrap items-center justify-end '><FiX onClick={()=>{setSearch(false)}} className='text-5xl text-black m-2 hover:text-4xl hover:cursor-pointer rounded-lg shadow-xl shadow-black bg-white'/><Search /></div></div>:<></>
        }
    </div>
  )
}
