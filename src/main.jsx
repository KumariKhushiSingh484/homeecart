import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import CustomerLogin from "./pages/CustomerLogin";
import OtpVerification from "./pages/OtpVerification";
import CompleteProfile from "./pages/CompleteProfile";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import CustomerProfile from "./pages/CustomerProfile";
import BusinessSettings from "./pages/BusinessSettings";

import CustomerLayout from "./layouts/CustomerLayout";

import AuthProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ShoppingProvider } from "./context/ShoppingContext";
import { CustomerProvider } from "./context/CustomerContext";
import { SearchProvider } from "./context/SearchContext";

import ProtectedRoute from "./components/ProtectedRoute";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";
import CustomerDetails from "./pages/CustomerDetails";
import AdminOrderDetails from "./pages/AdminOrderDetails";
function ProtectedCustomerLayout() {
  return (
    <CustomerProtectedRoute>
      <CustomerLayout>
        <Outlet />
      </CustomerLayout>
    </CustomerProtectedRoute>
  );
  
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <CustomerProvider>
          <ShoppingProvider>
            <SearchProvider>
              <BrowserRouter>
                <Routes>
                  {/* ========================= */}
                  {/* Public Customer Routes */}
                  {/* ========================= */}

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
                  {/* Protected Customer Routes */}
                  {/* ========================= */}

                  <Route
                    element={<ProtectedCustomerLayout />}
                  >
                    <Route
                      path="/"
                      element={<Home />}
                    />

                    <Route
                      path="/categories/:categoryName"
                      element={<CategoryProducts />}
                    />

                    <Route
                      path="/product/:id"
                      element={<ProductDetails />}
                    />

                    <Route
                      path="/my-orders"
                      element={<MyOrders />}
                    />

                    <Route
                      path="/order/:orderId"
                      element={<OrderDetails />}
                    />

                    <Route
                      path="/profile"
                      element={<CustomerProfile />}
                    />
                  </Route>

                  {/* ========================= */}
                  {/* Admin Routes */}
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

                <Route
  path="/business-settings"
  element={
    <ProtectedRoute>
      <BusinessSettings />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/customers/:customerId"
  element={
    <ProtectedRoute>
      <CustomerDetails />
    </ProtectedRoute>
  }
/>
   <Route
  path="/admin/orders/:orderId"
  element={
    <ProtectedRoute>
      <AdminOrderDetails />
    </ProtectedRoute>
  }
/>
         
                </Routes>
              </BrowserRouter>
            </SearchProvider>
          </ShoppingProvider>
        </CustomerProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);