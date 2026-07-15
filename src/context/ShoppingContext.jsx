import { createContext, useContext, useState } from "react";

const ShoppingContext = createContext();

export function ShoppingProvider({ children }) {
  // =========================
  // UI State
  // =========================

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

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
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  return useContext(ShoppingContext);
}