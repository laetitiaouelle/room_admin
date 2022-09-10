import "mapbox-gl/dist/mapbox-gl.css"; 
import Estatetype from './components/Add/Estatetype'
import TransactionType from './components/Add/Transactiontype'
import Uploads from './components/Add/Uploads'
import MapView from './components/Map'
import SearchBar from './components/SearchBar'
import React, { useState, useEffect, useContext } from 'react'
import { ViewPortContext } from './states/viewport_context'
import { PanoramaContext } from './states/panorama_context'
import { UserContext } from './states/user_context';
import { useRouter } from 'next/router'
import Loader from "./layout/Loader";


function Add() {
  const [viewport, setViewport] = useState({});
  const [datas, setDatas] = useState({});

  const router = useRouter();
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(false)
  
  useEffect(() => {
    let accessToken = sessionStorage.getItem("accessToken")
    if(!accessToken){
      console.log("a",accessToken)
      router.push('/auth/login')
    }else{
      setIsLoading(true)
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
      {!isLoading&&(<div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader opacity="100" /></div>)}
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
    </>
  )
}

export default Add