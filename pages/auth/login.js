import React, { useState } from 'react'
import { IconContext } from "react-icons"
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import {MdAlternateEmail, MdPassword} from 'react-icons/md'



function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
  return (
    <div className='h-screen w-full flex flex-col items-center justify-start pt-32' >
        <div className='py-6' >
            <div className='mb-3 w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white px-2' >
                <input className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='email' placeholder='youremail@example.com' />
                <span className='block w-4 h-4 '>
                    <IconContext.Provider value={{ color: "#afafaf"}}>
                    <div>
                        <MdAlternateEmail/>
                    </div>
                    </IconContext.Provider>
                </span>
            </div>
            <div className='w-80 flex fles-row justify-between items-center h-10 border border-temp-gray2 bg-white  px-2' >
                <input className=' text-black outline-none w-full h-full bg-white placeholder:text-sm' required type='password' placeholder='password' />
                <span className='block w-4 h-4 '>
                    <IconContext.Provider value={{ color: "#afafaf"}}>
                    <div>
                        <MdPassword/>
                    </div>
                    </IconContext.Provider>
                </span>
            </div>
            <div className='w-full mt-6'>
                <input type='submit' className='bg-black w-full h-10 font-bold'  value="Login" />
            </div>
        </div>
        <div className='mb-3' >
            <h5 className='block text-sm font-bold text-black' >Or</h5>
        </div>
        <div className='' >
            <a className=' border-temp-red w-80 h-10  border flex items-center justify-center mb-3' >
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
            <a className=' border-temp-blue w-80 h-10  border flex items-center justify-center' >
                <span className='flex flex-row items-center justify-evenly' >
                    <span className='block w-4 h-4 '>
                        <IconContext.Provider value={{ color: "#435ca8"}}>
                        <div>
                            <FaFacebook/>
                        </div>
                        </IconContext.Provider>
                    </span>
                    <span className='block text-temp-blue font-bold text-sm ml-2' >Login with google</span>
                </span>
            </a>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Login