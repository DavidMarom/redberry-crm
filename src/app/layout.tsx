"use client"

import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedin') === 'yes') {
      setLoggedin(true);
    }
  }, []);

  if (loggedin) {

    return (
      <html lang="en">
        <body className={inter.className}>
          <div><p>Sidebar</p></div>
          {children}
        </body>
      </html>
    )
  }
  else {
    return (
      <html lang="en">
        <body className={inter.className}>
          <h1>Login page</h1>
        </body>
      </html>
    )
  }
}
