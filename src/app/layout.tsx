"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { Sidebar, Btn, Header, Row, Footer } from "@/components";
import { googleSignup } from "@/services/auth";
import http from "@/services/http";
import Image from "next/image";
import "./globals.css";
import useUserStore from "@/store/user";
const inter = Inter({ subsets: ["latin"] });
import { sendWelcomeEmail } from '@/services/mailchimp';
import { PopupProvider } from '@/services/popupProvider';
import { getFromStorage, setToStorage } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "react-query";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setStoreUser = useUserStore((state) => state.setStoreUser);
  const storeUser = useUserStore((state) => state.storeUser);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setContacts = useContactsStore((state) => state.setContacts);

  const signupHandler = async () => {
    const googleRes = googleSignup();
    googleRes.then((res) => {
      if (res) {
        // Save the google user info to local storage and store
        setToStorage("user", res);
        setStoreUser(res ?? "");
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

    if (getFromStorage("user")) {
      setStoreUser(getFromStorage("user"));
      setIsLogged(true);
    }
  }
    , []);

  const queryClient = new QueryClient();

  if (isLogged) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <PopupProvider />
            <div className="page-container">
              <Sidebar />
              <div className="pad-top-20 width-100">{children}</div>
            </div>
            <Footer />
          </QueryClientProvider>
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
