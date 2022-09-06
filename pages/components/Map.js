import React, { useState, useEffect } from 'react'
import Map, { Marker } from "react-map-gl";

function MapView() {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5,
      });
    });
  }, []);

  if (!isBrowser) {
    return null;
  }
  return (
    <div className='h-80 w-full bg-black relative' >
        {viewport.latitude && viewport.longitude && (
          <div className='absolute top-0 left-0 right-0 bottom-0' >
           
            <Map
                mapboxAccessToken="pk.eyJ1Ijoic21hcnRkZXYxMjMiLCJhIjoiY2t5bGZvODhyMDAxMjJwcGE2Yzhrc25kayJ9.-UYwiZVX6ombKhaev9cryQ"
                mapStyle="mapbox://styles/smartdev123/ckylt6sik7d7a15pwv030u2sd"
            >
            </Map>
          </div>
          
          )}
    </div>
  )
}

export default MapView