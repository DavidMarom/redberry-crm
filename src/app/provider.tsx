"use client";

import { NextUIProvider } from "@nextui-org/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
