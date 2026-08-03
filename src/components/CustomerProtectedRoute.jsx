import { Navigate, useLocation } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

function CustomerProtectedRoute({ children }) {
  const { authUser, loadingCustomer } = useCustomer();
  const location = useLocation();

  // Wait for Firebase to restore the login session
  if (loadingCustomer) {
    return (
      <div className="flex h-dvh items-center justify-center bg-white">
        <p className="text-gray-500">
          Loading HomeeCart...
        </p>
      </div>
    );
  }

  // Customer is not logged in
  if (!authUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default CustomerProtectedRoute;