import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import CustomerLogin from "./pages/CustomerLogin";
import OtpVerification from "./pages/OtpVerification";
import CompleteProfile from "./pages/CompleteProfile";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";

import CustomerLayout from "./layouts/CustomerLayout";

import AuthProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ShoppingProvider } from "./context/ShoppingContext";

import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ShoppingProvider>
          <BrowserRouter>

            <Routes>

              {/* ========================= */}
              {/* Customer */}
              {/* ========================= */}

              <Route
                path="/"
                element={
                  <CustomerLayout>
                    <Home />
                  </CustomerLayout>
                }
              />

              <Route
                path="/categories/:categoryName"
                element={
                  <CustomerLayout>
                    <CategoryProducts />
                  </CustomerLayout>
                }
              />

              <Route
                path="/product/:id"
                element={
                  <CustomerLayout>
                    <ProductDetails />
                  </CustomerLayout>
                }
              />

              <Route
                path="/login"
                element={<CustomerLogin />}
              />

              <Route
                path="/verify-otp"
                element={<OtpVerification />}
              />

              <Route
                path="/complete-profile"
                element={<CompleteProfile />}
              />

              {/* ========================= */}
              {/* Admin */}
              {/* ========================= */}

              <Route
                path="/admin-login"
                element={<AdminLogin />}
              />

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
        </ShoppingProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);