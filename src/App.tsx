import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";

import LandingPage from "./pages/LandingPage";
import { getQueryClient } from "./lib/query-client";
import { ThemeProvider } from "./components/provider/theme-provider";
import TailwindIndicatorProvider from "./components/provider/tailwind-indicator-provider";
import LoginPage from "./pages/LoginPage";

const queryClient = getQueryClient();

function App() {
  //* provide the client to your app
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="everyvote-todo-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>

        <TailwindIndicatorProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
