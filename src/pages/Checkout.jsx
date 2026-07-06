import { useState } from "react";
import { createOrder } from "../services/orderService";
import { generateOrderNumber } from "../utils/order/generateOrderNumber";
import { calculateCartTotal } from "../utils/cart/calculateCartTotal";
import { formatOrderMessage } from "../utils/order/formatOrderMessage";
import { validateCheckout } from "../utils/validation/validateCheckout";
import { ORDER_STATUS } from "../constants/order";
import { WHATSAPP_NUMBER } from "../constants/app";
function Checkout({
  cartItems,
  setCartItems,
  setOrderPlaced,
  setOrderNumber,
  setPlacedOrder,
}) 
 {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const placeOrder = async () => {
    if (isPlacingOrder) return;

setIsPlacingOrder(true);
    try {
      // Validate checkout data
      const validation = validateCheckout({
        customerName,
        phone,
        address,
        cartItems,
      });

      if (!validation.isValid) {
        alert(validation.message);
        return;
      }

      // Generate order number
      const orderNumber = generateOrderNumber();

      // Calculate cart total
      const { total } = calculateCartTotal(cartItems);

      // Save order to Firestore
      await createOrder({
  customerName,
  phone,
  address,
  location,
  items: cartItems,
  total,
  orderNumber,
  status: ORDER_STATUS.PENDING,
});

      // Generate WhatsApp message
      const message = formatOrderMessage({
        orderNumber,
        customerName,
        phone,
        address,
        location,
        items: cartItems,
        total,
      });

      // Open WhatsApp
      window.open(
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  "_blank"
);
      // Save the placed order before clearing the cart
setPlacedOrder({
  orderNumber,
  customerName,
  phone,
  address,
  location,
  items: [...cartItems],
  total,
});

// Update UI
setOrderNumber(orderNumber);
setOrderPlaced(true);
setCartItems([]);

alert("✅ Order Placed Successfully!");
    } catch (error) {
  console.error(error);
  alert("❌ Failed to place order");
} finally {
  setIsPlacingOrder(false);
}
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation(`https://maps.google.com/?q=${lat},${lng}`);
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Checkout
      </h1>

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        className="border p-3 w-full mb-4 rounded"
        placeholder="Delivery Address"
        rows="4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        type="button"
        onClick={getLocation}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
      >
        📍 Use My Current Location
      </button>

      {location && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded-lg mb-4">
          ✔ Location captured successfully.
        </div>
      )}

      <button
  onClick={placeOrder}
  disabled={isPlacingOrder}
  className={`w-full p-3 rounded text-white transition ${
    isPlacingOrder
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {isPlacingOrder ? "Placing Order..." : "Place Order"}
</button>
    </div>
  );
}

export default Checkout;