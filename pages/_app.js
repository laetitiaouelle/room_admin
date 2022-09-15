import '../styles/globals.css'
import '../styles/loader.css'

import Layout from './layout/Layout';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { UserContext } from '../states/user_context';


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const router = useRouter()
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {
        (router.pathname!=='/auth/login' && router.pathname!=='/auth/signin')?(<Layout><Component {...pageProps} /></Layout> )
        :
        (<Component {...pageProps} />)
      }
    </UserContext.Provider>
  );
}

export default MyApp
