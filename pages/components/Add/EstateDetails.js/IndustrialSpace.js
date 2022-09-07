import React, { useState } from 'react'

function IndustrialSpace() {
  const [parkingSpaces, setParkingSpaces]=useState(0)
  const [toilets, setToilets]=useState("")
  const [buildingSurface, setBuildingSurface]=useState("");
  const [landarea, setLandArea] = useState("")
  const [yearOfconstruction, setYearOfconstruction]=useState("");
  const [commercialSpaceType, setCommercialSpaceType]=useState(""); 
  const [features, setFeatures]=useState(""); 
  const [spaceHeight, setSpaceHeight] = useState("")

  return (
    <>
      <div className='mt-4 h-20 ' >
        <div className='h-12 grid  grid-cols-1' >
          <div className='flex flex-row gap-5 col-span-1' >
           
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Parking spaces</span>
              <div className='flex items-center justify-center' >
                <a onClick={()=>parkingSpaces>0?setParkingSpaces(parkingSpaces-1):setParkingSpaces(0)} className=' cursor-pointer hover:border-white hover:text-white w-6 h-6 border rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >-</a>
                <span className='w-10 flex items-center justify-center' >{parkingSpaces}</span>
                <a onClick={()=>setParkingSpaces(parkingSpaces+1)} className='w-6 h-6 border cursor-pointer hover:border-white hover:text-white rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >+</a>
              </div>
            </div>
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Toilets</span>
              <div className='flex items-center justify-center' >
                <a onClick={()=>toilets>0?setToilets(toilets-1):setToilets(0)} className=' cursor-pointer hover:border-white hover:text-white w-6 h-6 border rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >-</a>
                <span className='w-10 flex items-center justify-center' >{toilets}</span>
                <a onClick={()=>setToilets(toilets+1)} className='w-6 h-6 border cursor-pointer hover:border-white hover:text-white rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >+</a>
              </div>
            </div>
            
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Usable surface</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setUsableSurface(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>

            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Land area</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setLandArea(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Building surface</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setBuildingSurface(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Space height (m)</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setSpaceHeight(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>
          
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Year of construction</span>
              <div className='flex items-center justify-center' >
                <input type={'text'} onChange={(e)=>setYearOfconstruction(e.target.value)} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='h-20 mt-4' >
        <div className='mt-6 h-20' >
          <span className='text-base font-medium text-temp-gray' >TYPE OF COMMERCIAL SPACE</span>
          <div className='h-12 grid  grid-cols-1 mt-4'  >
            <div className='flex flex-row gap-5 col-span-1' >
              <a  onClick={()=>setCommercialSpaceType("production")} className={`cursor-pointer h-10 w-36 flex items-center ${ commercialSpaceType!="production"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Production</a>
              <a  onClick={()=>setCommercialSpaceType("storage")} className={`cursor-pointer h-10 w-36 flex items-center ${ commercialSpaceType!="storage"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Storage</a>
              <a  onClick={()=>setCommercialSpaceType("mixt")} className={`cursor-pointer h-10 w-36 flex items-center ${ commercialSpaceType!="mixt"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Mixt</a>
            </div>
          </div>
        </div>
      </div>

      <div className='h-20 mt-4' >
        <div className='mt-6 h-20' >
          <span className='text-base font-medium text-temp-gray' >FEATURES</span>
          <div className='h-12 grid  grid-cols-1 mt-4'  >
            <div className='flex flex-row gap-5 col-span-1' >
              <a  onClick={()=>setFeatures("shooting-access")} className={`cursor-pointer h-10 w-36 flex items-center ${ features!="shooting-access"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Shooting access</a>
              <a  onClick={()=>setFeatures("unloading-ramp")} className={`cursor-pointer h-10 w-36 flex items-center ${ features!="unloading-ramp"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Unloading ramp</a>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default IndustrialSpace