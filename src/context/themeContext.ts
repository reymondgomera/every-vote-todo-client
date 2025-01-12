import { Theme } from "@/types";
import { createContext } from "react";

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeContext = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeContext>(initialState); // prettier-ignore
