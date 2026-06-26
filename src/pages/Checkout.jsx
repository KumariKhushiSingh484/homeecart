import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

function Checkout({
  cartItems,
  setCartItems,
  setOrderPlaced,
  setOrderNumber,
}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const placeOrder = async () => {
  try {
    const orderNo =
      "HE2026-" + Math.floor(1000 + Math.random() * 9000);

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await addDoc(collection(db, "orders"), {
  customerName,
  phone,
  address,
  location, // <-- Add this line
  items: cartItems,
  total,
  orderNumber: orderNo,
  status: "Pending",
  createdAt: new Date(),
});
  
const now = new Date();

const orderDate = now.toLocaleDateString("en-IN");
const orderTime = now.toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
}).toUpperCase();

const message = `HOMEECART

================================

        NEW ORDER RECEIVED

================================

Order No : ${orderNo}

Date : ${orderDate}
Time : ${orderTime}

================================

CUSTOMER DETAILS

Name    : ${customerName}

Phone   : ${phone}

Address :
${address}

================================

ORDER ITEMS

${cartItems
  .map(
    (item) =>
      `${item.name}
Quantity : ${item.quantity}
Unit Price : ₹${item.price}
Subtotal : ₹${item.price * item.quantity}`
  )
  .join("\n\n")}

================================

ORDER SUMMARY

Grand Total : ₹${total}

Delivery    : Home Delivery

Payment     : Cash on Delivery

================================

CUSTOMER LOCATION

Tap the link below to open Google Maps

${location || "Location not shared"}

================================

Order Status : Pending

Please prepare this order.

Thank you,
HOMEECART`;
window.open(
  `https://wa.me/917870599000?text=${encodeURIComponent(message)}`,
  "_blank"
);

    setOrderNumber(orderNo);
    setOrderPlaced(true);
    setCartItems([]);

    alert("✅ Order Placed Successfully!");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to place order");
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
  className="bg-green-600 text-white w-full p-3 rounded hover:bg-green-700"
>
  Place Order
</button>
    </div>
  );
}

export default Checkout;