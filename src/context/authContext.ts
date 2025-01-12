import { createContext } from "react";
import { User } from "@/types";

type AuthProivderState = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

const initialState: AuthProivderState = {
  user: null,
  token: null,
  setToken: () => null,
  setUser: () => null,
};

export const AuthContext = createContext<AuthProivderState>(initialState);
