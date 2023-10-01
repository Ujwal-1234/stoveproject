import React from 'react';
import { useState, useEffect } from 'react';
import Log from './components/Log'
import Main from './components/Main'
import './App.css';
import Loading from './components/Loading';
// import 'leaflet/dist/leaflet.css'

function App() {
  const [log, setLog] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setInterval(() => {
      setLoading(false)
      // console.log(sessionStorage.getItem('sessionid'))
      sessionStorage.getItem('sessionid')?setLog(true):setLog(false)
    }, 1000);
  },[])

  return (
    <div className=" bg-black flex flex-wrap items-center justify-center min-h-screen min-w-full max-h-screen max-w-full overflow-auto">
      {loading?<Loading/>:log?<Main/>:<Log/>}
    </div>
  );
}

export default App;
