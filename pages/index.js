import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './states/user_context';

export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    user==null?router.push('/auth/login'):null
  }, [])
  
  return (
    <div>
      <div className='mx-4' >
          You added nothing yet
      </div>
    </div>
  )
}
