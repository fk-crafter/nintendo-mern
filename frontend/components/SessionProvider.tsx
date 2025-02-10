"use client";

import { SessionProvider } from "next-auth/react";

const CustomSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default CustomSessionProvider;
