export function calculateCartTotal(cartItems) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 500 ? 0 : 40;

  const total = subtotal + delivery;

  return {
    subtotal,
    delivery,
    total,
  };
}