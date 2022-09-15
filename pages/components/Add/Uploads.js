import 'react-toastify/dist/ReactToastify.css';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { database, storage } from "../../api/firebase";
import { PanoramaContext } from "../../../states/panorama_context";
import { v4 as uuidv4 } from "uuid";
import { IconContext } from "react-icons";
import { BiImageAdd } from "react-icons/bi";
import { collection, addDoc } from 'firebase/firestore'
import Loader from "../../layout/Loader";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import{motion} from 'framer-motion'
import Image from 'next/image'



function Uploads() {
  const [image, setImage] = useState(null);
  const [uploadImg, setuploadImg] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const { datas, setDatas } = useContext(PanoramaContext);
  const [fileType, setfileType] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const databaseRef = collection(database,"panoramas")
  const router = useRouter()

  const addData = ()=>{
    setShowLoader(true)
    addDoc(databaseRef,datas).then(()=>{
      working()
    }).catch((errors)=>{
        setShowLoader(false)
        console.log("errors: ", errors)
    })
}

  const working = async () => {
    const progress=0;
    if (uploadImg) {
      for (const listImg of uploadImg) {
        const runFunEach = async () => {
          const type = listImg.type;
          if (type == "image/png" || type == "image/jpg" || type == "image/jpeg" ) {
            const storageRef = ref(storage, `images/${datas.uid}_image${uploadImg.indexOf(listImg)}`);
            const metadata = {
              contentType: "image/jpeg",
            };
            const uploadTask = uploadBytesResumable(
              storageRef,
              listImg,
              metadata
            );

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                progress = progress+(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                if(progress/100==uploadImg.length){
                 
                  setDatas({})
                  router.push('/')
                  setShowLoader(false)
                }
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {},
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at", downloadURL);
                });
              },
             
              setuploadImg([])
            );
          }
        };
        await runFunEach();
      }
    }
  };

  

  useEffect(() => {
      setDatas({
        ...datas,
        imagenumer:uploadImg.length
      });
  }, [uploadImg])
  
 
  useEffect(() => {
    if(image!=""){
      setDatas({
        ...datas,
        image:image
      });
    }
  }, [image])
  
  useEffect(() => {
    if (title != "" && (description != "")) {
      setDatas({
        ...datas,
        title: title,
        description: description,
      });
    }
  }, [title, description]);

  

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
     />

        {
          showLoader&&(<div className='absolute left-0 right-0 top-0 bottom-0  bg-transparent ' > <Loader opacity="70" />  </div>)
        }
      <div className="mt-4">
        <span className="text-base font-medium text-temp-gray">TITLE</span>
        <div className="mt-3 w-full h-10 px-4 bg-[#eee]">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#eee] h-full outline-none col-span-1"
          />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-base font-medium text-temp-gray">
          DESCRIPTION
        </span>
        <div className="mt-3 w-full h-80 p-4 bg-[#eee]">
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-full bg-[#eee] outline-none col-span-1"
          />
        </div>
      </div>

      <div className="mt-4">
        <span className="text-base font-medium text-temp-gray">
          ADD PANORAMA PICTURE
        </span>
        <div className="my-4">
          <div className="h-12 grid  grid-cols-2  my-3">
            <div className="flex flex-row gap-5 col-span-1">
              <a
                onClick={() => setfileType(1)}
                className={`cursor-pointer h-10 w-36 flex items-center ${
                  fileType != 1 ? "bg-temp-gray2" : "bg-cyan-900"
                } justify-center text-white text-sm hover:bg-cyan-700 `}
              >
                360° File
              </a>
              <a
                onClick={() => setfileType(2)}
                className={`cursor-pointer h-10 w-36 flex items-center ${
                  fileType != 2 ? "bg-temp-gray2" : "bg-cyan-900"
                } justify-center text-white text-sm hover:bg-cyan-700 `}
              >
                360° Url
              </a>
            </div>
          </div>
        </div>
        {fileType != 2 && (
          <motion.div initial={{ opacity: 0}}  animate={{ opacity: 1}} transition={{ duration: 0.3 }}>
            <div className="mt-3 w-full h-80 p-4 bg-[#eee]">

              {uploadImg.length==0&&(
                <motion.div initial={{ opacity: 0}}  animate={{ opacity: 1}} transition={{ duration: 0.3 }} className="w-full h-full flex items-center justify-center " >
                  <div className="w-full h-full flex items-center justify-center ">
                    <label htmlFor="upload-photo">
                      <a className=" cursor-pointer hover:bg-[#e6e6e6] w-60 bg-[#e6e6e680] h-40 text-temp-gray flex items-center justify-center">
                        clique to upload
                      </a>
                    </label>
                    <input multiple={true}
                      onChange={(e) => {
                        console.log("files",e.target.files)
                        setuploadImg((prev)=>[...prev??"",e?.target?.files[0]]);
                        console.log("this should work", uploadImg&&uploadImg);
                      }}
                      type="file"
                      alt=''
                      id="upload-photo"
                    />
                  </div>
                </motion.div>
              )}
              {
                uploadImg.length!==0&&(
                  <div className='flex flex-row items-center gap-4 flex-wrap ' >
                    {uploadImg.map((link, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale:0.9}}  animate={{ opacity: 1, scale:1}} transition={{ duration: 0.3 }}>
                        <span  className=' h-40 bg-white flex items-center justify-center' >
                          <Image alt='' className='h-40 ' src={link} />
                        </span>
                      </motion.div>
                    ))}
                    <div>
                      <label htmlFor="upload-photo">
                        <a  className=' cursor-pointer text hover:bg-cyan-700 rounded-full w-12 bg-cyan-900 h-12 text-temp-gray flex items-center justify-center' >
                        <span className='flex justify-center items-center '>
                          <IconContext.Provider value={{ color: "#fff"}}>
                              <div>
                                  <BiImageAdd/>
                              </div>
                          </IconContext.Provider>
                      </span>
                        </a>
                      </label>
                      <input multiple={true}
                        onChange={(e) => {
                          console.log("files",e.target.files)
                          setuploadImg((prev)=>[...prev??"",e?.target?.files[0]]);
                          console.log("this should work", uploadImg&&uploadImg);
                        }}
                        type="file"
                        id="upload-photo"
                      />
                    </div>
                  </div>
                )
              }

            </div>
          </motion.div>
        )}

        
        {fileType != 1 && (
          <motion.div initial={{ opacity: 0}}  animate={{ opacity: 1}} transition={{ duration: 0.3 }}>
            <div className="mt-3 w-full h-12">
              <div className="mt-3 w-full h-10 px-4 bg-[#eee]">
                <input
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#eee] h-full outline-none col-span-1"
                />
              </div>
            </div>
          </motion.div>
        )}
        {(image != null&&fileType != 1) && (
          <motion.div initial={{ opacity: 0}}  animate={{ opacity: 1}} transition={{ duration: 0.3 }}>
            <iframe className=" w-full h-96" src={image}></iframe>
          </motion.div>
        )}
      </div>

      <div className="w-full h-14 my-10">
        <div className="h-12 grid  w-full grid-cols-2  my-3 relative">
          <div className="flex flex-row items-end justify-end  w-full gap-5 col-span-1 absolute right-0 ">
            <a
            onClick={()=>addData()}
              className={`cursor-pointer h-10 w-36 flex bg-green-900 items-center justify-center text-white text-sm hover:bg-cyan-700 `}
            >
              Add
            </a>
            <a
              onClick={()=>toast.warn("Wow so easy!")}
              className={`cursor-pointer h-10 w-36 flex items-center bg-red-900 justify-center text-white text-sm hover:bg-cyan-700 `}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Uploads;