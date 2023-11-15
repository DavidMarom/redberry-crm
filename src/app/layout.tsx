"use client"

import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar, Card01 } from '@/components'
import { Button } from '@mui/material';
import Image from 'next/image'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loggedin, setLoggedin] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.title = "Berry";

    if (localStorage.getItem('loggedin') === 'yes') {
      setLoggedin(true);
    }
  }, []);

  if (loggedin) {

    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="header" >
            <form>
              <button onClick={() => {
                localStorage.setItem('loggedin', 'no');
                window.location.reload();
              }
              }>Logout</button>
            </form>
          </div>

          <div className='page-container'>
            <Sidebar />
            <div>
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
                  <div className='row'>
                    <Image src="/lichi.svg" alt="Lichi Logo" width={100} height={24} priority />
                  </div>
                  <form>

                    <div className='row'><Button color="primary"
                      onClick={() => {
                        setShow(false);

                        localStorage.setItem('loggedin', 'yes');
                        window.location.reload();
                      }
                      }>
                      Login
                    </Button>
                    </div>

                  </form>
                </Card01>
              }
            </div>

          </div>
        </body>
      </html>
    )
  }
}
