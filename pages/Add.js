import "mapbox-gl/dist/mapbox-gl.css"; 
import Estatetype from './components/Add/Estatetype'
import TransactionType from './components/Add/Transactiontype'
import Uploads from './components/Add/Uploads'
import MapView from './components/Map'
import SearchBar from './components/SearchBar'
import React, { useState, useEffect, useContext } from 'react'
import { ViewPortContext } from './states/viewport_context'
import { PanoramaContext } from './states/panorama_context'


function Add() {
  const [viewport, setViewport] = useState({});
  const [datas, setDatas] = useState({});


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
  )
}

export default Add