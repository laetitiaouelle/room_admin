import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Loader from './layout/Loader'
import { UserContext } from '../states/user_context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth} from 'firebase/auth'
import { database } from './api/firebase'
import { motion } from "framer-motion"
import Room2 from './components/Home/Room'


export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(true);
  const [panoramas, setPanoramas] = useState([])
  const databaseRef = collection(database,"panoramas")
  const auth = getAuth();

  const getData = async()=>{
    const docSnap = await getDocs(query(databaseRef, where("email", "==", auth.currentUser.email))).then((snapshot)=>{
      let docs =[]
      snapshot.docs.forEach((doc)=>{
        console.log(doc.data())
          docs.push({...doc.data(), id:doc.id})
           setPanoramas(oldPanoramas => [...oldPanoramas, doc.data()])
      })
      // console.log("docs:",docs)
    })
    
  }
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        getData()
      }
      else {
        // User is signed out.
        console.log("user is out")
      }
    })
  }, [])

  useEffect(() => {   
    let accessToken = sessionStorage.getItem("accessToken")
    if(!accessToken){
      router.push('/auth/login')
    }else{
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    }
  }, [])

  


  

  
  
  
  
  return (
    <>
 
      {isLoading&&(
          <div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader opacity="100" /></div>
      )}
     
      {
        !isLoading&&(<motion.div initial={{ opacity: 0, scale: 0.5 }}  animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          { 
          (panoramas.length==0|| panoramas==null)? 
            (<div className='mx-4 text-temp-blue' >
                You added nothing yet
            </div>) : <div className='w-full grid grid-cols-3 gap-4' >
              <div className='mx-4 my-4 text-temp-blue col-span-3' >
                  You added this :
              </div>
              {
                panoramas.map((panorama, index)=>(
                  <a key={index}  className="block cursor-pointer"><Room2 panorama={panorama} /></a>
                ))
              }
            </div>

            
          }
        </motion.div>)
      }
    </>
  )
}
