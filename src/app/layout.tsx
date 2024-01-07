"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { Sidebar, Btn, Header, Row, Footer } from "@/components";
import Image from "next/image";
import "./globals.css";
import useUserStore from "@/store/user";
const inter = Inter({ subsets: ["latin"] });
import { PopupProvider } from '@/services/popupProvider';
import { getFromStorage, setToStorage } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "react-query/devtools";
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from "react-query";
import { signupHandler } from "@/utils/userUtils";

export const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setStoreUser = useUserStore((state) => state.setStoreUser);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setContacts = useContactsStore((state) => state.setContacts);

  useEffect(() => {
    document.title = "Redberry CRM";
    if (getFromStorage("contacts")) { setContacts(getFromStorage("contacts") ?? "") }

    if (getFromStorage("user")) {
      setStoreUser(getFromStorage("user"));
      setIsLogged(true);
    }
  }
    , []);

  if (isLogged) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <PopupProvider />
            <div className="row-r">
              <Sidebar />
              <div className="page-container">{children}</div>
            </div>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </body>
      </html>
    );
  } else {
    return (
      <>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-798887661"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'AW-798887661');`}
        </Script>
        <Script>{`gtag('event', 'conversion', {'send_to': 'AW-798887661/HlrfCP7VlYQZEO2d-PwC'});`}</Script>

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
                    <Image src="icons/arrow-right.svg" alt="arrow" width={14} height={14} priority />
                  </Btn>
                </Row>
                <Row justifycontent="space-around" width="100%" margintop="0px"><p className="subtitle">🚀 It's free, and always will be!</p></Row>
              </div>
            </NextUIProvider>
            <Footer />
          </body>
        </html>
      </>
    );
  }
}
