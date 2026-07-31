export function validatePurchaseRules({
  cartItems,
  businessSettings,
}) {
  // Wait until settings are loaded
  if (!businessSettings) {
    return {
      isValid: false,
      totalPV: 0,
      minimumPV: 0,
      remainingPV: 0,
      message: "Loading business settings...",
    };
  }

  // Rule disabled
  if (!businessSettings.minimumPurchasePVEnabled) {
    const totalPV = cartItems.reduce(
      (total, item) =>
        total +
        Number(item.pv ?? 0) * item.quantity,
      0
    );

    return {
      isValid: true,
      totalPV,
      minimumPV: 0,
      remainingPV: 0,
      message: "",
    };
  }

  const totalPV = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.pv ?? 0) * item.quantity,
    0
  );

  const minimumPV = Number(
    businessSettings.minimumPurchasePV ?? 0
  );

  const remainingPV = Math.max(
    minimumPV - totalPV,
    0
  );

  return {
    isValid: totalPV >= minimumPV,
    totalPV,
    minimumPV,
    remainingPV,
    message:
      totalPV >= minimumPV
        ? "Purchase Value requirement completed."
        : `Add ${remainingPV} PV more to continue.`,
  };
}