export function formatCurrency(value) {
  return `₹${Number(value).toFixed(2)}`;
}

export function getItemPrice(item) {
  return item.sellingPrice ?? item.price ?? 0;
}

export function formatDate(timestamp) {
  if (!timestamp) return "-";

  if (timestamp.toDate) {
    return timestamp.toDate().toLocaleString();
  }

  return new Date(timestamp).toLocaleString();
}