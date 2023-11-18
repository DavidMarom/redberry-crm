"use client"

import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar, Card01 } from '@/components'
import { gprovider } from '@/services/firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import Image from 'next/image'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loggedin, setLoggedin] = useState(false);
  const [img, setImg] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.title = "Redberry CRM";

    if (localStorage.getItem('loggedin') === 'yes') { setLoggedin(true) }
    setImg(localStorage.getItem('img') ?? '');
  }, []);

  const doSignOut = () => {
    const auth = getAuth();
    signOut(auth).then((res) => {
      console.log(res);

    }).catch((error) => { console.log(error) });
  }

  async function doSignup() {
    const auth = getAuth();
    signInWithPopup(auth, gprovider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken ?? null;
        const user = result.user;
        let usr = { name: user.displayName, mail: user.email, photoURL: user.photoURL, uid: user.uid, token: token };

        setImg(usr.photoURL ?? '');
        localStorage.setItem('img', usr.photoURL ?? '');
        localStorage.setItem('loggedin', 'yes');
        window.location.reload();

      }).catch((error) => { console.log(error) });
  }

  if (loggedin) {

    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="header" >

            <button onClick={() => {
              doSignOut();
              localStorage.setItem('loggedin', 'no');
              window.location.reload();
            }
            }>Logout</button>

            <Image src={img} alt="Profile" width={40} height={24} priority />
          </div>

          <div className='page-container'>
            <Sidebar />
            <div className='pad-top-20'>
              {children}
            </div>
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
              {show &&
                <Card01 height='400px'>
                  <div className='row'><Image src="/lichi.svg" alt="Lichi Logo" width={100} height={24} priority /></div>
                  <button onClick={doSignup}>Login with google</button>
                </Card01>
              }
            </div>
          </div>
        </body>
      </html>
    )
  }
}
