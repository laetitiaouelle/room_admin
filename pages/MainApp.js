import { useContext, useState } from 'react';
import { UserContext } from './states/user_context';
import Layout from './layout/Layout';
import { useRouter } from 'next/router'



function Main({ Component, pageProps }){
    const {user, setUser} = useContext(UserContext);
   return(
     <Layout>
       <Component {...pageProps} />
     </Layout>
   )
 }
 
 export default Main
 