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

  if (isLogged) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            {/* <NextUIProvider> */}

            <Header />
            <div className="row-r">
              <Sidebar />
              <div className="page-container">{children}</div>
            </div>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
            {/* </NextUIProvider> */}
          </QueryClientProvider>
        </body>
      </html>
    );
  } else {
    return (
      <>

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
