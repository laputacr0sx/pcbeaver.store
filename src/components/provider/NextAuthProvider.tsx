import { SessionProvider } from "next-auth/react";
import React, { type PropsWithChildren } from "react";

function NextAuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthProvider;
