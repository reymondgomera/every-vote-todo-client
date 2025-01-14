import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import ToastProvider from "./toast-provider";
import TailwindIndicatorProvider from "./tailwind-indicator-provider";
import QueryDevTools from "./query-dev-tools-provider";
import { queryClient } from "@/lib/query-client";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="everyvote-todo-theme">
        <AuthProvider>
          {children}

          <ToastProvider />
          <TailwindIndicatorProvider />
          <QueryDevTools />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
