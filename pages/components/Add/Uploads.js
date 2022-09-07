import React, { useContext, useEffect, useState } from 'react'
import { PanoramaContext } from '../../states/panorama_context';

function Uploads() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const {datas, setDatas} = useContext(PanoramaContext);
  const [fileType, setfileType] = useState(1);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  useEffect(() => {
    if(title!=""&&description!=""&image!=null){
      setDatas({
        ...datas,
        title:title,
        description:description,
        image:image
      })
    }
  }, [title,description,image])

  useEffect(() => {
    console.log(datas)
   }, [datas])
  
  return (
    <>
      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >TITLE</span>
        <div className='mt-3 w-full h-10 px-4 bg-[#eee]' >
          <input type="text" onChange={(e)=>setTitle(e.target.value)} className='w-full bg-[#eee] h-full outline-none col-span-1' />
        </div>
      </div>
      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >DESCRIPTION</span>
        <div className='mt-3 w-full h-80 p-4 bg-[#eee]' >
          <textarea type="text" onChange={(e)=>setDescription(e.target.value)} className='w-full h-full bg-[#eee] outline-none col-span-1' />
        </div>
      </div>

      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >ADD PANORAMA PICTURE</span>
        <div className='my-4' >
          <div className='h-12 grid  grid-cols-2  my-3' >
            <div className='flex flex-row gap-5 col-span-1' >
                <a onClick={()=>setfileType(1)} className={`cursor-pointer h-10 w-36 flex items-center ${ fileType!=1? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >360° File</a>
                <a onClick={()=>setfileType(2)} className={`cursor-pointer h-10 w-36 flex items-center ${ fileType!=2? "bg-temp-gray2" :"bg-cyan-900"} justify-center text-white text-sm hover:bg-cyan-700 `} >360° Url</a>
            </div>
          </div>
        </div>
        {
          fileType!=2&&(<div className='mt-3 w-full h-80 p-4 bg-[#eee]' >
            <div className='w-full h-full flex items-center justify-center ' >
                <label for="upload-photo">
                <a onClick={(e)=>uploadToClient(e)} className=' cursor-pointer hover:bg-[#e6e6e6] w-60 bg-[#e6e6e680] h-40 text-temp-gray flex items-center justify-center' >
                    clique to upload
                </a>
              </label>
              <input type={'file'} id="upload-photo" />
            </div>
          </div>)
        }
        {
          fileType!=1&&(
            <div className='mt-3 w-full h-12' >
              <div className='mt-3 w-full h-10 px-4 bg-[#eee]' >
                <input type="text" onChange={(e)=>setImage(e.target.value)} className='w-full bg-[#eee] h-full outline-none col-span-1' />
              </div>
            </div>
          )
        }
        {
            image!=null&&(<iframe className=' w-full h-96' src={image} ></iframe>)
        }
      </div>

      <div className='w-full h-14 my-10' >
        <div className='h-12 grid  w-full grid-cols-2  my-3 relative' >
          <div className='flex flex-row items-end justify-end  w-full gap-5 col-span-1 absolute right-0 ' >
              <a className={`cursor-pointer h-10 w-36 flex bg-green-900 items-center justify-center text-white text-sm hover:bg-cyan-700 `} >Add</a>
              <a className={`cursor-pointer h-10 w-36 flex items-center bg-red-900 justify-center text-white text-sm hover:bg-cyan-700 `} >Cancel</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Uploads