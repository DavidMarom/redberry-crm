"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { Sidebar, Btn, Header, Row, Footer } from "@/components";
import { googleSignup } from "@/services/auth";
import http from "@/services/http";
import Image from "next/image";
import "./globals.css";
import useUserStore from "@/store/user";
// import { Provider } from "./provider";
const inter = Inter({ subsets: ["latin"] });
import { sendWelcomeEmail } from '@/services/mailchimp';
import { PopupProvider } from '@/services/popupProvider'
import { getFromStorage } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { NextUIProvider } from "@nextui-org/react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setUserName = useUserStore((state) => state.setUserName);
  const setImg = useUserStore((state) => state.setImg);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setContacts = useContactsStore((state) => state.setContacts);

  const signupHandler = () => {
    const googleRes = googleSignup();
    googleRes.then((res) => {
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
    if (getFromStorage("contacts")) { setContacts(getFromStorage("contacts") ?? "") }

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
          <PopupProvider />
          <div className="page-container">
            <Sidebar />
            <div className="pad-top-20 width-100">{children}</div>
          </div>
          <Footer />
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <PopupProvider />
          <NextUIProvider>
            <div className="page-container2">
              <Row justifycontent="space-around" width="100%" margintop="90px"><h1 className="main-title f-size-3rem">A lightweight CRM for</h1></Row>
              <Row justifycontent="space-around" width="100%" margintop="0px"><h1 className="main-title f-size-3rem">your business</h1></Row>
              <Row justifycontent="space-around" width="100%">
                <Btn onclick={signupHandler} width="225px" margintop="110px">
                  <div className="text-color-white f-size-22">Get Started</div>
                  <Image src="/arrow-right.svg" alt="arrow" width={14} height={14} priority />

                </Btn>
              </Row>
              <Row justifycontent="space-around" width="100%" margintop="0px"><p className="subtitle">No credit card needed | Unlimited time on free plan</p></Row>

            </div>

          </NextUIProvider>
          <Footer />
        </body>
      </html>
    );
  }
}
