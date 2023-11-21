"use client"

import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google'
import { Sidebar, Card01, Header } from '@/components'
import { googleSignup } from '@/services/auth';
import Image from 'next/image'
import './globals.css'
import useUserStore from '@/store/user';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setImg = useUserStore((state) => state.setImg);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);

  const signupHandler = () => {
    const res = googleSignup()
    res.then((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        setImg(res.photoURL ?? '');
        setIsLogged(true)
      }
    })
  }

  useEffect(() => {
    document.title = "Redberry CRM";
    if (localStorage.getItem('user')) {
      let usr = JSON.parse(localStorage.getItem('user') ?? '');
      if (usr) {
        setImg(usr.photoURL ?? '');
        setIsLogged(true)
      }

    }
  }, []);



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
              <Card01 height='400px' width='450px' justifycontent='space-around'>
                <div className='row'><Image src="/lichi.svg" alt="Lichi Logo" width={100} height={24} priority /></div>
                <div className='v-spacer' />
                <button onClick={signupHandler}>Login with google</button>
              </Card01>

            </div>
          </div>
        </body>
      </html>
    )
  }
}
