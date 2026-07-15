import { useState } from "react";

import { createOrder } from "../services/orderService";

import { generateOrderNumber } from "../utils/order/generateOrderNumber";
import { formatOrderMessage } from "../utils/order/formatOrderMessage";
import { validateCheckout } from "../utils/validation/validateCheckout";

import { ORDER_STATUS } from "../constants/order";
import { WHATSAPP_NUMBER } from "../constants/app";

import AppToast from "../components/AppToast";
import OrderSummary from "../components/OrderSummary";

import useToast from "../hooks/useToast";
import { useCart } from "../context/CartContext";
import { useShopping } from "../context/ShoppingContext";

function Checkout() {
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const {
    showCheckout,
    closeCheckout,
    completeOrder,
  } = useShopping();

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [isPlacingOrder, setIsPlacingOrder] =
    useState(false);

  const {
    toast,
    setToast,
    showToast,
  } = useToast();

  if (!showCheckout) return null;

  const getLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        "error",
        "Geolocation is not supported."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        setLocation(
          `https://maps.google.com/?q=${lat},${lng}`
        );
      },
      () => {
        showToast(
          "error",
          "Unable to fetch location."
        );
      }
    );
  };

  const placeOrder = async () => {
    if (isPlacingOrder) return;

    const validation = validateCheckout({
      customerName,
      phone,
      address,
      cartItems,
    });

    if (!validation.isValid) {
      showToast(
        "error",
        validation.message
      );
      return;
    }

    setIsPlacingOrder(true);

    try {      const orderNumber = generateOrderNumber();

      const order = {
        orderNumber,
        customerName,
        phone,
        address,
        location,
        items: cartItems,
        total: cartTotal,
        status: ORDER_STATUS.PENDING,
      };

      // Save order in Firestore
      await createOrder(order);

      // Generate WhatsApp message
      const message = formatOrderMessage(order);

      // Open WhatsApp
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );

      // Update shopping flow
      completeOrder(order);

      // Clear customer cart
      clearCart();
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        "Failed to place order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={closeCheckout}
          className="absolute right-5 top-5 text-2xl text-gray-500 hover:text-red-600 transition"
        >
          ✕
        </button>

        <div className="p-8">

          <AppToast
            toast={toast}
            setToast={setToast}
          />

          <h1 className="text-3xl font-bold text-center mb-8">
            Checkout
          </h1>

          <OrderSummary />

          {/* Customer Name */}

          <input
            className="mt-6 w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
          />

          {/* Phone */}

          <input
            className="mt-4 w-full rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          {/* Address */}

          <textarea
            rows="4"
            className="mt-4 w-full rounded-xl border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          {/* Location */}

          <button
            type="button"
            onClick={getLocation}
            className="mt-4 w-full rounded-xl bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700 transition"
          >
            📍 Use My Current Location
          </button>

          {location && (
            <div className="mt-4 rounded-xl border border-green-300 bg-green-100 p-4 text-green-700">
              ✅ Location captured successfully.
            </div>
          )}

          {/* Total */}

          <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-5 flex items-center justify-between">

            <span className="text-lg font-semibold">
              Total Amount
            </span>

            <span className="text-3xl font-bold text-green-700">
              ₹{cartTotal}
            </span>

          </div>

          {/* Place Order */}

          <button
            onClick={placeOrder}
            disabled={isPlacingOrder}
            className={`mt-8 w-full rounded-xl py-4 text-lg font-bold text-white transition ${
              isPlacingOrder
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPlacingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;