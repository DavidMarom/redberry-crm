"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { Sidebar, Header, Footer } from "@/components";
import "./globals.css";
import useUserStore from "@/store/user";
const inter = Inter({ subsets: ["latin"] });
import { getFromStorage } from '@/utils/utils';
import useContactsStore from "@/store/contacts";
import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "react-query/devtools";
// import Script from 'next/script'
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "@/components/LandingPage/LandingPage";

export const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setStoreUser = useUserStore((state) => state.setStoreUser);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);
  const setContacts = useContactsStore((state) => state.setContacts);

  useEffect(() => {
    document.title = "Redberry CRM";
    // if (getFromStorage("contacts")) { setContacts(getFromStorage("contacts") ?? "") }

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

        {/* === DO NOT REMOVE === */}
        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-798887661"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'AW-798887661');`}
        </Script>
        <Script>{`gtag('event', 'conversion', {'send_to': 'AW-798887661/HlrfCP7VlYQZEO2d-PwC'});`}</Script> */}
         {/* === DO NOT REMOVE === */}

        <html lang="en">
          <body className={inter.className}>
            <Header />

            <NextUIProvider>
              <LandingPage />
            </NextUIProvider>
            <Footer />
          </body>
        </html>
      </>
    );
  }
}
