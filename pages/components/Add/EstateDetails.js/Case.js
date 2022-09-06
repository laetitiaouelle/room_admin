import React, { useState } from 'react'
import AltitudeRegime from '../AltitudeRegime';

function Case() {
  const [rooms, setRooms]=useState(0);
  const [yes, setYes]=useState(0);
  const [confort, setConfort]=useState(0);
  const [usableSurface, setUsableSurface]=useState("");
  const [land, setLand]=useState("");
  const [Streetf, setstreatf]=useState("");
  const [yearOfconstruction, setYearOfconstruction]=useState("");

  const [constructionType, setConstructionType]=useState("");
  return (
    <>
      <div className='h-20 mt-4' >
        <div className='mt-6 h-20' >
          <span className='text-base font-medium text-temp-gray' >CONSTRUCTION</span>
          <div className='h-12 grid  grid-cols-1 mt-4'  >
            <div className='flex flex-row gap-5 col-span-1' >
              <a  onClick={()=>setConstructionType("nine")} className={`cursor-pointer h-10 w-36 flex items-center ${ constructionType!="nine"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Nine</a>
              <a  onClick={()=>setConstructionType("old")} className={`cursor-pointer h-10 w-36 flex items-center ${ constructionType!="old"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >Old</a>
              <a  onClick={()=>setConstructionType("inconst")} className={`cursor-pointer h-10 w-36 flex items-center ${ constructionType!="inconst"? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >In construction</a>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6 h-20 ' >
        <div className='h-12 grid  grid-cols-1' >
          <div className='flex flex-row gap-5 col-span-1' >
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Rooms</span>
              <div className='flex items-center justify-center' >
                <a onClick={()=>rooms>0?setRooms(rooms-1):setRooms(0)} className=' cursor-pointer hover:border-white hover:text-white w-6 h-6 border rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >-</a>
                <span className='w-10 flex items-center justify-center' >{rooms}</span>
                <a onClick={()=>setRooms(rooms+1)} className='w-6 h-6 border cursor-pointer hover:border-white hover:text-white rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >+</a>
              </div>
            </div>
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Yes</span>
              <div className='flex items-center justify-center' >
                <a onClick={()=>yes>0?setYes(yes-1):setYes(0)} className=' cursor-pointer hover:border-white hover:text-white w-6 h-6 border rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >-</a>
                <span className='w-10 flex items-center justify-center' >{yes}</span>
                <a onClick={()=>setYes(yes+1)} className='w-6 h-6 border cursor-pointer hover:border-white hover:text-white rounded-full border-cyan-900  text-cyan-900 font-medium flex items-center justify-center' >+</a>
              </div>
            </div>
           
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Usable surface</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setUsableSurface(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Land  area</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setLand(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
              </div>
            </div>
            <div className={`h-20 w-36 flex items-center bg-temp-gray2  flex-col justify-center text-white text-sm`} >
              <span className=' mb-2' >Street  front</span>
              <div className='flex items-center justify-center' >
                <input onChange={(e)=>setstreatf(e.target.value)} type={'text'} className='w-14 text-center outline-none text-white border-b bg-temp-gray2 border-b-cyan-900 border-dashed' />
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
      <div className='mt-6 h-20' >
        <AltitudeRegime/>
      </div>
   </>
  )
}

export default Case