import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Loader from './layout/Loader'
import { UserContext } from './states/user_context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import { database } from './api/firebase'
import { motion } from "framer-motion"


export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(true)
  const databaseRef = collection(database,"panoramas")
  const auth = getAuth();
  // const q = query(collection(database, "panoramas"), where("capital", "==", user));



  useEffect(() => {
   console.log( auth.currentUser)
    
    let accessToken = sessionStorage.getItem("accessToken")
    if(!accessToken){
      router.push('/auth/login')
    }else{
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }, [])
  const getData = async()=>{
    const docSnap = await getDocs(databaseRef).then((snapshot)=>{
      let docs =[]
      snapshot.docs.forEach((doc)=>{
          docs.push({...doc.data(), id:doc.id})
      })
      console.log(docs)
    })
    
  }
  useEffect(() => {
    console.log(getData())
  }, [])
  
  
  
  return (
    <>
 
      {isLoading&&(
          <div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader opacity="100" /></div>
      )}
     
      {
        !isLoading&&(<motion.div initial={{ opacity: 0, scale: 0.5 }}  animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className='mx-4 text-temp-blue' >
              You added nothing yet
          </div>
        </motion.div>)
      }
    </>
  )
}
