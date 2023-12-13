"use client";

import React, { useEffect } from "react";

import { Inter } from "next/font/google";
import { Sidebar, Btn, Header, Row, Col } from "@/components";
import { googleSignup } from "@/services/auth";
import http from "@/services/http";
import Image from "next/image";
import "./globals.css";
import useUserStore from "@/store/user";
import { Provider } from "./provider";
const inter = Inter({ subsets: ["latin"] });
import { sendWelcomeEmail } from '@/services/mailchimp';
import { Button } from "@nextui-org/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUserName = useUserStore((state) => state.setUserName);
  const setImg = useUserStore((state) => state.setImg);
  const setEmail = useUserStore((state) => state.setEmail);

  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);

  const signupHandler = () => {
    const googleRes = googleSignup();
    googleRes.then((res) => {
      if (res) {
        // Save the google user info to local storage
        localStorage.setItem("user", JSON.stringify(res));
        setUserName(res.name ?? "");
        setImg(res.photoURL ?? "");
        setEmail(res.mail ?? "");

        setIsLogged(true);

        // Check if DB has the user
        http.get(`users/${res.uid}`).then((response: any) => {
          if (!response.data) {
            // If not, add the user to DB and send welcome email
            http.post('users', res)
              .then((response: any) => { console.log(response) })
              .catch((error: any) => { console.log(error) })
            sendWelcomeEmail(res.mail, res.name)
          }
        })
        setIsLogged(true);
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
          <Provider>
            <Header />
            <main className="flex flex-row h-[calc(100dvh-64px)]">
              <Sidebar />
              <div className=" overflow-y-scroll w-[calc(100dvw-224px)] px-2 bg-background text-foreground">{children}</div>
            </main>
          </Provider>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={"bg-background"}>
          <Provider>
            <Header />
            <main className="flex flex-col h-[calc(100dvh-64px)] gap-6 items-center justify-center">
              <header className="text-center text-ellipsis text-default ">
                <h1 className="text-6xl">
                  A lightweight CRM for <br />
                  your business
                </h1>
              </header>
              <div className="flex flex-col justify-center items-center">
                <Button color="default" variant="solid" size="lg"
                  radius="full" className="w-[192px] h-16" onPress={signupHandler}>
                  <div className="text-color-white f-size-22">Get Started</div>
                  <Image src="/arrow-right.svg" alt="arrow" width={14} height={14} />
                </Button>
                <p className="text-default-100 text-sm pt-5">No credit card needed | Unlimited time on free plan</p>
              </div>
            </main>
          </Provider>
        </body>
      </html>
    );
  }
}
