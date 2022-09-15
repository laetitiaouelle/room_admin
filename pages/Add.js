import "mapbox-gl/dist/mapbox-gl.css"; 

import Estatetype from './components/Add/Estatetype'
import TransactionType from './components/Add/Transactiontype'
import Uploads from './components/Add/Uploads'
import MapView from './components/Map'
import SearchBar from './components/SearchBar'
import React, { useState, useEffect, useContext } from 'react'
import { ViewPortContext } from './states/viewport_context'
import { PanoramaContext } from './states/panorama_context'
// import { UserContext } from './states/user_context';
import { useRouter } from 'next/router'
import Loader from "./layout/Loader";
import { motion } from "framer-motion"



function Add() {
  const [viewport, setViewport] = useState({});
  const [datas, setDatas] = useState({});

  const router = useRouter();
  // const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(true)
  useEffect(() => {
  }, [router])
  
  useEffect(() => {
    let accessToken = sessionStorage.getItem("accessToken")
    if(!accessToken){
      router.push('/auth/login')
    }else{
      console.log(accessToken)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
     setViewport({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5,
        bearing: 30,
        pitch: 10
      });
    });
  }, []);

  

  return (
    <>
       {isLoading&&(
        <motion.div initial={{ opacity: 0, scale: 0.5 }}  animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader opacity="100" /></div>
        </motion.div>
      )}

      {!isLoading&&(<motion.div initial={{ opacity: 0, scale: 0.8 }}  animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <PanoramaContext.Provider value={{datas, setDatas}}>
          <div >
            <ViewPortContext.Provider value={{viewport, setViewport}}>
              <MapView />
              <SearchBar/>
            </ViewPortContext.Provider>
              <TransactionType/>
              <Estatetype/>
              <Uploads/>
          </div>
        </PanoramaContext.Provider>
      </motion.div>)}
    </>
  )
}

export default Add