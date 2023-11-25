"use client";

import React, { useEffect } from "react";
import { Inter } from 'next/font/google'
import { Sidebar, Card01, Header } from '@/components'
import { googleSignup } from '@/services/auth';
import http from '@/services/http';
import Image from 'next/image'
import './globals.css'
import useUserStore from '@/store/user';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUserName = useUserStore((state) => state.setUserName);
  const setImg = useUserStore((state) => state.setImg);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);

  const signupHandler = () => {
    const res = googleSignup();
    res.then((res) => {
      if (res) {
        // Save the google user info to local storage
        localStorage.setItem("user", JSON.stringify(res));
        setUserName(res.name ?? "");
        setImg(res.photoURL ?? "");
        setIsLogged(true);

        // Check if DB has the user
        http.get(`users/${res.uid}`).then((response: any) => {
          if (!response.data) {
            // If not, add the user to DB and send welcome email
            http.post('users', res).then((response: any) => {
              console.log(response)
            })

            http.post('sendwelcommail', {
              mail: res.mail,
              name: res.name,
            }
            ).then((response: any) => {
              console.log(response)
            })
          }
        }
        )

        setIsLogged(true)
      }
    });
  };

  useEffect(() => {
    document.title = "Redberry CRM";
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") ?? "");
      if (user) {
        setUserName(user.name ?? "");
        setImg(user.photoURL ?? "");
        setIsLogged(true);
      }
    }
  }, []);

  if (isLogged) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="page-container">
            <Sidebar />
            <div className="pad-top-20 width-100">{children}</div>
          </div>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="page-container">
            <div className="row">
              <Card01
                height="400px"
                width="450px"
                justifycontent="space-around"
              >
                <div className="row">
                  <Image
                    src="/lichi.svg"
                    alt="Lichi Logo"
                    width={100}
                    height={24}
                    priority
                  />
                </div>
                <div className="v-spacer" />
                <button onClick={signupHandler}>Login with google</button>
              </Card01>
            </div>
          </div>
        </body>
      </html>
    );
  }
}
