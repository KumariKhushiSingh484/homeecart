import {
  ORDER_STATUS,
  DELIVERY_METHOD,
  PAYMENT_METHOD,
} from "../../constants/order";
export function formatOrderMessage({
  orderNumber,
  customerName,
  phone,
  address,
  location,
  items,
  total,
}) {
  const now = new Date();

  const orderDate = now.toLocaleDateString("en-IN");

  const orderTime = now
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  return `HOMEECART

================================

        NEW ORDER RECEIVED

================================

Order No : ${orderNumber}

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

${items
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

Delivery    : ${DELIVERY_METHOD}

Payment     : ${PAYMENT_METHOD}

================================

CUSTOMER LOCATION

Tap the link below to open Google Maps

${location || "Location not shared"}

================================

Order Status : ${ORDER_STATUS.PENDING}

Please prepare this order.

Thank you,
HOMEECART`;
}