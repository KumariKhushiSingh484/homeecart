import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import App from "./App";
import Admin from "./pages/Admin";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";
import CustomerLogin from "./pages/CustomerLogin";
import OtpVerification from "./pages/OtpVerification";
import CompleteProfile from "./pages/CompleteProfile";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />

<Route path="/admin-login" element={<AdminLogin />} />
         <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);