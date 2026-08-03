import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import { useShopping } from "../context/ShoppingContext";

import { getBusinessSettings } from "../services/settingsService";
import { validatePurchaseRules } from "../utils/validation/validatePurchaseRules";

import CartHeader from "./cart/CartHeader";
import CartItemList from "./cart/CartItemList";
import CartSummary from "./cart/CartSummary";
import EmptyCart from "./cart/EmptyCart";

function CartModal() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
  } = useCart();

  const {
    showCart,
    closeCart,
    openCheckout,
  } = useShopping();

  const [businessSettings, setBusinessSettings] =
    useState(null);

 useEffect(() => {
  async function loadBusinessSettings() {
    try {
      const settings =
        await getBusinessSettings();

      console.log(
        "Business Settings:",
        settings
      );

      setBusinessSettings(settings);
    } catch (error) {
      console.error(error);
    }
  }

  loadBusinessSettings();
}, []);
  const purchaseValidation =
    validatePurchaseRules({
      cartItems,
      businessSettings,
    });

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto flex h-dvh w-full max-w-md flex-col bg-white shadow-2xl">

        <CartHeader
          cartCount={cartCount}
          onClose={closeCart}
        />

       {cartItems.length === 0 ? (
  <EmptyCart
    onContinueShopping={closeCart}
  />
) : (
 <div className="flex flex-1 min-h-0 flex-col">
  <CartItemList
    cartItems={cartItems}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    deleteFromCart={deleteFromCart}
  />

  <div className="shrink-0 max-h-[35vh] overflow-y-auto">
    <CartSummary
      cartSubtotal={cartSubtotal}
      purchaseValidation={purchaseValidation}
      businessSettings={businessSettings}
      onCheckout={openCheckout}
      onContinueShopping={closeCart}
    />
  </div>
</div>
)}

      </div>
    </div>
  );
}

export default CartModal;