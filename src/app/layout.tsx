"use client"

import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import { Sidebar, Card01, Header } from '@/components'
import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import Image from 'next/image'
import './globals.css'
import useUserStore from '@/store/user';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setImg = useUserStore((state) => state.setImg);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);


  useEffect(() => {
    document.title = "Redberry CRM";
  }, []);

  async function doSignup() {
    const auth = getAuth();
    signInWithPopup(auth, gprovider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken ?? null;
        const user = result.user;
        let usr = { name: user.displayName, mail: user.email, photoURL: user.photoURL, uid: user.uid, token: token };
        console.log('-------------', usr.photoURL);
        setImg(usr.photoURL ?? '');
        setIsLogged(true)

      }).catch((error) => { console.log(error) });
  }

  if (isLogged) {

    return (
      <html lang="en">
        <body className={inter.className}>

          <Header />

          <div className='page-container'>
            <Sidebar />
            <div className='pad-top-20'>{children}</div>
          </div>
        </body>
      </html>
    )
  }
  else {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className='page-container'>
            <div className="row">
              <Card01 height='400px'>
                <div className='row'><Image src="/lichi.svg" alt="Lichi Logo" width={100} height={24} priority /></div>
                <button onClick={doSignup}>Login with google</button>
              </Card01>

            </div>
          </div>
        </body>
      </html>
    )
  }
}
