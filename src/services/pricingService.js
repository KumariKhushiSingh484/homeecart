/**
 * Calculates Purchase Value (PV)
 * Business Formula:
 * PV = (Selling Price - Purchase Price) * multiplier
 */
export const calculatePV = (
  sellingPrice,
  purchasePrice,
  multiplier = 5
) => {
  const selling = Number(sellingPrice);
  const purchase = Number(purchasePrice);

  if (isNaN(selling) || isNaN(purchase)) {
    return 0;
  }

  const profit = selling - purchase;

  return Math.max(0, profit * multiplier);
};