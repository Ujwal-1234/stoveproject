import React, { useEffect, useRef, useState } from 'react'

export default function Log() {
    const [login, setLogin] = useState(false)
    const l_user = useRef()
    const l_pass = useRef()
    const user_login = () =>{
      const url = 'http://localhost:3000/login'
      const data = {
        userid: l_user.current.value,
        password: l_pass.current.value,
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
          if(actualData.message === 'Login successful')
          {
            sessionStorage.setItem('sessionid', actualData.sessionid)
            sessionStorage.setItem('admin', actualData.admin)
            {sessionStorage.getItem('sessionid')?window.location.reload():console.log('Login Failed')}
          }
        }

      }).catch((err)=>{
        console.log(err.message)
      })
    }
  return (
    <>
    <div className='lg:w-1/2 w-full p-10 rounded-3xl flex flex-wrap items-center justify-center shadow-inner text-white shadow-white h-3/4 bg-slate-800'>
    {login
    ?
        <form className=' lg:w-3/4 flex flex-wrap items-center justify-center'>
            <input type='text' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' ref={l_user} placeholder='USER ID'/>
            <input type='password' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' ref={l_pass} placeholder='PASSWORD'/>
            <input type='button' className=' w-full lg:w-3/4 p-3 rounded-xl text-2xl m-2 bg-gradient-to-b from-black to-white hover:from-white hover:to-black hover:cursor-pointer text-black text-center' onClick={()=>{user_login()}} value={"LOGIN"}/>
            <a className=' cursor-default w-full flex flex-wrap items-center m-4 justify-center'>New to Us ? <span className='cursor-pointer underline' onClick={()=>{setLogin(false)}}>Create Account</span></a>
        </form>
    :
    <form className='lg:w-3/4 flex flex-wrap items-center justify-center'>
        <input type='text' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='FULL NAME'/>
        <input type='text' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='EMAIL'/>
        <input type='text' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='PHONE'/>
        <input type='password' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='PASSWORD'/>
        <input type='password' className=' lg:w-3/4 p-3 rounded-xl text-2xl m-2 text-black text-center' placeholder='CONFIRM PASSWORD'/>
        <input type='button' className=' w-full lg:w-3/4 p-3 rounded-xl text-2xl m-2 bg-gradient-to-b from-black to-white hover:from-white hover:to-black hover:cursor-pointer text-black text-center' value={"REGISTER"} />
        <a className=' cursor-default w-full flex flex-wrap items-center m-4 justify-center'>Already Registered ? <span className='cursor-pointer underline' onClick={()=>{setLogin(true)}}>Login</span></a>
    </form>
    }
    </div>
    </>
  )
}
