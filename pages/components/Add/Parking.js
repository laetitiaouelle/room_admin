import React, { useState } from 'react'

function Parking() {
  const [parkingType, setParkingType] = useState("");
  return (
    <>
    <div className='mt-6 h-20' >
        <span className='text-base font-medium text-temp-gray' >PARKING</span>
        <div className='h-12 grid  grid-cols-1 mt-4'  >
          <div className='flex flex-row gap-5 col-span-1' >
            <a  onClick={()=>setParkingType("go")} className={`cursor-pointer h-10 w-36 flex items-center ${ parkingType!="go"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Go</a>
            <a  onClick={()=>setParkingType("garage")} className={`cursor-pointer h-10 w-36 flex items-center ${ parkingType!="garage"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Garage</a>
            <a  onClick={()=>setParkingType("suppraterrnane")} className={`cursor-pointer h-10 w-36 flex items-center ${ parkingType!="suppraterrnane"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Supraterrane</a>
            <a  onClick={()=>setParkingType("underground")} className={`cursor-pointer h-10 w-36 flex items-center ${ parkingType!="underground"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >underground</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Parking