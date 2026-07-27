export function validatePurchaseRules({
  cartItems,
  businessSettings,
}) {
  if (!businessSettings) {
    return {
      isValid: true,
    };
  }

  if (!businessSettings.minimumPurchasePVEnabled) {
    return {
      isValid: true,
    };
  }

  const totalPV = cartItems.reduce(
  (total, item) =>
    total +
    Number(item.pv ?? 0) * item.quantity,
  0
);

  const minimumPV =
    businessSettings.minimumPurchasePV || 0;

  if (totalPV < minimumPV) {
    return {
      isValid: false,
      message: `Minimum Purchase PV is ${minimumPV}. Your cart has ${totalPV} PV. Add ${minimumPV - totalPV} more PV to continue.`,
      totalPV,
      minimumPV,
      remainingPV: minimumPV - totalPV,
    };
  }

  return {
    isValid: true,
    totalPV,
  };
}