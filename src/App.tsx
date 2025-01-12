import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";

import LandingPage from "./pages/root/landing-page";
import { queryClient } from "./lib/query-client";
import { ThemeProvider } from "./components/provider/theme-provider";
import TailwindIndicatorProvider from "./components/provider/tailwind-indicator-provider";
import LoginPage from "./pages/login/login-page";
import RegisterPage from "./pages/register/register-page";
import QueryDevTools from "./components/provider/query-dev-tools-provider";
import Dashboard from "./pages/dashboard/dashboard";
import ToastProvider from "./components/provider/toast-provider";
import { AuthProvider } from "./components/provider/auth-provider";

function App() {
  //* provide the client to your app
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="everyvote-todo-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>

          <ToastProvider />
          <TailwindIndicatorProvider />
          <QueryDevTools />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
