const STATUS_STYLES = {
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "🟡 Pending",
  },

  Confirmed: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    label: "🔵 Confirmed",
  },

  Packed: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    label: "📦 Packed",
  },

  "Out for Delivery": {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    label: "🚚 Out for Delivery",
  },

  Delivered: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "🟢 Delivered",
  },

  Cancelled: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "🔴 Cancelled",
  },
};

export function getOrderStatusBadge(status) {
  return (
    STATUS_STYLES[status] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: status,
    }
  );
}