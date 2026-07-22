export function calculateCartSubtotal(cartItems) {
  return cartItems.reduce(
    (total, item) =>
      total +
      (item.sellingPrice ?? item.price) * item.quantity,
    0
  );
}
