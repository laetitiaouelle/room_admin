import React, { useContext, useEffect, useState } from 'react'
import { IconContext } from "react-icons"
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import {MdAlternateEmail, MdPassword} from 'react-icons/md'
import { UserContext } from '../../states/user_context'
import { useRouter } from 'next/router'
import Loader from '../layout/Loader'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app, database} from "../api/firebase"
import { motion } from "framer-motion"




function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const {user, setUser} = useContext(UserContext);
    const [showLoader, setShowLoader] = useState(true);
    const [errors, seterrors] = useState({});

    const router = useRouter();
    
    const auth = getAuth();
    

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

   const login=()=>{

    if(userEmail!=""&&userPassword!=""){
        setShowLoader(true)
        signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            // Signed in 
            sessionStorage.setItem("accessToken", userCredential.user.accessToken)
            setUser(userCredential.user)
            setTimeout(() => {
                setShowLoader(false)
                router.push('/')
            }, 1000);
            // ...
        })
        .catch((error) => {
            console.log(error)
            setShowLoader(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            if(error.code=="auth/user-not-found"){
                seterrors({user:"User not found"})
            }else if(error.code=="auth/invalid-email"){
                seterrors({email:"Invalid Email"})
            }else if(error.code=="auth/wrong-password"){
                seterrors({password:"Wrong password"})
            }
        });

        
    }else{
        console.log("first")
    }
   }
    
  return (
    <div className='relative bg-white' >
        {
            showLoader&&(
                <motion.div initial={{ opacity: 0 }}  animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader Loader opacity="70" />  </div>
                </motion.div>
            )
        }
       { !showLoader&&( 
            <motion.div initial={{ opacity: 0, scale: 0.9 }}  animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <div className='h-screen w-full flex flex-col items-center justify-start pt-32' >
                    <div className='py-6' >
                        <h3 className='text-temp-blue font-semibold' >Login</h3>
                    </div>
                    <div className='py-6' >
                        {
                            errors.user!=null&&(<span className='my-2 text-xs font-semibold text-temp-red' >
                                {errors.user}
                            </span>)
                        }
                        {
                            errors.email!=null&&(<span className='my-2 text-xs font-semibold text-temp-red' >
                                {errors.email}
                            </span>)
                        }
                        <div className='mb-3 w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white px-2' >
                            <input onChange={(e)=>{ seterrors({}), setUserEmail(e.target.value)}}  className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='email' placeholder='youremail@example.com' />
                            <span className='block w-4 h-4 '>
                                <IconContext.Provider value={{ color: "#afafaf"}}>
                                <div>
                                    <MdAlternateEmail/>
                                </div>
                                </IconContext.Provider>
                            </span>
                        </div>
                        <div className='w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white  px-2' >
                            <input onChange={(e)=>{ seterrors({}), setUserPassword(e.target.value)}}  className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='password' placeholder='password' />
                            <span className='block w-4 h-4 '>
                                <IconContext.Provider value={{ color: "#afafaf"}}>
                                <div>
                                    <MdPassword/>
                                </div>
                                </IconContext.Provider>
                            </span>
                        </div>
                        {
                            errors.password!=null&&(<span className='my-2 text-xs font-semibold text-temp-red' >
                                {errors.password}
                                <a onClick={()=>router.push("/auth/reset")} className='cursor-pointer text-blue-800 hover:text-blue-900 ml-3' >Reset it here</a>
                            </span>)
                        }
                        <div className='w-full mt-6'>
                            <input type='submit' onClick={()=>login()}  className='bg-black cursor-pointer hover:bg-slate-800 text-white w-full h-10 font-bold'  value="Login" />
                        </div>
                    </div>
                    <div className='mb-3' >
                        <h5 className='block text-sm font-bold text-black' >Or</h5>
                    </div>
                    <div className='' >
                        <a className=' border-temp-red w-80 h-10  cursor-pointer border flex items-center justify-center mb-3' >
                            <span className='flex flex-row items-center justify-evenly' >
                                <span className='block w-4 h-4 '>
                                    <IconContext.Provider value={{ color: "#afafaf"}}>
                                    <div>
                                        <FcGoogle/>
                                    </div>
                                    </IconContext.Provider>
                                </span>
                                <span className='block text-temp-red font-bold text-sm ml-2' >Login with google</span>
                            </span>
                        </a>
                    </div>
                    <div className='flex flex-row justify-start items-center mt-5' >
                        <span className='block text-temp-gray text-sm' >Vous n&apos;avez pas compte</span> <span><a className='cursor-pointer text-temp-blue text-sm ml-2 ' onClick={()=>router.push('/auth/signin')} >Créer en un ici</a></span>
                    </div>
                </div>
            </motion.div>
        )}
    </div>
  )
}

export default Login