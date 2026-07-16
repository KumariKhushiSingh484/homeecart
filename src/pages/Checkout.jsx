import { useEffect, useState } from "react";

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
import { useCustomer } from "../context/CustomerContext";

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

  
  const {
    authUser,
    customer,
    loadingCustomer,
  } = useCustomer();

  console.log({
  showCheckout,
  loadingCustomer,
  customer,
});

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

  useEffect(() => {
    if (!customer) return;

    setCustomerName(customer.name || "");

    setPhone(customer.phone || "");

   setAddress(customer.address || "");
  }, [customer]);
if (!showCheckout) return null;

if (loadingCustomer) {
  return null;
}
if (!customer) {
  return null;
}

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
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

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

  if (!authUser) {
    showToast(
      "error",
      "Please login again."
    );
    return;
  }

  setIsPlacingOrder(true);

  try {
    const orderNumber = generateOrderNumber();

    const order = {
      uid: authUser.uid,
      orderNumber,
      customerName,
      phone,
      address,
      location,
      items: cartItems,
      total: cartTotal,
      status: ORDER_STATUS.PENDING,
    };

    await createOrder(order);

    const message = formatOrderMessage(order);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

    completeOrder(order);
    clearCart();
  } catch (error) {
    console.error(error);

    showToast(
      "error",
      "Failed to place order."
    );
  } finally {
    setIsPlacingOrder(false);
  }
};

return (   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}

        <button
          onClick={closeCheckout}
          className="absolute top-5 right-5 text-2xl text-gray-500 hover:text-red-600 transition"
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

          {/* Customer Information */}

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
              Customer Information
            </h2>

            {/* Name */}

            <input
              type="text"
              value={customerName}
              readOnly
              className="w-full rounded-xl border bg-gray-100 p-4 text-gray-700 cursor-not-allowed"
            />

            <p className="mt-2 text-sm text-gray-500">
              Name is taken from your profile.
            </p>

            {/* Phone */}

            <input
              type="text"
              value={phone}
              readOnly
              className="mt-5 w-full rounded-xl border bg-gray-100 p-4 text-gray-700 cursor-not-allowed"
            />

            <p className="mt-2 text-sm text-gray-500">
              Phone number cannot be changed during checkout.
            </p>

          </div>

          {/* Delivery Address */}

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
              Delivery Address
            </h2>

            <textarea
              rows="4"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full resize-none rounded-xl border p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter delivery address"
            />

          </div>

          {/* Location */}

          <button
            type="button"
            onClick={getLocation}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            📍 Use My Current Location
          </button>

          {location && (
            <div className="mt-4 rounded-xl border border-green-300 bg-green-100 p-4 text-green-700">
              ✅ Current location captured successfully.
            </div>
          )}

          {/* Total */}
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 flex items-center justify-between">

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