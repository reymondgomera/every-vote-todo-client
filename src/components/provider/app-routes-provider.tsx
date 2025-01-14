import Dashboard from "@/pages/dashboard/dashboard";
import LoginPage from "@/pages/login/login-page";
import RegisterPage from "@/pages/register/register-page";
import LandingPage from "@/pages/root/landing-page";
import { Route, Routes } from "react-router";

const AppRoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutesProvider;
