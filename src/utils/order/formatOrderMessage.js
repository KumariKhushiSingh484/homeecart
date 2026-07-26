import {
  ORDER_STATUS,
} from "../../constants/order";

export function formatOrderMessage(order) {
  const {
    orderNumber,
    customerName,
    phone,
    address,
    location,
    items,
    subtotal,
    deliveryCharge,
    total,
    deliveryMethod,
    status,
    createdAt,
  } = order;
  const orderDate = new Date(
  createdAt || Date.now()
).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const orderTime = new Date(
  createdAt || Date.now()
).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
  const itemsTotal =
    total - deliveryCharge;

return `🏡 HOMEECART
━━━━━━━━━━━━━━━━━━━━━━

🛒 NEW ORDER RECEIVED

🆔 Order ID : ${orderNumber}
📅 ${orderDate} • ${orderTime}

━━━━━━━━━━━━━━━━━━━━━━
👤 CUSTOMER
━━━━━━━━━━━━━━━━━━━━━━

Name    : ${customerName}
Phone   : ${phone}

📍 Address
${address}

━━━━━━━━━━━━━━━━━━━━━━
📦 PICK LIST
━━━━━━━━━━━━━━━━━━━━━━

${items
  .map((item, index) => {
    const price = Number(
      item.sellingPrice ?? 0
    );

    const subtotal =
      price * item.quantity;

    const weight =
      item.weight && item.unit
        ? ` (${item.weight} ${item.unit})`
        : "";

    return `${index + 1}. ${item.quantity} × ${item.name}${weight}    ₹${subtotal}`;
  })
  .join("\n")}

━━━━━━━━━━━━━━━━━━━━━━
💰 PAYMENT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━

Items Total       ₹${subtotal}

Delivery Charge   ₹${deliveryCharge}

────────────────────────
Grand Total       ₹${total}

🚚 Delivery : ${
  deliveryMethod === "pickup"
    ? "Store Pickup"
    : "Home Delivery"
}

📌 Status : ${status}

━━━━━━━━━━━━━━━━━━━━━━
📍 LOCATION
━━━━━━━━━━━━━━━━━━━━━━

${location || "Location not shared"}

━━━━━━━━━━━━━━━━━━━━━━

Thank you ❤️
HomeeCart`;
}