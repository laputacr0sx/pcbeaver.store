import { type UserData } from "@/data/UserData";
import { createContext, useState, type PropsWithChildren } from "react";

export const userContext = createContext<UserData | null | undefined>(
  undefined,
);

function UserContextProvider({ children }: PropsWithChildren) {
  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(
    undefined,
  );
  return (
    <userContext.Provider value={loginUser}>{children}</userContext.Provider>
  );
}

export default UserContextProvider;
