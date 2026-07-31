function PurchaseValueCard({
  purchaseValidation,
  businessSettings,
}) {
  if (
    !businessSettings?.minimumPurchasePVEnabled
  ) {
    return null;
  }

  const progress = Math.min(
    (purchaseValidation.totalPV /
      purchaseValidation.minimumPV) *
      100,
    100
  );

  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-600">
          Purchase Value
        </span>

        <span className="font-semibold">
          {purchaseValidation.totalPV}/
          {purchaseValidation.minimumPV} PV
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            purchaseValidation.isValid
              ? "bg-green-600"
              : "bg-orange-500"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p
        className={`mt-2 text-xs font-medium ${
          purchaseValidation.isValid
            ? "text-green-700"
            : "text-orange-700"
        }`}
      >
        {purchaseValidation.isValid
          ? "✓ Purchase Value Completed"
          : `Need ${purchaseValidation.remainingPV} PV more`}
      </p>
    </div>
  );
}

export default PurchaseValueCard;