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
import { CustomerProvider } from "./context/CustomerContext";

import ProtectedRoute from "./components/ProtectedRoute";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import CustomerProfile from "./pages/CustomerProfile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <CustomerProvider>
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
               
               <Route
  path="/my-orders"
  element={
    <CustomerLayout>
      <MyOrders />
    </CustomerLayout>
  }
/>
<Route
  path="/order/:orderId"
  element={
    <CustomerLayout>
      <OrderDetails />
    </CustomerLayout>
  }
/>
<Route
  path="/profile"
  element={
    <CustomerLayout>
      <CustomerProfile />
    </CustomerLayout>
  }
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
        </CustomerProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);