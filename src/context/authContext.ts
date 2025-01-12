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

//* Authentication context
//* share user, tokens and setters accross components
export const AuthContext = createContext<AuthProivderState>(initialState);
