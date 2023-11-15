"use client"

import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loggedin, setLoggedin] = useState(false);

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


            <form>

              <button onClick={() => {
                localStorage.setItem('loggedin', 'yes');
                window.location.reload();
              }
              }>Login</button>
            </form>
          </div>
        </body>
      </html>
    )
  }
}
