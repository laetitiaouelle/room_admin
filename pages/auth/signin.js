import React, { useContext, useEffect, useState } from 'react'
import { IconContext } from "react-icons"
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import {BiUserCircle} from 'react-icons/bi'
import {MdAlternateEmail, MdPassword} from 'react-icons/md'
import {app, database} from "../api/firebase"
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup }  from "firebase/auth"
import {useRouter} from 'next/router'
import { UserContext } from '../states/user_context';
import { collection, addDoc } from 'firebase/firestore'
import Loader from '../layout/Loader'
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion"




function SignIn() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, seterrors] = useState({});
    const {user, setUser} = useContext(UserContext);
    const [showLoader, setShowLoader] = useState(true);

    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter()   
    const databaseRef = collection(database,"user info")

    const addDataWithEmailAndPassword = ()=>{
        addDoc(databaseRef,{
            firstname: firstname, 
            lastname:lastname,
            email:userEmail,
            password: userPassword
        }).then(()=>{
            setShowLoader(false)
            router.push('/auth/login')
        }).catch((errors)=>{
            setShowLoader(false)
            console.log("errors: ", errors)
        })
    }
    
    useEffect(() => {
      let accessToken = sessionStorage.getItem("accessToken")
      if(accessToken){
        router.push('/')
      }else{
        setTimeout(() => {
            setShowLoader(false)
        }, 1000);
      }
    }, [router])

    
    

    const signInWithEmailAndPassword=(email, password)=>{
        setShowLoader(true)
        createUserWithEmailAndPassword(auth, email, password).then(
            (response)=>{
                setUser(response.user)
                sessionStorage.setItem("accessToken", response.user.accessToken)
                addDataWithEmailAndPassword()
            }
        ).catch((errors)=>{
            console.log("err: ", errors)
            setShowLoader(false)
            if(errors.code=="auth/email-already-in-use"){
                seterrors({email:"Email already in use"})
            }else if(errors.code=="auth/weak-password"){
                seterrors({password:"Password should be at least 6 characters"})
            }else if(errors.code=="auth/invalid-email"){
                seterrors({email:"Invalid email"})
            }
        })
    }
    const signInWithGoogle=()=>{
        signInWithPopup(auth, googleProvider).then((response)=>{
            setUser(response.user)
            sessionStorage.setItem("accessToken", response.user.accessToken)
            router.push('/auth/login')
        }).catch((errors)=>console.log(errors.code))
    }

    
  return (
    <div className='h-screen w-full flex flex-col items-center justify-start pt-32 bg-white' >
        {
            showLoader&&(
                <motion.div initial={{ opacity: 0 }}  animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader Loader opacity="70" />  </div>
                </motion.div>
            )
        }
       { !showLoader&&
       (
        <motion.div initial={{ opacity: 0, scale: 0.9 }}  animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <div className='py-6 w-full flex justify-center items-center' >
                    <h3 className='text-temp-blue font-semibold' >Create Account</h3>
            </div>
            <div className='py-6' >
                
                <div className='mb-3 w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white px-2' >
                    <input onChange={(e)=>setFirstname(e.target.value)} className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='text' placeholder='firstname' />
                    <span className='block w-4 h-4 '>
                        <IconContext.Provider value={{ color: "#afafaf"}}>
                        <div>
                            <BiUserCircle/>
                        </div>
                        </IconContext.Provider>
                    </span>
                </div>
                <div className='mb-3 w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white px-2' >
                    <input onChange={(e)=>setLastname(e.target.value)} className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='text' placeholder='lastname' />
                    <span className='block w-4 h-4 '>
                        <IconContext.Provider value={{ color: "#afafaf"}}>
                        <div>
                            <BiUserCircle/>
                        </div>
                        </IconContext.Provider>
                    </span>
                </div>
                {
                    errors.email!=null&&(<span className='my-2 text-xs font-semibold text-temp-red' >
                        {errors.email}
                        { (errors.email=="Email already in use")&&(<a onClick={()=>router.push("/auth/login")} className='cursor-pointer text-blue-800 hover:text-blue-900 ml-3' >Login here</a>)}
                    </span>)
                }
                <div className='mb-3 w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white px-2' >
                    <input onChange={(e)=>{
                        seterrors("")
                        setUserEmail(e.target.value)
                        }} className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='email' placeholder='youremail@example.com' />
                    <span className='block w-4 h-4 '>
                        <IconContext.Provider value={{ color: "#afafaf"}}>
                        <div>
                            <MdAlternateEmail/>
                        </div>
                        </IconContext.Provider>
                    </span>
                </div>

                {
                    errors.password!=null&&(<span className='my-2 text-xs font-semibold text-temp-red' >
                        {errors.password}
                    </span>)
                }
                <div className='w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white  px-2' >
                    <input onChange={(e)=>{
                        seterrors({})
                        setUserPassword(e.target.value)}} className=' text-black outline-none w-full h-full bg-white placeholder:text-sm ' required type='password' placeholder='password' />
                    <span className='block w-4 h-4 '>
                        <IconContext.Provider value={{ color: "#afafaf"}}>
                        <div>
                            <MdPassword/>
                        </div>
                        </IconContext.Provider>
                    </span>
                </div>
                <div className='w-full mt-6'>
                    <a onClick={()=>signInWithEmailAndPassword(userEmail, userPassword)}  className='bg-black hover:bg-slate-800 cursor-pointer text-white outline-none w-full h-10 font-bold flex justify-center items-center'>Sign In</a>
                </div>
            </div>
            <div className='mb-3' >
                <h5 className='block text-sm font-bold text-black' >Or</h5>
            </div>
            <div className='' >
                <a onClick={()=>signInWithGoogle()} className=' border-temp-red w-80 h-10 cursor-pointer  border flex items-center justify-center mb-3' >
                    <span className='flex flex-row items-center justify-evenly' >
                        <span className='block w-4 h-4 '>
                            <IconContext.Provider value={{ color: "#afafaf"}}>
                            <div>
                                <FcGoogle/>
                            </div>
                            </IconContext.Provider>
                        </span>
                        <span className='block text-temp-red font-bold text-sm ml-2' >Sign with google</span>
                    </span>
                </a>
            </div>
        </motion.div>
        )}
        
    </div>
  )
}

export default SignIn