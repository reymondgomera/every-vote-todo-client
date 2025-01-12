import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";

//* Theme hook
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
