export function recommendCombination({
  products = [],
  cartItems = [],
  remainingPV = 0,
}) {
  if (!products.length || remainingPV <= 0) {
    return [];
  }

  // Remove products already in cart
  const cartIds = new Set(
    cartItems.map((item) => item.id)
  );

  const availableProducts = products.filter(
    (product) =>
      !cartIds.has(product.id) &&
      Number(product.pv || 0) > 0
  );

  // Best result found so far
  let bestCombination = [];
  let smallestDifference = Infinity;

  // Check every pair of products
  for (let i = 0; i < availableProducts.length; i++) {
    for (
      let j = i + 1;
      j < availableProducts.length;
      j++
    ) {
      const first = availableProducts[i];
      const second = availableProducts[j];

      const totalPV =
        Number(first.pv) + Number(second.pv);

      const difference = Math.abs(
        remainingPV - totalPV
      );

      if (difference < smallestDifference) {
        smallestDifference = difference;

        bestCombination = [first, second];
      }
    }
  }

  return bestCombination;
}