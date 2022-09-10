import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import Loader from './layout/Loader';
import { UserContext } from './states/user_context';

export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading]=useState(false)

  useEffect(() => {
    let accessToken = sessionStorage.getItem("accessToken")
    if(!accessToken){
      console.log("a",accessToken)
      router.push('/auth/login')
    }else{
     
    }
  }, [])
  
  return (
    <>
      {isLoading&&(<div className='absolute left-0 right-0 top-0 bottom-0 ' > <Loader opacity="100" /></div>)}
      <div>
        <div className='mx-4' >
            You added nothing yet
        </div>
      </div>
    </>
  )
}
