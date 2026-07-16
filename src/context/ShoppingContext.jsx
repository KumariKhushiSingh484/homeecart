import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ShoppingContext = createContext();

export function ShoppingProvider({ children }) {
  // =========================
  // UI State
  // =========================

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
useEffect(() => {
  console.log(
    "showCart:",
    showCart,
    "| showCheckout:",
    showCheckout
  );
}, [showCart, showCheckout]);
  // =========================
  // Order State
  // =========================

  const [placedOrder, setPlacedOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");

  // =========================
  // Cart
  // =========================

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  // =========================
  // Checkout
  // =========================

  const openCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
  };

  // =========================
  // Order Flow
  // =========================

  const completeOrder = (order) => {
    setPlacedOrder(order);
    setOrderNumber(order.orderNumber);

    setShowCheckout(false);
    setOrderPlaced(true);
  };

  const closeOrderSuccess = () => {
    setOrderPlaced(false);
    setPlacedOrder(null);
    setOrderNumber("");
  };

  const resetShopping = () => {
    setShowCart(false);
    setShowCheckout(false);
    setOrderPlaced(false);
    setPlacedOrder(null);
    setOrderNumber("");
  };

  return (
    <ShoppingContext.Provider
      value={{
        // State
        showCart,
        showCheckout,
        orderPlaced,
        placedOrder,
        orderNumber,

        // Cart
        openCart,
        closeCart,

        // Checkout
        openCheckout,
        closeCheckout,

        // Order
        completeOrder,
        closeOrderSuccess,
        resetShopping,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);

  if (!context) {
    throw new Error(
      "useShopping must be used inside ShoppingProvider."
    );
  }

  return context;
}