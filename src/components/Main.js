import React, { useRef, useState } from 'react'
import Maps from './Maps';
import { useEffect } from 'react';
import List from './List';
import { FaMapMarkerAlt, FaThList, FaSistrix } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Search from './Search';
import { BiSolidAddToQueue } from 'react-icons/bi'
import { TbDevicesPlus } from 'react-icons/tb';

export default function Main() {
    const [mapView, setMapView] = useState(false)
    const [menuicon, setMenuicon] = useState(true)
    const [search, setSearch] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [device, setDevice] = useState(false)
    const imei = useRef()
    const serial = useRef()
    // console.log(sessionStorage.getItem('sessionid'))
    const user_logout=()=>{
      const url = 'http://localhost:3000/logout'
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
      if(imei.current.value === '' && serial.current.value === '')
      {
        console.log('error')
      }else{
        console.log(serial.current.value, imei.current.value)
        const url = 'http://localhost:3000/newdevice'
        const data = {
          imei: imei.current.value,
          serial: serial.current.value,
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
            if(actualData.message === 'Device Added')
            {
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
        {mapView?<List/>:<Maps/>}
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
              <FiX onClick={()=>{setDevice(false)}} className='text-2xl text-black m-2 hover:text-4xl hover:cursor-pointer rounded-lg shadow-xl shadow-black bg-white'/>
              <input type='text' placeholder='IMEI number' ref={imei} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
              <input type='text' placeholder='Serial number' ref={serial} className=' lg:w-auto w-full border-black border p-4 m-2 shadow-2xl shadow-black rounded-xl'/>
              <BiSolidAddToQueue onClick={()=>{add_device()}} className=' text-white text-5xl inline-block m-4 shadow shadow-black hover:cursor-pointer hover:shadow-white hover:bg-black'/>
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
