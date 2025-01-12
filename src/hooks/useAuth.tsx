import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

//* Auth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return authContext;
};
