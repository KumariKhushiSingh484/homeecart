import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";
import { getCustomer } from "../services/customerService";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const [customer, setCustomer] = useState(null);

  const [loadingCustomer, setLoadingCustomer] =
    useState(true);

  const refreshCustomer = async (uid) => {
    if (!uid) {
      setCustomer(null);
      return;
    }

    try {
      const profile = await getCustomer(uid);

      setCustomer(profile);
    } catch (error) {
      console.error(
        "Failed to load customer profile:",
        error
      );

      setCustomer(null);
    }
  };

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(
  auth,
  async (user) => {
    console.log("========== AUTH STATE CHANGED ==========");

    console.log("Firebase User:", user);

    if (user) {
      console.log("UID:", user.uid);

      setAuthUser(user);

      const profile = await getCustomer(user.uid);

      console.log("Firestore Profile:", profile);

      setCustomer(profile);
    } else {
      console.log("No authenticated user");

      setAuthUser(null);
      setCustomer(null);
    }

    setLoadingCustomer(false);
  }
);
    return unsubscribe;
  }, []);

  const value = {
    authUser,
    customer,
    loadingCustomer,
    refreshCustomer,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error(
      "useCustomer must be used inside CustomerProvider."
    );
  }

  return context;
}