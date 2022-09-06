import React from 'react'

function Uploads() {
  return (
    <>
      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >TITLE</span>
        <div className='mt-3 w-full h-10 px-4 bg-[#eee]' >
          <input type="text" className='w-full bg-[#eee] h-full outline-none col-span-1' />
        </div>
      </div>
      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >DESCRIPTION</span>
        <div className='mt-3 w-full h-80 p-4 bg-[#eee]' >
          <textarea type="text" className='w-full h-full bg-[#eee] outline-none col-span-1' />
        </div>
      </div>

      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >ADD PICTURES</span>
        <div className='mt-3 w-full h-80 p-4 bg-[#eee]' >
          <span>
            The first image will be used as a presentation image. You can change the order of the images by drag&drop after you first choose the image you want to move.
          </span>
          <div className='w-full h-full flex items-center justify-center ' >
              <a className=' cursor-pointer hover:bg-[#e6e6e6] w-60 bg-[#e6e6e680] h-40 text-temp-gray flex items-center justify-center' >
                  clique to uploads
              </a>
          </div>
        </div>
      </div>

      <div className='mt-4' >
        <span className='text-base font-medium text-temp-gray' >ADD PANORAMA PICTURE</span>
        <div className='mt-3 w-full h-80 p-4 bg-[#eee]' >
        <div className='w-full h-full flex items-center justify-center ' >
              <a className=' cursor-pointer hover:bg-[#e6e6e6] w-60 bg-[#e6e6e680] h-40 text-temp-gray flex items-center justify-center' >
                  clique to uploads
              </a>
          </div>

        </div>
      </div>
    </>
  )
}

export default Uploads