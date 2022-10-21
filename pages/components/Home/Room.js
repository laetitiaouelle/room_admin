import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Room2(props) {

    const [image, setImage] = useState(null)

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/room-423c7.appspot.com/o/images"
    const id = props.panorama["uid"]
    const imageNumber = props.panorama["imagenumer"]
    const staticUrl = "https://firebasestorage.googleapis.com/v0/b/room-423c7.appspot.com/o/images%2Fc1c0dcbc-9751-466a-8fea-11bc33a88509_image0?alt=media&token=f4efa49b-ca2f-410f-892e-b232c08557eb"

    console.log(`${baseUrl}%2F${id}_image${parseInt(imageNumber)-1}`);
    useEffect(() => {
      fetch(`${baseUrl}%2F${id}_image${parseInt(imageNumber)-1}`).then((response)=>{
       response.json().then((data)=>{
        console.log(data["downloadTokens"])
        setImage(`${baseUrl}%2F${id}_image${parseInt(imageNumber)-1}?alt=media&token=${data["downloadTokens"]}`)
       })
      })
    }, [])

    useEffect(() => {
      console.log("image"+image)
    }, [image, setImage])
    
    

  return (
    <a className='cursor-pointer group' >
        <div className='bg-white w-[270px]  border border-[#00000017] mb-6 ' >
        <div className={`h-[150px] w-full bg-slate-500 bg-center bg-no-repeat relative`} >
            <div className='absolute top-0 bottom-0 left-0 right-0 bg-[#00000040] flex items-end' >
                    <Image src={image!=null?image:staticUrl} alt="..." layout='fill' objectFit='cover' className=" max-w-full max-h-full align-middle border-none group-hover:scale-150 transition-all delay-300" />
            </div>
        </div>
        <div className='p-3 flex flex-row justify-between items-center'  >
            <div>
                <span className='block  text-slate-800 font-extrabold text-lg' >{props.panorama["title"]}</span>
                <div className='flex flex-row mt-1' >
                <span className='block text-temp-red font-extrabold text-xs' > Start from ${props.panorama["price"]}</span>
                </div>
            </div>
            <div>
            </div>
        </div>
        </div>
    </a>
  )
}

export default Room2