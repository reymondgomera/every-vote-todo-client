import { AuthContext } from "@/context/authContext";
import { User } from "@/types";
import { useState } from "react";
import Cookies from "universal-cookie";

type AuthProviderProps = {
  children: React.ReactNode;
  cookieKey?: string;
};

export const AuthProvider = ({
  children,
  cookieKey = "auth-token",
}: AuthProviderProps) => {
  const cookies = new Cookies();

  const [token, setToken] = useState<string | null>(() => cookies.get(cookieKey) ?? null) // prettier-ignore
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    token,
    setUser,
    setToken: (token: string | null) => {
      if (token) cookies.set(cookieKey, token);
      else cookies.remove(cookieKey);
      setToken(token);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
