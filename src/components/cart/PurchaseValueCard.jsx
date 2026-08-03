function PurchaseValueCard({
  purchaseValidation,
  businessSettings,
}) {
  if (!businessSettings?.minimumPurchasePVEnabled) {
    return null;
  }

  const {
    totalPV,
    minimumPV,
    remainingPV,
    isValid,
  } = purchaseValidation;

  // Keep progress between 0% and 100%
  const progress = Math.max(
    0,
    Math.min((totalPV / minimumPV) * 100, 100)
  );

  return (
    <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Purchase Value (PV)
        </h3>

        <span
          className={`rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm ${
            isValid
              ? "text-green-700"
              : "text-orange-700"
          }`}
        >
          {totalPV} / {minimumPV} PV
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-label="Purchase Value Progress"
        aria-valuemin={0}
        aria-valuemax={minimumPV}
        aria-valuenow={Math.max(totalPV, 0)}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isValid
              ? "bg-green-600"
              : "bg-orange-500"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Status Message */}
      <p
        className={`mt-3 text-sm font-medium ${
          isValid
            ? "text-green-700"
            : "text-orange-700"
        }`}
      >
        {isValid
          ? "Congratulations! Your order is now eligible for checkout."
          : `${remainingPV} PV more required to place your order.`}
      </p>
    </div>
  );
}

export default PurchaseValueCard;