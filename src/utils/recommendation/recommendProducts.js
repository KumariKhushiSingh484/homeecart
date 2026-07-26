export function recommendProducts({
  products = [],
  cartItems = [],
  remainingPV = 0,
  limit = 3,
}) {
  if (!products.length || remainingPV <= 0) {
    return [];
  }

  // Products already in cart
  const cartProductIds = new Set(
    cartItems.map((item) => item.id)
  );

  return products
    .filter((product) => {
      const pv = Number(product.pv || 0);

      return (
        pv > 0 &&
        !cartProductIds.has(product.id)
      );
    })
    .sort((a, b) => {
      const aDifference = Math.abs(
        remainingPV - Number(a.pv || 0)
      );

      const bDifference = Math.abs(
        remainingPV - Number(b.pv || 0)
      );

      if (aDifference !== bDifference) {
        return aDifference - bDifference;
      }

      return Number(b.pv || 0) - Number(a.pv || 0);
    })
    .slice(0, limit);
}