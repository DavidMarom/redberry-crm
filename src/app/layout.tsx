"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import { Sidebar, Header, Footer } from "@/components";
import "./globals.css";
import useUserStore from "@/store/user";
const inter = Inter({ subsets: ["latin"] });
import { getFromStorage } from '@/utils/utils';
import { NextUIProvider } from "@nextui-org/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "@/components/LandingPage/LandingPage";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const setStoreUser = useUserStore((state) => state.setStoreUser);
  const isLogged = useUserStore((state) => state.isLogged);
  const setIsLogged = useUserStore((state) => state.setIsLogged);

  useEffect(() => {
    document.title = "Redberry CRM";

    if (getFromStorage("user")) {
      setStoreUser(getFromStorage("user"));
      setIsLogged(true);
    }
  }
    , []);

  const faviconHead = (
    <head>
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
    </head>
  );

  if (isLogged) {
    return (
      <html lang="en">
        {faviconHead}
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <NextUIProvider>
              <Header />
              <div className="row-r">
                <Sidebar />
                <div className="page-container">{children}</div>
              </div>
              <Footer />
            </NextUIProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </body>
      </html>
    );
  } else {
    return (
      <>

        <html lang="en">
          {faviconHead}
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
