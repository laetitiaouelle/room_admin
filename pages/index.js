import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './states/user_context';
import Head from 'next/head'
import Image from 'next/image'
import Add from './Add'

export default function Home() {
  const router = useRouter();
  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    user==null?router.push('/auth/login'):null
  }, [])
  
  return (
    
    <div>
      <Add/>
    </div>
  )
}
