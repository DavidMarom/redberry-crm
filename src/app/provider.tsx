"use client";

'use-client'
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Provider({ children }: { children: React.ReactNode }) {
  return(
    <NextUIProvider>
      <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      themes={["dark","light"]}
      storageKey="current_theme">
    
      {children}
      </NextThemesProvider>

    </NextUIProvider>
  );
}
